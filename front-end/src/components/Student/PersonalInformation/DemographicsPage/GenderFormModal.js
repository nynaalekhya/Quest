import React, { Component } from 'react';
import './GenderFormModal.css';
import { connect } from 'react-redux';

class GenderFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = { studentProfile: { ...this.props.studentInfoStore.studentProfile } };
  }

  updateGender = (event, value) => {
    event.preventDefault();
    this.setState({
      studentProfile: {
        ...this.state.studentProfile,
        Gender: value,
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
                <strong>With which gender identity do you most identify?</strong>
                <em> (optional)</em>
              </p>
              <section>
                {this.props.masterData.Gender.map((gender) => (
                  <div>
                    <div
                      class={
                        this.state.studentProfile.Gender === gender
                          ? ' gd-ui-radio css-1brliac'
                          : ' gd-ui-radio css-1cm4quy'
                      }
                      //   class=" gd-ui-radio css-1cm4quy"
                      tabindex="0"
                      aria-checked="false"
                      role="radio"
                    >
                      <label
                        onClick={(event) => this.updateGender(event, gender)}
                        for="DISABILITY_24"
                      >
                        <input
                          type="radio"
                          data-test=""
                          id="GENDER_12"
                          name="GENDER"
                          value={gender}
                        />
                        <div class="radioButtonBox">
                          <div class="innerBox"></div>
                        </div>
                        <div class="radioButtonLabel">{gender}</div>
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
                    <label for="GENDER_12">
                      <input type="radio" data-test="" id="GENDER_12" name="GENDER" value="12" />
                      <div class="radioButtonBox">
                        <div class="innerBox"></div>
                      </div>
                      <div class="radioButtonLabel">Man</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-radio css-1brliac"
                    tabindex="0"
                    aria-checked="true"
                    role="radio"
                  >
                    <label for="GENDER_13">
                      <input type="radio" data-test="" id="GENDER_13" name="GENDER" value="13" />
                      <div class="radioButtonBox">
                        <div class="innerBox"></div>
                      </div>
                      <div class="radioButtonLabel">Woman</div>
                    </label>
                  </div>
                </div>{' '}
                <div>
                  <div
                    class=" gd-ui-radio css-1cm4quy"
                    tabindex="0"
                    aria-checked="false"
                    role="radio"
                  >
                    <label for="GENDER_14">
                      <input type="radio" data-test="" id="GENDER_14" name="GENDER" value="14" />
                      <div class="radioButtonBox">
                        <div class="innerBox"></div>
                      </div>
                      <div class="radioButtonLabel">Non-Binary</div>
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
                    <label for="GENDER_15">
                      <input type="radio" data-test="" id="GENDER_15" name="GENDER" value="15" />
                      <div class="radioButtonBox">
                        <div class="innerBox"></div>
                      </div>
                      <div class="radioButtonLabel">Prefer to Self Describe</div>
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
                    <label for="GENDER_16">
                      <input type="radio" data-test="" id="GENDER_16" name="GENDER" value="16" />
                      <div class="radioButtonBox">
                        <div class="innerBox"></div>
                      </div>
                      <div class="radioButtonLabel">Prefer Not to Say</div>
                    </label>
                  </div>
                </div>
                */}{' '}
              </section>
            </div>
          </div>
          <div class="bottomShadow"></div>
          <div class="actionBar">
            <button
              onClick={(event) => this.props.updateStudentProfile(event, this.state.studentProfile)}
              class="gd-ui-button  css-uk8w9o"
              data-test="GENDERSave"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// export default GenderFormModal;
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  const { masterData } = state.staticDataReducer;

  return {
    studentInfoStore,
    masterData,
  };
};

export default connect(mapStateToProps, null)(GenderFormModal);
