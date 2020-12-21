import React,{useState,useEffect,useContext} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { useAlert } from 'react-alert'
import {TextField,Typography} from '@material-ui/core'
import Icon from '../Chat/icons/dotmatrikslogo.png'
import axios from 'axios'
import AuthApi from '../../utils/AuthApi'
import store from 'store'
import auth from '../../utils/storage'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
function Login(props){
    const authApi = useContext(AuthApi)
    // const alert = useAlert()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [role, setRole] = useState();
    const [user,setUser]=useState(store.get('user'));
    const [loggeduser,setLoggedUser]=useState('');

    const login= async(event)=>{        
        console.log(`login called`);
        event.preventDefault()
        const user={
            email:email,
            password:password
        }
        await axios.post('http://localhost:3000/login',user)
        .then((response)=>{
                if(response.data.user){
                    console.log(`user is ${response.data.user} message ${response.data.message}
                    auth is : ${response.data.auth}`);
                    store.set('user',{
                        id:response.data.user._id,
                        email:response.data.user.email,
                        role:response.data.user.role,
                        accessToken:response.data.user.accessToken,
                    })
                    auth.login(()=>{
                        props.history.push('/home');
                    })
                }
        })
        .catch((error )=>{console.log(error);})
    }
    useEffect(()=>{
        if(props.auth.isAuthenticated){
            props.history.push('/home')
        }
    //     if (nextProps.auth.isAuthenticated) {
    //         this.props.history.push("/dashboard"); 
    //       }
          
    //   if (nextProps.errors) {
    //         this.setState({
    //           errors: nextProps.errors
    //         });
    //       }
    },[])
    useEffect(() => {
        console.log(`token check ${user} ::: check is: ${loggeduser.email}`);
    }, [user])

    return (
        // user ? <Redirect to='/home'/>
        // :
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
                                        
                                            <TextField autoComplete='email'
                                            type="email" placeholder="Email" name='email'
                                            fullWidth id="email" label="Email Address"
                                            variant="outlined" value={email} required autoFocus
                                            onChange={(event)=>setEmail(event.target.value)}
                                            className={classnames("form-control", {
                                                invalid: errors.email || errors.emailnotfound
                                              })}/>
                                              <span className='red-text'>
                                                  {errors.email}
                                                  {errors.emailnotfound}
                                              </span>
                                        </div>

                                        <div className="form-label-group">
                                            <TextField margin='normal' name='password'
                                             type="password" placeholder="Password"
                                            fullWidth id="password" label="Password" autoComplete='current-password'
                                            variant="outlined" value={password} required autoFocus 
                                            onChange={(event)=>setPassword(event.target.value)}
                                            className={classnames("form-control", {
                                                invalid: errors.password || errors.passwordincorrect })} 
                                            />                                   
                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                            <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                        </div>
                                        <Link onClick={e => (!email || !password) ? e.preventDefault() : null} to={`#`}
                                    // to={`/home?name=${name}&room=${room}`}
                                    >
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" 
                                        type="submit" onClick={login} >Sign in</button>
                                    </Link>
                                    </form>
                                    <div className=" text-left" style={{marginTop:'50px',marginLeft:'10px'}}>
                                        <Link to={'/register'}>
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
Login.propTypes={
    loginUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
};
const mapStateToProps=state=>({
    auth:state.auth,
    errors:state.errors
})

export default connect(
    mapStateToProps,
    {loginUser}
    )(Login);
