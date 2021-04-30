import React, { Component } from 'react';
import './InterviewForm.css';
import axios from 'axios';
import serverUrl from '../../../../config';
import { history } from '../../../../App';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class InterviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JobTitle: '',
      Description: '',
      OverallExperience: '',
      Difficulty: 'Select',
      OfferStatus: 'Select',
      InterviewQuestions: '',
      Answers: '',
      openDifficultyDropDown: false,
      openOfferStatusDropDown: false,
      invalidData: true,
      StreetAddress: '',
      City: '',
      State: '',
      Zip: '',
    };
  }

  validationCheck = () => {
    let invalidData = false;
    if (this.state.OverallExperience === '') {
      invalidData = true;
    }
    if (this.state.State === '') {
      invalidData = true;
    }
    if (this.state.StreetAddress === '') {
      invalidData = true;
    }
    if (this.state.City === '') {
      invalidData = true;
    }
    if (this.state.Zip === '' || this.state.Zip < 10000) {
      invalidData = true;
    }
    if (this.state.JobTitle.length === 0) {
      invalidData = true;
    }
    if (this.state.Description.length < 20) {
      invalidData = true;
    }
    if (this.state.Difficulty === 'SELECT') {
      invalidData = true;
    }
    if (this.state.OfferStatus === 'SELECT') {
      invalidData = true;
    }
    if (this.state.InterviewQuestions.length < 20) {
      invalidData = true;
    }
    if (this.state.Answers.length < 20) {
      invalidData = true;
    }

    this.setState({
      invalidData,
    });
  };

  commonOnChangeHandler = (event) => {
    // event.preventDefault();
    if (event.target.name === 'Zip') {
      if (/^(\s*|\d+)$/.test(event.target.value)) {
        this.setState(
          {
            [event.target.name]: event.target.value,
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
        },
        function () {
          this.validationCheck();
        }
      );
    }
  };

  submitOverallEcperience = (event, OverallExperience) => {
    event.preventDefault();
    this.setState(
      {
        OverallExperience,
      },
      function () {
        this.validationCheck();
      }
    );
  };

  toggleDifficultyDropDown = () => {
    this.setState({
      openDifficultyDropDown: !this.state.openDifficultyDropDown,
    });
  };

  selectDifficultyLevel = (event, Difficulty) => {
    this.setState(
      {
        Difficulty,
      },
      function () {
        this.validationCheck();
      }
    );
  };

  toggleOfferStatusDropDown = () => {
    this.setState({
      openOfferStatusDropDown: !this.state.openOfferStatusDropDown,
    });
  };

  selectOfferStatus = (event, OfferStatus) => {
    this.setState(
      {
        OfferStatus,
      },
      function () {
        this.validationCheck();
      }
    );
  };

  submitReview = (event) => {
    // event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      CompanyID: localStorage.getItem('companyID'),
      StudentID: localStorage.getItem('userId'),
      CompanyName: localStorage.getItem('form_company_name'),
      OverallExperience: this.state.OverallExperience,
      JobTitle: this.state.JobTitle,
      Description: this.state.Description,
      Difficulty: this.state.Difficulty,
      OfferStatus: this.state.OfferStatus,
      InterviewQuestions: this.state.InterviewQuestions,
      Answers: this.state.Answers,
      StreetAddress: this.state.StreetAddress,
      City: this.state.City,
      State: this.state.State,
      Zip: this.state.Zip,
    };
    axios.post(serverUrl + 'student/interviewAddReview', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Review Submitted');
          this.props.history.goBack();
          this.props.history.goBack();
          this.setState({
            JobTitle: '',
            Description: '',
            OverallExperience: '',
            Difficulty: 'SELECT',
            OfferStatus: 'SELECT',
            InterviewQuestions: '',
            Answers: '',
            openDifficultyDropDown: false,
            openOfferStatusDropDown: false,
            invalidData: true,
          });
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
    return (
      <div class="pageContentWrapper ">
        <div id="PageContent" style={{ backgroundColor: 'white', width: '100%' }}>
          <div id="PageBodyContents" class="meat">
            <div class="pageInsideContent cf">
              <div id="NodeReplace">
                <main class="gdGrid" data-test="new-surveys">
                  <header class="d-flex align-items-center justify-content-center justify-content-md-start css-1q22y4n eylfow80">
                    <a
                      onClick={this.goToHomePage}
                      href="#"
                      title="glassdoor.com"
                      class="css-19ug521 eylfow81"
                    >
                      <svg
                        width="125"
                        height="25"
                        title="Glassdoor Logo"
                        viewBox="514 1654 121 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M635 1659.548a.413.413 0 0 0-.212-.336c-.274-.138-.674-.232-1.488-.232-1.837 0-3.462.912-4.171 2.438v-1.864a.292.292 0 0 0-.292-.293h-2.751a.292.292 0 0 0-.292.293v12.566c0 .161.13.292.292.292h2.882a.292.292 0 0 0 .292-.292v-5.652c0-2.525 1.756-3.78 4.04-3.78.533 0 1.065.118 1.332.206.183.06.368-.09.368-.283v-3.063zm-18.415 9.78c-1.97 0-3.493-1.393-3.493-3.497s1.524-3.498 3.493-3.498c1.969 0 3.492 1.394 3.492 3.498s-1.523 3.498-3.492 3.498zm0-10.389c-4.044 0-7.063 2.789-7.063 6.892s3.02 6.891 7.063 6.891c4.042 0 7.062-2.788 7.062-6.89 0-4.104-3.02-6.893-7.062-6.893zm-16.034 10.39c-1.97 0-3.493-1.394-3.493-3.498s1.523-3.498 3.493-3.498c1.969 0 3.491 1.394 3.491 3.498s-1.522 3.498-3.491 3.498zm0-10.39c-4.044 0-7.064 2.789-7.064 6.892s3.02 6.891 7.064 6.891c4.042 0 7.062-2.788 7.062-6.891s-3.02-6.892-7.062-6.892zm-16.012 10.422c-1.969 0-3.44-1.394-3.44-3.524 0-2.131 1.471-3.525 3.44-3.525 1.944 0 3.44 1.342 3.44 3.525 0 2.156-1.496 3.524-3.44 3.524zm6.509-15.36h-2.882a.292.292 0 0 0-.292.292v6.862c-.893-1.263-2.363-2.237-4.41-2.237-3.204 0-5.935 2.474-5.935 6.919 0 4.445 2.73 6.917 5.986 6.917 1.917 0 3.414-.842 4.36-2.183v1.549c0 .161.13.292.29.292h2.883c.16 0 .291-.13.291-.292v-17.827a.292.292 0 0 0-.291-.292zm-15.428 14.43c0 3-2.179 4.288-5.67 4.288-2.413 0-4.488-.65-5.675-1.996a.3.3 0 0 1-.007-.38l1.666-2.166a.287.287 0 0 1 .437-.017c.88.903 2.234 1.455 3.92 1.455.97 0 1.758-.262 1.758-.999 0-.71-.708-.868-2.914-1.342-1.943-.394-4.359-1.288-4.359-4.155 0-2.657 2.102-4.182 5.54-4.182 2.263 0 3.89.684 5.036 1.76.11.103.12.277.027.396l-1.581 2.056c-.1.131-.29.157-.414.046-.775-.693-2.064-1.128-3.33-1.128-1.076 0-1.68.342-1.68.92 0 .658.71.816 3.046 1.316 2.283.5 4.2 1.367 4.2 4.129zm-13.326.008c0 2.999-2.18 4.288-5.671 4.288-2.412 0-4.487-.65-5.674-1.997a.3.3 0 0 1-.008-.379l1.666-2.167a.288.288 0 0 1 .437-.016c.881.902 2.235 1.455 3.92 1.455.971 0 1.759-.262 1.759-1 0-.71-.709-.867-2.914-1.341-1.944-.395-4.36-1.289-4.36-4.155 0-2.657 2.102-4.182 5.541-4.182 2.262 0 3.888.683 5.035 1.76.11.103.12.276.028.396l-1.582 2.056c-.1.13-.29.156-.413.046-.776-.693-2.064-1.129-3.33-1.129-1.077 0-1.681.343-1.681.921 0 .658.71.816 3.046 1.316 2.284.499 4.2 1.367 4.2 4.128zm-17.273-1.34c0 1.446-1.18 2.709-3.019 2.709-1.208 0-1.864-.553-1.864-1.395 0-.736.552-1.289 1.628-1.447l3.255-.394v.526zm-2.283-8.128c-2.75 0-4.821.922-5.747 2.745a.298.298 0 0 0 .095.372l2.101 1.504c.132.094.318.063.397-.08.584-1.052 1.89-1.411 3.154-1.411 1.549 0 2.283.552 2.283 1.315v.21c0 .316-.183.474-.682.527l-3.597.315c-2.415.236-4.2 1.736-4.2 4.129 0 2.42 1.837 4.103 4.436 4.103 2.048 0 3.361-.999 4.043-2.051v1.496c0 .162.13.293.292.293h2.882a.292.292 0 0 0 .292-.292v-7.836c0-3.656-1.917-5.339-5.75-5.339zm-8.574-4.679v17.827c0 .161-.13.292-.292.292h-2.908a.292.292 0 0 1-.292-.292v-17.832c0-.159.128-.287.286-.287h2.914c.161 0 .292.13.292.292zm-13.154 15.055c-1.97 0-3.44-1.394-3.44-3.524s1.471-3.525 3.44-3.525c1.97 0 3.413 1.342 3.413 3.525 0 2.156-1.444 3.524-3.413 3.524zm6.508-10.1h-2.878a.296.296 0 0 0-.296.296v1.546c-.735-1.184-2.258-2.158-4.279-2.158-3.256 0-6.065 2.447-6.065 6.84 0 4.365 2.678 6.758 6.17 6.758 1.89 0 3.36-.789 4.227-2.025v.842c0 1.893-.92 3.393-3.86 3.393-1.478 0-2.665-.493-3.706-1.416a.286.286 0 0 0-.438.061l-1.305 2.192c-.169.283-.146.443-.04.536 1.342 1.167 3.086 1.888 5.621 1.888 5.513 0 7.141-3.076 7.141-6.47v-11.99a.292.292 0 0 0-.292-.293z"
                          fill="#0caa41"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </header>
                  <div data-test="interview-survey">
                    <div
                      style={{ maxWidth: '100%', margin: '0', padding: '0' }}
                      class="d-flex justify-content-between css-1eajiqw et4kpp30"
                      data-test="survey-progress-bar"
                    >
                      <div data-test="survey-progress-bar-progress" class="bar progress"></div>
                    </div>
                    <div data-test="interview-survey-container" class="css-2ukyrn e8ouxii0">
                      <form data-test="interview-survey-interview-form" class="px-std pb-std">
                        <div class="css-1iq6qq8 e1q5c0kv0">
                          <h1 data-test="interview-survey-interview-title" class="css-1cvu0aj">
                            Tell us about a recent job interview
                          </h1>
                          <div class="">
                            <div class="">
                              <div class=" mb css-1ohf0ui">
                                <label
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: '24px',
                                    whiteSpace: 'normal',
                                  }}
                                  for="employer-7b886f2-cacc-5dd8-3b51-70bedd4bec6d"
                                  class="css-xwfp7p"
                                >
                                  <span>Employer *</span>
                                </label>
                                <div
                                  data-test="interview-survey-interview-employer"
                                  aria-expanded="false"
                                  role="combobox"
                                  aria-autocomplete="list"
                                  class="css-1xtvih1"
                                >
                                  <div class=" css-1ohf0ui">
                                    <div class="input-wrapper css-q444d9">
                                      <input
                                        placeholder=""
                                        autocomplete="off"
                                        name="employer"
                                        id="employer-7b886f2-cacc-5dd8-3b51-70bedd4bec6d"
                                        data-test=""
                                        aria-label="Employer *"
                                        class="css-1etjok6"
                                        value={localStorage.getItem('form_company_name')}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class=" mb css-1ohf0ui">
                                <label
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: '24px',
                                    whiteSpace: 'normal',
                                  }}
                                  for="State"
                                  class="css-xwfp7p"
                                >
                                  <span>State *</span>
                                </label>
                                <div
                                  data-test="interview-survey-interview-employer"
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
                                </div>
                              </div>
                              <div class=" mb css-1ohf0ui">
                                <label
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: '24px',
                                    whiteSpace: 'normal',
                                  }}
                                  for="City"
                                  class="css-xwfp7p"
                                >
                                  <span>City *</span>
                                </label>
                                <div
                                  data-test="interview-survey-interview-employer"
                                  aria-expanded="false"
                                  role="combobox"
                                  aria-autocomplete="list"
                                  class="css-1xtvih1"
                                >
                                  <div class=" css-1ohf0ui">
                                    <div class="input-wrapper css-q444d9">
                                      <input
                                        onChange={this.commonOnChangeHandler}
                                        placeholder="City"
                                        autocomplete="off"
                                        name="City"
                                        id="City"
                                        data-test=""
                                        aria-label="Employer *"
                                        class="css-1etjok6"
                                        value={this.state.City}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class=" mb css-1ohf0ui">
                                <label
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: '24px',
                                    whiteSpace: 'normal',
                                  }}
                                  for="StreetAddress"
                                  class="css-xwfp7p"
                                >
                                  <span>Street Address *</span>
                                </label>
                                <div
                                  data-test="interview-survey-interview-employer"
                                  aria-expanded="false"
                                  role="combobox"
                                  aria-autocomplete="list"
                                  class="css-1xtvih1"
                                >
                                  <div class=" css-1ohf0ui">
                                    <div class="input-wrapper css-q444d9">
                                      <input
                                        onChange={this.commonOnChangeHandler}
                                        placeholder="Street Address"
                                        autocomplete="off"
                                        name="StreetAddress"
                                        id="StreetAddress"
                                        data-test=""
                                        aria-label="Employer *"
                                        class="css-1etjok6"
                                        value={this.state.StreetAddress}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class=" mb css-1ohf0ui">
                                <label
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: '24px',
                                    whiteSpace: 'normal',
                                  }}
                                  for="Zip"
                                  class="css-xwfp7p"
                                >
                                  <span>Zip *</span>
                                </label>
                                <div
                                  data-test="interview-survey-interview-employer"
                                  aria-expanded="false"
                                  role="combobox"
                                  aria-autocomplete="list"
                                  class="css-1xtvih1"
                                >
                                  <div class=" css-1ohf0ui">
                                    <div class="input-wrapper css-q444d9">
                                      <input
                                        onChange={this.commonOnChangeHandler}
                                        placeholder="Zip"
                                        autocomplete="off"
                                        name="Zip"
                                        id="Zip"
                                        maxLength="5"
                                        data-test=""
                                        aria-label="Employer *"
                                        class="css-1etjok6"
                                        value={this.state.Zip}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="mb css-1ohf0ui">
                            <label
                              style={{
                                fontSize: '15px',
                                lineHeight: '24px',
                                whiteSpace: 'normal',
                              }}
                              for=""
                              class="css-xwfp7p"
                            >
                              <span>Rate Overall Experience *</span>
                            </label>
                            <div class="pt-xxsm">
                              <div
                                class="d-inline-block"
                                data-test="survey-thumbRatings-processExperience"
                              >
                                <div>
                                  <label
                                    onClick={(event) =>
                                      this.submitOverallEcperience(event, 'Positive')
                                    }
                                    for="processExperience-3"
                                    class="mr-xxl"
                                    data-test="survey-thumbsUp-processExperience"
                                    title="Positive"
                                    alt="Positive"
                                  >
                                    <input
                                      class="d-none"
                                      id="processExperience-3"
                                      name="processExperience"
                                      type="radio"
                                      value="3"
                                    />
                                    <span
                                      class={`SVGInline ${
                                        this.state.OverallExperience === 'Positive'
                                          ? 'css-s64uao'
                                          : 'css-1d14wk0'
                                      } e50qfp90`}
                                    >
                                      <svg
                                        class={`SVGInline-svg css-${
                                          this.state.OverallExperience === 'Positive'
                                            ? 'css-s64uao'
                                            : 'css-1d14wk0'
                                        }-svg e50qfp90-svg`}
                                        width="48"
                                        height="48"
                                        viewBox="0 0 48 48"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g fill="none" fill-rule="evenodd">
                                          <circle fill="#F5F6F7" cx="24" cy="24" r="24"></circle>
                                          <path
                                            d="M11.52 34.5h6.123c.553 0 1.02-.381 1.02-1.132l1.475.964c.167.11.364.168.566.168H33.43c1.359 0 2.568-.895 2.942-2.176l2.54-8.725c.744-2.558-1.21-5.099-3.921-5.099h-5.104v-4.974c0-1.669-1.385-3.026-3.088-3.026-.942 0-1.821.414-2.411 1.136l-5.941 7.277a1.007 1.007 0 00-.804-.413H11.52a1.01 1.01 0 00-1.02 1v14c0 .552.456 1 1.02 1z"
                                            fill="#FFF"
                                          ></path>
                                          <path
                                            d="M16.622 20.5h-4.081v12h4.081v-12zm9.36-7.615c.2-.244.497-.385.817-.385.578 0 1.047.46 1.047 1.026V19.5c0 .552.457 1 1.02 1h6.125c1.352 0 2.33 1.269 1.958 2.55l-2.54 8.725a1.019 1.019 0 01-.979.725H21.013l-2.35-1.535v-9.114l7.318-8.966zM11.52 34.5h6.123c.553 0 1.02-.381 1.02-1.132l1.475.964c.167.11.364.168.566.168H33.43c1.359 0 2.568-.895 2.942-2.176l2.54-8.725c.744-2.558-1.21-5.099-3.921-5.099h-5.104v-4.974c0-1.669-1.385-3.026-3.088-3.026-.942 0-1.821.414-2.411 1.136l-5.941 7.277a1.007 1.007 0 00-.804-.413H11.52a1.01 1.01 0 00-1.02 1v14c0 .552.456 1 1.02 1z"
                                            fill="#505863"
                                          ></path>
                                        </g>
                                      </svg>
                                    </span>
                                  </label>
                                  <label
                                    onClick={(event) =>
                                      this.submitOverallEcperience(event, 'Neutral')
                                    }
                                    alt="Neutral"
                                    class="mr-xxl"
                                    data-test="survey-neutral-processExperience"
                                    for="processExperience-2"
                                    title="Neutral"
                                  >
                                    <input
                                      class="d-none"
                                      id="processExperience-2"
                                      name="processExperience"
                                      type="radio"
                                      value="2"
                                    />
                                    <span
                                      class={`SVGInline ${
                                        this.state.OverallExperience === 'Neutral'
                                          ? 'css-1u663h5'
                                          : 'css-14gq6xj'
                                      } epxovg70`}
                                    >
                                      <svg
                                        class={`SVGInline-svg css-${
                                          this.state.OverallExperience === 'Neutral'
                                            ? 'css-1u663h5'
                                            : 'css-14gq6xj'
                                        }-svg epxovg70-svg`}
                                        // class="SVGInline-svg css-14gq6xj-svg epxovg70-svg"
                                        width="48"
                                        height="48"
                                        viewBox="0 0 48 48"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g fill="none" fill-rule="evenodd">
                                          <circle fill="#F5F6F7" cx="24" cy="24" r="24"></circle>
                                          <path
                                            stroke="#505863"
                                            stroke-width="2.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M32 24H16"
                                          ></path>
                                        </g>
                                      </svg>
                                    </span>
                                  </label>
                                  <label
                                    onClick={(event) =>
                                      this.submitOverallEcperience(event, 'Negative')
                                    }
                                    alt="Negative"
                                    data-test="survey-thumbsDown-processExperience"
                                    for="processExperience-1"
                                    title="Negative"
                                  >
                                    <input
                                      class="d-none"
                                      id="processExperience-1"
                                      name="processExperience"
                                      type="radio"
                                      value="1"
                                      checked=""
                                    />
                                    <span
                                      class={`SVGInline ${
                                        this.state.OverallExperience === 'Negative'
                                          ? 'css-1haghtx'
                                          : 'css-jzoj2g'
                                      } e19o1x900`}
                                      // class="SVGInline css-1haghtx e19o1x900"
                                    >
                                      <svg
                                        class={`SVGInline-svg  ${
                                          this.state.OverallExperience === 'Negative'
                                            ? 'css-1haghtx'
                                            : 'css-jzoj2g'
                                        }-svg e19o1x900-svg`}
                                        width="48"
                                        height="48"
                                        viewBox="0 0 48 48"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g fill="none" fill-rule="evenodd">
                                          <circle fill="#F5F6F7" cx="24" cy="24" r="24"></circle>
                                          <path
                                            d="M38.051 13.5H31.93c-.554 0-1.02.381-1.02 1.132l-1.475-.964a1.036 1.036 0 00-.566-.168H16.14c-1.358 0-2.568.895-2.941 2.176l-2.54 8.725c-.745 2.558 1.21 5.099 3.92 5.099h5.104v4.974c0 1.669 1.385 3.026 3.088 3.026.943 0 1.822-.414 2.412-1.136l5.94-7.277c.186.244.47.413.805.413h6.122a1.01 1.01 0 001.02-1v-14c0-.552-.456-1-1.02-1z"
                                            fill="#FFF"
                                          ></path>
                                          <path
                                            d="M32.95 27.5h4.08v-12h-4.08v12zm-9.36 7.615c-.2.244-.498.385-.818.385-.578 0-1.047-.46-1.047-1.026V28.5c0-.552-.456-1-1.02-1H14.58c-1.351 0-2.33-1.269-1.958-2.55l2.54-8.725c.124-.427.527-.725.979-.725h12.418l2.35 1.535v9.114l-7.319 8.966zM38.051 13.5H31.93c-.554 0-1.02.381-1.02 1.132l-1.475-.964a1.036 1.036 0 00-.566-.168H16.14c-1.358 0-2.568.895-2.941 2.176l-2.54 8.725c-.745 2.558 1.21 5.099 3.92 5.099h5.104v4.974c0 1.669 1.385 3.026 3.088 3.026.943 0 1.822-.414 2.412-1.136l5.94-7.277c.186.244.47.413.805.413h6.122a1.01 1.01 0 001.02-1v-14c0-.552-.456-1-1.02-1z"
                                            fill="#505863"
                                          ></path>
                                        </g>
                                      </svg>
                                    </span>
                                  </label>
                                </div>
                                <p class="css-xi606m mb-0 mt-sm css-1nuuv7y edbo4km0">
                                  {this.state.OverallExperience}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="mb css-1ohf0ui">
                            <label
                              style={{
                                fontSize: '15px',
                                lineHeight: '24px',
                                whiteSpace: 'normal',
                              }}
                              for="jobTitle-03315a-e358-b0e4-5e8c-457607f14126"
                              class="css-xwfp7p"
                            >
                              <span>Job Title *</span>
                            </label>
                            <div
                              data-test="interview-survey-interview-jobTitle"
                              aria-expanded="false"
                              role="combobox"
                              aria-autocomplete="list"
                              class="css-1xtvih1"
                            >
                              <div class=" css-1ohf0ui">
                                <div class="input-wrapper css-q444d9">
                                  <input
                                    onChange={this.commonOnChangeHandler}
                                    placeholder=""
                                    autocomplete="off"
                                    name="JobTitle"
                                    id="jobTitle-03315a-e358-b0e4-5e8c-457607f14126"
                                    data-test=""
                                    aria-label="Job Title *"
                                    class="css-1etjok6"
                                    value={this.state.JobTitle}
                                  />
                                </div>
                              </div>
                              <ul class="suggestions down"></ul>
                              <div>
                                <div data-test="FilterChips"></div>
                              </div>
                            </div>
                          </div>
                          <div class="mb ejrs1qi0 css-139nzpu">
                            <label
                              style={{
                                fontSize: '15px',
                                lineHeight: '24px',
                                whiteSpace: 'normal',
                              }}
                              for=""
                              class="css-xwfp7p"
                            >
                              <span>Describe the Interview Process *</span>
                            </label>
                            <div class="input-wrapper css-q444d9">
                              <textarea
                                onChange={this.commonOnChangeHandler}
                                name="Description"
                                data-test="interview-survey-interview-process-description"
                                maxlength="5000"
                                aria-label=""
                                class="css-1vvn7az"
                                value={this.state.Description}
                              ></textarea>
                            </div>
                            <div data-test="helper" class="css-1pakod1">
                              20 characters minimum
                            </div>
                          </div>
                          <div class="mb css-1ohf0ui">
                            <label
                              style={{
                                fontSize: '15px',
                                lineHeight: '24px',
                                whiteSpace: 'normal',
                              }}
                              for=""
                              class="css-xwfp7p"
                            >
                              <span>Interview Difficulty *</span>
                            </label>
                            <select
                              data-test="interview-survey-interview-processDifficulty"
                              name="dropdown"
                              aria-label="Interview Difficulty *"
                              style={{ display: 'none' }}
                            >
                              <option value="1"></option>
                              <option value="2"></option>
                              <option value="3"></option>
                              <option value="4"></option>
                              <option value="5"></option>
                            </select>
                            <div
                              onClick={this.toggleDifficultyDropDown}
                              tabindex="0"
                              direction="down"
                              aria-expanded="false"
                              role="listbox"
                              aria-activedescendant="option_2_30220f-1ad5-c08a-ff7e-f05d761b10ae"
                              aria-label="Interview Difficulty *"
                              class="css-1vjdsnn"
                            >
                              <div class="selectedLabel">
                                {this.state.Difficulty === 1
                                  ? 'Very Easy'
                                  : this.state.Difficulty === 2
                                  ? 'Easy'
                                  : this.state.Difficulty === 3
                                  ? 'Average'
                                  : this.state.Difficulty === 4
                                  ? 'Difficult'
                                  : this.state.Difficulty === 5
                                  ? 'Very Difficult'
                                  : this.state.Difficulty}
                                <span alt="" class="SVGInline arrowDown">
                                  <svg
                                    class="SVGInline-svg arrowDown-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M4.4 9.25l7.386 7.523a1 1 0 001.428 0L20.6 9.25c.5-.509.5-1.324 0-1.833a1.261 1.261 0 00-1.8 0l-6.3 6.416-6.3-6.416a1.261 1.261 0 00-1.8 0c-.5.509-.5 1.324 0 1.833z"
                                      fill-rule="evenodd"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                              <div
                                class={
                                  this.state.openDifficultyDropDown
                                    ? 'dropdownOptions dropdownExpanded animated  '
                                    : 'dropdownOptions dropdownCollapsed animated  '
                                }
                              >
                                <div class="dropDownOptionsContainer">
                                  <ul>
                                    <li
                                      onClick={(event) => this.selectDifficultyLevel(event, 1)}
                                      class={`dropdownOption  ${
                                        this.state.Difficulty === 1 ? 'checked' : ''
                                      } `}
                                      // class="dropdownOption   "
                                      role="option"
                                      aria-selected="false"
                                      id="option_1"
                                    >
                                      <div class="checkmark">
                                        <span alt="" class="SVGInline">
                                          <svg
                                            class="SVGInline-svg"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                              fill="currentColor"
                                              fill-rule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                      <span class="dropdownOptionLabel">Very Easy</span>
                                    </li>
                                    <li
                                      onClick={(event) => this.selectDifficultyLevel(event, 2)}
                                      class={`dropdownOption  ${
                                        this.state.Difficulty === 2 ? 'checked' : ''
                                      } `}
                                      // class="dropdownOption   "
                                      role="option"
                                      aria-selected="false"
                                      id="option_2"
                                    >
                                      <div class="checkmark">
                                        <span alt="" class="SVGInline">
                                          <svg
                                            class="SVGInline-svg"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                              fill="currentColor"
                                              fill-rule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                      <span class="dropdownOptionLabel">Easy</span>
                                    </li>
                                    <li
                                      onClick={(event) => this.selectDifficultyLevel(event, 3)}
                                      class={`dropdownOption  ${
                                        this.state.Difficulty === 3 ? 'checked' : ''
                                      } `}
                                      role="option"
                                      aria-selected="true"
                                      id="option_3"
                                    >
                                      <div class="checkmark">
                                        <span alt="" class="SVGInline">
                                          <svg
                                            class="SVGInline-svg"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                              fill="currentColor"
                                              fill-rule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                      <span class="dropdownOptionLabel">Average</span>
                                    </li>
                                    <li
                                      onClick={(event) => this.selectDifficultyLevel(event, 4)}
                                      class={`dropdownOption  ${
                                        this.state.Difficulty === 4 ? 'checked' : ''
                                      } `}
                                      role="option"
                                      aria-selected="false"
                                      id="option_4"
                                    >
                                      <div class="checkmark">
                                        <span alt="" class="SVGInline">
                                          <svg
                                            class="SVGInline-svg"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                              fill="currentColor"
                                              fill-rule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                      <span class="dropdownOptionLabel">Difficult</span>
                                    </li>
                                    <li
                                      onClick={(event) => this.selectDifficultyLevel(event, 5)}
                                      class={`dropdownOption  ${
                                        this.state.Difficulty === 5 ? 'checked' : ''
                                      } `}
                                      role="option"
                                      aria-selected="false"
                                      id="option_5"
                                    >
                                      <div class="checkmark">
                                        <span alt="" class="SVGInline">
                                          <svg
                                            class="SVGInline-svg"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                              fill="currentColor"
                                              fill-rule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                      <span class="dropdownOptionLabel">Very Difficult</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="mb css-1ohf0ui">
                            <label
                              style={{
                                fontSize: '15px',
                                lineHeight: '24px',
                                whiteSpace: 'normal',
                              }}
                              for=""
                              class="css-xwfp7p"
                            >
                              <span>Did you get an offer? *</span>
                            </label>
                            <select
                              data-test="interview-survey-interview-interviewOutcome"
                              name="dropdown"
                              aria-label="Did you get an offer? *"
                              style={{ display: 'none' }}
                            >
                              <option value="1"></option>
                              <option value="2"></option>
                              <option value="3"></option>
                            </select>
                            <div
                              onClick={this.toggleOfferStatusDropDown}
                              tabindex="0"
                              direction="down"
                              aria-expanded="false"
                              role="listbox"
                              aria-activedescendant="option_1_b1713cc-80f-755e-cfee-3cb05d4b0ad3"
                              aria-label="Did you get an offer? *"
                              class="css-1vjdsnn"
                            >
                              <div class="selectedLabel">
                                {this.state.OfferStatus}
                                <span alt="" class="SVGInline arrowDown">
                                  <svg
                                    class="SVGInline-svg arrowDown-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M4.4 9.25l7.386 7.523a1 1 0 001.428 0L20.6 9.25c.5-.509.5-1.324 0-1.833a1.261 1.261 0 00-1.8 0l-6.3 6.416-6.3-6.416a1.261 1.261 0 00-1.8 0c-.5.509-.5 1.324 0 1.833z"
                                      fill-rule="evenodd"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                              <div
                                class={
                                  this.state.openOfferStatusDropDown
                                    ? 'dropdownOptions dropdownExpanded animated  '
                                    : 'dropdownOptions dropdownCollapsed animated  '
                                }
                              >
                                <div class="dropDownOptionsContainer">
                                  <ul>
                                    <li
                                      onClick={(event) => this.selectOfferStatus(event, 'No')}
                                      class={`dropdownOption  ${
                                        this.state.OfferStatus === 'No' ? 'checked' : ''
                                      } `}
                                      role="option"
                                      aria-selected="false"
                                      id="option_1"
                                    >
                                      <div class="checkmark">
                                        <span alt="" class="SVGInline">
                                          <svg
                                            class="SVGInline-svg"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                              fill="currentColor"
                                              fill-rule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                      <span class="dropdownOptionLabel">No</span>
                                    </li>
                                    <li
                                      onClick={(event) =>
                                        this.selectOfferStatus(event, 'Yes, but I declined')
                                      }
                                      class={`dropdownOption  ${
                                        this.state.OfferStatus === 'Yes, but I declined'
                                          ? 'checked'
                                          : ''
                                      } `}
                                      role="option"
                                      aria-selected="true"
                                      id="option_2"
                                    >
                                      <div class="checkmark">
                                        <span alt="" class="SVGInline">
                                          <svg
                                            class="SVGInline-svg"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                              fill="currentColor"
                                              fill-rule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                      <span class="dropdownOptionLabel">Yes, but I declined</span>
                                    </li>
                                    <li
                                      onClick={(event) =>
                                        this.selectOfferStatus(event, 'Yes, and I accepted')
                                      }
                                      class={`dropdownOption  ${
                                        this.state.OfferStatus === 'Yes, and I accepted'
                                          ? 'checked'
                                          : ''
                                      } `}
                                      role="option"
                                      aria-selected="false"
                                      id="option_3"
                                    >
                                      <div class="checkmark">
                                        <span alt="" class="SVGInline">
                                          <svg
                                            class="SVGInline-svg"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                              fill="currentColor"
                                              fill-rule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                      <span class="dropdownOptionLabel">Yes, and I accepted</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="mb-xxl">
                            <label
                              style={{
                                fontSize: '15px',
                                lineHeight: '24px',
                                whiteSpace: 'normal',
                              }}
                              class="mb-xxsm"
                              for="InterviewQuestions"
                            >
                              Interview Questions *
                            </label>
                            <div>
                              <div class="mb em99lwr0 css-139nzpu">
                                <div class="input-wrapper css-q444d9">
                                  <textarea
                                    onChange={this.commonOnChangeHandler}
                                    id="InterviewQuestions"
                                    name="InterviewQuestions"
                                    placeholder="Q: What was the one thing that they asked you?"
                                    data-test="interview-survey-interview-question-0"
                                    maxlength="5000"
                                    aria-label=""
                                    class="css-1vvn7az"
                                    value={this.state.InterviewQuestions}
                                  ></textarea>
                                </div>
                                <div data-test="helper" class="css-1pakod1">
                                  20 characters minimum
                                </div>
                              </div>
                              <div class="mb em99lwr0 css-139nzpu">
                                <div class="input-wrapper css-q444d9">
                                  <textarea
                                    onChange={this.commonOnChangeHandler}
                                    id="Answers"
                                    name="Answers"
                                    placeholder="How did you answer this question?"
                                    data-test="interview-survey-interview-answer-0"
                                    maxlength="5000"
                                    aria-label=""
                                    class="css-1vvn7az"
                                    value={this.state.Answers}
                                  ></textarea>
                                </div>
                                <div data-test="helper" class="css-1pakod1">
                                  20 characters minimum
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-end">
                            <button
                              onClick={this.submitReview}
                              type="button"
                              disabled={this.state.invalidData}
                              class="gd-ui-button css-1dach6o css-8i7bc2"
                              data-test="interview-survey-interview-submit"
                            >
                              Submit
                            </button>
                          </div>
                          {this.state.invalidData ? (
                            <div
                              style={{ textAlign: 'right' }}
                              data-test="helper"
                              class="css-1pakod1"
                            >
                              Fill all fields before submission
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default InterviewForm;
const mapStateToProps = (state) => {
  const { masterData } = state.staticDataReducer;

  return {
    masterData,
  };
};

// export default LeftBlock;
export default connect(mapStateToProps, null)(InterviewForm);
