import React, { Component } from 'react';
import LeftPannel from './LeftPannel/LeftPannel';
import Salaries from './Salary/Salaries';
import './ContributionPage.css';
import { connect } from 'react-redux';
import { LowerNavBarOther } from '../../../constants/action-types';
import Reviews from './Review/Reviews';
import Interview from './InterView/Interview';
import Photos from './Photos/Photos';
import { history } from '../../../App';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../../config';

class ContributionPage extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOpened: 'Salaries' };
  }
  switchTab = (event, tab) => {
    event.preventDefault();
    this.setState({
      tabOpened: tab,
    });
  };

  openCompanyProfile = (event) => {
    // localStorage.setItem('companyID', CompanyID);
    history.push('/CompanyPage');

    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = { CompanyID: localStorage.getItem('companyID') };
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
      <div class="pageContentWrapperStudent ">
        <div id="PageContent">
          <div id="PageBodyContents" class="meat">
            <div class="pageInsideContent cf">
              <div id="MyAccount">
                <div id="Account">
                  <div class="flex-grid padTop">
                    <LeftPannel
                      tabOpened={this.state.tabOpened}
                      switchTab={(event, tab) => this.switchTab(event, tab)}
                    />
                    {this.state.tabOpened === 'Salaries' ? (
                      <Salaries openCompanyProfile={(event) => this.openCompanyProfile(event)} />
                    ) : (
                      ''
                    )}
                    {this.state.tabOpened === 'Reviews' ? (
                      <Reviews openCompanyProfile={(event) => this.openCompanyProfile(event)} />
                    ) : (
                      ''
                    )}
                    {this.state.tabOpened === 'Interviews' ? (
                      <Interview openCompanyProfile={(event) => this.openCompanyProfile(event)} />
                    ) : (
                      ''
                    )}
                    {this.state.tabOpened === 'Photos' ? (
                      <Photos openCompanyProfile={(event) => this.openCompanyProfile(event)} />
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
    );
  }
}

// export default ContributionPage;
const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(ContributionPage);
