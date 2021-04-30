/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './JobApplyModal.css';

class JobApplyModal extends Component {
  constructor(props) {
    super(props);
    this.state = { Resumes: [{ name: '1resume' }] };
  }
  render() {
    return (
      <div
        className="indeed-apply-popup"
        tabindex="0"
        style={{ position: 'absolute', left: '369.5px', top: '43.5px' }}
        id="indeed-ia-1603926871266-0-modal"
      >
        <div
          className="indeed-apply-container"
          id="indeedapply-modal-preload-1603926871267-container"
          style={{ height: '566px', width: '540px' }}
        >
          <div
            className="indeed-apply-branding"
            id="indeedapply-modal-preload-1603926871267-branding"
          ></div>
          <div className="indeed-apply-bd" id="indeedapply-modal-preload-1603926871267-bd">
            <html>
              <head>
                <title>Job application form container</title>

                {/* <style>
                            * {margin: 0; padding: 0; }
        html {overflow: hidden; }
        body {background: transparent; position: relative; }
                       </style>*/}
              </head>
              <body data-new-gr-c-s-check-loaded="14.981.0" data-new-gr-c-s-loaded="14.981.0">
                <html>
                  <head>
                    <title>Senior Software Engineer - Resonant Sciences LLC</title>
                  </head>
                  <body className="is-white" data-new-gr-c-s-check-loaded="14.981.0">
                    <div id="ia-container">
                      <div className="ia-FlexContainer" tabindex="-1">
                        <div id="ia-ApplyFormScreen" className="ia-ApplyFormScreen">
                          <div className="ia-JobInfoHeader" role="banner">
                            <div>
                              <div className="ia-JobInfoHeader-headerContainer">
                                <h1 className="ia-JobInfoHeader-title">Senior Software Engineer</h1>
                                <div className="ia-JobInfoHeader-subtitle">
                                  <h2 className="ia-JobInfoHeader-multilineSubtitle">
                                    <span>Resonant Sciences LLC</span> -{' '}
                                    <span className="">Dayton, OH 45430</span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div role="main">
                            <form
                              name="application_form"
                              novalidate=""
                              action="/indeedapply/applyv2?hl=en_US"
                              method="POST"
                              enctype="multipart/form-data"
                            >
                              <input type="hidden" name="ms" />
                              <input type="hidden" name="autoString" />
                              <input type="hidden" name="requestTrackingUid" />
                              <div>
                                <div>
                                  <div className="ia-ApplyFormScreen-userFields">
                                    <div className="ia-UserFields">
                                      <div className="ia-UserFields-fragment"></div>
                                      <div className="ia-UserFields-secondary">
                                        <div className="ia-UserFields-fragment">
                                          <div className="icl-u-textSize6 icl-u-textColor--secondary icl-u-xs-mb--sm">
                                            * These fields are required
                                          </div>
                                          <div className="ia-ResumePreviewWithInputFields-container">
                                            <div className="ia-ResumePreviewWithInputFields-inputFields">
                                              <div>
                                                <div className="UserField-Name">
                                                  <div className="ia-TextInput">
                                                    <div className="icl-TextInput">
                                                      <div
                                                        id="label-input-applicant.name"
                                                        className="icl-TextInput-labelWrapper"
                                                      >
                                                        <label
                                                          className="icl-TextInput-label icl-TextInput-label--sm"
                                                          for="input-applicant.name"
                                                        >
                                                          <span>
                                                            <span>Name *</span>
                                                            <span className="icl-u-visuallyHidden">
                                                              (required)
                                                            </span>
                                                          </span>
                                                        </label>
                                                      </div>
                                                      <div className="icl-TextInput-wrapper">
                                                        <input
                                                          required="true"
                                                          type="text"
                                                          aria-labelledby="label-input-applicant.name"
                                                          id="input-applicant.name"
                                                          name="applicant.name"
                                                          className="icl-TextInput-control icl-TextInput-control--sm"
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="ia-ResumePreviewWithInputFields-inputFields">
                                              <div>
                                                <div className="UserField-Name">
                                                  <div className="ia-TextInput">
                                                    <div className="icl-TextInput">
                                                      <div
                                                        id="label-input-applicant.name"
                                                        className="icl-TextInput-labelWrapper"
                                                      >
                                                        <label
                                                          className="icl-TextInput-label icl-TextInput-label--sm"
                                                          for="input-applicant.name"
                                                        >
                                                          <span>
                                                            <span>Resume *</span>
                                                            <span className="icl-u-visuallyHidden">
                                                              (required)
                                                            </span>
                                                          </span>
                                                        </label>
                                                      </div>
                                                      <div className="icl-TextInput-wrapper">
                                                        <select
                                                          required="true"
                                                          type="text"
                                                          aria-labelledby="label-input-applicant.name"
                                                          id="input-applicant.name"
                                                          name="applicant.name"
                                                          className="icl-TextInput-control icl-TextInput-control--sm"
                                                        >
                                                          {' '}
                                                          <option
                                                            className="Dropdown-menu"
                                                            key=""
                                                            value=""
                                                          ></option>
                                                          {this.state.Resumes.map((resume) => (
                                                            <option
                                                              className="Dropdown-menu"
                                                              key={resume.name}
                                                              value={resume.name}
                                                            >
                                                              {resume.name}
                                                            </option>
                                                          ))}
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="ia-FilePicker">
                                            <label
                                              className="ia-FilePicker-label"
                                              for="ia-FilePicker-resume"
                                            >
                                              <div className="ia-UserFieldLabel">
                                                <span>
                                                  <span>Resume *</span>
                                                  <span className="icl-u-visuallyHidden">
                                                    (required)
                                                  </span>
                                                </span>
                                              </div>
                                            </label>
                                            <div className="ia-FilePicker-inputContainer">
                                              <div className="ia-NewResumeFilePicker">
                                                <div className="ia-ControlledFilePicker ia-ControlledFilePicker--integrated">
                                                  <input
                                                    className="ia-ControlledFilePicker-control icl-u-visuallyHidden"
                                                    type="file"
                                                    name="applicant.fileUpload"
                                                    id="ia-CustomFilePicker-resume"
                                                    tabindex="0"
                                                    required=""
                                                    accept=".rtf,.pdf,.txt,.docx,.doc"
                                                  />
                                                  <label
                                                    className="ia-ControlledFilePicker-fakeControl ia-ControlledFilePicker-fakeControl--integrated"
                                                    for="ia-CustomFilePicker-resume"
                                                  >
                                                    Choose file
                                                  </label>
                                                  <span className="ia-ControlledFilePicker-info">
                                                    No file chosen
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="icl-u-textSize6 icl-u-textColor--secondary icl-u-xs-my--sm"></div>
                                        </div>
                                        <div className="ia-AddCoverLetter">
                                          <button
                                            style={{
                                              border: '0',
                                              backgroundColor: 'transparent',
                                            }}
                                            className="icl-Button icl-Button--transparent icl-Button--sm ia-AddCoverLetter-button"
                                            size="sm"
                                            type="button"
                                          >
                                            <span className="icl-ButtonIcon">
                                              <svg
                                                role="img"
                                                className="icl-Icon icl-Icon--inheritColor icl-Icon--sm"
                                                aria-label="Add cover letter"
                                              >
                                                <g>
                                                  <path d="M9.75,5.25H8.25v3h-3v1.5h3v3h1.5v-3h3V8.25h-3v-3ZM9,1.5A7.5,7.5,0,1,0,16.5,9,7.5,7.5,0,0,0,9,1.5ZM9,15a6,6,0,1,1,6-6A6,6,0,0,1,9,15Z"></path>
                                                </g>
                                              </svg>
                                            </span>
                                            Add cover letter
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ia-ApplyFormScreen-nonApplicationFields">
                                <div className="ia-QuestionsDisclaimer">
                                  <div className="ia-Disclaimer">
                                    By pressing continue, you will see questions from the employer
                                    that are part of this application.
                                  </div>
                                </div>
                                <div></div>
                                <div
                                  style={{ paddingLeft: '5rem' }}
                                  className="ia-FormActionButtons"
                                >
                                  <button
                                    className="icl-Button icl-Button--primary icl-Button--lg icl-u-xs-my--sm ia-FormActionButtons-continue"
                                    id="form-action-continue"
                                    size="lg"
                                    type="button"
                                  >
                                    Continue
                                  </button>
                                  <a
                                    onClick={(event) => this.props.toggle(event)}
                                    id="form-action-cancel"
                                    className="icl-u-xs-ml--md"
                                    href="#"
                                  >
                                    Cancel
                                  </a>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div role="contentinfo">
                          <div className="ia-CCPADisclaimerFooter">
                            <div className="ia-CCPADisclaimerFooter-headMargin"></div>
                            <div className="ia-CCPADisclaimerFooter-body">
                              © 2020 Indeed -{' '}
                              <a className="ia-CCPADisclaimerFooter-doNotSellLink" href="#">
                                Do not sell my personal information
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </body>
                </html>
              </body>
            </html>
          </div>
        </div>
      </div>
    );
  }
}

export default JobApplyModal;
