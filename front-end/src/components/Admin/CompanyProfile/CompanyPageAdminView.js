import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../../config';
import { LowerNavBarOther, updateCompanyOverview } from '../../../constants/action-types';
import { connect } from 'react-redux';
import CompanyNavbar from './CompanyNavbar/CompanyNavbar';
import CompanyOverView from './CompanyOverView/CompanyOverView';
import CompanyReviews from './CompanyReviews/CompanyReviews';
import CompanyJobs from './CompanyJobs/CompanyJobs';
import CompanyInterviews from './CompanyInterviews/CompanyInterviews';
import CompanyPhotos from './CompanyPhotos/CompanyPhotos';
import { history } from '../../../App';
import CompanySalaries from './CompanySalaries/CompanySalaries';
import { Redirect } from 'react-router';

class CompanyPageAdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (localStorage.getItem('companyID')) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios
        .get(serverUrl + 'student/companyProfile', {
          params: { CompanyID: localStorage.getItem('companyID') },
          withCredentials: true,
        })
        .then((response) => {
          console.log('compsnyData:', response.data);
          const payload = {
            companyOverview: { ...response.data },
          };
          this.props.updateCompanyOverview(payload);
        });
      localStorage.setItem('form_company_name', '');
      localStorage.setItem('form_ceo_name', '');
      localStorage.setItem('application_job_id', '');
    }
  }

  openForm = (form) => {
    localStorage.setItem(
      'form_company_name',
      this.props.companyOverviewStore.companyOverview.CompanyName
    );
    localStorage.setItem('form_ceo_name', this.props.companyOverviewStore.companyOverview.CEO);
    history.push('/' + form);
  };
  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'company') {
        return <Redirect to="/Employer" />;
      } else if (localStorage.getItem('userrole') === 'student') {
        return <Redirect to="/Home" />;
      } else if (!localStorage.getItem('companyID')) {
        return <Redirect to="/AdminHomePage" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    this.props.LowerNavBarOther();

    return (
      <div class="pageContentWrapperStudent ">
        <div style={{ position: 'relative', width: '1024px' }} id="PageContent">
          <div id="PageBodyContents">
            <div class="pageInsideContent cf">
              <div
                id="EI-Srch"
                class="ajaxContent"
                data-page-title="Working at Amazon | Glassdoor"
                data-page-type="OVERVIEW"
                data-analytics="/employerInfo/Overview/employer-summary"
              >
                <div id="EI">
                  <div
                    id="EIOverview"
                    class="sponsoredEmployerOverview"
                    data-brandviews="PAGE:n=hub-overview:eid=6036"
                  >
                    <div class="flex-aside">
                      <CompanyNavbar openForm={(form) => this.openForm(form)} />
                      {this.props.companyNavbarStore.selectedTab === 'Overview' ? (
                        <CompanyOverView />
                      ) : (
                        ''
                      )}
                      {this.props.companyNavbarStore.selectedTab === 'GeneralReview' ? (
                        <CompanyReviews />
                      ) : (
                        ''
                      )}
                      {this.props.companyNavbarStore.selectedTab === 'CompanyJobs' ? (
                        <CompanyJobs openForm={(form) => this.openForm(form)} />
                      ) : (
                        ''
                      )}

                      {this.props.companyNavbarStore.selectedTab === 'CompanyInterviews' ? (
                        <CompanyInterviews />
                      ) : (
                        ''
                      )}

                      {this.props.companyNavbarStore.selectedTab === 'CompanyPhotos' ? (
                        <CompanyPhotos />
                      ) : (
                        ''
                      )}
                      {this.props.companyNavbarStore.selectedTab === 'CompanySalaries' ? (
                        <CompanySalaries />
                      ) : (
                        ''
                      )}
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

const mapStateToProps = (state) => {
  const { companyNavbarStore } = state.CompanyResultPageReducer;
  const { companyOverviewStore } = state.CompanyPageReducer;
  return {
    companyNavbarStore,
    companyOverviewStore,
  };
};

// export default CompanyPage;
const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
    updateCompanyOverview: (payload) => {
      dispatch({
        type: updateCompanyOverview,
        payload,
      });
    },
  };
};

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(CompanyPageAdminView);
