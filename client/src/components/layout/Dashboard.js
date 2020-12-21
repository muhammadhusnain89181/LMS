import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from '../layouts/Layout'
import Animated from '../other/Animated'
import StudentDashboard from '../StudentHome/Dashboard'
import TeacherDashboard from '../TeacherHome/TeacherHome'
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    const { user } = this.props.auth;
    return (
      <Layout>
        <Animated>
          { user.role==='student' ? 
          <>
          <StudentDashboard/>
          </> 
          : <TeacherDashboard/>
          }           
        </Animated>
      </Layout>
      // <div  className="container text-center mt-15">
      //   <div className="row">
      //     <div className="col-sm-12">
      //       <h4>
      //         Hey there, <b className="name-lable">{user.role}</b>
      //         <p className="mt-4">
      //           You are logged into a full-stack{" "}
      //           <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
      //         </p>
      //       </h4>
      //       <button
      //         onClick={this.onLogout}
      //         className="btn btn-large btn-light hoverable font-weight-bold"
      //       >
      //         Logout
      //       </button>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);