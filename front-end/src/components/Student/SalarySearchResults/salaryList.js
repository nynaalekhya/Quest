import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LowerNavBarOther, updateSalaryList } from '../../../constants/action-types';
import Navbar from '../Common/Navbar';
import PaginationComponent from '../Common/PaginationComponent';
import SalaryCard from './SalaryCard';
import './salaryList.css';
import axios from 'axios';
import serverUrl from '../../../config';
import { history } from '../../../App';
import { Redirect } from 'react-router';

class salaryList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  commonFetch = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/searchSalary', {
        params: {
          SearchString: localStorage.getItem('SearchString'),
          State: localStorage.getItem('Location'),
          PageNo,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          let payload = {
            SalarySearchList: response.data.result.result,
            PageNo,
            PageCount: Math.ceil(response.data.count.count / 10),
            Totalcount: response.data.count.count,

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateSalaryList(payload);
        },
        (error) => {}
      );

    // let payload = {
    //   SalarySearchList: [{ name: 'pr' }, { name: 'pr' }, { name: 'pr' }, { name: 'pr' }],
    //   PageNo,
    //   PageCount: Math.ceil(116 / 10),
    //   Totalcount: 116,

    //   // PageCount: Math.ceil(response.data.Totalcount / 3),
    // };
    // this.props.updateSalaryList(payload);
  };

  componentDidMount() {
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
                      <div
                        id="SalarySearchResults"
                        className="d-flex flex-column flex-md-row mx-md-std mt-std"
                      >
                        <article
                          style={{ width: '67%' }}
                          className="mr-0 mr-md-std css-8atqhb ep6ayhb0"
                        >
                          <div data-test="employer-salaries">
                            <div className=" gd-ui-module css-1mzux4t">
                              {localStorage.getItem('SearchString') ? (
                                <h1>{localStorage.getItem('SearchString')} Salaries</h1>
                              ) : (
                                ''
                              )}
                              <div data-test="" className=" e1liezln0 css-1gjvczy">
                                <div className="textAndIconContainer">
                                  <div className="iconContainer">
                                    <span alt="btn-icon" className="SVGInline">
                                      <svg
                                        className="SVGInline-svg"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                      >
                                        <g fill="none" fillRule="evenodd">
                                          <circle
                                            cx="16"
                                            cy="16"
                                            r="10.667"
                                            fill="#00A1DF"
                                          ></circle>
                                          <path
                                            fill="#FFF"
                                            d="M14.667 16a1.333 1.333 0 112.666 0v5.333a1.333 1.333 0 11-2.666 0V16zM16 13.333a1.333 1.333 0 110-2.666 1.333 1.333 0 010 2.666z"
                                          ></path>
                                        </g>
                                      </svg>
                                    </span>
                                  </div>
                                  <div className="text">
                                    {this.props.salaryListStore.SalarySearchList.length > 0 ? (
                                      localStorage.getItem('SearchString') ? (
                                        <strong className="title">
                                          Did you mean job titles matching{' '}
                                          {localStorage.getItem('SearchString')}?
                                        </strong>
                                      ) : (
                                        <strong className="title">Top salary searches </strong>
                                      )
                                    ) : (
                                      <strong className="title">
                                        No Data found, try changing search criteria{' '}
                                      </strong>
                                    )}
                                    {/*localStorage.getItem('SearchString') ? (
                                      <strong className="title">
                                        Did you mean job titles matching{' '}
                                        {localStorage.getItem('SearchString')}?
                                      </strong>
                                    ) : (
                                      <strong className="title">Top salary searches </strong>
                                    )*/}
                                  </div>
                                </div>
                              </div>
                              {this.props.salaryListStore.SalarySearchList.map((salary) => (
                                <SalaryCard
                                  salary={salary}
                                  openCompanyProfile={(event) =>
                                    this.openCompanyProfile(event, salary.CompanyID)
                                  }
                                />
                              ))}{' '}
                            </div>
                          </div>

                          <div className="module pt-xxsm">
                            {this.props.salaryListStore.SalarySearchList.length > 0 ? (
                              <PaginationComponent
                                PageCount={this.props.salaryListStore.PageCount}
                                PageNo={this.props.salaryListStore.PageNo}
                                onPageClick={(e) => {
                                  this.onPageClick(e);
                                }}
                              />
                            ) : (
                              ''
                            )}
                          </div>
                        </article>
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

// export default salaryList;
const mapStateToProps = (state) => {
  const { salaryListStore } = state.SalaryListReducer;

  return {
    salaryListStore,
  };
};
// export default CompanySearchResults;
const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
    updateSalaryList: (payload) => {
      dispatch({
        type: updateSalaryList,
        payload,
      });
    },
  };
};

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(salaryList);
