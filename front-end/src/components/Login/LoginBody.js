/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import './LoginBody.css';
import { hideSignupModal } from '../../constants/action-types';
import { connect } from 'react-redux';
import SignupModal from './SignupModal';
import { Redirect } from 'react-router';
import axios from 'axios';
import serverUrl from '../../config';
import jwt_decode from 'jwt-decode';

class LoginBody extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();

    this.state = {
      errorMessage: '',
      loginFailed: false,
      Email: '',
      Password: '',
      inValidEmail: false,
      authFlag: false,
    };
  }

  closeSignupModal = () => {
    this.props.hideSignupModal();
  };

  onChangeCommonHandler = (e) => {
    this.setState({
      errorMessage: '',
      loginFailed: false,
    });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  UserLeftEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.Email)) {
      this.setState({
        inValidEmail: true,
      });
    } else {
      this.setState({
        inValidEmail: false,
      });
    }
  };

  submitLogin = (e) => {
    //prevent page from refresh
    // e.preventDefault();
    const data = {
      UserName: this.state.Email,
      Password: this.state.Password,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post(serverUrl + 'glassdoor/login', data).then(
      (response) => {
        if (response.status === 200) {
          console.log(response);
          const decoded = jwt_decode(response.data.split(' ')[1]);
          console.log('role', decoded.rol);
          localStorage.setItem('token', response.data);
          localStorage.setItem('userId', decoded.ID);
          localStorage.setItem('userrole', decoded.rol);
          localStorage.setItem('useremail', decoded.Name);
          localStorage.setItem('selectedDropDown', 'Jobs');

          this.props.LoginAccount();
          this.setState(
            {
              authFlag: true,
            },
            function () {
              this.handleClick();
            }
          );
        }
      },
      (error) => {
        this.setState({
          errorMessage: error.response.data,
          loginFailed: true,
        });
      }
    );
  };

  handleClick = (event) => {
    this.inputElement.current.click();
  };
  render() {
    let redirectVar = null;
    // if (localStorage.getItem('token')) {
    //   if (localStorage.getItem('userrole') === 'company') {
    //     redirectVar = <Redirect to="/Employer" />;
    //   } else if (localStorage.getItem('userrole') === 'student') {
    //     redirectVar = <Redirect to="/home" />;
    //   } else if (localStorage.getItem('userrole') === 'admin') {
    //     redirectVar = <Redirect to="/AdminHomePage" />;
    //   }
    // }
    return (
      <section className="wide lockedHero">
        {redirectVar}
        {this.props.sinupModalStore.popSeen ? <SignupModal toggle={this.closeSignupModal} /> : null}

        <div className="bannerImage d-flex justify-content-center">
          <div className="bannerImageLeft"></div>
          <div style={{ width: '1340px', height: '594px' }} className="bannerImageCenter"></div>
          <div style={{ width: '1340px', height: '594px' }} className="bannerImageRight"></div>
        </div>
        <div className="lockedSignUp d-flex align-items-center justify-content-center flex-column">
          <h1 className="m-0 center d-flex align-items-center">
            {' '}
            Find The Job That Fits Your Life
          </h1>
          <div id="InlineLoginModule">
            <div className="gdUserLogin gdGrid " data-test="authInlineContainer">
              <div className="signup px-std px-sm-xxl d-flex flex-column justify-content-between">
                <div>
                  <div className="mt-xsm mt-sm-std">
                    <div className="mx-auto my-0  maxw-sm-authInlineInner  mw-400">
                      <p className="my-0 legalText">
                        By continuing, you agree to our{' '}
                        <a href="#" target="_blank" rel="noopener noreferrer" className="link">
                          Terms of Use
                        </a>{' '}
                        and{' '}
                        <a href="#" target="_blank" rel="noopener noreferrer" className="link">
                          Privacy Policy
                        </a>
                        .
                      </p>
                      <div className="">
                        <form onSubmit={this.submitLogin} name="" className="" novalidate="">
                          <input
                            type="hidden"
                            name="userOriginHook"
                            value="LOCKED_NONMEMBER_HOME"
                          />
                          <input type="hidden" name="postLoginUrl" value="" />
                          <input type="hidden" name="emailOptOut" value="" />
                          <div>
                            <div className="valid css-1ohf0ui">
                              <label
                                for="UserEmailSignUp"
                                className={
                                  this.state.Email.length > 0 ? 'css-w6c9ax' : 'css-2ku426'
                                }
                              >
                                <span>Enter Email</span>
                              </label>
                              <div className="input-wrapper css-q444d9">
                                <input
                                  onBlur={this.UserLeftEmail}
                                  onChange={this.onChangeCommonHandler}
                                  id="UserEmailSignUp"
                                  name="Email"
                                  title="Create account with Email"
                                  type="email"
                                  data-test=""
                                  aria-label=""
                                  className="css-dacmey"
                                  value={this.state.Email}
                                />
                                {this.state.inValidEmail ? (
                                  <div className="css-1sltif6">
                                    <span className="SVGInline grey-400">
                                      <svg
                                        className="SVGInline-svg grey-400-svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                      >
                                        <defs>
                                          <path
                                            id="prefix__alertRed_a"
                                            d="M4.99 20a1 1 0 01-.893-1.448l7.009-14a1 1 0 011.788 0l7.01 14A1 1 0 0119.009 20H4.991zM11 10v4a1 1 0 002 0v-4a1 1 0 00-2 0zm1 8a1 1 0 100-2 1 1 0 000 2z"
                                          ></path>
                                        </defs>
                                        <g fill="none" fill-rule="evenodd">
                                          <path
                                            fill="#FFF"
                                            fill-rule="nonzero"
                                            d="M4.998 21a2.001 2.001 0 01-1.786-2.895l7.002-14.001a1.997 1.997 0 013.573 0l7.002 14A2.002 2.002 0 0119.002 21H4.998z"
                                          ></path>
                                          <mask id="prefix__alertRed_b" fill="#fff">
                                            <use href="#prefix__alertRed_a"></use>
                                          </mask>
                                          <use fill="#d93e30" href="#prefix__alertRed_a"></use>
                                          <g fill="#d93e30" mask="url(#prefix__alertRed_b)">
                                            <path d="M0 0h24v24H0z"></path>
                                          </g>
                                        </g>
                                      </svg>
                                    </span>
                                  </div>
                                ) : (
                                  <div className="css-1sltif6">
                                    <span className="SVGInline grey-400">
                                      <svg
                                        className="SVGInline-svg grey-400-svg"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          d="M20.42 5H3.58l7.71 7.71a1 1 0 001.42 0zM3 5.83v12.45l6.23-6.23zm18 0l-6.23 6.23L21 18.28zm-6.93 6.93l-.66.66a2 2 0 01-2.82 0l-.66-.66L3.7 19h16.6zM20.9 4A1.12 1.12 0 0122 5.14v13.72A1.13 1.13 0 0120.9 20H3.1A1.12 1.12 0 012 18.86V5.14A1.13 1.13 0 013.1 4z"
                                          fill="currentColor"
                                          fill-rule="evenodd"
                                        ></path>
                                      </svg>
                                    </span>
                                  </div>
                                )}{' '}
                              </div>
                              {this.state.inValidEmail ? (
                                <div
                                  data-test="error"
                                  style={{
                                    fontSize: '12px',
                                    lineHeight: '20px',
                                    padding: '5px 0px 0px 12px',
                                    color: 'rgb(217, 62, 48)',
                                  }}
                                  className="css-5eiq8t"
                                >
                                  Please enter a valid email address.
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                          <div className="mt-xsm">
                            <div className="valid css-1ohf0ui">
                              <label
                                for="UserPasswordSignUp"
                                className={
                                  this.state.Password.length > 0 ? 'css-w6c9ax' : 'css-2ku426'
                                }
                              >
                                <span>Password</span>
                              </label>
                              <div className="input-wrapper css-q444d9">
                                <input
                                  onChange={this.onChangeCommonHandler}
                                  id="UserPasswordSignUp"
                                  name="Password"
                                  title="Password"
                                  type="password"
                                  autocomplete="new-password"
                                  data-test=""
                                  aria-label=""
                                  className="css-dacmey"
                                  value={this.state.Password}
                                />
                                {
                                  <div className="css-1sltif6">
                                    <span className="SVGInline grey-400">
                                      <svg
                                        className="SVGInline-svg grey-400-svg"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          d="M12 3a3.93 3.93 0 00-4 3.86V10h8V6.86A3.93 3.93 0 0012 3zm0 11a2 2 0 00-2 2 2 2 0 001 1.73V19h2v-1.27A2 2 0 0014 16a2 2 0 00-2-2zm0-12a5 5 0 015 4.89V10h2.71A1.21 1.21 0 0121 11.09v9.82A1.21 1.21 0 0119.71 22H4.29A1.21 1.21 0 013 20.91v-9.82A1.21 1.21 0 014.29 10H7V6.89A5 5 0 0112 2zM4 21h16V11H4v10z"
                                          fill="currentColor"
                                          fill-rule="evenodd"
                                        ></path>
                                      </svg>
                                    </span>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>

                          {this.state.loginFailed ? (
                            <div
                              style={{
                                textAlign: 'center',
                              }}
                              className="css-5eiq8t"
                            >
                              {this.state.errorMessage}
                            </div>
                          ) : (
                            ''
                          )}
                          <div className="mt-std d-flex justify-content-center">
                            <a ref={this.inputElement} href="#">
                              {' '}
                              <button
                                onClick={this.submitLogin}
                                className="gd-ui-button minWidthBtn signupSubmit css-8i7bc2"
                                // type="submit"
                                type="button"
                                disabled={this.state.inValidEmail ? true : false}
                                style={{
                                  cursor: this.state.inValidEmail ? 'not-allowed' : '',
                                }}
                              >
                                Continue with Email
                              </button>
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="post-job pb-lg pb-0-lg">
            {' '}
            Are You Hiring?&nbsp;
            <a
              href="#"
              className="track-click strong"
              data-track-cmpgn="home"
              data-track-source="below-form-locked-b2c"
              data-track-type="src"
              data-ga-lbl="post-jobs-for-free"
            >
              Post Jobs
            </a>
          </p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { sinupModalStore } = state.SignupModalViewReducer;
  return {
    sinupModalStore: sinupModalStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSignupModal: (payload) => {
      dispatch({
        type: hideSignupModal,
        payload,
      });
    },
  };
};
// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(LoginBody);
