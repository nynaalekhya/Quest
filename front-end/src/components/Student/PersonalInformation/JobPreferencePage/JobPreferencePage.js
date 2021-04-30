import React, { Component } from 'react';
import './JobPreferencePage.css';
import { connect } from 'react-redux';
import { updateStudentProfile } from '../../../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../../../config';

class JobPreferencePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JobType: [],
      showPreferredIndustryInput: false,
      showJobTitleInput: false,
      showJobSearchDropdown: false,
      showJobTypeDropdown: false,
      showtargetSalaryInput: false,
      Range: undefined,
      jonStatuses: [
        'Select',
        'Not looking',
        'Not looking, but open',
        'Casually looking',
        'Actively looking',
      ],
    };
  }

  // sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  componentDidMount() {
    // this.sleep(20000);
    const JobType = [...this.props.studentInfoStore.studentProfile.JobType];
    const Range = this.props.studentInfoStore.studentProfile.TargetSalary;
    console.log('JobType component', JobType);
    console.log(
      'this.props.studentInfoStore.studentProfile.JobType',
      this.props.studentInfoStore.studentProfile.JobType
    );
    this.setState({
      Range,
      JobType,
    });
  }

  selectJobType = (event, jobType) => {
    event.preventDefault();
    const JobType = [...this.state.JobType];
    const index = JobType.indexOf(jobType);
    if (index === -1) {
      JobType.push(jobType);
    } else {
      JobType.splice(index, 1);
    }
    this.setState({
      JobType,
    });
  };

  saveJobTypes = (event) => {
    event.preventDefault();
    let JobType = [...this.state.JobType];
    const student = { ...this.props.studentInfoStore.studentProfile };
    student.JobType = JobType;
    this.updateStudentProfile(student);
  };

  // savePreferredIndustry = (event) => {
  //   event.preventDefault();
  //   // let JobType = [...this.state.JobType];
  //   const student = { ...this.props.studentInfoStore.studentProfile };
  //   student.PreferredIndustry = this.state.PreferredIndustry;
  //   this.updateStudentProfile(student);
  // };

  clearAllJobTypes = (event) => {
    event.preventDefault();
    let JobType = [...this.state.JobType];
    JobType = [];
    this.setState({
      JobType,
    });
  };

  toggleJobSearchDropdown = (event) => {
    event.preventDefault();
    this.setState({
      showJobSearchDropdown: !this.state.showJobSearchDropdown,
    });
  };

  openJobTitleinput = (event) => {
    this.setState({
      showJobTitleInput: true,
    });
  };

  openPreferredIndustry = (event) => {
    this.setState({
      showPreferredIndustryInput: true,
    });
  };

  togglesJobTypeDropdown = (event) => {
    event.preventDefault();

    if (this.state.showJobTypeDropdown) {
      const JobType = [...this.props.studentInfoStore.studentProfile.JobType];
      this.setState({
        JobType,
        showJobTypeDropdown: !this.state.showJobTypeDropdown,
      });
    } else {
      this.setState({
        showJobTypeDropdown: !this.state.showJobTypeDropdown,
      });
    }
  };

  openTargetSalaryinput = (event) => {
    if (this.state.showtargetSalaryInput) {
      const Range = this.props.studentInfoStore.studentProfile.TargetSalary;
      this.setState({
        Range,
        showtargetSalaryInput: !this.state.showtargetSalaryInput,
      });
    } else {
      this.setState({
        showtargetSalaryInput: !this.state.showtargetSalaryInput,
      });
    }
  };

  updateJobStatus = (event, JobStatus) => {
    event.preventDefault();
    const student = { ...this.props.studentInfoStore.studentProfile };
    student.JobStatus = JobStatus;
    this.updateStudentProfile(student);
  };

  onChangeJobTitleHandler = (event) => {
    const studentProfile = { ...this.props.studentInfoStore.studentProfile };
    studentProfile.PreferredJobTitle = event.target.value;
    // update in reducer
    const payload = {
      studentProfile,
    };
    this.props.updateStudentProfile(payload);
  };

  removeJobTitle = (event) => {
    event.preventDefault();
    const student = { ...this.props.studentInfoStore.studentProfile };
    student.PreferredJobTitle = '';
    this.updateStudentProfile(student);
  };

  saveJobTitle = (event) => {
    event.preventDefault();
    if (this.props.studentInfoStore.studentProfile.PreferredJobTitle.length === 0) {
    } else {
      const student = { ...this.props.studentInfoStore.studentProfile };
      this.updateStudentProfile(student);
    }
  };

  onChangePreferredIndustryHandler = (event) => {
    const studentProfile = { ...this.props.studentInfoStore.studentProfile };
    studentProfile.PreferredIndustry = event.target.value;
    // update in reducer
    const payload = {
      studentProfile,
    };
    this.props.updateStudentProfile(payload);
  };

  removePreferredIndustry = (event) => {
    event.preventDefault();
    const student = { ...this.props.studentInfoStore.studentProfile };
    student.PreferredIndustry = '';
    this.updateStudentProfile(student);
  };

  savePreferredIndustry = (event) => {
    event.preventDefault();
    if (this.props.studentInfoStore.studentProfile.PreferredIndustry.length === 0) {
    } else {
      const student = { ...this.props.studentInfoStore.studentProfile };
      this.updateStudentProfile(student);
    }
  };

  // updateStudentProfile = (student) => {
  //   console.log(student);
  //   this.setState({
  //     showJobSearchDropdown: false,
  //     showJobTitleInput: false,
  //   });
  // };
  updateStudentProfile = (student) => {
    console.log(student);

    // event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

    axios.post(serverUrl + 'student/profileUpdate', student).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          // studentProfile.AppliedJobs.push(this.props.selectedJob._id);
          const payload = {
            studentProfile: student,
          };
          this.props.updateStudentProfile(payload);
          this.setState({
            showJobSearchDropdown: false,
            showJobTitleInput: false,
            showJobTypeDropdown: false,
            showtargetSalaryInput: false,
            showPreferredIndustryInput: false,
          });
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  updateRange = (event) => {
    this.setState({
      Range: event.target.value,
    });
  };

  saveRange = (event) => {
    event.preventDefault();
    const student = { ...this.props.studentInfoStore.studentProfile };
    student.TargetSalary = this.state.Range;
    this.updateStudentProfile(student);
  };

  updateRelocation = (event) => {
    event.preventDefault();
    const student = { ...this.props.studentInfoStore.studentProfile };
    student.OpentoRelocation = !student.OpentoRelocation;
    this.updateStudentProfile(student);
  };

  updateRemoteWork = (event) => {
    event.preventDefault();
    const student = { ...this.props.studentInfoStore.studentProfile };
    student.WorkRemotely = !student.WorkRemotely;
    this.updateStudentProfile(student);
  };

  render() {
    return (
      <div class="col-12 col-md-8">
        <div>
          <div
            id="PreferencesPage"
            class="module mb-md PreferencesStyles__preferencesModule___1FDO2"
          >
            <div class="d-flex flex-column flex-md-row-reverse flex-wrap align-items-start align-items-md-center justify-content-md-between PreferencesStyles__visibility___hswA8">
              <div class="mb-xxsm p-xsm PreferencesStyles__visibilityIndicator___2Nfyv">
                Viewable only by you
              </div>
              <h1 class="strong m-0 align-self-start align-self-md-center PreferencesStyles__preferencesHeader___30Q2a">
                Job Preferences
              </h1>
            </div>
            <p style={{ margin: '16px 0' }}>
              Tell us what you’re looking for in a job and we’ll use this information to recommend
              the best jobs to you. This information will not be visible to employers.
            </p>
            <div class="relative" id="JobSearchStatus">
              <div>
                <p class="mt-xl">
                  <strong>Where are you in your job search?</strong>
                </p>
                <div class="col-md-6 px-0">
                  <div class=" css-1ohf0ui">
                    <label for="" class="css-1opum1l">
                      <span>Select Job Search Status</span>
                    </label>
                    <select
                      data-test="jobSearchStatus"
                      name="dropdown"
                      aria-label="Select Job Search Status"
                      style={{ display: 'none' }}
                    >
                      <option value=""></option>
                      <option value="NOT_LOOKING"></option>
                      <option value="OPEN"></option>
                      <option value="CASUALLY_LOOKING"></option>
                      <option value="ACTIVELY_LOOKING"></option>
                    </select>
                    <div
                      direction="auto"
                      aria-expanded="true"
                      role="listbox"
                      aria-activedescendant="option_0_eb1284a-6177-7ae-5d30-fe3c3ea56c5"
                      aria-label="Select Job Search Status"
                      class="css-1vf6lcl"
                      tabindex="0"
                    >
                      <div onClick={this.toggleJobSearchDropdown} class="selectedLabel">
                        {this.props.studentInfoStore.studentProfile.JobStatus}
                        {this.state.showJobSearchDropdown ? (
                          <span alt="" class="SVGInline arrowUp">
                            <svg
                              class="SVGInline-svg arrowUp-svg"
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
                        ) : (
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
                        )}
                      </div>
                      <div
                        class={
                          this.state.showJobSearchDropdown
                            ? 'dropdownOptions dropdownExpanded animated  '
                            : 'dropdownOptions dropdownCollapsed animated  '
                        }
                      >
                        <div class="dropDownOptionsContainer">
                          <ul>
                            {this.state.jonStatuses.map((status) => (
                              <li
                                onClick={(event) => this.updateJobStatus(event, status)}
                                key={status}
                                class={
                                  this.props.studentInfoStore.studentProfile.JobStatus === status
                                    ? 'dropdownOption checked  '
                                    : 'dropdownOption'
                                }
                                role="option"
                                aria-selected="false"
                                id="option_1_eb1284a-6177-7ae-5d30-fe3c3ea56c5"
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
                                <span class="dropdownOptionLabel">{status}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative" id="IdealJob">
              <div>
                <p class="mt-xl mb-xs">
                  <strong>What job titles are you looking for?</strong>
                </p>
                {this.state.showJobTitleInput ? (
                  <div class="d-flex">
                    <div class="idealJobStyle__adjustWidth___IiDqt">
                      <div class="pb-sm css-1ohf0ui">
                        <label
                          for="Autocomplete-b1e701-0266-54c-2cec-650f106534c7"
                          class="css-1opum1l"
                        >
                          <span>Job Title</span>
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
                                onChange={this.onChangeJobTitleHandler}
                                placeholder="Job Title"
                                autocomplete="off"
                                name="Autocomplete"
                                id="Autocomplete-b1e701-0266-54c-2cec-650f106534c7"
                                data-test=""
                                aria-label="Job Title"
                                class="css-ofiv3k"
                                value={this.props.studentInfoStore.studentProfile.PreferredJobTitle}
                              />
                            </div>
                          </div>
                          <div>
                            <div data-test="FilterChips"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="pl-sm link idealJobStyle__addIcon___22lnv" data-test="saveIcon">
                      <span onClick={(event) => this.saveJobTitle(event)} class="SVGInline">
                        <svg
                          class="SVGInline-svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <circle id="prefix__circle" cx="9" cy="9" r="9"></circle>
                            <mask id="prefix__plus" x="0" y="0" width="18" height="18" fill="#fff">
                              <use href="#prefix__circle"></use>
                            </mask>
                          </defs>
                          <g stroke="#1861BF" fill="none" fill-rule="evenodd">
                            <use
                              mask="url(#prefix__plus)"
                              stroke-width="2"
                              href="#prefix__circle"
                            ></use>
                            <path d="M9 4.757v8.486M4.757 9h8.486" stroke-linejoin="round"></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div class="idealJobStyle__chips___1iw1E" data-test="idealJobList">
                    {this.props.studentInfoStore.studentProfile.PreferredJobTitle.length > 0 ? (
                      <div class="chip idealJobStyle__chip___3I3VC">
                        <span class="pr-sm">
                          {this.props.studentInfoStore.studentProfile.PreferredJobTitle}
                        </span>
                        <span data-test="removeJobTitle" class="remove pl-sm pointer link">
                          <i onClick={this.removeJobTitle} class="icon-cross"></i>
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                    <div class="idealJobStyle__chips___1iw1E" data-test="idealJobList">
                      <button
                        onClick={this.openJobTitleinput}
                        class="gd-ui-button idealJobStyle__addEntryIcon___2IO95 d-flex justify-content-center align-items-center css-1c2vj07"
                        data-test="addIcon"
                      >
                        {this.props.studentInfoStore.studentProfile.PreferredJobTitle.length > 0 ? (
                          <span class="px-xxsm">+ Change Job Title</span>
                        ) : (
                          <span class="px-xxsm">+ Add Job Title</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
                <div class="col-md-6 pt px-0">
                  <p class="mt-sm">
                    <strong>What types of jobs are you open to?</strong>
                  </p>
                  <div class=" css-1ohf0ui">
                    <label for="" class="css-1opum1l">
                      <span>Job Types</span>
                    </label>
                    <select
                      multiple=""
                      data-test=""
                      name="dropdown"
                      aria-label="Job Types"
                      style={{ display: 'none' }}
                    >
                      <option value="FULL_TIME"></option>
                      <option value="PART_TIME"></option>
                      <option value="CONTRACT"></option>
                      <option value="INTERNSHIP"></option>
                      <option value="TEMPORARY"></option>
                      <option value="APPRENTICESHIP"></option>
                      <option value="ENTRY_LEVEL"></option>
                    </select>
                    <div
                      tabindex="0"
                      direction="auto"
                      aria-expanded="false"
                      role="listbox"
                      aria-activedescendant=""
                      aria-label="Job Types"
                      class="css-1kd4gul"
                    >
                      <div onClick={this.togglesJobTypeDropdown} class="selectedLabel">
                        {this.state.JobType.length === 0
                          ? 'Job Types'
                          : this.state.JobType.length === 1
                          ? this.state.JobType
                          : 'Job Types(' + this.state.JobType.length + ')'}
                        {this.state.showJobTypeDropdown ? (
                          <span alt="" class="SVGInline arrowUp">
                            <svg
                              class="SVGInline-svg arrowUp-svg"
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
                        ) : (
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
                        )}
                      </div>
                      <div
                        class={
                          this.state.showJobTypeDropdown
                            ? 'dropdownOptions dropdownExpanded animated  '
                            : 'dropdownOptions dropdownCollapsed animated  '
                        }
                        // class="dropdownOptions dropdownCollapsed animated  "
                      >
                        <div class="dropDownOptionsContainer">
                          <ul>
                            {this.props.masterData.JobType.map((jobType) => (
                              <li
                                onClick={(event) => this.selectJobType(event, jobType)}
                                class={
                                  this.state.JobType.includes(jobType)
                                    ? 'dropdownOption multiple checked '
                                    : 'dropdownOption multiple '
                                }
                                // class="dropdownOption multiple checked "
                                role="option"
                                aria-selected="false"
                                id="option_0_5ce00f5-d42b-7743-7783-fbb8b31485e"
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
                                <span class="dropdownOptionLabel">{jobType}</span>
                              </li>
                            ))}
                          </ul>
                          <div class="scrollBar">
                            <div
                              class="scrollThumb"
                              style={{ height: '137px', marginTop: '4px' }}
                            ></div>
                          </div>
                        </div>
                        <div class="dropdownFooter">
                          {this.state.JobType.length > 0 ? (
                            <button
                              onClick={this.clearAllJobTypes}
                              class="gd-ui-button buttonClear css-1ffg0gd"
                            >
                              Clear
                            </button>
                          ) : (
                            ''
                          )}
                          <button
                            onClick={this.saveJobTypes}
                            class="gd-ui-button buttonApply css-1iue7ku"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="DesiredSalary" class="col-md-6 p-0">
              <div class="desiredSalaryStyle__desiredSalary___2WVNO">
                <div class="d-flex justify-content-between align-items-center">
                  <p class="mt-xl mb-sm">
                    <strong>What is your target salary range?</strong>
                  </p>
                  <div class="desiredSalaryStyle__editIcons___32777"></div>
                </div>
                <div>
                  {this.state.Range !== undefined && this.state.Range >= 0 ? (
                    <div
                      style={{ width: '30%', textAlign: 'center' }}
                      class="chip idealJobStyle__chip___3I3VC"
                    >
                      <span class="pr-sm">{this.state.Range} $</span>
                    </div>
                  ) : (
                    ''
                  )}
                  {this.state.showtargetSalaryInput ? (
                    <span>
                      <div class="">
                        <div class="py-sm">
                          <h2 class="mt-0 mt-xsm">Add Salary Range</h2>
                          <div class="d-flex justify-content-center no-gutters mb-md">
                            <div class="col-6 pr-md">
                              <div class=" css-1ohf0ui">
                                <label for="" class="css-1opum1l">
                                  <span>From</span>
                                </label>
                                <div class="input-wrapper css-q444d9">
                                  <input
                                    onChange={this.updateRange}
                                    data-test="payRangeMin"
                                    maxlength="400"
                                    aria-label=""
                                    class="css-ofiv3k"
                                    type="number"
                                    value={this.state.Range}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="formButtons">
                            <button
                              onClick={this.openTargetSalaryinput}
                              class="gd-ui-button mr-sm css-3ybntp"
                              data-test="cancelChanges"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={this.saveRange}
                              class="gd-ui-button  css-uk8w9o"
                              data-test="saveChanges"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </span>
                  ) : this.state.Range !== undefined && this.state.Range >= 0 ? (
                    <a onClick={this.openTargetSalaryinput}>
                      <strong>+ Change Target Range</strong>
                    </a>
                  ) : (
                    <a onClick={this.openTargetSalaryinput}>
                      <strong>+ Add Target Range</strong>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            id="CompanyPreferencesPage"
            class="module mb-md PreferencesStyles__preferencesModule___1FDO2"
          >
            <div class="d-flex flex-column flex-md-row-reverse flex-wrap align-items-start align-items-md-center justify-content-md-between PreferencesStyles__visibility___hswA8">
              <div class="mb-xxsm p-xsm PreferencesStyles__visibilityIndicator___2Nfyv">
                Viewable by employers
              </div>
              <h1 class="strong m-0 align-self-start align-self-md-center PreferencesStyles__preferencesHeader___30Q2a">
                Company Preferences
              </h1>
            </div>
            <p>We use this information to help find you the best company matches.</p>
            <div class="relative" id="PreferredLocations">
              <div class="pb-0">
                <p class="mt-xl mb-xs">
                  <strong>What industry do you prefer?</strong>
                </p>
                {this.state.showPreferredIndustryInput ? (
                  <div class="d-flex">
                    <div class="idealJobStyle__adjustWidth___IiDqt">
                      <div class="pb-sm css-1ohf0ui">
                        <label
                          for="Autocomplete-b1e701-0266-54c-2cec-650f106534c7"
                          class="css-1opum1l"
                        >
                          <span>Industry Type</span>
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
                                onChange={this.onChangePreferredIndustryHandler}
                                placeholder="Industry Type"
                                autocomplete="off"
                                name="Autocomplete"
                                id="Autocomplete-b1e701-0266-54c-2cec-650f106534c7"
                                data-test=""
                                aria-label="Industry Type"
                                class="css-ofiv3k"
                                value={this.props.studentInfoStore.studentProfile.PreferredIndustry}
                              />
                            </div>
                          </div>
                          <div>
                            <div data-test="FilterChips"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="pl-sm link idealJobStyle__addIcon___22lnv" data-test="saveIcon">
                      <span
                        onClick={(event) => this.savePreferredIndustry(event)}
                        class="SVGInline"
                      >
                        <svg
                          class="SVGInline-svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <circle id="prefix__circle" cx="9" cy="9" r="9"></circle>
                            <mask id="prefix__plus" x="0" y="0" width="18" height="18" fill="#fff">
                              <use href="#prefix__circle"></use>
                            </mask>
                          </defs>
                          <g stroke="#1861BF" fill="none" fill-rule="evenodd">
                            <use
                              mask="url(#prefix__plus)"
                              stroke-width="2"
                              href="#prefix__circle"
                            ></use>
                            <path d="M9 4.757v8.486M4.757 9h8.486" stroke-linejoin="round"></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div class="idealJobStyle__chips___1iw1E" data-test="idealJobList">
                    {this.props.studentInfoStore.studentProfile.PreferredIndustry.length > 0 ? (
                      <div class="chip idealJobStyle__chip___3I3VC">
                        <span class="pr-sm">
                          {this.props.studentInfoStore.studentProfile.PreferredIndustry}
                        </span>
                        <span data-test="removePreferredIndustry" class="remove pl-sm pointer link">
                          <i onClick={this.removePreferredIndustry} class="icon-cross"></i>
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                    <div class="idealJobStyle__chips___1iw1E" data-test="idealJobList">
                      <button
                        onClick={this.openPreferredIndustry}
                        class="gd-ui-button idealJobStyle__addEntryIcon___2IO95 d-flex justify-content-center align-items-center css-1c2vj07"
                        data-test="addIcon"
                      >
                        {this.props.studentInfoStore.studentProfile.PreferredIndustry.length > 0 ? (
                          <span class="px-xxsm">+ Change Industry Type</span>
                        ) : (
                          <span class="px-xxsm">+ Add Industry Type</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
                <p class="mt-xl mb-sm">
                  <strong>Where would you prefer to work?</strong>
                </p>

                <div id="JobPreferences" class="row">
                  <div class="pb-sm pb-md-0 pr-md-lg mr-lg-xl ml-xxsm">
                    <div class="d-flex align-items-center">
                      <div
                        onClick={this.updateRelocation}
                        class={` gd-ui-checkbox ${
                          this.props.studentInfoStore.studentProfile.OpentoRelocation
                            ? 'css-1i7401q'
                            : 'css-13md0bs'
                        }`}
                        // class=" gd-ui-checkbox css-1i7401q"
                        role="checkbox"
                        aria-checked="true"
                        tabindex="0"
                        data-test="openToRelocation"
                      >
                        <label>
                          <input type="checkbox" data-test="" />
                          <div class="checkboxBox"></div>
                          <div class="checkboxLabel">I'm open to relocation</div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center ml-xxsm">
                    <div
                      onClick={this.updateRemoteWork}
                      class={` gd-ui-checkbox ${
                        this.props.studentInfoStore.studentProfile.WorkRemotely
                          ? 'css-1i7401q'
                          : 'css-13md0bs'
                      }`}
                      role="checkbox"
                      aria-checked="false"
                      tabindex="0"
                      data-test="openToRemoteWork"
                    >
                      <label>
                        <input type="checkbox" data-test="" />
                        <div class="checkboxBox"></div>
                        <div class="checkboxLabel">I want to work remotely</div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default JobPreferencePage;

const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  const { masterData } = state.staticDataReducer;

  return {
    studentInfoStore,
    masterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudentProfile: (payload) => {
      dispatch({
        type: updateStudentProfile,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPreferencePage);
