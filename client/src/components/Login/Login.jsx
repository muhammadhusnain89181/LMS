import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Icon from '../Chat/icons/dotmatrikslogo.png'
function Login() {
    const [name, setName] = useState('');
  const [room, setRoom] = useState('');
    return (
        <div className="mainLogin">
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin my-5">
                        <div class="card-body">
                            <h2 class="card-title text-center"><img src={Icon}/></h2>
                            <h1 class="card-title text-center">Login</h1>
                            <form class="form-signin">
                            <div class="form-label-group">
                            <label for="inputEmail">Enter your name</label>
                                <input type="email" id="text" class="form-control" placeholder="Enter user name" required autofocus onChange={(event) => setName(event.target.value)}/>
                            </div>

                            <div class="form-label-group">
                            <label for="inputPassword">Enter Room name</label>
                                <input type="text" id="inputPassword" class="form-control" placeholder="Room name" required onChange={(event) => setRoom(event.target.value)}/>
                                
                            </div>

                            <div class="custom-control custom-checkbox mb-3">
                                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                {/* <label class="custom-control-label" for="customCheck1">Remember password</label> */}
                            </div>
                            <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/home?name=${name}&room=${room}`}>
                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
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
