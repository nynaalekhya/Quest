import React, { Component } from 'react';
//import LeftBlock from '../LandingPage/LeftBlock.js';
import '../LandingPage/Body.css';
import './RightBlock.css';
import RightBlock from './RightBlock.js';
import axios from 'axios';
import serverUrl from '../../../config.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateReviewList } from '../../../constants/action-types';

class ReviewsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      authFlag: false,
      updateProfile: false,
    };
  }

  fetchReviews = (PageNo = 0) => {
    console.log('inside companh reviews');
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'company/review', {
        params: { CompanyID: localStorage.getItem('userId'), PageNo },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          console.log('response', response.data);
          let payload1 = {
            reviewList: response.data.results,
            PageNo,
            PageCount: Math.ceil(response.data.count / 10),
            Totalcount: response.data.count,
            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };           
          console.log('payload',payload1);
          this.props.updateReviewList(payload1);          
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'No Reviews Found',
        });
      });
  };

  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'student') {
        return <Redirect to="/Home" />;
        //console.log('redirect for student');
      } else if (localStorage.getItem('userrole') === 'admin') {
        return <Redirect to="/AdminHomePage" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div id="UserProfilePageContent" class>
          <div id="UserProfile" class="gdGrid Container">
            <div class="css-1tgr9d eds5rs80">
              <div class="applicationStyle__profileApplication___Jyu4n" style={{maxWidth: "1280px"}}>
                <div
                  class="row flex-column flex-md-row p-0 px-md-lg py-md-xxl"
                  style={{ display: 'flex' }}
                >
                  {<RightBlock fetchReviews={(PageNo) => this.fetchReviews(PageNo)} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {    
  return {
    updateReviewList: (payload1) => {
      dispatch({
        type: updateReviewList,
        payload1,
      });
    },        
  };
};

export default connect(null, mapDispatchToProps)(ReviewsHome);

//export default ReviewsHome;
