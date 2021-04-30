import React, { Component } from 'react';
import './ProfileUpdate.css';
import Navbar from '../Common/Navbar.js';
import ProfileUpdateBody from './ProfileUpdateBody.js';
import { Redirect } from 'react-router';

class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'student') {
        return <Redirect to="/Home" />;
      } else if (localStorage.getItem('userrole') === 'admin') {
        return <Redirect to="/AdminHomePage" />;
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
                <div class="applicationStyle__profileApplication___Jyu4n">
                  {<ProfileUpdateBody />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileUpdate;
