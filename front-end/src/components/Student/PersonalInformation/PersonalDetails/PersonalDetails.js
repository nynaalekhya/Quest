import React, { Component } from 'react';
import './PersonalDetails.css';
import ProfileFormModal from './ProfileFormModal';
import { connect } from 'react-redux';
import AboutMeModal from './AboutMeModal';
import SkillModal from './SkillModal';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updateStudentProfile } from '../../../../constants/action-types';

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openProfileFormModal: false,
      openopenAboutMeFormModal: false,
      openSkillModalForm: false,
    };
  }

  openInformationForm = (event) => {
    event.preventDefault();
    this.setState({
      openProfileFormModal: !this.state.openProfileFormModal,
    });
  };

  openAboutMeForm = (event) => {
    event.preventDefault();
    this.setState({
      openopenAboutMeFormModal: !this.state.openopenAboutMeFormModal,
    });
  };

  openSkillForm = (event) => {
    event.preventDefault();
    this.setState({
      openSkillModalForm: !this.state.openSkillModalForm,
    });
  };

  updateStudentProfile = (event, student) => {
    event.preventDefault();
    console.log(student);

    // event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

    axios.post(serverUrl + 'student/profileUpdate', student).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          // studentProfile.AppliedJobs.push(this.props.selectedJob._id);
          const payload = {
            studentProfile: student,
          };
          this.props.updateStudentProfile(payload);
          this.setState({
            openProfileFormModal: false,
            openopenAboutMeFormModal: false,
            openSkillModalForm: false,
          });
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  render() {
    return (
      <div class="col-12 col-md-8" style={{ flex: '0 0 65.666667%' }}>
        <div>
          <div id="ProfilePageBannerContainer"></div>
          <div class="d-flex flex-column-reverse flex-md-column">
            <div class="module mb-lg profileTasksStyles__profileTasks___OYjMw">
              <div class="d-flex flex-column justify-content-start align-items-start mb-sm profileTasksStyles__header___1Co9h">
                <div class="profileTasksStyles__heading___n23yB">
                  Strengthen and finish your profile
                </div>
                <div class="profileTasksStyles__caption___37z52">
                  With a more robust profile, you’ll be able to find and apply to the best, most
                  relevant opportunities with a few clicks!
                </div>
              </div>
              <div class="d-none d-sm-block">
                <div class="profile-task-list profileTasksStyles__list___1gFP1 ">
                  <div
                    class="profile-task-entry profileTasksStyles__entryContainer___3UuYl"
                    style={{ marginLeft: '180px' }}
                  >
                    <button
                      onClick={this.openInformationForm}
                      class="gd-ui-button d-flex flex-column justify-content-start justify-content-sm-center align-items-center p-sm profileTasksStyles__entry___2tf7Z css-1c2vj07"
                      tabindex="-1"
                    >
                      <div class="d-flex justify-content-center align-items-center mb-xsm profileTasksStyles__icon___1nvMg">
                        <span class="SVGInline">
                          <svg
                            class="SVGInline-svg"
                            style={{ width: '24', height: '24' }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M15.06 11.5H12.5V8.94a.44.44 0 00-.44-.44h-.12a.44.44 0 00-.44.44v2.56H8.94a.44.44 0 00-.44.44v.12a.44.44 0 00.44.44h2.56v2.56a.44.44 0 00.44.44h.12a.44.44 0 00.44-.44V12.5h2.56a.44.44 0 00.44-.44v-.12a.44.44 0 00-.44-.44M12 3a9 9 0 109 9 9 9 0 00-9-9m0 17a8 8 0 118-8 8 8 0 01-8 8"
                              fill="currentColor"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </div>
                      <div class="profileTasksStyles__heading___n23yB">Basic Information</div>
                      <div class="profileTasksStyles__caption___37z52">
                        Give employers a sense of who you are and how they can get in touch with
                        you.
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <section
              class="SectionStyles__section___3ZANh px-std px-md-0 mt-lg mt-md-0"
              data-test="ProfileInfoSection"
              id="ProfileInfo"
            >
              <div class="profileInfoStyle__profileInfo___2aFZe">
                <div
                  class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters"
                  data-test="sectionHeader"
                  style={{ marginBottom: '26px' }}
                >
                  <div class="d-flex justify-content-start align-items-center">
                    <div class="d-flex col no-gutters flex-column">
                      <div class="d-flex col justify-content-between align-items-center no-gutters SectionHeaderStyles__headingGroup___b6Lyf">
                        <div class="d-flex justify-content-start align-items-center SectionHeaderStyles__nameGroup___2N2pK SectionHeaderStyles__visible___3a7mt">
                          {this.props.studentInfoStore.studentProfile.Name.length === 0 ? (
                            <h3
                              class="m-0 mr-sm SectionHeaderStyles__name___saD9S"
                              title="User"
                            >
                              <a
                                onClick={this.openInformationForm}
                                href="#"
                                style={{ color: '#505863' }}
                              >
                                Please Update Your Name
                              </a>
                            </h3>
                          ) : (
                            <h3
                              class="m-0 mr-sm SectionHeaderStyles__name___saD9S"
                              title="User"
                            >
                              {this.props.studentInfoStore.studentProfile.Name}
                            </h3>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="profileInfoStyle__profileInfoContainer___26tEl">
                  <div
                    id="PersonalDetails"
                    class="row mb-lg profileInfoStyle__profileInfoMain___Y8O5Z profileInfoStyle__visible___1bdIC"
                  >
                    <div class="col-12 col-sm-6 col-lg-4 p-0">
                      <div class="no-gutters mb-xsm d-flex justify-content-start align-items-start">
                        <div class="col-12">
                          {this.props.studentInfoStore.studentProfile.CurrentJobTitle.length ===
                          0 ? (
                            <button
                              onClick={this.openInformationForm}
                              class="gd-ui-button no-gutters m-0 p-0 d-flex justify-content-start align-items-center profileInfoStyle__addBtn___12Pvw css-1c2vj07"
                            >
                              <div class="d-flex justify-content-center mr-xsm profileInfoStyle__addIcon___MsVEi profileInfoStyle__entryIcon___2D6u_">
                                <span class="SVGInline">
                                  <svg
                                    class="SVGInline-svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g fill="none" fill-rule="evenodd">
                                      <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                      <path
                                        d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                                        stroke="#1861bf"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                      ></path>
                                    </g>
                                  </svg>
                                </span>
                              </div>
                              <div class="d-flex justify-content-start profileInfoStyle__addCopy___rCroE">
                                Add&nbsp;job title
                              </div>
                            </button>
                          ) : (
                            <div class="no-gutters mb-md-xxsm d-flex justify-content-start align-items-start profileInfoStyle__entryItem___1hOfs">
                              <div class="d-flex justify-content-center align-items-center mr-xsm profileInfoStyle__default___3mWZn profileInfoStyle__entryIcon___2D6u_">
                                <span class="SVGInline">
                                  <svg
                                    class="SVGInline-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M16 4H8a1 1 0 00-1 1v1h10V5a1 1 0 00-1-1zm-1.5 10a.5.5 0 01.09 1H9.5a.5.5 0 010-1zM20 7H4a1 1 0 00-1 1v6a1 1 0 001 1h3.28l.5 2h8.44l.5-2H20a1 1 0 001-1V8a1 1 0 00-1-1zM6.5 16H4v3a1 1 0 001 1h14a1 1 0 001-1v-3h-2.5l-.5 2H7zM16 3a2 2 0 012 2v1h2a2 2 0 012 2v6a2 2 0 01-1 1.73V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-3.27A2 2 0 012 14V8a2 2 0 012-2h2V5a2 2 0 012-2z"
                                      fill="currentColor"
                                      fill-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                              <div class="profileInfoStyle__default___3mWZn profileInfoStyle__wrap___102WU">
                                {this.props.studentInfoStore.studentProfile.CurrentJobTitle}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {this.props.studentInfoStore.studentProfile.City.length === 0 ||
                      this.props.studentInfoStore.studentProfile.State.length === 0 ? (
                        <div class="no-gutters mb-xsm d-flex justify-content-start align-items-start">
                          <div class="col-12">
                            <button
                              onClick={this.openInformationForm}
                              class="gd-ui-button no-gutters m-0 p-0 d-flex justify-content-start align-items-center profileInfoStyle__addBtn___12Pvw css-1c2vj07"
                            >
                              <div class="d-flex justify-content-center mr-xsm profileInfoStyle__addIcon___MsVEi profileInfoStyle__entryIcon___2D6u_">
                                <span class="SVGInline">
                                  <svg
                                    class="SVGInline-svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g fill="none" fill-rule="evenodd">
                                      <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                      <path
                                        d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                                        stroke="#1861bf"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                      ></path>
                                    </g>
                                  </svg>
                                </span>
                              </div>
                              <div class="d-flex justify-content-start profileInfoStyle__addCopy___rCroE">
                                Add&nbsp;location
                              </div>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div class="no-gutters mb-md-xxsm d-flex justify-content-start align-items-start profileInfoStyle__entryItem___1hOfs">
                          <div class="d-flex justify-content-center align-items-center mr-xsm profileInfoStyle__default___3mWZn profileInfoStyle__entryIcon___2D6u_">
                            <span class="SVGInline">
                              <svg
                                class="SVGInline-svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M12 8a2 2 0 11-2 2 2 2 0 012-2zm0-1a3 3 0 103 3 3 3 0 00-3-3zm0-5a8 8 0 018 8q0 6-8 12-8-6-8-12a8 8 0 018-8zm7 8a7 7 0 00-14 0c0 3.48 2.3 7.07 7 10.74 4.7-3.67 7-7.26 7-10.74z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <div class="profileInfoStyle__default___3mWZn profileInfoStyle__wrap___102WU">
                            {this.props.studentInfoStore.studentProfile.City},{' '}
                            {this.props.studentInfoStore.studentProfile.State}
                          </div>
                        </div>
                      )}
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4 p-0">
                      <div class="no-gutters mb-md-xxsm d-flex justify-content-start align-items-start profileInfoStyle__entryItem___1hOfs">
                        <div class="d-flex justify-content-center align-items-center mr-xsm profileInfoStyle__default___3mWZn profileInfoStyle__entryIcon___2D6u_">
                          <span class="SVGInline">
                            <svg
                              class="SVGInline-svg"
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
                        <div class="profileInfoStyle__default___3mWZn profileInfoStyle__wrap___102WU">
                          {this.props.studentInfoStore.studentProfile.Email}
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4 p-0">
                      <div class="d-sm-block d-none">
                        {this.props.studentInfoStore.studentProfile.PhoneNo === null ||
                        this.props.studentInfoStore.studentProfile.PhoneNo.length === 0 ? (
                          <div class="no-gutters mb-xsm d-flex justify-content-start align-items-start">
                            <div class="col-12">
                              <button
                                onClick={this.openInformationForm}
                                class="gd-ui-button no-gutters m-0 p-0 d-flex justify-content-start align-items-center profileInfoStyle__addBtn___12Pvw css-1c2vj07"
                              >
                                <div class="d-flex justify-content-center mr-xsm profileInfoStyle__addIcon___MsVEi profileInfoStyle__entryIcon___2D6u_">
                                  <span class="SVGInline">
                                    <svg
                                      class="SVGInline-svg"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      width="24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g fill="none" fill-rule="evenodd">
                                        <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                                        <path
                                          d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                                          stroke="#1861bf"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                        ></path>
                                      </g>
                                    </svg>
                                  </span>
                                </div>
                                <div class="d-flex justify-content-start profileInfoStyle__addCopy___rCroE">
                                  Add&nbsp;phone number
                                </div>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div class="no-gutters mb-md-xxsm d-flex justify-content-start align-items-start profileInfoStyle__entryItem___1hOfs">
                            <div class="d-flex justify-content-center align-items-center mr-xsm profileInfoStyle__default___3mWZn profileInfoStyle__entryIcon___2D6u_">
                              <span class="SVGInline">
                                <svg
                                  class="SVGInline-svg"
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24"
                                  width="24"
                                  viewBox="0 0 24 24"
                                >
                                  <g fill="currentColor" fill-rule="evenodd">
                                    <path
                                      id="prefix__icon-phone"
                                      d="M7 4a3.13 3.13 0 01.6.06l.27.07 1 5.07-1.51.85a1 1 0 00-.43 1.26 10.94 10.94 0 005.81 5.81 1.09 1.09 0 00.39.08 1 1 0 00.87-.51l.86-1.51 5.06.95a2.5 2.5 0 01.07.26A3.31 3.31 0 0120 17a3 3 0 01-3 3A13 13 0 014 7a3 3 0 013-3m0-1a4 4 0 00-4 4 14 14 0 0014 14 4 4 0 004-4 4.17 4.17 0 00-.08-.8 3.82 3.82 0 00-.33-.95l-6.3-1.19-1.21 2.14a10 10 0 01-5.28-5.28l2.13-1.2-1.18-6.31a3.82 3.82 0 00-1-.33A4.17 4.17 0 007 3z"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                            </div>
                            <div class="profileInfoStyle__default___3mWZn profileInfoStyle__wrap___102WU">
                              {this.props.studentInfoStore.studentProfile.PhoneNo}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.openProfileFormModal ? (
                <ProfileFormModal
                  updateStudentProfile={(event, student) =>
                    this.updateStudentProfile(event, student)
                  }
                  openInformationForm={this.openInformationForm}
                />
              ) : (
                ''
              )}
            </section>
          </div>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
            data-test="AboutMeSection"
            id="AboutMe"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <h3 data-test="profileHeading">About Me</h3>
              </div>
              <button
                onClick={this.openAboutMeForm}
                class="gd-ui-button SectionHeaderStyles__addIcon___2YMd- p-0 css-1c2vj07"
              >
                <span class="SVGInline">
                  <svg
                    class="SVGInline-svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                      <path
                        d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                        stroke="#1861bf"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
            {this.state.openopenAboutMeFormModal ? (
              <AboutMeModal
                updateStudentProfile={(event, student) => this.updateStudentProfile(event, student)}
                openAboutMeForm={this.openAboutMeForm}
              />
            ) : (
              ''
            )}
            {this.props.studentInfoStore.studentProfile.AboutMe.length === 0 ? (
              <a
                onClick={this.openAboutMeForm}
                class="SectionCTA__sectionCTA___JfBzg d-flex align-items-start"
              >
                <span class="SVGInline SectionCTA__icon___EF9Mp d-flex justify-content-center mr-std">
                  <svg
                    class="SVGInline-svg SectionCTA__icon___EF9Mp-svg d-flex-svg justify-content-center-svg mr-std-svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                      <path
                        d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                        stroke="#1861bf"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </g>
                  </svg>
                </span>
                <span class="SectionCTA__label___2WAID">
                  <span>
                    <strong>Add an introduction</strong> about yourself with a brief summary of your
                    experience.
                  </span>
                </span>
              </a>
            ) : (
              <p data-test="description" class="m-0 preWrap">
                {this.props.studentInfoStore.studentProfile.AboutMe}
              </p>
            )}
          </section>
          <section class="SectionStyles__section___3ZANh px-std px-md-0 mt-lg" id="Skills">
            <div class="skillsStyle__skills___2I7sR">
              <div
                class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
                data-test="sectionHeader"
              >
                <div class="d-flex justify-content-start align-items-center">
                  <h3 data-test="skillsHeading">Skills</h3>
                </div>
                <button
                  onClick={this.openSkillForm}
                  class="gd-ui-button SectionHeaderStyles__editIcon___LCEeu p-0 css-1c2vj07"
                >
                  <span class="SVGInline">
                    <svg
                      class="SVGInline-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor" fill-rule="evenodd">
                        <path
                          id="prefix__icon-edit"
                          d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
              {this.state.openSkillModalForm ? (
                <SkillModal
                  updateStudentProfile={(event, student) =>
                    this.updateStudentProfile(event, student)
                  }
                  openSkillForm={this.openSkillForm}
                />
              ) : (
                ''
              )}
              <div
                class="skillsStyle__capitalize___1tkT7 skillsStyle__skillList___3qVgi"
                data-test="skillList"
              >
                {this.props.studentInfoStore.studentProfile.Skills.map((skill) => (
                  <div class="css-zomrfc">
                    <span title={skill} class="css-1p0oo7a">
                      {skill}
                    </span>
                    <span class="css-1dpqmrj"></span>
                  </div>
                ))}
                {/*<div class="css-zomrfc">
                  <span title="Flask" class="css-1p0oo7a">
                    Flask
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>
                <div class="css-zomrfc">
                  <span title="Ambari" class="css-1p0oo7a">
                    Ambari
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>
                <div class="css-zomrfc">
                  <span title="Visual Studio" class="css-1p0oo7a">
                    Visual Studio
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>
                <div class="css-zomrfc">
                  <span title="Tensorflow" class="css-1p0oo7a">
                    Tensorflow
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>
                <div class="css-zomrfc">
                  <span title="Svn" class="css-1p0oo7a">
                    Svn
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>
                <div class="css-zomrfc">
                  <span title="Redux" class="css-1p0oo7a">
                    Redux
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>
                <div class="css-zomrfc">
                  <span title="Pandas" class="css-1p0oo7a">
                    Pandas
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>
                <div class="css-zomrfc">
                  <span title="Object-oriented Programming" class="css-1p0oo7a">
                    Object-oriented Programming
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>
                <div class="css-zomrfc">
                  <span title="Node.js" class="css-1p0oo7a">
                    Node.js
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>
                <div class="css-zomrfc">
                  <span title="Matplotlib" class="css-1p0oo7a">
                    Matplotlib
                  </span>
                  <span class="css-1dpqmrj"></span>
                </div>*/}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

// export default PersonalDetails;
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    studentInfoStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudentProfile: (payload) => {
      dispatch({
        type: updateStudentProfile,
        payload,
      });
    },
  };
};

// export default LeftBlock;
export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
