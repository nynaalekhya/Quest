import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../../config.js';
import './ApplicantsList.css';
import PaginationComponent from '../../Student/Common/PaginationComponent';
import { hideApplicantsModal, updateApplicantStatus } from '../../../constants/action-types';
import { connect } from 'react-redux';
import { history } from '../../../App';
import ApplicantModel from './ApplicantModel.js';

class ApplicantsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDropDownOpen: false,
      applicantStatus: 'Submitted',
    };
  }

  onChangeReply = (e) => {
    this.setState({
      Response: e.target.value,
    });
  };

  componentDidMount() {
    console.log('props', this.props);
    this.props.fetchApplicants(this.props.applicantsListStore.PageNo);
  }

  onPageClick = (e) => {
    this.props.fetchApplicants(e.selected);
  };

  openFilterDropDown = () => {
    this.setState({
      filterDropDownOpen: !this.state.filterDropDownOpen,
    });
  };

  updateApplicantStatus = (event, applicantStatusDropDown) => {
    event.preventDefault();
    this.setState({
      applicantStatus: applicantStatusDropDown,
    });
    const payload2 = {
      applicantStatusDropDown,
    };
    this.props.updateApplicantStatus(payload2);
  };

  cancelChanges = () => {
    this.props.hideApplicantsModal();
  };

  saveChanges = (event, JobId, StudentId, applicantStatus) => {
    event.preventDefault();
    let appllicantInfo = {
      JobID: JobId,
      StudentID: StudentId,
      Status: applicantStatus,
    };
    console.log('state', this.state);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post(serverUrl + 'company/jobsApplicantUpdate', appllicantInfo)
      .then((response) => {
        if (response.status == 200) {
          this.props.hideApplicantsModal();
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'Applicant status not saved',
        });
      });
  };

  handleStudentName = (e, studentId) => {
    localStorage.setItem('StudentId', studentId);
    history.push('/ApplicantProfile');
  };

  render() {
    const len = this.props.applicantsListStore.applicantsList.length;
    console.log('len', len);
    return (
      <article class="mr-0 mr-md-std css-8atqhb ep6ayhb0">
        <div data-test="employer-salaries">
          <h1>Applicants Applied</h1>
          {len > 0
            ? this.props.applicantsListStore.applicantsList.map((listitem) => (
                <ApplicantModel
                  listitem={listitem}
                  saveChanges={(event, JobId, StudentId, applicantStatus) =>
                    this.saveChanges(event, JobId, StudentId, applicantStatus)
                  }
                />
              ))
            : ''}
        </div>
        {len > 0 ? (
          <div className="tbl fill padHorz margVert" id="ResultsFooter">
            <div className="cell middle hideMob padVertSm" data-test="page-x-of-y">
              Page {this.props.applicantsListStore.PageNo + 1} of{' '}
              {this.props.applicantsListStore.PageCount}
            </div>
            <div className="module pt-xxsm">
              <PaginationComponent
                PageCount={this.props.applicantsListStore.PageCount}
                PageNo={this.props.applicantsListStore.PageNo}
                onPageClick={(e) => {
                  this.onPageClick(e);
                }}
              />
            </div>
          </div>
        ) : (
          <p>No Applicants applied yet!</p>
        )}
        <div class="bottomShadow"></div>
        <div class="actionBar">
          <div class="experienceStyle__actionBar___2lnIS">
            <button
              class="gd-ui-button d-none d-md-inline-block mr-md-sm mb-sm css-3ybntp"
              data-test="cancelChanges"
              onClick={() => this.cancelChanges()}
            >
              Close applicants
            </button>
          </div>
        </div>
      </article>
    );
  }
}

//export default ApplicantsList;
const mapStateToProps = (state) => {
  const {
    applicantsModalStore,
    applicantsListStore,
    applicantStatusStore,
  } = state.ApplicantsListModalReducer;
  return {
    applicantsModalStore: applicantsModalStore,
    applicantsListStore: applicantsListStore,
    applicantStatusStore: applicantStatusStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    hideApplicantsModal: (payload) => {
      dispatch({
        type: hideApplicantsModal,
        payload,
      });
    },
    updateApplicantStatus: (payload2) => {
      dispatch({
        type: updateApplicantStatus,
        payload2,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsList);
//export default ApplicantsList;
