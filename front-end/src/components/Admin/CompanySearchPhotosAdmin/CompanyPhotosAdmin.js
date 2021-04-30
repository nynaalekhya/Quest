import React, { Component } from 'react';
import AllPhotos from './AllPhotos';
// import '../CompanyOverView/CompanyOverView.css';
import './CompanyReviews.css';
// import SpecialReview from './SpecialReview';
import axios from 'axios';
import serverUrl from '../../../config';
import { updateCompanyPhotosStore, updateStudentProfile } from '../../../constants/action-types';
import { connect } from 'react-redux';
import moment from 'moment';
import PaginationComponent from '../../Student/Common/PaginationComponent';
import { history } from '../../../App';
import { Redirect } from 'react-router';

class CompanyPhotosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { PendingTab: false, ApprovedTab: false, DisapprovedTab: false };
  }
  componentDidMount() {
    this.commonFetch();
  }

  commonFetch = (
    PageNo = 0,
    Status = '',
    PendingTab = false,
    ApprovedTab = false,
    DisapprovedTab = false
  ) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'admin/getPhotos', {
        params: {
          Status,
          PageNo,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('getPhotos admin', response.data);
          let payload = {
            PhotoList: response.data[0].Review,
            PageNo,
            Totalcount: response.data[1].Count,
            PageCount: Math.ceil(response.data[1].Count / 10),
            PendingTab,
            ApprovedTab,
            DisapprovedTab,
          };
          this.props.updateCompanyPhotosStore(payload);
        },
        (error) => {
          console.log('error', error);
        }
      );
  };

  onPageClick = (e) => {
    let Status = '';
    if (this.props.companyPhotosStore.PendingTab) {
      Status = 'Not Approved';
    } else if (this.props.companyPhotosStore.ApprovedTab) {
      Status = 'Approved';
    } else if (this.props.companyPhotosStore.DisapprovedTab) {
      Status = 'Disapproved';
    }
    this.commonFetch(
      e.selected,
      Status,
      this.props.companyPhotosStore.PendingTab,
      this.props.companyPhotosStore.ApprovedTab,
      this.props.companyPhotosStore.DisapprovedTab
    );
  };

  openCompanyProfile = (event, CompanyID) => {
    localStorage.setItem('companyID', CompanyID);
    history.push('/CompanyPageAdminView');
  };

  buttonClicked = (event, Status, ID, CompanyID) => {
    event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      Status,
      ID,
      CompanyID,
    };
    axios.post(serverUrl + 'admin/updatePictures', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          let Status = '';
          if (this.props.companyPhotosStore.PendingTab) {
            Status = 'Not Approved';
          } else if (this.props.companyPhotosStore.ApprovedTab) {
            Status = 'Approved';
          } else if (this.props.companyPhotosStore.DisapprovedTab) {
            Status = 'Disapproved';
          }
          this.commonFetch(
            this.props.companyPhotosStore.PageNo,
            Status,
            this.props.companyPhotosStore.PendingTab,
            this.props.companyPhotosStore.ApprovedTab,
            this.props.companyPhotosStore.DisapprovedTab
          );
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  changePendingTab = (event) => {
    event.preventDefault();
    if (this.props.companyPhotosStore.PendingTab) {
      this.commonFetch(0, '', false, false, false);
    } else {
      this.commonFetch(0, 'Not Approved', true, false, false);
    }
  };

  changeApprovedTab = (event) => {
    event.preventDefault();
    if (this.props.companyPhotosStore.ApprovedTab) {
      this.commonFetch(0, '', false, false, false);
    } else {
      this.commonFetch(0, 'Approved', false, true, false);
    }
  };

  changeDisapprovedTab = (event) => {
    event.preventDefault();
    if (this.props.companyPhotosStore.DisapprovedTab) {
      this.commonFetch(0, '', false, false, false);
    } else {
      this.commonFetch(0, 'Disapproved', false, false, true);
    }
  };

  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'company') {
        return <Redirect to="/Employer" />;
      } else if (localStorage.getItem('userrole') === 'student') {
        return <Redirect to="/Home" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    return (
      <body className="main flex loggedIn lang-en en-US hollywood  _initOk noTouch desktop">
        {/*<Navbar />*/}
        <div class="pageContentWrapperStudent ">
          <div style={{ width: '725px' }} id="PageContent">
            <div id="PageBodyContents" class="meat">
              <div class="pageInsideContent cf">
                <div id="nodeReplace">
                  <main class="gdGrid">
                    <div id="EI-Srch">
                      <div id="SearchResults">
                        <div id="InterviewsSearchResults">
                          <div style={{ width: '725px' }} class="flex-aside">
                            <article style={{ position: 'relative' }} id="MainCol" class="mainCol">
                              <div class="module padHorzLg padVertLg">
                                <div id="InterviewQuestionList" class="module">
                                  <header class="lined">
                                    {this.props.companyPhotosStore.PhotoList.length === 0 ? (
                                      <h2 class="block" style={{ fontWeight: '400' }}>
                                        No Photos found, try different seach criteria
                                      </h2>
                                    ) : (
                                      <h2 class="block" style={{ fontWeight: '400' }}>
                                        {localStorage.getItem('SearchString')} Photos
                                      </h2>
                                    )}
                                  </header>
                                  <div class="lined" id="dynamicFiltersContainer">
                                    <div className="selectContainer">
                                      <div class="button-set ">
                                        <div>
                                          <div
                                            style={{
                                              paddingLeft: '30%',
                                            }}
                                            onClick={this.changePendingTab}
                                            class={
                                              this.props.companyPhotosStore.PendingTab
                                                ? 'selected'
                                                : ''
                                            }
                                            tabindex="0"
                                          >
                                            <label
                                              style={{ height: '40px' }}
                                              for="employerUIData.state.employerReview.currentJob_true"
                                            >
                                              Pending
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
                                            onClick={this.changeDisapprovedTab}
                                            class={
                                              this.props.companyPhotosStore.DisapprovedTab
                                                ? 'selected'
                                                : ''
                                            }
                                            tabindex="0"
                                          >
                                            <label
                                              style={{ height: '40px' }}
                                              for="employerUIData.state.employerReview.currentJob_false"
                                            >
                                              Disapproved
                                            </label>
                                            <input
                                              class="hidden"
                                              type="radio"
                                              name="employerUIData.state.employerReview.currentJob"
                                              id="employerUIData.state.employerReview.currentJob_false"
                                              value="false"
                                            />
                                          </div>
                                          <div
                                            onClick={this.changeApprovedTab}
                                            class={
                                              this.props.companyPhotosStore.ApprovedTab
                                                ? 'selected'
                                                : ''
                                            }
                                            tabindex="0"
                                          >
                                            <label
                                              style={{ height: '40px' }}
                                              for="employerUIData.state.employerReview.currentJob_false"
                                            >
                                              Approved
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
                                  </div>

                                  <div class="module interviewsAndFilter">
                                    <div id="EmployerInterviews">
                                      <ol class="empReviews tightLt">
                                        {this.props.companyPhotosStore.PhotoList.map((photo) => (
                                          <AllPhotos
                                            openCompanyProfile={(event) =>
                                              this.openCompanyProfile(event, photo.CompanyID)
                                            }
                                            buttonClicked={(event, Status) =>
                                              this.buttonClicked(
                                                event,
                                                Status,
                                                photo.ID,
                                                photo.CompanyID
                                              )
                                            }
                                            photo={photo}
                                          />
                                        ))}
                                      </ol>
                                      <div class="margTop">
                                        <div class="breadcrumbList margTop">
                                          <div
                                            class="breadcrumb ib "
                                            itemprop="child"
                                            itemscope=""
                                            itemtype="http://data-vocabulary.org/Breadcrumb"
                                          >
                                            <a
                                              itemprop="url"
                                              // href="/Interview/Amazon-Interview-Questions-E6036.htm"
                                              data-ga-lbl=""
                                            >
                                              <span itemprop="title">
                                                {/*
                                                  this.props.companyOverviewStore.companyOverview
                                                    .CompanyName
                                                */}
                                              </span>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="tbl fill margTopSm">
                                    <div class="row alignMid">
                                      <div class="cell span-1-2 drop noWrap middle">
                                        {this.props.companyPhotosStore.PhotoList.length > 0 ? (
                                          <div class="margTopSm">
                                            <strong>
                                              {this.props.companyPhotosStore.PageNo * 10 + 1}
                                            </strong>
                                            –
                                            <strong>
                                              {' '}
                                              {this.props.companyPhotosStore.PhotoList.length +
                                                this.props.companyPhotosStore.PageNo * 10}
                                            </strong>{' '}
                                            of{' '}
                                            <strong>
                                              {this.props.companyPhotosStore.Totalcount}
                                            </strong>{' '}
                                            Photos
                                          </div>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                      {this.props.companyPhotosStore.PhotoList.length > 0 ? (
                                        <PaginationComponent
                                          PageCount={this.props.companyPhotosStore.PageCount}
                                          PageNo={this.props.companyPhotosStore.PageNo}
                                          onPageClick={(e) => {
                                            this.onPageClick(e);
                                          }}
                                        />
                                      ) : (
                                        ''
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

// export default CompanyReviews;

const mapStateToProps = (state) => {
  const { companyPhotosStore } = state.CompanyPageReducer;

  return {
    companyPhotosStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCompanyPhotosStore: (payload) => {
      dispatch({
        type: updateCompanyPhotosStore,
        payload,
      });
    },
    updateStudentProfile: (payload) => {
      dispatch({
        type: updateStudentProfile,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPhotosAdmin);
