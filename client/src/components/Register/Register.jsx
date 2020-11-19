import React,{Fragment, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import {List,ListItem,ListItemText,ListItemSecondaryAction} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {Checkbox, Container, CssBaseline, FormControl, Typography} from '@material-ui/core'
import Icon from '../Chat/icons/dotmatrikslogo.png'
import './Register.css'
function Register() {
    
    const [name, setName] = useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmpassword,setConfirmPassword]=useState('');
    const [checked,setChecked]=useState([]);
    const [courses, setCourses] = useState(['Islamiyat','Physcis','Chemistry','Maths','Urdu','English']);

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
    const SignUp=()=>{
        alert(checked.map((value)=>alert(value)));
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
                            <h1 className="card-title text-center">Login</h1>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <TextField type="text" placeholder="Full Name" fullWidth id="outlined-basic" label="Full Name" variant="outlined" value={name} required autoFocus onchange={(event)=>setName(event.target.value)} />
                                    {/* <label htmlFor="inputEmail">Enter your Name</label>
                                    <input type="email" id="text" className="form-control" placeholder="Enter user name" required autoFocus onChange={(event) => setName(event.target.value)}/> */}
                                </div>
                                <div className="form-label-group">
                                <TextField type="text" placeholder="Email" fullWidth id="outlined-basic" label="Email" variant="outlined" value={email} required autoFocus onchange={(event)=>setName(event.target.value)} />
                                    {/* <label htmlFor="inputEmail">Enter your Email</label>
                                    <input type="email" id="text" className="form-control" placeholder="Enter user name" required autoFocus onChange={(event) => setName(event.target.value)}/> */}
                                </div>
                                <div className="form-label-group">
                                <TextField type="text" placeholder="Password" fullWidth id="outlined-basic" label="Password" variant="outlined" value={password} required autoFocus onchange={(event)=>setName(event.target.value)} />
                                    {/* <label htmlFor="inputPassword">Enter your Password</label>
                                    <input type="text" id="inputPassword" className="form-control" placeholder="Room name" required onChange={(event) => setRoom(event.target.value)}/>                                 */}
                                </div>
                                <div className="form-label-group">
                                <TextField type="text" placeholder="Full Name" fullWidth id="outlined-basic" label="Full Name" variant="outlined" value={confirmpassword} required autoFocus onchange={(event)=>setName(event.target.value)} />
                                    {/* <label htmlFor="inputPassword">Enter your Password</label>
                                    <input type="text" id="inputPassword" className="form-control" placeholder="Room name" required onChange={(event) => setRoom(event.target.value)}/>                                 */}
                                </div>
                                <List dense >
                                    {courses.map((value) => {
                                        const labelId = `checkbox-list-secondary-label-${value}`;
                                        return (
                                        <ListItem key={value} button> 
                                        {/* onClick={()=>handleToggle(value)}> */}
                                            <ListItemText id={labelId} primary={`${value}`} />
                                            <ListItemSecondaryAction>
                                            <Checkbox label={value}
                                                edge="end"
                                                onChange={handleToggle(value)}
                                                checked={checked.indexOf(value) !== -1}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        );
                                    })}
                                </List>
                                <Link onClick={(e) => { e.preventDefault();alert(checked.map(v=>alert(v)))}} >
                                 {/* onClick={e => (!name || !email) ? e.preventDefault() : null} > */}
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
