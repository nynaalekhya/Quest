import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResumeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const resume = this.props.resume;
    return (
      <div class="mx-0 mx-md-xsm pb-md d-flex flex-row justify-content-between align-items-center manageResumesStyle__resume___1cZaU">
        <div class="mr-xsm d-flex flex-row justify-content-start align-items-center manageResumesStyle__resumeFile___2XwmV">
          <div class="d-flex flex-column justify-content-start align-items-center undefined">
            <i class="filePDF"></i>
          </div>
          <div class="d-flex flex-column justify-content-center align-items-start ml-sm manageResumesStyle__resumeFileName___1_0Wo">
            <a
              class="manageResumesStyle__downloadLink___2nQj3"
              href={resume}
              target="_self"
              rel="noopener noreferrer"
              title="Resume.pdf"
            >
              {resume.split(/[/ ]+/).pop()}
            </a>
          </div>
        </div>
        <button
          class="gd-ui-button d-flex flex-row align-items-center justify-content-start p-0 manageResumesStyle__deleteResumeBtn___1SIEs css-1c2vj07"
          data-test="resumesHeaderAddButton"
        >
          <div
            onClick={(event) => this.props.removeResume(event)}
            class="manageResumesStyle__icon___vXT_M manageResumesStyle__trashIcon___3acWK"
          >
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
                  d="M13.67 3h-3.34a.75.75 0 00-.75.75V5h4.84V3.71a.75.75 0 00-.75-.71zM15 8a.5.5 0 01.5.5v10a.5.5 0 01-1 0v-10A.5.5 0 0115 8zM9 8a.5.5 0 01.5.5v10a.5.5 0 01-1 0v-10A.5.5 0 019 8zm3 0a.5.5 0 01.5.5v10a.5.5 0 01-1 0v-10A.5.5 0 0112 8zm6-2H6l.21 14.83a.33.33 0 00.32.25l11-.08a.33.33 0 00.32-.26zm-4.33-4a1.75 1.75 0 011.75 1.75V5h5a.53.53 0 01.56.5.54.54 0 01-.56.5H19l-.17 14.8v.07A1.34 1.34 0 0117.5 22H6.55a1.33 1.33 0 01-1.32-1.12v-.07L5 6H3.56A.54.54 0 013 5.46.53.53 0 013.56 5h5V3.71A1.75 1.75 0 0110.33 2z"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
        </button>
      </div>
    );
  }
}

export default ResumeCard;
