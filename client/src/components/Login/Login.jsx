import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import { TextField, Typography } from "@material-ui/core";
import Icon from '../Chat/icons/dotmatrikslogo.png'
import './login.css'
function Login() {
    // const [email,setEmail] =useState('');
    // const [password,setPassword]=useState('');
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
                                <h1 className=" text-center">Login</h1>
                                <form className="form-signin">
                                <div className="form-label-group">
                                    <TextField type="text" placeholder="Email"
                                    fullWidth id="outlined-basic" label="Email"
                                    variant="outlined" value={name} required autoFocus
                                    onChange={(event)=>setName(event.target.value)} />
                                </div>

                                <div className="form-label-group">
                                    <TextField type="text" placeholder="Password"
                                    fullWidth id="outlined-basic" label="Password"
                                    variant="outlined" value={room} required
                                    autoFocus onChange={(event)=>setRoom(event.target.value)} />                                   
                                </div>

                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                    <label className="custom-control-label" for="customCheck1">Remember password</label>
                                </div>
                                <Link onClick={e => (!name || !room) ? e.preventDefault() : null}
                                to={`/home?name=${name}&room=${room}`}>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                </Link>
                                </form>
                                <div className=" text-left" style={{marginTop:'50px',marginLeft:'10px'}}>
                                    <Link to={'/signup'}>
                                    <Typography>
                                        Not Registered yet ?
                                    </Typography>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
