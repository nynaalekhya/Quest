/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import './SignupModal.css';
class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      signupFailed: false,
      signupSuccess: false,
      Email: '',
      Password: '',
      Role: '',
      inValidEmail: false,
      inValidPassword: false,
      Roles: ['student', 'company'],
      CompanyName: '',
    };
  }

  handleClick = () => {
    this.props.toggle();
  };

  onChangeCommonHandler = (e) => {
    this.setState({
      errorMessage: '',
      signupFailed: false,
      signupSuccess: false,
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

  UserLeftPassword = () => {
    if (this.state.Password.length < 8) {
      this.setState({
        inValidPassword: true,
      });
    } else {
      this.setState({
        inValidPassword: false,
      });
    }
  };

  emptyCheck = () => {
    if (
      this.state.Email.length === 0 ||
      this.state.Password.length === 0 ||
      this.state.Role.length === 0
    ) {
      return true;
    } else {
      if (this.state.Role === 'company') {
        if (this.state.CompanyName.length === 0) {
          return true;
        }
      }
    }
    return false;
  };

  onSubmitSignUp = (event) => {
    // prevent page from refresh
    event.preventDefault();

    if (this.emptyCheck()) {
      this.setState({
        errorMessage: 'All fields are compulsory',
        signupFailed: true,
      });
    } else {
      const data = {
        UserName: this.state.Email,
        Password: this.state.Password,
        Role: this.state.Role,
        CompanyName: this.state.CompanyName,
      };
      // set the with credentials to true
      axios.defaults.withCredentials = true;
      // make a post request with the user data
      axios.post(serverUrl + 'glassdoor/signup', data).then(
        (response) => {
          if (response.status === 201) {
            this.setState({
              errorMessage: response.data,
              signupSuccess: true,
            });
          }
        },
        (error) => {
          this.setState({
            errorMessage: error.response.data,
            signupFailed: true,
          });
        }
      );
    }
  };

  render() {
    return (
      <div id="LoginModal">
        <div className="gdUserLogin gdGrid" data-test="authModalContainer">
          <div className="gd-ui-modal css-mgpgck">
            <div className="background-overlay" aria-label="Background Overlay"></div>
            <div className="modal_main actionBarMt0">
              <span alt="Close" className="SVGInline modal_closeIcon">
                <svg
                  onClick={this.handleClick}
                  className="SVGInline-svg modal_closeIcon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <div className="topShadow"></div>
              <div className="fullContent">
                <div className="modal_title">
                  Sign Up to get instant access to millions of salaries and reviews
                </div>
                <div className="modal_content">
                  <div className="signup  ">
                    <div>
                      <div
                        id="signupmodal"
                        style={{ }}
                        className="mt-xsm mt-sm-md d-flex flex-column flex-sm-row flex-sm-wrap"
                      >
                        <div className="mt-std col-sm-6 p-0 pr-sm-std order-last order-sm-first">
                          <div className="valueProps">
                            <div className="valueProp mb-std row mx-0">
                              <div className="col-1-12 p-0 pt-xxsm">
                                <span className="SVGInline checkmarkIconGreen">
                                  <svg
                                    className="SVGInline-svg checkmarkIconGreen-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M16.75 9.24a.88.88 0 00-1.21 0l-5 4.78-2-1.78a.88.88 0 00-1.21 0 .8.8 0 000 1.16l2.63 2.36a.88.88 0 001.21 0l5.66-5.36a.8.8 0 00-.08-1.16zM12 3a9 9 0 11-9 9 9 9 0 019-9z"
                                      fill="currentColor"
                                      fill-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                              <div prop="0" className="col msg pl-std">
                                Find out what it's like at a company by reading employee reviews
                              </div>
                            </div>
                            <div className="valueProp mb-std row mx-0">
                              <div className="col-1-12 p-0 pt-xxsm">
                                <span className="SVGInline checkmarkIconGreen">
                                  <svg
                                    className="SVGInline-svg checkmarkIconGreen-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M16.75 9.24a.88.88 0 00-1.21 0l-5 4.78-2-1.78a.88.88 0 00-1.21 0 .8.8 0 000 1.16l2.63 2.36a.88.88 0 001.21 0l5.66-5.36a.8.8 0 00-.08-1.16zM12 3a9 9 0 11-9 9 9 9 0 019-9z"
                                      fill="currentColor"
                                      fill-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                              <div prop="1" className="col msg pl-std">
                                Research salaries to help you negotiate your offer or pay raise
                              </div>
                            </div>
                            <div className="valueProp mb-std row mx-0">
                              <div className="col-1-12 p-0 pt-xxsm">
                                <span className="SVGInline checkmarkIconGreen">
                                  <svg
                                    className="SVGInline-svg checkmarkIconGreen-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M16.75 9.24a.88.88 0 00-1.21 0l-5 4.78-2-1.78a.88.88 0 00-1.21 0 .8.8 0 000 1.16l2.63 2.36a.88.88 0 001.21 0l5.66-5.36a.8.8 0 00-.08-1.16zM12 3a9 9 0 11-9 9 9 9 0 019-9z"
                                      fill="currentColor"
                                      fill-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                              <div prop="2" className="col msg pl-std">
                                Search millions of jobs from across the web with one click
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" pr-xxsm col-sm-6 pl-sm-std mw-400">
                          <p className="my-0 legalText">
                            By continuing, you agree to our{' '}
                            <a
                              href="/about/terms.htm"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link"
                            >
                              Terms of Use
                            </a>{' '}
                            and{' '}
                            <a
                              href="https://hrtechprivacy.com/brands/glassdoor#privacypolicy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link"
                            >
                              Privacy Policy
                            </a>
                            .
                          </p>
                          <div className="">
                            <form onSubmit={this.onSubmitSignUp} name="" className="" novalidate="">
                              <div>
                                <div className="valid css-1ohf0ui">
                                  <label
                                    for="UserEmailSignUp"
                                    className={
                                      this.state.Email.length > 0 ? 'css-w6c9ax' : 'css-2ku426'
                                    }
                                  >
                                    <span>Create account with Email</span>
                                  </label>
                                  <div className="input-wrapper css-q444d9">
                                    <input
                                      required="required"
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
                                    )}
                                  </div>
                                  {this.state.inValidEmail ? (
                                    <div data-test="error" className="css-5eiq8t">
                                      Please enter a valid email address.
                                    </div>
                                  ) : (
                                    ''
                                  )}{' '}
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
                                      required="required"
                                      onBlur={this.UserLeftPassword}
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
                                      aria-autocomplete="list"
                                    />
                                    {this.state.inValidPassword ? (
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
                                              d="M12 3a3.93 3.93 0 00-4 3.86V10h8V6.86A3.93 3.93 0 0012 3zm0 11a2 2 0 00-2 2 2 2 0 001 1.73V19h2v-1.27A2 2 0 0014 16a2 2 0 00-2-2zm0-12a5 5 0 015 4.89V10h2.71A1.21 1.21 0 0121 11.09v9.82A1.21 1.21 0 0119.71 22H4.29A1.21 1.21 0 013 20.91v-9.82A1.21 1.21 0 014.29 10H7V6.89A5 5 0 0112 2zM4 21h16V11H4v10z"
                                              fill="currentColor"
                                              fill-rule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                    )}{' '}
                                  </div>
                                  {this.state.inValidPassword ? (
                                    <div data-test="error" className="css-5eiq8t">
                                      Password must be at least 8 characters.
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                              <div className="mt-xsm">
                                <div className="valid css-1ohf0ui">
                                  <label
                                    style={{ width: '10%' }}
                                    for="UserRole"
                                    className="css-w6c9ax"
                                  >
                                    <span style={{ visibility: 'hidden' }}> Role</span>
                                  </label>
                                  <div className="input-wrapper css-q444d9">
                                    <select
                                      onChange={this.onChangeCommonHandler}
                                      style={{ paddingTop: '0px', cursor: 'pointer' }}
                                      id="UserRole"
                                      name="Role"
                                      title="Role"
                                      data-test=""
                                      aria-label=""
                                      className="css-dacmey"
                                      value={this.state.Role}
                                      required="required"
                                    >
                                      <option className="Dropdown-menu" key="" value="">
                                        Role
                                      </option>
                                      {this.state.Roles.map((role) => (
                                        <option className="Dropdown-menu" key={role} value={role}>
                                          {role}
                                        </option>
                                      ))}
                                      {/*<option className="Dropdown-menu" key="1" value="1">
                                        Admin
                                      </option>
                                      <option
                                        className="Dropdown-menu"
                                        // disabled={2 <= this.props.order.DeliverStatusID ? true : null}
                                        key="2"
                                        value="2"
                                      >
                                          Student
                                      </option>
                                      <option
                                        className="Dropdown-menu"
                                        // disabled={2 <= this.props.order.DeliverStatusID ? true : null}
                                        key="3"
                                        value="3"
                                      >
                                          Employer
                                      </option>*/}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {this.state.Role === 'company' ? (
                                <div className="mt-xsm">
                                  <div className="valid css-1ohf0ui">
                                    <label
                                      for="CompanyName"
                                      className={
                                        this.state.CompanyName.length > 0
                                          ? 'css-w6c9ax'
                                          : 'css-2ku426'
                                      }
                                    >
                                      <span>Company Name</span>
                                    </label>
                                    <div className="input-wrapper css-q444d9">
                                      <input
                                        required="required"
                                        onChange={this.onChangeCommonHandler}
                                        id="CompanyName"
                                        name="CompanyName"
                                        title="Password"
                                        type="text"
                                        autocomplete="new-password"
                                        data-test=""
                                        aria-label=""
                                        className="css-dacmey"
                                        value={this.state.CompanyName}
                                        aria-autocomplete="list"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ''
                              )}
                              {this.state.signupFailed ? (
                                <div
                                  style={{ textAlign: 'center' }}
                                  data-test="error"
                                  className="css-5eiq8t"
                                >
                                  {this.state.errorMessage}
                                </div>
                              ) : (
                                ''
                              )}
                              {this.state.signupSuccess ? (
                                <div
                                  // data-test="success"
                                  className="css-5eiq8t signup-success"
                                  style={{
                                    textAlign: 'center',
                                  }}
                                >
                                  Signup Successful. Please{' '}
                                  <a
                                    onClick={this.handleClick}
                                    href="#"
                                    className="link ml-xxsm"
                                    data-test="signInLink"
                                  >
                                    Sign In
                                  </a>{' '}
                                  to continue
                                </div>
                              ) : (
                                ''
                              )}
                              <div className="mt-std d-flex justify-content-center">
                                <button
                                  className="gd-ui-button minWidthBtn signupSubmit css-8i7bc2"
                                  type="submit"
                                  disabled={
                                    this.state.inValidEmail ||
                                    this.state.inValidPassword ||
                                    this.state.signupSuccess
                                      ? true
                                      : false
                                  }
                                  style={{
                                    cursor:
                                      this.state.inValidEmail ||
                                      this.state.inValidPassword ||
                                      this.state.signupSuccess
                                        ? 'not-allowed'
                                        : '',
                                  }}
                                >
                                  Continue with Email
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottomShadow"></div>
              <div className="actionBar">
                <div className="authFooter d-flex justify-content-center w-100pct mb-neg16 mt-lg">
                  <div className="center description py-xsm ">
                    Already have an account?{' '}
                    <a
                      onClick={this.handleClick}
                      href="#"
                      className="link ml-xxsm"
                      data-test="signInLink"
                    >
                      Sign In
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupModal;
