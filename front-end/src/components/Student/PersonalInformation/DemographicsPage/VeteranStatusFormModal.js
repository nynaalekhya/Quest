import React, { Component } from 'react';
import './GenderFormModal.css';
import { connect } from 'react-redux';

class VeteranStatusFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = { studentProfile: { ...this.props.studentInfoStore.studentProfile } };
  }

  updateVeteran = (event, value) => {
    event.preventDefault();
    this.setState({
      studentProfile: {
        ...this.state.studentProfile,
        VeteranStatus: value,
      },
    });
  };

  render() {
    return (
      <div class="gd-ui-modal css-q2nzru">
        <div class="background-overlay" aria-label="Background Overlay"></div>
        <div class="modal_main ">
          <span onClick={this.props.openForm} alt="Close" class="SVGInline modal_closeIcon">
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
              <p>
                <strong>Are you a US military veteran?</strong>
                <em> (optional)</em>
              </p>
              <section>
                {this.props.masterData.VeteranStatus.map((veteranstatus) => (
                  <div>
                    <div
                      class={
                        this.state.studentProfile.VeteranStatus === veteranstatus
                          ? ' gd-ui-radio css-1brliac'
                          : ' gd-ui-radio css-1cm4quy'
                      }
                      //   class=" gd-ui-radio css-1cm4quy"
                      tabindex="0"
                      aria-checked="false"
                      role="radio"
                    >
                      <label
                        onClick={(event) => this.updateVeteran(event, veteranstatus)}
                        for="VETERAN_STATUS_31"
                      >
                        <input
                          type="radio"
                          data-test=""
                          id="VETERAN_STATUS_31"
                          name="VETERAN_STATUS"
                          value={veteranstatus}
                        />
                        <div class="radioButtonBox">
                          <div class="innerBox"></div>
                        </div>
                        <div class="radioButtonLabel">{veteranstatus}</div>
                      </label>
                    </div>
                  </div>
                ))}
                {/*<div>
                  <div
                    class=" gd-ui-radio css-1cm4quy"
                    tabindex="0"
                    aria-checked="false"
                    role="radio"
                  >
                    <label for="VETERAN_STATUS_31">
                      <input
                        type="radio"
                        data-test=""
                        id="VETERAN_STATUS_31"
                        name="VETERAN_STATUS"
                        value="31"
                      />
                      <div class="radioButtonBox">
                        <div class="innerBox"></div>
                      </div>
                      <div class="radioButtonLabel">Yes</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-radio css-1cm4quy"
                    tabindex="0"
                    aria-checked="false"
                    role="radio"
                  >
                    <label for="VETERAN_STATUS_32">
                      <input
                        type="radio"
                        data-test=""
                        id="VETERAN_STATUS_32"
                        name="VETERAN_STATUS"
                        value="32"
                      />
                      <div class="radioButtonBox">
                        <div class="innerBox"></div>
                      </div>
                      <div class="radioButtonLabel">No</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-radio css-1cm4quy"
                    tabindex="0"
                    aria-checked="false"
                    role="radio"
                  >
                    <label for="VETERAN_STATUS_33">
                      <input
                        type="radio"
                        data-test=""
                        id="VETERAN_STATUS_33"
                        name="VETERAN_STATUS"
                        value="33"
                      />
                      <div class="radioButtonBox">
                        <div class="innerBox"></div>
                      </div>
                      <div class="radioButtonLabel">Prefer Not to Say</div>
                    </label>
                  </div>
                </div>
                */}
              </section>
            </div>
          </div>
          <div class="bottomShadow"></div>
          <div class="actionBar">
            <button
              onClick={(event) => this.props.updateStudentProfile(event, this.state.studentProfile)}
              class="gd-ui-button  css-uk8w9o"
              data-test="VETERAN_STATUSSave"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// export default VeteranStatusFormModal;
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  const { masterData } = state.staticDataReducer;

  return {
    studentInfoStore,
    masterData,
  };
};

export default connect(mapStateToProps, null)(VeteranStatusFormModal);
