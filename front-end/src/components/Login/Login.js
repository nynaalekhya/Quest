import React, { Component } from 'react';
import LoginHeader from './LoginHeader';
import LoginBody from './LoginBody';
import './Login.css';
import { history } from '../../App';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  LoginAccount = () => {
    console.log('login tried');
    if (localStorage.getItem('userrole') === 'company') {
      history.push('/Employer');
    } else if (localStorage.getItem('userrole') === 'student') {
      history.push('/home');
    } else if (localStorage.getItem('userrole') === 'admin') {
      history.push('/AdminHomePage');
    }
  };

  render() {
    return (
      <body className="main flex flex-wide loggedOut lang-en en-US gdGrid lockedHome _initOk noTouch desktop">
        <div className="pageContentWrapper ">
          <div id="PageContent">
            <div id="PageBodyContents" className=" meat">
              <div className="pageInsideContent cf">
                <div id="Home" className="gdGrid">
                  <div id="NonMemberHome">
                    <article id="mainCol" className="mainCol">
                      {<LoginHeader />}
                      {<LoginBody LoginAccount={() => this.LoginAccount()} />}
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default Login;
