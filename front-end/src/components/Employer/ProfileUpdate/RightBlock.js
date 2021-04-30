import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import serverUrl from '../../../config.js';
import { connect } from 'react-redux';
import './RightBody.css';
import { updateCompanyProfile } from '../../../constants/action-types';
import ImageUploadModal from './ImageUploadModal.js';

class RightBlock extends Component {
  constructor(props) {
    super(props);

    this.inputElement = React.createRef();
    this.inputElement2 = React.createRef();
    this.state = {
      errorMessage: '',
      CompanyName: '',
      Website: '',
      Size: '',
      ProfileImg: '',
      Type: '',
      Revenue: '',
      Headquarter: '',
      Industry: '',
      Founded: '',
      CompanyDescription: '',
      CompanyMission: '',
      CEO: '',
      City: '',
      State: '',
      authFlag: false,
      cancelUpdate: false,
      redirect: null,
      showImageUploadModal: false,
      imageUploaded: false,
      showCoverImageUploadModal: false,
      CoverPhoto: '',
    };
  }

  openImageModal = (event) => {
    this.setState({
      showImageUploadModal: !this.state.showImageUploadModal,
    });
  };

  saveProfileImage = (imageUrl) => {
    this.setState({
      showImageUploadModal: false,
      ProfileImg: imageUrl,
    });
  };

  openCoverImageModal = (event) => {
    this.setState({
      showCoverImageUploadModal: !this.state.showCoverImageUploadModal,
    });
  };

  handleClick = (event) => {
    this.inputElement.current.click();
  };

  saveCoverImage = (imageUrl) => {
    this.setState({
      showCoverImageUploadModal: false,
      CoverPhoto: imageUrl,
    });
  };

  componentDidMount() {
    //set the with credentials to true
    if (!localStorage.getItem('userId')) {
      return <Redirect to="/Employer" />;
    }
    const data = localStorage.getItem('userId');
    console.log(data);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    //make a post request with the user data')
    axios
      .get(serverUrl + 'company/profile', {
        params: {
          CompanyID: data,
        },
      })
      .then(
        (response) => {
          if (response.status === 200) {
            console.log(response);
            localStorage.setItem('companyName', response.data.CompanyName);
            // let payload = {
            //   CompanyName: response.data.CompanyName,
            //   Website: response.data.Website,
            //   Size: response.data.Size,
            //   ProfileImg: response.data.ProfileImg,
            //   Type: response.data.Type,
            //   Revenue: response.data.Revenue,
            //   Headquarter: response.data.Headquarter,
            //   Industry: response.data.Industry,
            //   Founded: response.data.Founded,
            //   CompanyDescription: response.data.CompanyDescription,
            //   CompanyMission: response.data.CompanyMission,
            //   CEO: response.data.CEO,
            //   City: response.data.City,
            //   State: response.data.State,
            // };
            // console.log('payload', payload);
            // this.props.updateCompanyProfile(payload);
            this.setState({
              CompanyName: response.data.CompanyName,
              Website: response.data.Website,
              Size: response.data.Size,
              ProfileImg: response.data.ProfileImg,
              Type: response.data.Type,
              Revenue: response.data.Revenue,
              Headquarter: response.data.Headquarter,
              Industry: response.data.Industry,
              Founded: response.data.Founded,
              CompanyDescription: response.data.CompanyDescription,
              CompanyMission: response.data.CompanyMission,
              CEO: response.data.CEO,
              City: response.data.City,
              State: response.data.State,
            });
          }
        },
        (error) => {
          this.setState({
            errorMessage: error.response,
          });
        }
      );
  }

