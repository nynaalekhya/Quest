import React, { Component } from 'react';
import '../Salary/Salaries.css';
import PhotoCard from './PhotoCard';
import PaginationComponent from '../../Common/PaginationComponent';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updateStudentPhotosStore } from '../../../../constants/action-types';
import { connect } from 'react-redux';

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.commonFetch();
  }

  commonFetch = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/studentCompanyPhotos', {
        params: {
          PageNo,
          StudentID: localStorage.getItem('userId'),
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('studentCompanyPhotos', response.data);
          let payload = {
            PhotoList: response.data.results,
            PageNo,
            Totalcount: response.data.count,
            PageCount: Math.ceil(response.data.count / 10),

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateStudentPhotosStore(payload);
        },
        (error) => {
          console.log('error', error);
        }
      );
  };

  onPageClick = (e) => {
    // console.log('Page Clicked:', e.selected);
    this.commonFetch(e.selected);
  };

  delete = (event, ID) => {
    event.preventDefault();
    console.log('ID:', ID);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      ID,
    };
    axios.post(serverUrl + 'student/deletePhoto', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.commonFetch(this.props.studentPhotosStore.PageNo);
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  render() {
    return (
      <div id="MainCol" class="col span-3-4 noPadLt padRt">
        <div class="module" id="MyAccountSalaries">
          <h1>Photos</h1>
          {/*<a
            href="#"
            id="AddPhoto"
            class="gd-btn gd-btn-link gradient gd-btn-1 gd-btn-med ctaButtons margBot"
          >
            <span>Add Photos</span>
            <i class="hlpr"></i>
          </a>*/}
          <p>
            {' '}
            The Glassdoor team reviews every piece of content submitted by users, so please be
            patient. Contributions with the 'Pending' status are being reviewed, and will appear on
            the site once they are approved.
          </p>
          <table class="std fill tbl">
            <thead>
              <tr>
                <th class="summary wide9 middle">Details</th>
                <th class="empStatus center middle">Submitted</th>
                <th class="submitted hideMob middle center">
                  Status [
                  <span
                    class="tt link"
                    title="<table id='StatusHelp'> <caption>About Review Status</caption> <tr> <th>Approved</th> <td> The review is currently available on the site.</td> </tr> <tr> <th>Archived</th> <td> The review is no longer available on the site in an effort to reduce out-of-date or duplicate data.</td> </tr> <tr> <th>Pending</th> <td> The review is currently awaiting approval by the Glassdoor team.</td> </tr> <tr> <th>Removed</th> <td> The review is not available on the site due to a violation of our <a href='/about/guidelines.htm' target='guidelines'>Community Guidelines</a> or due to a failure to meet our minimum requirements for review detail.</td> </tr> <tr> <th>Verification Needed</th> <td> The review needs additional verification from you. To do so, please click 'Verification Needed' and you will be taken to a screen with additional directions.</td> </tr> </table>"
                  >
                    ?
                  </span>
                  ]{' '}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.studentPhotosStore.PhotoList.length === 0 ? (
                <tr>
                  <td colspan="4">
                    <p> You have not yet submitted any Photos. </p>
                  </td>
                </tr>
              ) : (
                ''
              )}
              {this.props.studentPhotosStore.PhotoList.map((photo) => (
                <PhotoCard
                  delete={(event) => this.delete(event, photo.ID)}
                  photo={photo}
                  openCompanyProfile={(event) => this.props.openCompanyProfile(event)}
                />
              ))}
            </tbody>
          </table>
          {this.props.studentPhotosStore.PhotoList.length > 0 ? (
            <PaginationComponent
              PageCount={this.props.studentPhotosStore.PageCount}
              PageNo={this.props.studentPhotosStore.PageNo}
              onPageClick={(e) => {
                this.onPageClick(e);
              }}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

// export default Photos;

const mapStateToProps = (state) => {
  const { studentPhotosStore } = state.StudentContributionsReducer;
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    studentPhotosStore,
    studentInfoStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudentPhotosStore: (payload) => {
      dispatch({
        type: updateStudentPhotosStore,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
