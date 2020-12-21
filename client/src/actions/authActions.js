import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
// import { useAlert } from "react-alert";
// const alert=useAlert()

//Register User
export const registerUser = (userData, history) => dispatch => {

  console.log(`login called`);
  axios.post("http://localhost:3000/signup",userData)
  .then(res => {history.push("/")})
  .catch(err=> dispatch({
    type:GET_ERRORS,
    payload:err.response.data
  }))
}

//Login
export const loginUser = (userData) => dispatch => {
  axios.post("http://localhost:3000/login",userData)
  .then( res => {
      // alert.success('Login succesfull')
      console.log(`login succesfull`);
      const {token} = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
   })
  .catch(err=> {
    alert(`login error ${err.response}`);
    dispatch({    
    type:GET_ERRORS,
    payload:  err.response.data
  })}
  )
}


// Set logged in user
export const setCurrentUser = decoded_data => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded_data
  };
};
 
// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
  