  onChangeCommonHandler = (e) => {
    this.setState({
      errorMessage: '',
    });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    // e.preventDefault();
    let CompanyID = localStorage.getItem('userId');

    const data = {
      CompanyID: CompanyID,
      CompanyName: this.state.CompanyName,
      Website: this.state.Website,
      Size: this.state.Size,
      Type: this.state.Type,
      Revenue: this.state.Revenue,
      Headquarter: this.state.Headquarter,
      Industry: this.state.Industry,
      Founded: this.state.Founded,
      CompanyMission: this.state.CompanyMission,
      CEO: this.state.CEO,
      CompanyDescription: this.state.CompanyDescription,
      City: this.state.City,
      State: this.state.State,
      CoverPhoto: this.state.CoverPhoto,
      ProfileImg: this.state.ProfileImg,
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(serverUrl + 'company/profileupdate', data).then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          this.setState({
            authFlag: true,
          });
          let payload = {
            CompanyName: this.state.CompanyName,
            Website: this.state.Website,
            Size: this.state.Size,
            ProfileImg: this.state.ProfileImg,
            Type: this.state.Type,
            Revenue: this.state.Revenue,
            Headquarter: this.state.Headquarter,
            Industry: this.state.Industry,
            Founded: this.state.Founded,
            CompanyDescription: this.state.CompanyDescription,
            CompanyMission: this.state.CompanyMission,
            CEO: this.state.CEO,
            City: this.state.City,
            State: this.state.State,
            CoverPhoto: this.state.CoverPhoto,
          };
          console.log('payload', payload);
          this.props.updateCompanyProfile(payload);
          console.log(this.state.authFlag);
          this.props.handleClick('Profile');
          this.inputElement2.current.click();
        }
      },
      (error) => {
        console.log(error);        
        this.setState({
          errorMessage: 'Name already in use',
        });
      }
    );
  };

  handleCancel = () => {
    this.setState({
      cancelUpdate: true,
    });
  };

  CompanyNameChange = (e) => {
    this.setState({
      errorMessage: '',
    });
    this.setState({
      CompanyName: e.target.value,
    });
  };

  checkAvailability = (e) => {
    e.preventDefault();
    console.log('check availability');
    let CompanyID = localStorage.getItem('userId');
    const data = {
      CompanyID,
      CompanyName: this.state.CompanyName,
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post(serverUrl + 'company/findCompanyName', data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            errorMessage: 'Available',
          });
        }
        
      })
      .catch((error) => {
        if (error.response.status === 409) {
          this.setState({
            errorMessage: error.response.data,
          });
        }        
      });
  };
  uploadImage = (event) => {
    if (event.target.files.length === 1) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      event.preventDefault();
      let formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
      //   const imageUrl = event.target.files[0].name;
      axios({
        method: 'post',
        url: serverUrl + 'student/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          if (response.status === 200) {
            const ProfileImg = response.data;

            this.setState({
              ProfileImg,
              imageUploaded: true,
            });
          } else if (parseInt(response.status) === 400) {
          }
        })
        .catch((error) => {
          this.setState({
            errorMsg: error.message,
            authFlag: false,
          });
        });
    }
  };
  render() {
    let redirectVar = null;
    if (this.state.authFlag === true) {
      // redirectVar = <Redirect to="/Employer" />;
      // history.push('/Employer');
    }
    if (this.state.cancelUpdate === true) {
      // redirectVar = <Redirect to="/Employer" />;
      // history.push('/Employer');
    }

    return (
      <div className="col-md-8 px-0">
        {redirectVar}
        <div
          id="PreferencesPage"
          className="module mb-md PreferencesStyles__preferencesModule___1FDO2"
        >
          <div className="d-flex flex-column flex-md-row-reverse flex-wrap align-items-start align-items-md-center justify-content-md-between PreferencesStyles__visibility___hswA8">
            <div className="mb-xxsm p-xsm PreferencesStyles__visibilityIndicator___2Nfyv">
              Viewable only by you
            </div>
            <h1 className="strong m-0 align-self-start align-self-md-center PreferencesStyles__preferencesHeader___30Q2a">
              Update Profile
            </h1>
          </div>
          <p style={{ paddingBottom: '10px' }}>
            Update the profile information for your company. This information will be visible to
            Students.
          </p>
          <form>
            <div class="d-none d-md-block">
              <div data-test="profilePhoto" id="ProfilePhoto">
                <div class="profilePhotoStyle__profilePhoto___CTVQw">
                  <div class="d-inline-flex justify-content-start align-items-center profilePhotoStyle__photoContainer___3itOq">
                    <div class="mr-xsm">
                      {this.props.companyInfo.ProfileImg ? (
                        <img
                          src={this.props.companyInfo.ProfileImg}
                          alt="Profile avatar"
                          class="mb-xsm css-uodor8 css-1k2lqp9"
                        />
                      ) : (
                        <span class="SVGInline profilePhotoStyle__icon___1H_01">
                          <svg
                            class="SVGInline-svg profilePhotoStyle__icon___1H_01-svg"
                            style={{ width: '55px', height: '55px' }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z"
                              fill="currentColor"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </div>

                    <div class="profilePhotoBadge">
                      <div onClick={this.openImageModal} class="profilePhotoStyle__caption___HtLE-">
                        <span>Add/Update profile photo</span>
                      </div>
                    </div>
                    {this.state.showImageUploadModal ? (
                      <ImageUploadModal
                        saveProfileImage={(imageUrl) => this.saveProfileImage(imageUrl)}
                        openImageModal={this.openImageModal}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  <div
                    style={{ marginLeft: '23%' }}
                    class="d-inline-flex justify-content-start align-items-center profilePhotoStyle__photoContainer___3itOq"
                  >
                    <div class="mr-xsm">
                      {this.props.companyInfo.CoverPhoto ? (
                        <img
                          src={this.props.companyInfo.CoverPhoto}
                          alt="Profile avatar"
                          class="mb-xsm css-uodor8 css-1k2lqp9"
                        />
                      ) : (
                        <span class="SVGInline profilePhotoStyle__icon___1H_01">
                          <svg
                            class="SVGInline-svg profilePhotoStyle__icon___1H_01-svg"
                            style={{ width: '55px', height: '55px' }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z"
                              fill="currentColor"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </div>

                    <div class="profilePhotoBadge">
                      <div
                        onClick={this.openCoverImageModal}
                        class="profilePhotoStyle__caption___HtLE-"
                      >
                        <span>Add/Update Cover photo</span>
                      </div>
                    </div>
                    {this.state.showCoverImageUploadModal ? (
                      <ImageUploadModal
                        saveProfileImage={(imageUrl) => this.saveCoverImage(imageUrl)}
                        openImageModal={this.openCoverImageModal}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative" id="JobSearchStatus">
              <ul>
                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>CompanyName</label>
                  <input type="hidden" name="CompanyName" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="CompanyName"
                            autocomplete="off"
                            name="CompanyName"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.CompanyNameChange}
                            value={this.state.CompanyName}
                          />
                        </div>
                      </div>
                      <a href="#" onClick={(event) => this.checkAvailability(event)}>
                        <button
                          className="gd-ui-button ml-std col-auto css-iixdfr"
                          type="button"
                          data-test="search-bar-submit"
                          style={{
                            width: '50',
                            backgroundColor: '#fff',
                            border: '#808080',
                            color: '#808080',
                            'margin-left': '10px',
                          }}
                        >
                          <span>Check Availability</span>
                        </button>
                      </a>
                      <p style={{ color: this.state.errorMessage ==="Available" ? 'green' : 'red' }}>{this.state.errorMessage}</p>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>Website</label>
                  <input type="hidden" name="Website" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="Website"
                            autocomplete="off"
                            name="Website"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.Website}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>Company Size</label>
                  <input type="hidden" name="Company Size" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="Company Size"
                            autocomplete="off"
                            name="Size"
                            type="number"
                            min="0"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.Size}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>Company Type</label>
                  <input type="hidden" name="Company Type" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="Company Type"
                            autocomplete="off"
                            name="Type"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.Type}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>Revenue</label>
                  <input type="hidden" name="Revenue" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="Revenue"
                            autocomplete="off"
                            name="Revenue"
                            type="number"
                            min="0"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.Revenue}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>Headquarters</label>
                  <input type="hidden" name="Headquarters" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="Headquarters"
                            autocomplete="off"
                            name="Headquarter"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.Headquarter}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>Industry</label>
                  <input type="hidden" name="Industry" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="Industry"
                            autocomplete="off"
                            name="Industry"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.Industry}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>City</label>
                  <input type="hidden" name="City" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="City"
                            autocomplete="off"
                            name="City"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.City}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>State</label>
                  <input type="hidden" name="State" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          {/*<input
                            placeholder="State"
                            autocomplete="off"
                            name="State"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.State}
                          />*/}
                          <select
                            required="true"
                            style={{ backgroundColor: '#fff' }}
                            id="stateName"
                            data-test="state"
                            maxlength="100"
                            aria-label=""
                            class="css-ofiv3k"
                            onChange={(event) => this.onChangeCommonHandler(event)}
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
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>Founded</label>
                  <input type="hidden" name="Founded" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="Founded"
                            autocomplete="off"
                            name="Founded"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.Founded}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>CEO Name</label>
                  <input type="hidden" name="CEO Name" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="CEO Name"
                            autocomplete="off"
                            name="CEO"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.CEO}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>About</label>
                  <input type="hidden" name="About" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="About"
                            autocomplete="off"
                            name="CompanyDescription"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.CompanyDescription}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="ajax-input"
                  style={{
                    '-webkit-box-align': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'wrap',
                    width: 'auto',
                    'margin-bottom': '16px',
                  }}
                >
                  <label style={{ paddingBottom: '5px' }}>Mission</label>
                  <input type="hidden" name="Mission" value="0" />
                  <div className=" css-1ohf0ui">
                    <div aria-expanded="false" aria-autocomplete="list" className="css-1xtvih1">
                      <div className=" css-1ohf0ui">
                        <div className="input-wrapper css-q444d9">
                          <input
                            placeholder="Mission"
                            autocomplete="off"
                            name="CompanyMission"
                            type="text"
                            id="userEnteredOccupationInput-jobTitleId"
                            data-test=""
                            aria-label=""
                            className="css-1sk6eli"
                            onChange={this.onChangeCommonHandler}
                            value={this.state.CompanyMission}
                          />
                        </div>
                      </div>
                      <ul className="suggestions down"></ul>
                      <div>
                        <div data-test="FilterChips"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
              <a href="#" ref={this.inputElement2}>
                <button
                  className="gd-ui-button ml-std col-auto css-iixdfr"
                  type="button"
                  data-test="search-bar-submit"
                  style={{ width: '20%' }}
                  onClick={this.handleSubmit}
                >
                  <span>Submit</span>
                </button>
              </a>
              <a href="#" onClick={() => this.props.handleClick('Profile')}>
                <button
                  className="gd-ui-button ml-std col-auto css-iixdfr"
                  type="button"
                  data-test="search-bar-submit"
                  style={{
                    width: '20%',
                    backgroundColor: '#fff',
                    border: '1px solid #0caa41',
                    color: '#0caa41',
                    'margin-left': '10px',
                  }}
                >
                  <span>Cancel</span>
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { companyInfo } = state.CompaniesProfileReducer;
  const { masterData } = state.staticDataReducer;
  return {
    companyInfo,
    masterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompanyProfile: (payload) => {
      dispatch({
        type: updateCompanyProfile,
        payload,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RightBlock);
//export default RightBlock;
