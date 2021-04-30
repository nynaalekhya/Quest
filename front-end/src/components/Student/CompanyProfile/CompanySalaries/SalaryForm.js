import React, { Component } from 'react';
import './SalaryForm.css';
import axios from 'axios';
import serverUrl from '../../../../config';
import { connect } from 'react-redux';
import { history } from '../../../../App';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class SalaryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BaseSalary: '',
      Bonuses: '',
      JobTitle: '',
      Years: '',
      StreetAddress: '',
      City: '',
      State: '',
      Zip: '',
      invalidData: true,
    };
  }

  commonOnChangeHandler = (event) => {
    // event.preventDefault();
    console.log('something');
    if (event.target.name === 'Zip') {
      if (/^(\s*|\d+)$/.test(event.target.value)) {
        this.setState(
          {
            [event.target.name]: event.target.value,
            openStatusDropDown: false,
          },
          function () {
            this.validationCheck();
          }
        );
      }
    } else {
      this.setState(
        {
          [event.target.name]: event.target.value,
          openStatusDropDown: false,
        },
        function () {
          this.validationCheck();
        }
      );
    }
  };

  validationCheck = () => {
    let invalidData = false;
    if (this.state.BaseSalary === '') {
      invalidData = true;
    }
    if (this.state.Bonuses === '') {
      invalidData = true;
    }
    if (this.state.JobTitle === '') {
      invalidData = true;
    }
    if (this.state.Years === '') {
      invalidData = true;
    }
    if (this.state.City === '') {
      invalidData = true;
    }
    if (this.state.State === '') {
      invalidData = true;
    }
    if (this.state.Zip === '' || this.state.Zip < 10000) {
      invalidData = true;
    }

    this.setState({
      invalidData,
    });
  };

  submitReview = (event) => {
    // event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      CompanyID: localStorage.getItem('companyID'),
      StudentID: localStorage.getItem('userId'),
      CompanyName: localStorage.getItem('form_company_name'),
      BaseSalary: this.state.BaseSalary,
      Bonuses: this.state.Bonuses,
      JobTitle: this.state.JobTitle,
      Years: this.state.Years,
      StreetAddress: this.state.StreetAddress,
      City: this.state.City,
      State: this.state.State,
      Zip: this.state.Zip,
    };
    axios.post(serverUrl + 'student/salaryAddreview', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Review Submitted');
          console.log('Review Submitted');
          this.props.history.goBack();
          this.props.history.goBack();
          // this.setState({
          //   rating: 0,
          //   employeeStatus: 'Current',
          //   year: '',
          //   jobTitle: '',
          //   headline: '',
          //   pros: '',
          //   cons: '',
          //   approveOfCEO: '',
          //   recommendAFriend: '',
          //   openStatusDropDown: false,
          //   employmentType: 'Select',
          //   invalidData: true,
          //   description: '',
          //   formSubmiited: true,
          // });
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  goToHomePage = () => {
    this.setState({
      filterDropDownOpen: false,
    });
    history.push('/Home');
  };

  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'company') {
        return <Redirect to="/Employer" />;
      } else if (localStorage.getItem('userrole') === 'admin') {
        return <Redirect to="/AdminHomePage" />;
      } else if (!localStorage.getItem('companyID') || !localStorage.getItem('form_company_name')) {
        return <Redirect to="/Home" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    // document.location.href = String(document.location.href).replace('#', '');
    return (
      <main id="mount">
        <div>
          <header id="header">
            <div class="background">
              <nav>
                <div class="logoContainer">
                  <a
                    href="#"
                    // to="/"
                    onClick={this.goToHomePage}
                    class="logo green "
                    aria-label="Go To Glassdoor homepage"
                  ></a>
                </div>
              </nav>
            </div>
          </header>
          <div></div>
          <div
            class="gdGrid article-aside salary-survey-page"
            data-brandviews="PAGE:n=mz-survey-salaryPage:eid=6036"
          >
            <article class="module">
              <div class="d-flex align-items-center salary-survey-header mb-std">
                <h1 class="tight"> Add a Salary</h1>
              </div>
              <p>Your anonymous salary will help other job seekers.</p>
              <div>
                <form class="stacked fill salary-survey" autocomplete="off">
                  <h2>Salary Details*</h2>
                  <div class="base-pay">
                    <div style={{ position: 'relative' }}>
                      <div class="mb-std css-1ohf0ui">
                        <div class="input-wrapper css-q444d9">
                          <input
                            onChange={this.commonOnChangeHandler}
                            name="BaseSalary"
                            value={this.state.BaseSalary}
                            id="basePayAmount"
                            placeholder="Enter Base Pay"
                            type="number"
                            data-test=""
                            aria-label=""
                            class="css-1sk6eli"
                          />
                        </div>
                      </div>
                      <span class="minor subtle">USD per year</span>
                    </div>
                    <div class="button-set ">
                      <div>
                        <div class="selected" tabindex="0">
                          <label for="form.basePayPeriod_ANNUAL">Per Year</label>
                          <input
                            class="hidden"
                            type="radio"
                            name="form.basePayPeriod"
                            id="form.basePayPeriod_ANNUAL"
                            value="ANNUAL"
                            checked=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="button-set ">
                    <label>Do you get bonuses, tips, or sales commission?</label>
                  </div>
                  <div class="">
                    <div class="additional-comp">
                      <div
                        id="salaryForm"
                        class="d-flex flex-column flex-md-row align-items-center mb-std"
                      >
                        <div
                          id="salaryForm"
                          class="d-flex flex-column flex-md-row justify-content-between align-items-center mr-md-std bonusInputContainer"
                        >
                          <label for="cashBonusAmount">Cash Bonus</label>
                          <div class="bonusNumberInput css-1ohf0ui">
                            <div class="input-wrapper css-q444d9">
                              <input
                                onChange={this.commonOnChangeHandler}
                                name="Bonuses"
                                value={this.state.Bonuses}
                                id="cashBonusAmount"
                                // name="form.cashBonusAmount"
                                placeholder="#"
                                type="number"
                                data-test=""
                                aria-label=""
                                class="css-1sk6eli"
                                // value=""
                              />
                            </div>
                          </div>
                        </div>
                        <div class="bonusDropdown mt-std mt-md-0 css-1ohf0ui">
                          <div
                            tabindex="0"
                            direction="auto"
                            aria-expanded="false"
                            role="listbox"
                            aria-activedescendant="option_0_cashBonusPeriod"
                            aria-label=""
                            class="css-e0ra1d"
                          >
                            <div class="selectedLabel">Per Year</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2>Job Details*</h2>
                  <div class=" css-1ohf0ui">
                    <label
                      for="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                      class="css-1opum1l"
                    >
                      <span>Title*</span>
                    </label>
                    <div
                      aria-expanded="false"
                      role="combobox"
                      aria-autocomplete="list"
                      class="css-1xtvih1"
                    >
                      <div class=" css-1ohf0ui">
                        <div class="input-wrapper css-q444d9">
                          <input
                            onChange={this.commonOnChangeHandler}
                            name="JobTitle"
                            value={this.state.JobTitle}
                            placeholder="Title"
                            autocomplete="off"
                            // name="salaryUIData.state.salaryReview.userEnteredOccupation"
                            id="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                            data-test=""
                            aria-label="Title*"
                            class="css-1sk6eli"
                            // value=""
                          />
                        </div>
                      </div>
                      <ul class="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                  <div class=" css-1ohf0ui">
                    <label
                      for="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                      class="css-1opum1l"
                    >
                      <span>Years at Job*</span>
                    </label>
                    <div
                      aria-expanded="false"
                      role="combobox"
                      aria-autocomplete="list"
                      class="css-1xtvih1"
                    >
                      <div class=" css-1ohf0ui">
                        <div class="input-wrapper css-q444d9">
                          <input
                            onChange={this.commonOnChangeHandler}
                            name="Years"
                            value={this.state.Years}
                            placeholder="Years at Job"
                            autocomplete="off"
                            type="number"
                            // name="salaryUIData.state.salaryReview.userEnteredOccupation"
                            id="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                            data-test=""
                            aria-label="Years at Job*"
                            class="css-1sk6eli"
                            // value=""
                          />
                        </div>
                      </div>
                      <ul class="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                  <div class=" css-1ohf0ui">
                    <label
                      for="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                      class="css-1opum1l"
                    >
                      <span>StreetAddress*</span>
                    </label>
                    <div
                      aria-expanded="false"
                      role="combobox"
                      aria-autocomplete="list"
                      class="css-1xtvih1"
                    >
                      <div class=" css-1ohf0ui">
                        <div class="input-wrapper css-q444d9">
                          <input
                            onChange={this.commonOnChangeHandler}
                            name="StreetAddress"
                            value={this.state.StreetAddress}
                            placeholder="StreetAddress"
                            autocomplete="off"
                            // name="salaryUIData.state.salaryReview.userEnteredOccupation"
                            id="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                            data-test=""
                            aria-label="StreetAddress*"
                            class="css-1sk6eli"
                            // value=""
                          />
                        </div>
                      </div>
                      <ul class="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                  <div class=" css-1ohf0ui">
                    <label
                      for="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                      class="css-1opum1l"
                    >
                      <span>City*</span>
                    </label>
                    <div
                      aria-expanded="false"
                      role="combobox"
                      aria-autocomplete="list"
                      class="css-1xtvih1"
                    >
                      <div class=" css-1ohf0ui">
                        <div class="input-wrapper css-q444d9">
                          <input
                            onChange={this.commonOnChangeHandler}
                            name="City"
                            value={this.state.City}
                            placeholder="City"
                            autocomplete="off"
                            // name="salaryUIData.state.salaryReview.userEnteredOccupation"
                            id="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                            data-test=""
                            aria-label="City*"
                            class="css-1sk6eli"
                            // value=""
                          />
                        </div>
                      </div>
                      <ul class="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                  <div class=" css-1ohf0ui">
                    <label
                      for="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                      class="css-1opum1l"
                    >
                      <span>State*</span>
                    </label>
                    <div
                      aria-expanded="false"
                      role="combobox"
                      aria-autocomplete="list"
                      class="css-1xtvih1"
                    >
                      <div class=" css-1ohf0ui">
                        <div class="input-wrapper css-q444d9">
                          <select
                            style={{ backgroundColor: '#fff' }}
                            id="stateName"
                            data-test="state"
                            maxlength="100"
                            aria-label=""
                            class="css-ofiv3k"
                            onChange={this.commonOnChangeHandler}
                            value={this.state.State}
                            name="State"
                          >
                            <option value=""></option>
                            {this.props.masterData.States.map((state) => (
                              <option value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <ul class="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                  <div class=" css-1ohf0ui">
                    <label
                      for="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                      class="css-1opum1l"
                    >
                      <span>Zip*</span>
                    </label>
                    <div
                      aria-expanded="false"
                      role="combobox"
                      aria-autocomplete="list"
                      class="css-1xtvih1"
                    >
                      <div class=" css-1ohf0ui">
                        <div class="input-wrapper css-q444d9">
                          <input
                            onChange={this.commonOnChangeHandler}
                            name="Zip"
                            value={this.state.Zip}
                            placeholder="Zip"
                            autocomplete="off"
                            type="text"
                            maxLength="5"
                            // name="salaryUIData.state.salaryReview.userEnteredOccupation"
                            id="salaryUIData.state.salaryReview.userEnteredOccupation-ed3f62f-0130-8627-ab63-258c7681fc6c"
                            data-test=""
                            aria-label="Zip*"
                            class="css-1sk6eli"
                            // value=""
                          />
                        </div>
                      </div>
                      <ul class="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="sunset-employer undefined">
                      <input type="hidden" name="employerId" value="6036" />
                      <div class="ajax-input">
                        <label>Employer Name*</label>
                        <div class="ajax-input sunsetEmployerDropdown css-1ohf0ui">
                          <div
                            aria-expanded="false"
                            role="combobox"
                            aria-autocomplete="list"
                            class="css-1xtvih1"
                          >
                            <div class=" css-1ohf0ui">
                              <div class="input-wrapper css-q444d9">
                                <input
                                  placeholder="Employer"
                                  autocomplete="off"
                                  name="salaryEmployerName"
                                  id="salaryEmployerName-f530a1-3350-fd6c-db14-ab464cbd1fe"
                                  data-test=""
                                  aria-label=""
                                  class="css-1sk6eli"
                                  value={localStorage.getItem('form_company_name')}
                                />
                              </div>
                            </div>
                            <ul class="suggestions down"></ul>
                            <div>
                              <div data-test="FilterChips"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="optional-employer">
                    <div>
                      <input type="hidden" name="specificEmployer" value="true" />
                    </div>
                    <div></div>
                  </div>
                  <input type="hidden" name="_dummy" />
                  <div class="submitBtn">
                    <button
                      onClick={this.submitReview}
                      className="css-8i7bc2"
                      disabled={this.state.invalidData}
                      type="button"
                    >
                      Submit Salary
                    </button>
                  </div>
                </form>
              </div>
            </article>
          </div>
        </div>
      </main>
    );
  }
}

// export default SalaryForm;
const mapStateToProps = (state) => {
  const { masterData } = state.staticDataReducer;

  return {
    masterData,
  };
};

export default connect(mapStateToProps, null)(SalaryForm);
