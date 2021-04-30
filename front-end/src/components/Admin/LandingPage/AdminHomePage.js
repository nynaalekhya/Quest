import React, { Component } from 'react';
// import './EmployerHome.css';
// import Navbar from '../Common/Navbar.js';
import Body from './Body.js';
import { Redirect } from 'react-router';

class AdminHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'company') {
        return <Redirect to="/Employer" />;
      } else if (localStorage.getItem('userrole') === 'student') {
        return <Redirect to="/Home" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        {/*<Navbar />*/}
        <div class="pageContentWrapper">
          {' '}
                    
          <div id="UserProfilePageContent" class>
            <div id="UserProfile" class="gdGrid Container">
              <div class="css-1tgr9d eds5rs80">
                <div class="applicationStyle__profileApplication___Jyu4n">{<Body />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminHomePage;
