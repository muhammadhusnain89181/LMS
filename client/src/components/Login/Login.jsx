import React,{useState,useEffect,useContext, Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { useAlert } from 'react-alert'
import {TextField,Typography,Grid,IconButton} from '@material-ui/core'
import Icon from '../Chat/icons/dotmatrikslogo.png'
import axios from 'axios'
import AuthApi from '../../utils/AuthApi'
import store from 'store'
import auth from '../../utils/storage'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
class Login extends Component{
    constructor(){
        super()
        this.state = {
            email:"",
            password:"",
            showPassword:false,
            errors:{}
        }
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/home"); 
        }
        
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    handleClickShowPassword = () => {
    this.setState({showPassword:!this.state.showPassword})
    };
    onChange = e => {
        this.setState({[e.target.id]:e.target.value})
    }
    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email:this.state.email,
            password:this.state.password,
        }
        this.props.loginUser(userData);
    }
    render(){
        const {email, password, errors} = this.state;
    return (
        <div className="mainLogin">
            <div className="container">
                <div className="row"></div>
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
                                            // error={errors}  
                                            onChange={this.onChange}
                                            className='email'
                                            // className={classnames("form-control", { invalid: errors.email || errors.emailnotfound
                                                />
                                                <span className='red-text'>
                                                    { errors.email}
                                                    {errors.emailnotfound}
                                                </span>
                                        </div>

                                        <div className="form-label-group">
                                            <TextField margin='normal' name='password' placeholder="Password"
                                                type={this.state.showPassword ? 'text' : 'password'}                                                
                                                fullWidth id="password" label="Password" autoComplete='current-password'
                                                variant="outlined" value={password} required autoFocus 
                                                // error={errors}
                                                onChange={this.onChange}                
                                                // className={classnames("form-control", {invalid: errors.password || errors.passwordincorrect })}
                                                InputProps={{
                                                    endAdornment:
                                                    (<InputAdornment position="end">
                                                        <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        edge="end"
                                                        >
                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>)
                                                    }}
                                                    />   
                                            <span className="red-text">
                                                {errors.password}
                                                {errors.passwordincorrect}
                                            </span>                      
                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                            <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                        </div>
                                        <Link onClick={e => (!email || !password) ? e.preventDefault() : null} to={`#`}
                                    // to={`/home?name=${name}&room=${room}`}
                                    >
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" 
                                        type="submit" onClick={this.onSubmit} >Sign in</button>
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
        )
}
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
