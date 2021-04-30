import React, { Component } from 'react';
import Navbar from '../Common/Navbar';
import { LowerNavBarOther, updateCompanyList } from '../../../constants/action-types';
import { connect } from 'react-redux';
import './CompanySearchResults.css';
import PaginationComponent from '../Common/PaginationComponent';
import CompanyCard from './CompanyCard';
import axios from 'axios';
import serverUrl from '../../../config';
import { Redirect } from 'react-router';
import { history } from '../../../App';

class CompanySearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
  }

  commonFetch = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/searchCompany', {
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
            companyList: response.data[0],
            PageNo,
            PageCount: Math.ceil(response.data[1] / 10),
            Totalcount: response.data[1],

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateCompanyList(payload);
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

  openAddReview = (CompanyID, ceo, name) => {
    localStorage.setItem('companyID', CompanyID);
    localStorage.setItem('form_company_name', name);
    localStorage.setItem('form_ceo_name', ceo);
    history.push('/ReviewForm');
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
        {/*redirectVar*/}
        {/*<Navbar />*/}
        <div className="pageContentWrapperStudent ">
          <div style={{ width: '1024px' }} id="PageContent">
            <div id="PageBodyContents" className="meat">
              <div className="pageInsideContent cf">
                <div id="EI-Srch">
                  <div id="SearchResults">
                    <div id="ReviewSearchResults" className="flex-aside">
                      <article id="MainCol" className="mainCol">
                        <div className="companySearchHierarchies gdGrid">
                          {this.props.companyListStore.companyList.length === 0 ? (
                            <header className="px-lg-0 px">
                              <h1 className="pt-lg-std py-sm m-0">
                                No companies found, try different search criteria
                              </h1>
                            </header>
                          ) : (
                            <header className="px-lg-0 px">
                              {localStorage.getItem('SearchString') ? (
                                <h1 className="pt-lg-std py-sm m-0">
                                  {' '}
                                  {localStorage.getItem('SearchString')
                                    ? 'Showing results for'
                                    : ''}{' '}
                                  <strong className="capitalize">
                                    {localStorage.getItem('SearchString')}
                                  </strong>{' '}
                                  {localStorage.getItem('Location') ? 'in' : ''}{' '}
                                  <strong className="capitalize">
                                    {localStorage.getItem('Location')}{' '}
                                  </strong>
                                </h1>
                              ) : (
                                <h1 className="pt-lg-std py-sm m-0">
                                  {' '}
                                  Top Companies in{' '}
                                  <strong className="capitalize">
                                    {localStorage.getItem('Location')}{' '}
                                  </strong>
                                </h1>
                              )}
                              <div className="pb-lg-xxl pb-std">
                                {' '}
                                Showing{' '}
                                <strong>{this.props.companyListStore.PageNo * 10 + 1}</strong>–
                                <strong>
                                  {this.props.companyListStore.companyList.length +
                                    this.props.companyListStore.PageNo * 10}
                                </strong>{' '}
                                of <strong>{this.props.companyListStore.Totalcount}</strong>{' '}
                                Companies
                              </div>
                            </header>
                          )}
                          {this.props.companyListStore.companyList.map((company) => (
                            <div
                              key={company.CompanyID}
                              className="single-company-result module "
                              id=""
                              data-track-serp-click="true"
                              data-emp-id="6036"
                              data-serp-pos="0"
                              data-brandviews="MODULE:n=hub-companySearchResult:eid=6036"
                            >
                              <CompanyCard
                                openAddReview={() =>
                                  this.openAddReview(
                                    company.CompanyID,
                                    company.CEO,
                                    company.CompanyName
                                  )
                                }
                                openCompanyProfile={(event) =>
                                  this.openCompanyProfile(event, company.CompanyID)
                                }
                                company={company}
                              />
                            </div>
                          ))}

                          <div className="module pt-xxsm">
                            {this.props.companyListStore.companyList.length > 0 ? (
                              <PaginationComponent
                                PageCount={this.props.companyListStore.PageCount}
                                PageNo={this.props.companyListStore.PageNo}
                                onPageClick={(e) => {
                                  this.onPageClick(e);
                                }}
                              />
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

const mapStateToProps = (state) => {
  const { companyListStore } = state.CompaniesListReducer;
  return {
    companyListStore,
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
    updateCompanyList: (payload) => {
      dispatch({
        type: updateCompanyList,
        payload,
      });
    },
  };
};

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(CompanySearchResults);
