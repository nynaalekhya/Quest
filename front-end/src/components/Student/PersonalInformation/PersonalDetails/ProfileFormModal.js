import React, { Component } from 'react';
import BasicInformation from './BasicInformation';
import ContactInformation from './ContactInformation';
import './ProfileFormModal.css';
import { connect } from 'react-redux';

class ProfileFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBasicInformation: true,
      Openedtab: 'BasicInformation',
      studentProfile: { ...this.props.studentInfoStore.studentProfile },
    };
  }
  onChangeCommonHandler = (event) => {
    if (event.target.name === 'Zip' || event.target.name === 'PhoneNo') {
      if (/^(\s*|\d+)$/.test(event.target.value)) {
        this.setState({
          studentProfile: { ...this.state.studentProfile, [event.target.name]: event.target.value },
        });
      }
    } else {
      this.setState({
        studentProfile: { ...this.state.studentProfile, [event.target.name]: event.target.value },
      });
    }
  };
  switchTab = (event, Openedtab) => {
    if (Openedtab !== this.state.Openedtab) {
      this.setState({
        showBasicInformation: !this.state.showBasicInformation,
        Openedtab,
      });
    }
  };

  render() {
    return (
      <div class="gd-ui-modal css-tb9ljb">
        <div class="background-overlay" aria-label="Background Overlay"></div>
        <div class="modal_main ">
          <span
            onClick={this.props.openInformationForm}
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
            <div class="modal_content">
              {this.state.showBasicInformation ? (
                <BasicInformation
                  studentProfile={this.state.studentProfile}
                  onChangeCommonHandler={this.onChangeCommonHandler}
                  switchTab={(event, tab) => this.switchTab(event, tab)}
                />
              ) : (
                <ContactInformation
                  studentProfile={this.state.studentProfile}
                  onChangeCommonHandler={this.onChangeCommonHandler}
                  switchTab={(event, tab) => this.switchTab(event, tab)}
                />
              )}
            </div>
          </div>
          <div class="bottomShadow"></div>
          <div class="actionBar">
            <button
              onClick={(event) => this.props.updateStudentProfile(event, this.state.studentProfile)}
              class="gd-ui-button  css-uk8w9o"
              data-test=""
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// export default ProfileFormModal;
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    studentInfoStore,
  };
};

// export default LeftBlock;
export default connect(mapStateToProps, null)(ProfileFormModal);
