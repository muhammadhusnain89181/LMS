import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Icon from '../Chat/icons/dotmatrikslogo.png'
function Login() {
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
                            <h1 className="card-title text-center">Login</h1>
                            <form className="form-signin">
                            <div className="form-label-group">
                            <label htmlFor="inputEmail">Enter your name</label>
                                <input type="email" id="text" className="form-control" placeholder="Enter user name" required autoFocus onChange={(event) => setName(event.target.value)}/>
                            </div>

                            <div className="form-label-group">
                            <label Ht="inputPassword">Enter Room name</label>
                                <input type="text" id="inputPassword" className="form-control" placeholder="Room name" required onChange={(event) => setRoom(event.target.value)}/>
                                
                            </div>

                            <div className="custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                {/* <label className="custom-control-label" for="customCheck1">Remember password</label> */}
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

export default Login
