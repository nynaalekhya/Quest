import React, { Component } from 'react';
import './AboutMeModal.css';
import { connect } from 'react-redux';

class AboutMeModal extends Component {
  constructor(props) {
    super(props);
    this.state = { studentProfile: { ...this.props.studentInfoStore.studentProfile } };
  }
  onChangeHandler = (event) => {
    this.setState({
      studentProfile: { ...this.state.studentProfile, AboutMe: event.target.value },
    });
  };
  render() {
    return (
      <div>
        <div class="gd-ui-modal css-q2nzru">
          <div class="background-overlay" aria-label="Background Overlay"></div>
          <div class="modal_main ">
            <span
              onClick={this.props.openAboutMeForm}
              alt="Close"
              class="SVGInline modal_closeIcon"
            >
              <svg
                class="SVGInline-svg modal_closeIcon-svg"
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
            <div class="topShadow"></div>
            <div class="fullContent">
              <div class="modal_title">Add About Me</div>
              <div class="modal_content">
                <div class="aboutMeStyle__editable___1W1El">
                  <div class="mr-lg css-1ohf0ui">
                    <label for="" class="css-1opum1l">
                      <span>Description</span>
                    </label>
                    <div class="input-wrapper css-q444d9">
                      <textarea
                        onChange={this.onChangeHandler}
                        rows="5"
                        placeholder="Description"
                        data-test="description"
                        maxlength="2000"
                        aria-label=""
                        class="css-1q8a8vk"
                        value={this.state.studentProfile.AboutMe}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottomShadow"></div>
            <div class="actionBar">
              <div>
                <button
                  onClick={this.props.openAboutMeForm}
                  class="gd-ui-button d-none d-md-inline-block mr-md-sm css-3ybntp"
                  data-test="cancelChanges"
                >
                  Cancel
                </button>
                <button
                  onClick={(event) =>
                    this.props.updateStudentProfile(event, this.state.studentProfile)
                  }
                  class="gd-ui-button  css-uk8w9o"
                  data-test="saveChanges"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default AboutMeModal;
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    studentInfoStore,
  };
};

// export default LeftBlock;
export default connect(mapStateToProps, null)(AboutMeModal);
