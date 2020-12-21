const express = require('express')
const path = require('path')
const ExpressPeerServer = require('peer').ExpressPeerServer
const socketIo = require('socket.io')
const mongoose =require('mongoose')
const { port } = require('./config')
//--//
const cors=require('cors')
const bodyParser = require('body-parser');
const passport = require("passport");
const jwt = require('jsonwebtoken');
const User=require('../models/User');
const routes=require('../routes/route.js')
const users = require("../routes/users");
const studentRouter=require('../routes/students')
const visitorRouter=require('../routes/visitors')
//--//
require('dotenv').config({
  path:path.join(__dirname,'../.env')
})
const app = express()
// const server = http.createServer(app)
const server=app.listen(port,()=>console.log(`Server is up and running on port ${port}`))
//MongoDb Part
mongoose.connect('mongodb://localhost/',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log(`Mongodb Successfully Connected`))
    .catch(()=>{console.log(`Error Occured`);})
    // Passport middleware
  app.use(passport.initialize());
  app.use(express.json())
  app.use(cors())
  // Bodyparser middleware
  app.use( bodyParser.urlencoded({extended: true }) );
  // Passport config
require("../config/passport")(passport);
// Routes
app.use("/users", users);
app.use('/students',studentRouter)
app.use('/visitors',visitorRouter)
//--//
app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
   const accessToken = req.headers["x-access-token"];
   const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
   // Check if token has expired
   if (exp < Date.now().valueOf() / 1000) { 
    return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
   } 
   res.locals.loggedInUser = await User.findById(userId); next(); 
  } else { 
   next(); 
  } 
 });
app.use('/',routes);
//Socket Part
const io = socketIo(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Credentials': true
    }

    res.writeHead(200, headers)  
    res.end()
  }
})
let streams = {}
io.on('connection', socket => {

  socket.on('setRole', role => {
    socket.role = role
  })

  socket.on('setProps', props => {
    const currentProps = socket.props

    socket.props = {
      ...currentProps,
      ...props
    }
  })
  
  // socket.on('join',({name,room},callback)=>{
  //   const user={id:socket.id,name,room};
  //   if(streams[user.room]){
  //     socket.join(room);
  //     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
  //     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

  //     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  //   }
  // })

  socket.on('createStream', ({ streamId,name}, callback) => {
    console.log(`create stream is called with id: ${streamId} and name : ${name}`);
    streams[streamId] = {
          streamerName:name,
          streamerSocket: socket.id,
          viewers: {}
         }
         socket.join(streamId);
         console.log(streams[streamId]);
    callback();
  });

  socket.on('checkStreamExistence', room => {
    console.log(`checkStreamExistence is called with room ${room}`);
    if (streams[room]) {
      console.log(`stream found with room ${room}`);
      socket.emit('streamExistenceInfo', { active: true, room })
    } else {
      console.log(`stream not found with room ${room}`);
      socket.emit('streamExistenceInfo', { active: false, room })
    }
  })

  socket.on('offerNewViewer', data => {
    if (streams[data.streamId]) {

      const viewerId = data.viewerId

      streams[data.streamId].viewers[data.viewerId] = socket.id;

      //--//
      socket.join(data.streamId);
      //--//
      socket.broadcast.to(streams[data.streamId]).emit('message',{user:'Admin',text:`${data.viewerId} has Joined`})
      io.to(streams[data.streamId].streamerSocket).emit('addNewViewer', viewerId)
    }

    // console.log(streams)
  })

  socket.on('sendMessage', ({message,streamerId,name}, callback) => {
    const user = streams[streamerId];
    console.log(streamerId);
    // console.log(user.streamerName);

    io.to(streamerId).emit('message', { user: name, text: message });

    callback();
  });
  
  socket.on('disconnect', () => {
    switch (socket.role) {
      case 'streamer': {
        const stream = streams[socket.props.peerId]

        if (stream) {
          for (const id in stream.viewers) {
            io.to(stream.viewers[id]).emit('disconnectFromStream')

            delete streams[socket.props.peerId].viewers[id]
          }

          delete streams[socket.props.peerId]
        }

        break
      }
      case 'viewer': {
        if (socket.props) {
          const { to, peerId } = socket.props

          const stream = streams[to]

          if (stream) {
            delete streams[to].viewers[peerId]

            io.to(streams[to].streamerSocket).emit('removeViewer', peerId)
          }
        }

        break
      }
    }
  })

})

const peerServerOptions = {
  debug: false
}
const peerServer = ExpressPeerServer(server, peerServerOptions)


app.use(express.static(path.join(__dirname, '/../../client/public')))
app.use('*', (req, res) => res.sendFile(path.join(__dirname, '/../../client/public/index.html')))
app.use('/peerjs', peerServer)

//server.listen(port, () => console.log(`App is ready on port ${port}`))
