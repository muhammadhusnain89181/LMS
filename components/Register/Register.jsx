import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import {List,ListItem,ListItemText,ListItemSecondaryAction,
    FormControlLabel,FormLabel,RadioGroup,Radio} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { useAlert } from 'react-alert'
import {Checkbox, Container, CssBaseline, FormControl, Typography} from '@material-ui/core'
import Icon from '../Chat/icons/dotmatrikslogo.png'
import './Register.css'
import axios from 'axios'

function Register() {
    const alert = useAlert()
    const [name, setName] = useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [role,setRole]=useState('');
    const [confirmpassword,setConfirmPassword]=useState('');
    const [checked,setChecked]=useState([]);    
    const [response,setResponse]=useState('');
    const [courses, setCourses] = useState(['Islamiyat','Physcis','Chemistry','Maths','Urdu','English']);

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

    const handleToggle=(value)=>()=>{
        const currentIndex=checked.indexOf(value);
        const newChecked=[...checked];
        if(currentIndex===-1){
            newChecked.push(value);
        }else{
            newChecked.splice(currentIndex,1);
        }
        setChecked(newChecked)
    }
    const handleRadioChange=(event)=>{
        event.preventDefault();
        setRole(event.target.value);
        alert.success(role)
    }
    const SignUp=()=>{
        const user={
            name:name,
            email:email,
            password:password,
            role:role
        }
        axios.post('http://localhost:3000/signup',user).
        then((response)=>{alert.success(response.status)})
        // alert(checked.map((value)=>alert(value)));
    }
    const onChange=(event)=>{
        event.target.name=event.target.value;
    }
    const coursesList=()=>{
        return(<List  dense >
            {courses.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                <ListItem key={value} button onClick={handleToggle(value)}> 
                    <ListItemText id={labelId} primary={`${value}`} />
                    <ListItemSecondaryAction>
                    <Checkbox label={'Checkbox value'}
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    {/* <role==='student' */}
                    </ListItemSecondaryAction>
                </ListItem>
                );
            })}
        </List>)
        }
        const check=()=>{
            alert.success(`role is ${role}`)
        }
    // onChange={handleToggle(value)}
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
                                    <TextField type="text" placeholder="Full Name" 
                                        fullWidth id="outlined-basic" label="Full Name" 
                                        variant="outlined" value={name} required autoFocus 
                                        onChange={(event)=>setName(event.target.value)} />
                                </div>
                                <div className="form-label-group">
                                    <TextField type="email" placeholder="Email" 
                                        fullWidth id="outlined-basic" label="Email" 
                                        variant="outlined" value={email} required autoFocus 
                                        onChange={(event)=>setEmail(event.target.value)} />
                                </div>
                                <div className="form-label-group">
                                    <TextField type="text" placeholder="Password" 
                                        fullWidth id="outlined-basic" label="Password" 
                                        variant="outlined" value={password} required autoFocus 
                                        onChange={(event)=>setPassword(event.target.value)} />
                                </div>
                                <div className="form-label-group">
                                    <TextField type="text" placeholder="Confirm Password"
                                        fullWidth id="outlined-basic" label="Confirm Password" 
                                        variant="outlined" value={confirmpassword} required autoFocus
                                        onChange={(event)=>setConfirmPassword(event.target.value)} />
                                </div>
                                <FormControl component="fieldset">
                                        <RadioGroup row aria-label="position" name="position" onChange={handleRadioChange} defaultValue="top">
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
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={SignUp}>Sign Up</button>
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


export default Register
