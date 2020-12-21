import React,{Component, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import {List,ListItem,ListItemText,ListItemSecondaryAction,
    FormControlLabel,FormLabel,RadioGroup,Radio} from '@material-ui/core'
import {Link,withRouter} from 'react-router-dom'
import { useAlert } from 'react-alert'
import {Checkbox, Container, CssBaseline, FormControl, Typography} from '@material-ui/core'
import Icon from '../Chat/icons/dotmatrikslogo.png'
import './Register.css'
import axios from 'axios'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
class Register extends Component {
    constructor(){
        super();
        this.state = {
            alert:useAlert,
            full_name:"",
            email:"",
            role:"",
            password:"",
            password2:"",
            role:"",
            showPassword:false,
            showPassword2:false,
            errors:{}
        }
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    handleClickShowPassword = () => {
        this.setState({showPassword:!this.state.showPassword})
      };
      handleClickShowPassword2 = () => {
        this.setState({showPassword2:!this.state.showPassword2})
      };
    onChange = e => {
        this.setState({[e.target.id]:e.target.value});
    }
    // handleRadioChange=(event)=>{
    //     event.preventDefault();
    //     setRole(event.target.value);
    // }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name:this.state.full_name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }

        this.props.registerUser(newUser, this.props.history); 
    }
    // const alert = useAlert()
    // const [name, setName] = useState('');
    // const [email,setEmail]=useState('');
    // const [password,setPassword]=useState('');
    // const [role,setRole]=useState('');
    // const [confirmpassword,setConfirmPassword]=useState('');
    // const [checked,setChecked]=useState([]);    
    // const [response,setResponse]=useState('');
    // const [courses, setCourses] = useState(['Islamiyat','Physcis','Chemistry','Maths','Urdu','English']);

    // const  addStudentt= async(event)=>{
    //     event.preventDefault();
    //     const visitor={
    //         full_name:name,
    //         email:email,
    //         password:password,
    //         courses:checked,
    //     }
    //     // setData(JSON.stringify(visitor))
    //     console.log(`data is ${JSON.stringify(visitor)}`);
    //     await axios.post('http://localhost:3000/students/register',visitor).
    //         then((response)=>
    //             {
    //                 if(response.status===200){
    //                     alert.error(`Email Already Exists`);
    //                 }
    //                 else if(response.status===201){
    //                     alert.success(`${visitor.full_name} Succesfully Registered `);
    //                 }
    //         })
    //     .catch((error)=>console.log(error))        
    // }

    // const handleToggle=(value)=>()=>{
    //     const currentIndex=checked.indexOf(value);
    //     const newChecked=[...checked];
    //     if(currentIndex===-1){
    //         newChecked.push(value);
    //     }else{
    //         newChecked.splice(currentIndex,1);
    //     }
    //     setChecked(newChecked)
    // }
    // const handleRadioChange=(event)=>{
    //     event.preventDefault();
    //     setRole(event.target.value);
    // }
    // const SignUp=()=>{
    //     const user={
    //         name:name,
    //         email:email,
    //         password:password,
    //         role:role
    //     }
    //     axios.post('http://localhost:3000/signup',user).
    //     then((response)=>{alert.success(response.status)})
    //     // alert(checked.map((value)=>alert(value)));
    // }
    // const onChange=(event)=>{
    //     event.target.name=event.target.value;
    // }
    // const coursesList=()=>{
    //     return(<List  dense >
    //         {courses.map((value) => {
    //             const labelId = `checkbox-list-secondary-label-${value}`;
    //             return (
    //             <ListItem key={value} button onClick={handleToggle(value)}> 
    //                 <ListItemText id={labelId} primary={`${value}`} />
    //                 <ListItemSecondaryAction>
    //                 <Checkbox label={'Checkbox value'}
    //                     edge="end"
    //                     onChange={handleToggle(value)}
    //                     checked={checked.indexOf(value) !== -1}
    //                     inputProps={{ 'aria-labelledby': labelId }}
    //                 />
    //                 {/* <role==='student' */}
    //                 </ListItemSecondaryAction>
    //             </ListItem>
    //             );
    //         })}
    //     </List>)
    //     }
    //     const check=()=>{
    //         alert.success(`role is ${role}`)
    //     }
    // onChange={handleToggle(value)}
    render(){
        const {full_name, email, password, password2 ,errors} = this.state;
    return (
        <div className="mainLogin">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                        <div className="card-body">
                            {/* <h2 className="card-title text-center"><img src={Icon}/></h2> */}
                            <h1 className="card-title text-center">Register</h1>
                            <form className="form-signin">

                                <div className="form-label-group">

                                    <TextField 
                                        type="text" placeholder="Full Name" name='name' 
                                        fullWidth id="full_name" label="Full Name" 
                                        variant="outlined" value={full_name} required autoFocus 
                                        onChange={this.onChange}
                                        className={{invalid: errors.name }}/>
                                        {/* className={classnames("form-control", { invalid: errors.name })}/>  */}
                                        <span className="red-text">{errors.name}</span>
                                </div>

                                <div className="form-label-group">

                                    <TextField type="email" placeholder="Email" name='email'
                                        fullWidth id="email" label="Email" 
                                        variant="outlined" value={email} required autoFocus
                                        onChange={this.onChange}
                                        className={{invalid: errors.email }}/>
                                        {/* className={classnames("form-control", { invalid: errors.email })}/> */}
                                    <span className="red-text">{errors.email}</span>

                                </div>
                                <div className="form-label-group">


                                    <TextField 
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        placeholder="Password" 
                                        fullWidth id="password" label="Password" 
                                        variant="outlined" value={password} required autoFocus
                                        onChange={this.onChange} 
                                        className={{invalid: errors.password }}
                                        InputProps={{
                                            endAdornment:
                                            (<InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>)
                                            }}
                                            />
                                
                                        {/* className={classnames("form-control", { invalid: errors.password })} /> */}
                                    <span className="red-text">{errors.password}</span>



                                </div>
                                <div className="form-label-group">
                                    <TextField 
                                        type={this.state.showPassword2 ? 'text' : 'password'} 
                                        placeholder="Confirm Password"
                                        fullWidth id="password2" label="Confirm Password" 
                                        variant="outlined" value={password2} required autoFocus
                                        onChange={this.onChange}
                                        className={{invalid: errors.password2 }}
                                        InputProps={{
                                            endAdornment:
                                            (<InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword2}
                                                edge="end"
                                                >
                                                {this.state.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>)
                                            }}
                                            />
                                        {/* className={classnames("form-control", { invalid: errors.password2 })} /> */}
                                    <span className="red-text">{errors.password2}</span>
                                </div>
                                <FormControl component="fieldset">
                                        <RadioGroup row aria-label="position" name="position" onChange={this.onChange} defaultValue="top">
                                            <FormControlLabel
                                            value="student"
                                            control={<Radio color="primary" />}
                                            label="Student"
                                            labelPlacement="end"
                                            />
                                            <FormControlLabel
                                            value="teacher"
                                            control={<Radio color="primary" />}
                                            label="Teacher"
                                            labelPlacement="end"
                                            />
                                            <FormControlLabel
                                            value="admin"
                                            control={<Radio color="primary" />}
                                            label="Admin"
                                            labelPlacement="end"
                                            />
                                            {/* <FormControlLabel value="end" control={<Radio color="primary" />} label="End" /> */}
                                        </RadioGroup>
                                </FormControl>
                                
                                 {/* onClick={e => (!name || !email) ? e.preventDefault() : null} > */}
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.onSubmit}>Sign Up</button>
                            </form>
                            <div className=" text-left" style={{marginTop:'50px',marginLeft:'10px'}}>
                                    
                                <Typography>
                                    Already Registered?<Link to={'/'}> Login</Link>
                                </Typography>
                                    
                            </div>
                        </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
}
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps,{registerUser})(withRouter(Register));
