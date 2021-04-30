import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../../config';
import Navbar from '../Common/Navbar';
import LeftBlock from './LeftBlock';
import RightBlock from './RightBlock';
import './Home.css';
import { history } from '../../../App';
import { openProfileTabOnClick } from '../../../constants/action-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { jobList: [] };
  }
  componentDidMount() {
    if (localStorage.getItem('userrole') === 'student') {
      localStorage.setItem('SearchString', '');
      localStorage.setItem('Location', '');
      localStorage.setItem('openTab', '');
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios
        .get(serverUrl + 'student/jobSuggestions', {
          params: { StudentID: localStorage.getItem('userId') },
          withCredentials: true,
        })
        .then((response) => {
          this.setState({
            jobList: response.data,
          });
        });
    }
  }
  openProfile = () => {
    history.push('/Profile');
    localStorage.setItem('openTab', 'Profile');
    let payload = { openTab: 'Profile' };
    this.props.openProfileTabOnClick(payload);
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
    return (
      <div style={{ background: '#fff' }}>
        {/*<Navbar />*/}
        <div id="Discover">
          <div>
            <div>
              <div className="container-max-width mx-auto px-std px-md-lg pt-xsm pt-md-xxl pb-xxl">
                <div className="d-flex flex-direction-column row">
                  {<LeftBlock openProfile={this.openProfile} />}
                  {<RightBlock jobList={this.state.jobList} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default Home;
const mapDispatchToProps = (dispatch) => {
  return {
    openProfileTabOnClick: (payload) => {
      dispatch({
        type: openProfileTabOnClick,
        payload,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Home);
