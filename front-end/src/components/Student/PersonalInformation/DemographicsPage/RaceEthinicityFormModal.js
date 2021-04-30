import React, { Component } from 'react';
import './RaceEthinicityFormModal.css';
import { connect } from 'react-redux';

class RaceEthinicityFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentProfile: { ...this.props.studentInfoStore.studentProfile },
      ethinicity: [],
    };
  }

  updateEthnicity = (event, ethn) => {
    event.preventDefault();
    const studentProfile = this.state.studentProfile;
    if (studentProfile.Race.includes(ethn)) {
      // studentProfile = this.state.studentProfile;
      studentProfile.Race.splice(studentProfile.Race.indexOf(ethn), 1);
    } else {
      studentProfile.Race.push(ethn);
    }
    this.setState({
      studentProfile,
    });
  };

  render() {
    return (
      <div class="gd-ui-modal css-tb9ljb">
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
                  With which race and/or ethnicity do you identify? Select all that apply.
                </strong>
                <em> (optional)</em>
              </p>
              <section>
                {this.props.masterData.Ethnicity.map((ethnicity) => (
                  <div>
                    <div
                      class={
                        this.state.studentProfile.Race.includes(ethnicity)
                          ? ' gd-ui-checkbox css-1i7401q'
                          : ' gd-ui-checkbox css-13md0bs'
                      }
                      //   class=" gd-ui-checkbox css-13md0bs"
                      role="checkbox"
                      aria-checked="false"
                      tabindex="0"
                      value={ethnicity}
                    >
                      <label
                        for={ethnicity}
                        onClick={(event) => this.updateEthnicity(event, ethnicity)}
                      >
                        <input type="checkbox" data-test="" id={ethnicity} name={ethnicity} />
                        <div class="checkboxBox"></div>
                        <div class="checkboxLabel">{ethnicity}</div>
                      </label>
                    </div>
                  </div>
                ))}
                {/*   <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="1"
                  >
                    <label for="1">
                      <input type="checkbox" data-test="" id="1" name="1" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">Indigenous American or Alaska Native</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-1i7401q"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="2"
                  >
                    <label for="2">
                      <input type="checkbox" data-test="" id="2" name="2" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">East Asian</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="3"
                  >
                    <label for="3">
                      <input type="checkbox" data-test="" id="3" name="3" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">South Asian</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="4"
                  >
                    <label for="4">
                      <input type="checkbox" data-test="" id="4" name="4" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">Southeast Asian</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="5"
                  >
                    <label for="5">
                      <input type="checkbox" data-test="" id="5" name="5" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">Native Hawaiian or Other Pacific Islander</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="6"
                  >
                    <label for="6">
                      <input type="checkbox" data-test="" id="6" name="6" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">Middle Eastern</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="7"
                  >
                    <label for="7">
                      <input type="checkbox" data-test="" id="7" name="7" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">Black or African American</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="8"
                  >
                    <label for="8">
                      <input type="checkbox" data-test="" id="8" name="8" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">Hispanic or Latinx</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="9"
                  >
                    <label for="9">
                      <input type="checkbox" data-test="" id="9" name="9" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">White</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="10"
                  >
                    <label for="10">
                      <input type="checkbox" data-test="" id="10" name="10" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">Prefer to Self Describe</div>
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    class=" gd-ui-checkbox css-13md0bs"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    value="11"
                  >
                    <label for="11">
                      <input type="checkbox" data-test="" id="11" name="11" />
                      <div class="checkboxBox"></div>
                      <div class="checkboxLabel">Prefer Not to Say</div>
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
              data-test="RACE_ETHNICITYSave"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// export default RaceEthinicityFormModal;
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  const { masterData } = state.staticDataReducer;

  return {
    studentInfoStore,
    masterData,
  };
};

export default connect(mapStateToProps, null)(RaceEthinicityFormModal);
