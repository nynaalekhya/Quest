import React, { Component } from 'react';
import './EmployerHome.css';
import Navbar from '../Common/Navbar.js';
import { history } from '../../../App';
import Body from './Body.js';
import './Body.css';
import LeftBlock from './LeftBlock.js';
import RightBlock from './RightBlock.js';
import { Redirect } from 'react-router';

class EmployerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  
  handleClick = (selectedOption = 'Profile') => {
    
    switch (selectedOption) {
      case 'Profile': {
        history.push('/Employer');
        break;
      }
      case 'Report': {        
        history.push('/EmployerReport');
        break;
      }
      case 'updateProfile': {        
        history.push('/EmployerProfile');
        break;
      }
      default: {
        break;
      }
    }
  };

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
        <div
          id="employerHome"
          class="pageContentWrapper"
          // style={{ background: '#eaeaea none !important ' }}
        >
          {' '}
                    
          <div id="UserProfilePageContent" class>
            <div id="UserProfile" class="gdGrid Container">
              <div class="css-1tgr9d eds5rs80">
                <div class="applicationStyle__profileApplication___Jyu4n">
                  <div class="row  flex-md-row p-0 px-md-lg py-md-xxl">
                    {
                      <LeftBlock
                        handleClick={(selectedOption) => this.handleClick(selectedOption)}
                      />
                    }
                    {
                      <RightBlock
                        handleClick={(selectedOption) => this.handleClick(selectedOption)}
                      />
                    }
                  </div>
                  {/* {<Body handleClick={this.handleClick()}/>} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EmployerHome;
