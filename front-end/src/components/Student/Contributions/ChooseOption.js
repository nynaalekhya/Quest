import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateContributionOption } from '../../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../../config';
import SuggestedEmployer from './SuggestedEmployer';

class ChooseOption extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (localStorage.getItem('userrole') === 'student') {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios
        .get(serverUrl + 'student/navbar', {
          params: { StudentID: localStorage.getItem('userId') },
          withCredentials: true,
        })
        .then((response) => {
          console.log('response:', response.data);
          let Companies = response.data[1].map((company) => {
            return { id: company.CompanyID, name: company.CompanyName };
          });
          // let JobTitles = response.data[2].map((job) => {
          //   return job.Title;
          // });
          const payload = {
            companyList: Array.from(new Set(Companies)),

            // jobTitleList: Array.from(new Set(JobTitles)),
            // activeList: Array.from(new Set(JobTitles)),
          };
          this.props.updateContributionOption(payload);
        });
    }
  }

  selectRadio = (event, radio) => {
    event.preventDefault();
    const payload = {
      radioSelected: radio,
      employerName: '',
    };
    this.props.updateContributionOption(payload);
  };

  selectCurrentFormer = (event, employmentStatus) => {
    event.preventDefault();
    const payload = {
      employmentStatus,
    };
    this.props.updateContributionOption(payload);
  };

  updateEmployer = (event) => {
    const payload = {
      employerName: event.target.value,
    };
    this.props.updateContributionOption(payload);
  };

  filterStrings = () => {
    return this.props.contributionOptionStore.companyList.filter((company) =>
      company.name
        .toLowerCase()
        .includes(this.props.contributionOptionStore.employerName.toLowerCase())
    );
  };

  selectString = (event, string) => {
    // console.log(string);
    event.preventDefault();
    const payload = {
      employerName: string.name,
    };
    this.props.updateContributionOption(payload);
  };
  render() {
    return (
      <div
        class="gdGrid article-aside survey-start"
        style={{ maxWidth: '1024px', padding: '0 16px', margin: '0 auto' }}
      >
        <article class="module">
          <h1>What would you like to contribute?</h1>
          <p>Everything you add helps others find a job and company they'll love. Thanks!</p>
          <div>
            <form class="survey-start-form" autocomplete="off">
              <input name="initiatedFromStartSurvey" type="hidden" value="true" />
              <div class="radios">
                <label>
                  <b>Add your anonymous...</b>
                </label>
                <div class="ml-md-0 ml-sm">
                  <div>
                    <div
                      onClick={(event) => {
                        this.selectRadio(event, 'CompanyReview');
                      }}
                      class={
                        this.props.contributionOptionStore.radioSelected === 'CompanyReview'
                          ? 'radioButton gd-ui-radio css-1brliac'
                          : 'radioButton gd-ui-radio css-1cm4quy'
                      }
                      tabindex="0"
                      id="REVIEWS"
                      aria-checked="true"
                      role="radio"
                    >
                      <label for="showSurvey_REVIEWS">
                        <input
                          type="radio"
                          data-test=""
                          id="showSurvey_REVIEWS"
                          name="showSurvey"
                          value="REVIEWS"
                        />
                        <div class="radioButtonBox">
                          <div class="innerBox"></div>
                        </div>
                        <div class="radioButtonLabel">Company Review</div>
                      </label>
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={(event) => {
                        this.selectRadio(event, 'SalaryReview');
                      }}
                      class={
                        this.props.contributionOptionStore.radioSelected === 'SalaryReview'
                          ? 'radioButton gd-ui-radio css-1brliac'
                          : 'radioButton gd-ui-radio css-1cm4quy'
                      }
                      tabindex="0"
                      id="SALARIES"
                      aria-checked="false"
                      role="radio"
                    >
                      <label for="showSurvey_SALARIES">
                        <input
                          type="radio"
                          data-test=""
                          id="showSurvey_SALARIES"
                          name="showSurvey"
                          value="SALARIES"
                          checked=""
                        />
                        <div class="radioButtonBox">
                          <div class="innerBox"></div>
                        </div>
                        <div class="radioButtonLabel">Salary</div>
                      </label>
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={(event) => {
                        this.selectRadio(event, 'InterviewReview');
                      }}
                      class={
                        this.props.contributionOptionStore.radioSelected === 'InterviewReview'
                          ? 'radioButton gd-ui-radio css-1brliac'
                          : 'radioButton gd-ui-radio css-1cm4quy'
                      }
                      tabindex="0"
                      id="INTERVIEWS"
                      aria-checked="false"
                      role="radio"
                    >
                      <label for="showSurvey_INTERVIEWS">
                        <input
                          type="radio"
                          data-test=""
                          id="showSurvey_INTERVIEWS"
                          name="showSurvey"
                          value="INTERVIEWS"
                        />
                        <div class="radioButtonBox">
                          <div class="innerBox"></div>
                        </div>
                        <div class="radioButtonLabel">Interview Review</div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div
                      onClick={(event) => {
                        this.selectRadio(event, 'Photos');
                      }}
                      class={
                        this.props.contributionOptionStore.radioSelected === 'Photos'
                          ? 'radioButton gd-ui-radio css-1brliac'
                          : 'radioButton gd-ui-radio css-1cm4quy'
                      }
                      tabindex="0"
                      id="PHOTOS"
                      aria-checked="false"
                      role="radio"
                    >
                      <label for="showSurvey_PHOTOS">
                        <input
                          type="radio"
                          data-test=""
                          id="showSurvey_PHOTOS"
                          name="showSurvey"
                          value="PHOTOS"
                        />
                        <div class="radioButtonBox">
                          <div class="innerBox"></div>
                        </div>
                        <div class="radioButtonLabel">Workplace Photo</div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {this.props.contributionOptionStore.radioSelected === 'CompanyReview' ||
              this.props.contributionOptionStore.radioSelected === 'SalaryReview' ? (
                <div>
                  <div>
                    <div class="button-set ">
                      <label>Are you a current or former employee?</label>
                      <div>
                        <div
                          onClick={(event) => this.selectCurrentFormer(event, 'Current')}
                          class={
                            this.props.contributionOptionStore.employmentStatus === 'Current'
                              ? 'selected'
                              : ''
                          }
                          tabindex="0"
                        >
                          <label for="employerUIData.state.employerReview.currentJob_true">
                            Current
                          </label>
                          <input
                            class="hidden"
                            type="radio"
                            name="employerUIData.state.employerReview.currentJob"
                            id="employerUIData.state.employerReview.currentJob_true"
                            value="true"
                            checked=""
                          />
                        </div>
                        <div
                          onClick={(event) => this.selectCurrentFormer(event, 'Former')}
                          class={
                            this.props.contributionOptionStore.employmentStatus === 'Former'
                              ? 'selected'
                              : ''
                          }
                          tabindex="0"
                        >
                          <label for="employerUIData.state.employerReview.currentJob_false">
                            Former
                          </label>
                          <input
                            class="hidden"
                            type="radio"
                            name="employerUIData.state.employerReview.currentJob"
                            id="employerUIData.state.employerReview.currentJob_false"
                            value="false"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="sunset-employer undefined">
                      <input type="hidden" name="employerId" value="" />
                      <div class="ajax-input">
                        <label>Employer Name*</label>
                        <div class="ajax-input sunsetEmployerDropdown css-1ohf0ui">
                          <div
                            aria-expanded="false"
                            role="combobox"
                            aria-autocomplete="list"
                            // class="css-1xtvih1"
                            class={
                              this.props.contributionOptionStore.employerName.length > 3
                                ? 'css-1m5x7ks'
                                : 'css-1xtvih1'
                            }
                          >
                            <div class=" css-1ohf0ui">
                              <div class="input-wrapper css-q444d9">
                                <input
                                  onChange={this.updateEmployer}
                                  placeholder="Employer Name"
                                  autocomplete="off"
                                  name="employerName"
                                  id="employerName-347e878-04e5-287d-b0ac-f5bba12dd0c3"
                                  data-test=""
                                  aria-label=""
                                  class="css-1sk6eli"
                                  value={this.props.contributionOptionStore.employerName}
                                />
                              </div>
                            </div>
                            <SuggestedEmployer
                              // showSuggestion={this.state.showSuggestion}
                              searchStrings={this.filterStrings()}
                              selectString={(event, string) => this.selectString(event, string)}
                            />
                            {/*<ul class="suggestions down">
                               
                                <li>
                                  <div class="" role="presentation">
                                    <span class="logo">
                                      <img
                                        src="https://media.glassdoor.com/sqlm/6036/amazon-squarelogo-1552847650117.png"
                                        alt="Amazon"
                                      />
                                    </span>
                                    <span>
                                      <span class="suggestionLabel">
                                        <span class="query">Amaz</span>on
                                    </span>
                                      <span class="website">www.amazon.com</span>
                                    </span>
                                  </div>
                                </li>
                        </ul>*/}
                            <div>
                              <div data-test="FilterChips"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <div class="sunset-employer undefined">
                      <input type="hidden" name="employerId" value="" />
                      <div class="ajax-input">
                        <label>Employer Name*</label>
                        <div class="ajax-input sunsetEmployerDropdown css-1ohf0ui">
                          <div
                            aria-expanded="false"
                            role="combobox"
                            aria-autocomplete="list"
                            // class="css-1xtvih1"
                            class={
                              this.props.contributionOptionStore.employerName.length > 3
                                ? 'css-1m5x7ks'
                                : 'css-1xtvih1'
                            }
                          >
                            <div class=" css-1ohf0ui">
                              <div class="input-wrapper css-q444d9">
                                <input
                                  onChange={this.updateEmployer}
                                  placeholder="Employer Name"
                                  autocomplete="off"
                                  name="employerName"
                                  id="employerName-347e878-04e5-287d-b0ac-f5bba12dd0c3"
                                  data-test=""
                                  aria-label=""
                                  class="css-1sk6eli"
                                  value={this.props.contributionOptionStore.employerName}
                                />
                              </div>
                            </div>
                            <SuggestedEmployer
                              // showSuggestion={this.state.showSuggestion}
                              searchStrings={this.filterStrings()}
                              selectString={(event, string) => this.selectString(event, string)}
                            />
                            {/*<ul class="suggestions down">
                               
                                <li>
                                  <div class="" role="presentation">
                                    <span class="logo">
                                      <img
                                        src="https://media.glassdoor.com/sqlm/6036/amazon-squarelogo-1552847650117.png"
                                        alt="Amazon"
                                      />
                                    </span>
                                    <span>
                                      <span class="suggestionLabel">
                                        <span class="query">Amaz</span>on
                                    </span>
                                      <span class="website">www.amazon.com</span>
                                    </span>
                                  </div>
                                </li>
                        </ul>*/}
                            <div>
                              <div data-test="FilterChips"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}{' '}
              <div class="submitBtn">
                <button type="submit">Next</button>
              </div>
            </form>
          </div>
        </article>
      </div>
    );
  }
}

// export default ChooseOption;
const mapStateToProps = (state) => {
  const { contributionOptionStore } = state.ContributionPageReducer;
  return {
    contributionOptionStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateContributionOption: (payload) => {
      dispatch({
        type: updateContributionOption,
        payload,
      });
    },
  };
};

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(ChooseOption);
