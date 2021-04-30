import React, { Component } from 'react';
import './GenderFormModal.css';
import { connect } from 'react-redux';

class DisabilityFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = { studentProfile: { ...this.props.studentInfoStore.studentProfile } };
  }

  updateDisability = (event, value) => {
    event.preventDefault();
    this.setState({
      studentProfile: {
        ...this.state.studentProfile,
        Disability: value,
      },
    });
  };

  render() {
    return (
      <div class="gd-ui-modal css-q2nzru">
        <div
          style={{ maxWidth: '100%' }}
          class="background-overlay"
          aria-label="Background Overlay"
        ></div>
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
                <strong>
                  Do you have a long-lasting or chronic condition that substantially limits one or
                  more of your major life activities?
                </strong>
                <em> (optional)</em>
              </p>
              <section>
                {this.props.masterData.Disability.map((disability) => (
                  <div>
                    <div
                      class={
                        this.state.studentProfile.Disability === disability
                          ? ' gd-ui-radio css-1brliac'
                          : ' gd-ui-radio css-1cm4quy'
                      }
                      //   class=" gd-ui-radio css-1cm4quy"
                      tabindex="0"
                      aria-checked="false"
                      role="radio"
                    >
                      <label
                        onClick={(event) => this.updateDisability(event, disability)}
                        for="DISABILITY_24"
                      >
                        <input
                          type="radio"
                          data-test=""
                          id="DISABILITY_24"
                          name="DISABILITY"
                          value={disability}
                        />
                        <div class="radioButtonBox">
                          <div class="innerBox"></div>
                        </div>
                        <div class="radioButtonLabel">{disability}</div>
                      </label>
                    </div>
                  </div>
                ))}
                {/* <div>
                  <div
                    class=" gd-ui-radio css-1cm4quy"
                    tabindex="0"
                    aria-checked="false"
                    role="radio"
                  >
                    <label for="DISABILITY_24">
                      <input
                        type="radio"
                        data-test=""
                        id="DISABILITY_24"
                        name="DISABILITY"
                        value="24"
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
                    <label for="DISABILITY_25">
                      <input
                        type="radio"
                        data-test=""
                        id="DISABILITY_25"
                        name="DISABILITY"
                        value="25"
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
                    <label for="DISABILITY_26">
                      <input
                        type="radio"
                        data-test=""
                        id="DISABILITY_26"
                        name="DISABILITY"
                        value="26"
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
              data-test="DISABILITYSave"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// export default DisabilityFormModal;
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  const { masterData } = state.staticDataReducer;
  return {
    studentInfoStore,
    masterData,
  };
};

export default connect(mapStateToProps, null)(DisabilityFormModal);
