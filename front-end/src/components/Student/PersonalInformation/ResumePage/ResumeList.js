import React, { Component } from 'react';
import './ResumeList.css';
import { Redirect } from 'react-router-dom';
import ResumeCard from './ResumeCard';
import { connect } from 'react-redux';
import { updateStudentProfile } from '../../../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../../../config';

class ResumeList extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
  }
  // openResumeUploadPage = () => {
  // this.props.openResumeUploadPage();
  //   this.setState({
  //     redirect: '/ResumeUploadPage',
  //   });
  // };
  //   openResumeUploadPage = () => {
  //     history.push('/ResumeUploadPage');
  //   };

  removeResume = (event, ResumeURL) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    event.preventDefault();
    let data = {
      StudentID: localStorage.getItem('userId'),
      ResumeURL,
    };
    axios
      .post(serverUrl + 'student/resumesDelete', data)
      .then((response) => {
        // console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // console.log('Product Saved');

          let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          var index = studentProfile.Resumes.indexOf(ResumeURL);
          if (index !== -1) {
            studentProfile.Resumes.splice(index, 1);
          }
          const payload = {
            studentProfile,
          };
          this.props.updateStudentProfile(payload);
        } else if (parseInt(response.status) === 400) {
          // console.log(response.data);
        }
      })
      .catch((error) => {
        this.setState({
          msg: true,
        });
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to={this.state.redirect} />;
    }
    return (
      <div class="col-12 col-md-8" style={{ flex: '0 0 66.666667%' }}>
        {redirectVar}
        <div class="resumesPageStyle__resumesPage___10PUZ">
          <div id="ResumePage" class="row flex-row px-lg px-md-0">
            <div class="col-12">
              <div class="manageResumesStyle__resumesContainer___RxX8O">
                <div>
                  <div
                    class="SectionHeaderStyles__sectionHeader___3b_50 pt-sm pt-md-0 d-flex align-items-center justify-content-between no-gutters SectionHeaderStyles__bordered___3i8xM"
                    data-test="sectionHeader"
                  >
                    <div class="d-flex justify-content-start align-items-center">
                      <h1>Manage resumes</h1>
                    </div>
                    <a href="#" onClick={this.props.openResumeUploadPage}>
                      <button
                        // onClick={(event) => event.preventDefault()}
                        // type="button"
                        // onClick={this.openResumeUploadPage}
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
                    </a>
                  </div>
                  <div>
                    {' '}
                    {this.props.studentInfoStore.studentProfile.Resumes.map((resume) => (
                      <ResumeCard
                        resume={resume}
                        removeResume={(event) => this.removeResume(event, resume)}
                      />
                    ))}
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

// export default ResumeList;
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
export default connect(mapStateToProps, mapDispatchToProps)(ResumeList);
