const express = require('express')
const http = require('http')
const path = require('path')
const ExpressPeerServer = require('peer').ExpressPeerServer
const socketIo = require('socket.io')
const { port } = require('./config')

const { addUser, removeUser, getUser, getUsersInRoom } = require('../users');
const users = require('../users')

const app = express()
const server = http.createServer(app)

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
    console.log(`create stream is called with id: ${streams} and name : ${name}`);
    streams[streamId] = {
          streamerName:name,
          streamerSocket: socket.id,
          viewers: {}
         }
         socket.join(streamId);
    callback();
  });

  socket.on('checkStreamExistence', room => {
    console.log('checkStreamExistence is called');
    if (streams[room]) {
      socket.emit('streamExistenceInfo', { active: true, room })
    } else {
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
    console.log(user);

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
app.use('/peer', peerServer)

server.listen(port, () => console.log(`App is ready on port ${port}`))
