import React, { Component } from 'react';

class ApplicantModel extends Component {
  constructor(props) {
    super(props);
    this.state = { applicantStatus: this.props.listitem.Status };
  }

  onChangeCommonHandler = (e) => {
    this.setState({
      applicantStatus: e.target.value,
    });
  };

  render() {
    const listitem = this.props.listitem;
    return (
      <div class=" gd-ui-module css-lcvd8h" key={listitem.StudentID}>
        <div class="row mx-0 py-std css-l8rlna e8dz1vs0" data-test="employer-salary-tile">
          <div class="col d-flex justify-content-between pl-std">
            <div>
              <a
                href=""
                onClick={(event) => {
                  this.handleStudentName(event, listitem.StudentID);
                }}
              >
                <h3 class="link m-0 css-1v81xpy e8dz1vs2">{listitem.StudentName}</h3>
              </a>
            </div>
            <div>
              <div class="css-1uyte9r e8dz1vs1">Resume</div>
              <div class="mr-xsm d-flex flex-row justify-content-start align-items-center manageResumesStyle__resumeFile___2XwmV">
                <div class="d-flex flex-column justify-content-start align-items-center undefined">
                  <i class="filePDF"></i>
                </div>
                <div class="d-flex flex-column justify-content-center align-items-start ml-sm manageResumesStyle__resumeFileName___1_0Wo">
                  <a
                    class="manageResumesStyle__downloadLink___2nQj3"
                    href={listitem.ResumeURL}
                    target="_self"
                    rel="noopener noreferrer"
                    title="Resume.pdf"
                  >
                    {listitem.ResumeURL.split(/[/ ]+/).pop()}
                  </a>
                </div>
              </div>

              {/* <a href="">
                <h3 class="link m-0 css-1v81xpy e8dz1vs2" style={{ fontSize: '12px' }}>
                  {listitem.ResumeURL}
                </h3>
            </a>*/}
            </div>
            <div>
              <div class="css-1uyte9r e8dz1vs1"> Cover Letter</div>
              <div class="mr-xsm d-flex flex-row justify-content-start align-items-center manageResumesStyle__resumeFile___2XwmV">
                <div class="d-flex flex-column justify-content-start align-items-center undefined">
                  <i class="filePDF"></i>
                </div>
                <div class="d-flex flex-column justify-content-center align-items-start ml-sm manageResumesStyle__resumeFileName___1_0Wo">
                  <a
                    class="manageResumesStyle__downloadLink___2nQj3"
                    href={listitem.CoverLetterURL}
                    target="_self"
                    rel="noopener noreferrer"
                    title="Resume.pdf"
                  >
                    {listitem.CoverLetterURL.split(/[/ ]+/).pop()}
                  </a>
                </div>
              </div>
              {/*<a href="">
                <h3 class="link m-0 css-1v81xpy e8dz1vs2" style={{ fontSize: '12px' }}>
                  {listitem.CoverLetterURL}
                </h3>
        </a>*/}
            </div>
          </div>
        </div>
        <div>
          <h4 class="m-0 css-1v81xpy e8dz1vs2">
            Current Application Status:{' '}
            <span>
              <strong>{listitem.Status}</strong>
            </span>
          </h4>
          {/*<div
            onClick={this.openFilterDropDown}
            class="ml-xsm search__SearchStyles__searchDropdown css-1ohf0ui"
          >
            <select
              required="true"
              name="applicantStatus"
              value={this.state.applicantStatus}
              onChange={(event) => this.handleOnChange(event)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Reviewed">Reviewed</option>
              <option value="InitialScreening">InitialScreening</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Hired">Hired</option>
            </select>
          </div>*/}
        </div>

        <h3
          type="button"
          class="gd-ui-button d-none d-md-inline-block mr-md-sm mb-sm css-3ybntp"
          data-test="saveChanges"
          onClick={(event) =>
            this.props.saveChanges(
              event,
              listitem.JobID,
              listitem.StudentID,
              this.state.applicantStatus
            )
          }
        >
          Save
        </h3>
        <select
          required="true"
          style={{ backgroundColor: '#fff', width: '150px' }}
          id="applicantStatus"
          data-test="state"
          maxlength="100"
          aria-label=""
          class="css-ofiv3k"
          onChange={(event) => this.onChangeCommonHandler(event)}
          value={this.state.applicantStatus}
          name="State"
        >
          <option value="Reviewed">Reviewed</option>
          <option value="Initial Screening">Initial Screening</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    );
  }
}

export default ApplicantModel;
