import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LowerNavBarOther, updateInterviewList } from '../../../constants/action-types';
import PaginationComponent from '../Common/PaginationComponent';
import './interviewList.css';
import Questions from './Questions';
import axios from 'axios';
import serverUrl from '../../../config';
import { history } from '../../../App';
import { Redirect } from 'react-router';

class interviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  commonFetch = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/searchInterview', {
        params: {
          SearchString: localStorage.getItem('SearchString'),
          State: localStorage.getItem('Location'),
          PageNo,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          let interviewSearchList = response.data.returns.map((inter) => {
            return { ...inter.Interview, ProfileImg: inter.ProfileImg };
          });
          let payload = {
            interviewSearchList: interviewSearchList,
            PageNo,
            PageCount: Math.ceil(response.data.count / 10),
            Totalcount: response.data.count,

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateInterviewList(payload);
        },
        (error) => {}
      );
  };

  componentDidMount() {
    localStorage.setItem('companyID', '');
    this.commonFetch();
  }

  onPageClick = (e) => {
    this.commonFetch(e.selected);
  };

  openCompanyProfile = (event, CompanyID) => {
    localStorage.setItem('companyID', CompanyID);
    history.push('/CompanyPage');

    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = { CompanyID };
    axios.post(serverUrl + 'student/companyViewCount', data).then(
      (response) => {},
      (error) => {}
    );
  };

  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'company') {
        return <Redirect to="/Employer" />;
      } else if (localStorage.getItem('userrole') === 'admin') {
        return <Redirect to="/AdminHomePage" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    this.props.LowerNavBarOther();
    return (
      <body className="main flex loggedIn lang-en en-US hollywood  _initOk noTouch desktop">
        {/*<Navbar />*/}
        <div className="pageContentWrapperStudent ">
          <div id="PageContent">
            <div id="PageBodyContents" className="meat">
              <div className="pageInsideContent cf">
                <div id="nodeReplace">
                  <main className="gdGrid">
                    <div id="EI-Srch">
                      <div id="SearchResults">
                        <div id="InterviewsSearchResults">
                          <div className="flex-aside">
                            <article
                              style={{ position: 'relative' }}
                              id="MainCol"
                              className="mainCol"
                            >
                              <div className="module padHorzLg padVertLg">
                                <div id="InterviewQuestionList" className="module">
                                  <header className="lined">
                                    {this.props.interviewListStore.interviewSearchList.length ===
                                    0 ? (
                                      <h2 className="block" style={{ fontWeight: '400' }}>
                                        No interviews found, try different seach criteria
                                      </h2>
                                    ) : (
                                      <h2 className="block" style={{ fontWeight: '400' }}>
                                        {localStorage.getItem('SearchString')} Interview Questions
                                      </h2>
                                    )}
                                  </header>
                                  <div className="interviewQuestionsList lockedInterviewQuestions">
                                    {this.props.interviewListStore.interviewSearchList.map(
                                      (interview) => (
                                        <Questions
                                          key={interview._id}
                                          interview={interview}
                                          openCompanyProfile={(event) =>
                                            this.openCompanyProfile(event, interview.CompanyID)
                                          }
                                        />
                                      )
                                    )}
                                  </div>
                                  <div className="tbl fill margTopSm">
                                    <div className="row alignMid">
                                      <div className="cell span-1-2 drop noWrap middle">
                                        {this.props.interviewListStore.interviewSearchList.length >
                                        0 ? (
                                          <div className="margTopSm">
                                            <strong>
                                              {this.props.interviewListStore.PageNo * 10 + 1}
                                            </strong>
                                            –
                                            <strong>
                                              {' '}
                                              {this.props.interviewListStore.interviewSearchList
                                                .length +
                                                this.props.interviewListStore.PageNo * 10}
                                            </strong>{' '}
                                            of{' '}
                                            <strong>
                                              {this.props.interviewListStore.Totalcount}
                                            </strong>{' '}
                                            Interview Questions
                                          </div>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                      {this.props.interviewListStore.interviewSearchList.length >
                                      0 ? (
                                        <PaginationComponent
                                          PageCount={this.props.interviewListStore.PageCount}
                                          PageNo={this.props.interviewListStore.PageNo}
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

// export default interviewList;
const mapStateToProps = (state) => {
  const { interviewListStore } = state.InterviewListReducer;

  return {
    interviewListStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
    updateInterviewList: (payload) => {
      dispatch({
        type: updateInterviewList,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(interviewList);
