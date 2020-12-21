import React,{useEffect,useState} from 'react'
import './layouts.scss'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link,Redirect} from 'react-router-dom'
import Icon from '../Chat/icons/dotmatrikslogocopy.png'
import store from 'store'
import { logoutUser } from '../../actions/authActions'

const Navbar = (props) =>{
  // const [token,setToken]=useState(getFromStorage('token'))
  const [user,setUser]=useState(store.get('user'))
  useEffect(()=>{    
    // console.log(`NavBar Token ${getFromStorage('token')}`);
  },[user])
  const logout=()=>{
    console.log(`NavBar logout called`);setUser(null)
    props.logoutUser();
    // store.remove('user');
  }

return( 
  // token ?
  <nav className='mb-1 navbar navbar-expand-lg navbar-dark bg-primary'>
    <Link className='navbar-brand' to='/home'><img src={Icon}/></Link>
    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent-333'
      aria-controls='navbarSupportedContent-333' aria-expanded='false' aria-label='Toggle navigation'>
      <span className='navbar-toggler-icon'></span>
    </button>
    <div className='collapse navbar-collapse' id='navbarSupportedContent-333'>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item'>
          {/* <a className='nav-link' href='https://github.com/Semreg/hightly'>Source</a> */}
          {/* <a className='nav-link' href='#'>{}</a> */}
        </li>
        {/* <li className='nav-item dropdown'>
          <span className='nav-link dropdown-toggle' id='navbarDropdownMenuLink-333' data-toggle='dropdown'
            aria-haspopup='true' aria-expanded='false'><i className='fas fa-language'></i>
          </span>
          <div className='dropdown-menu dropdown-default' aria-labelledby='navbarDropdownMenuLink-333'>
            <span className='dropdown-item'>Not enabled yet</span>
            <span className='dropdown-item'>Another action</span>
            <span className='dropdown-item'>Something else here</span>
          </div>
        </li> */}
      </ul>
      <ul className='navbar-nav ml-auto nav-flex-icons'>
        <li className='nav-item'>
          <a className='nav-link waves-effect waves-light' href='https://www.linkedin.com/in/vladislav-chabaniuk-792849159/' target='__black'>
            {/* <i className='fab fa-linkedin'></i> */}
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link waves-effect waves-light' href='https://github.com/Semreg' target='__blank'>
            {/* <i className='fab fa-github'></i> */}
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link waves-effect waves-light' href='https://gitlab.com/Semreg' target='__blank'>
            {/* <i className='fab fa-gitlab'></i> */}
          </a>
        </li>
        <li className='nav-item'>
          {/* <Link to='/'> */}
              <a className='nav-link waves-effect ' target='__blank'>
              <i className='fa fa-sign-out' onClick={logout} >Logout</i>
              </a>
            {/* </Link> */}
        </li>
      </ul>
    </div>
  </nav> 
  // : <Redirect to='/'/> 
)
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
