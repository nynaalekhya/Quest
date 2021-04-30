/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './LeftBlock.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LeftBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="col-lg-4 col-12 mb-lg mb-lg-0"
        style={{
          WebkitBoxOrient: 'vertical !important',
          WebkitBoxDirection: 'normal !important',
          WebkitFlexDirection: 'column !important',
          msFlexDirection: 'column !important',
          flexDirection: 'column !important',
        }}
      >
        <div className=" css-1vl67hm false ">
          <div className="row css-15dnu4o mt-xsm">
            <div className="col-sm-12" style={{ width: '100%' }}>
              <div className="d-block css-4w4zia el0n26p0" data-test="profile-container">
                <div className="d-none d-lg-block p-std">
                  <div className="d-flex flex-row container-fluid justify-content-between align-items-center">
                    {this.props.studentInfoStore.studentProfile.ProfilePicURL &&
                    this.props.studentInfoStore.studentProfile.ProfilePicURL.length > 0 ? (
                      <img
                        style={{ borderRadius: '50%' }}
                        src={this.props.studentInfoStore.studentProfile.ProfilePicURL}
                        alt="Profile avatar"
                        className="mb-xsm css-uodor8 css-1k2lqp9"
                      ></img>
                    ) : (
                      <span className="SVGInline mb-xsm css-1k2lqp9">
                        <svg
                          className="SVGInline-svg mb-xsm-svg css-1k2lqp9-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="M0 0h48v48H0z"></path>
                            <g fill="#C4C7CC" transform="translate(3.5 3.21)">
                              <path
                                id="prefix__avatar-a"
                                d="M20.5 40.79c-11.046 0-20-8.954-20-20 0-11.045 8.954-20 20-20s20 8.955 20 20c0 11.046-8.954 20-20 20z"
                              ></path>
                            </g>
                            <path
                              fill="#FFF"
                              fillRule="nonzero"
                              d="M36.71 38.123A18.93 18.93 0 0124 43a18.93 18.93 0 01-12.71-4.877C13.51 33.327 18.367 30 24 30c5.633 0 10.489 3.327 12.71 8.123zM24 28a8 8 0 110-16 8 8 0 010 16z"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    )}
                    <span
                      showbadge="false"
                      className="SVGInline align-self-start css-171gp5j evfqoqj3"
                    >
                      <svg
                        className="SVGInline-svg align-self-start-svg css-171gp5j-svg evfqoqj3-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="5 4 30 35"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path
                            fill="#FFF"
                            stroke="#c4c7cc"
                            strokeLinejoin="square"
                            strokeWidth="3"
                            d="M10 7.5A1.5 1.5 0 008.5 9v19.397a1.5 1.5 0 00.72 1.281l10 6.09a1.5 1.5 0 001.56 0l10-6.09a1.5 1.5 0 00.72-1.281V9A1.5 1.5 0 0030 7.5H10z"
                            className="prefix__border"
                          ></path>
                          <path
                            stroke="#FFF"
                            d="M10 5.5h20A3.5 3.5 0 0133.5 9v19.397a3.5 3.5 0 01-1.68 2.99l-10 6.09a3.5 3.5 0 01-3.64 0l-10-6.09a3.5 3.5 0 01-1.68-2.99V9A3.5 3.5 0 0110 5.5z"
                          ></path>
                          <path
                            fill="#c4c7cc"
                            d="M19.036 21.667h-4.783c-.692 0-.934-.458-.54-1.025l6.698-9.617c.394-.566.636-.462.542.212l-.989 7.096h4.783c.692 0 .934.458.54 1.025l-6.698 9.617c-.394.566-.636.462-.542-.212l.989-7.096z"
                            className="prefix__lightning"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <h3 className="css-17vthrg evfqoqj1">
                    {this.props.studentInfoStore.studentProfile.Name.length === 0
                      ? 'Please Update Your Name'
                      : this.props.studentInfoStore.studentProfile.Name}
                  </h3>
                  <div className="d-flex align-items-center mt-xsm mb-xsm">
                    <span className="SVGInline css-25qyin css-170llpw mr-xsm">
                      <svg
                        className="SVGInline-svg css-25qyin-svg css-170llpw-svg mr-xsm-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <defs>
                          <rect id="prefix__job-c" width="6" height="1" rx=".5"></rect>
                          <path
                            id="prefix__job-a"
                            d="M5 3h10V2a1 1 0 00-1-1H6a1 1 0 00-1 1v1zm11 0h2a2 2 0 012 2v6a2 2 0 01-1 1.732V16a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.268A2 2 0 010 11V5a2 2 0 012-2h2V2a2 2 0 012-2h8a2 2 0 012 2v1zM2 13v3a1 1 0 001 1h14a1 1 0 001-1v-3h-2.5l-.5 2H5l-.5-2H2zm3.78 1h8.44l.5-2H18a1 1 0 001-1V5a1 1 0 00-1-1H2a1 1 0 00-1 1v6a1 1 0 001 1h3.28l.5 2zm1.72-3h5a.5.5 0 110 1h-5a.5.5 0 110-1z"
                          ></path>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                          <g transform="translate(2 3)">
                            <mask id="prefix__job-b" fill="#fff">
                              <path
                                id="prefix__job-a"
                                d="M5 3h10V2a1 1 0 00-1-1H6a1 1 0 00-1 1v1zm11 0h2a2 2 0 012 2v6a2 2 0 01-1 1.732V16a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.268A2 2 0 010 11V5a2 2 0 012-2h2V2a2 2 0 012-2h8a2 2 0 012 2v1zM2 13v3a1 1 0 001 1h14a1 1 0 001-1v-3h-2.5l-.5 2H5l-.5-2H2zm3.78 1h8.44l.5-2H18a1 1 0 001-1V5a1 1 0 00-1-1H2a1 1 0 00-1 1v6a1 1 0 001 1h3.28l.5 2zm1.72-3h5a.5.5 0 110 1h-5a.5.5 0 110-1z"
                              ></path>
                            </mask>

                            <g fill="#20262E" mask="url(#prefix__job-b)">
                              <path d="M-2-3h24v24H-2z"></path>
                            </g>
                          </g>
                          <g transform="translate(9 14)">
                            <mask id="prefix__job-d" fill="#fff"></mask>
                            <use fill="#000" fillRule="nonzero"></use>
                            <g fill="#20262E" mask="url(#prefix__job-d)">
                              <path d="M-9-14h24v24H-9z"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    {this.props.studentInfoStore.studentProfile.CurrentJobTitle.length === 0 ? (
                      <a
                        href="#"
                        onClick={this.props.openProfile}
                        data-test="profile-header-add-job-title"
                      >
                        <strong>Add Job Title</strong>
                      </a>
                    ) : (
                      this.props.studentInfoStore.studentProfile.CurrentJobTitle
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="SVGInline css-25qyin css-170llpw mr-xsm">
                      <svg
                        className="SVGInline-svg css-25qyin-svg css-170llpw-svg mr-xsm-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 10a7 7 0 00-14 0c0 3.484 2.298 7.071 7 10.741 4.702-3.67 7-7.257 7-10.741zm-7 12c-5.333-4-8-8-8-12a8 8 0 1116 0c0 4-2.667 8-8 12zm0-10a2 2 0 110-4 2 2 0 010 4zm0 1a3 3 0 100-6 3 3 0 000 6z"
                          fill="#20262E"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    {this.props.studentInfoStore.studentProfile.City.length === 0 ||
                    this.props.studentInfoStore.studentProfile.State.length === 0 ? (
                      <a
                        href="#"
                        onClick={this.props.openProfile}
                        data-test="profile-header-add-job-title"
                      >
                        <strong>Add Location</strong>
                      </a>
                    ) : (
                      <div className="css-56kyx5">San Jose,CA</div>
                    )}
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
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    studentInfoStore,
  };
};

// export default LeftBlock;
export default connect(mapStateToProps, null)(LeftBlock);
