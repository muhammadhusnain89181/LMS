import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Icon from '../Chat/icons/dotmatrikslogo.png'
function Register() {
    const [name, setName] = useState('');
  const [room, setRoom] = useState('');
    return (
        <div className="mainLogin">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                        <div className="card-body">
                            <h2 className="card-title text-center"><img src={Icon}/></h2>
                            <h1 className="card-title text-center">Register</h1>
                            <form className="form-signin">
                            
                            <div className="form-label-group">
                            <label htmlFor="inputText">Enter your Name</label>
                                <input type="text" id="text" className="form-control" placeholder="Enter user name" required autoFocus onChange={(event) => setName(event.target.value)}/>
                            </div>
                            
                            <div className="form-label-group">
                            <label htmlFor="inputEmail">Enter your Email</label>
                                <input type="email" id="text" className="form-control" placeholder="Enter user name" required autoFocus onChange={(event) => setName(event.target.value)}/>
                            </div>

                            <div className="form-label-group">
                            <label Ht="inputPassword">Password</label>
                                <input type="pas" id="inputPassword" className="form-control" placeholder="Room name" required onChange={(event) => setRoom(event.target.value)}/>                                
                            </div>

                            <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/home?name=${name}&room=${room}`}>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                            </Link>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
