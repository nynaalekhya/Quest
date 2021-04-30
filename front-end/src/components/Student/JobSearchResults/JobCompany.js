import React, { Component } from 'react';
import './JobCompany.css';
import moment from 'moment';
import axios from 'axios';
import serverUrl from '../../../config';
import { updateCompanyPhotosStore } from '../../../constants/action-types';
import { connect } from 'react-redux';

class JobCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/companyPhotos', {
        params: {
          CompanyID: this.props.selectedJob.CompanyID,
          PageNo: 0,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          let payload = {
            PhotoList: response.data.results,
            PageNo: 0,
            Totalcount: response.data.count,
            PageCount: Math.ceil(response.data.count / 10),

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateCompanyPhotosStore(payload);
        },
        (error) => {}
      );
  }

  render() {
    const selectedJob = this.props.selectedJob;
    return (
      <div id="CompanyContainer" className="tabSection pad">
        <div id="EmpBasicInfo" className="empBasicInfo" data-emp-id="100431">
          <div>
            <header className="margBot">
              <h2 className="h2 tightVert">Overview</h2>
            </header>
            <div id="jobCompany" className="info row">
              <div className="infoEntity">
                <label>Size</label>
                <span className="value">
                  {' '}
                  {selectedJob.jobdetails.length > 0 ? selectedJob.jobdetails[0].Size : ''}{' '}
                  Employees approx.
                </span>
              </div>
              <div className="infoEntity">
                <label>Founded</label>
                <span className="value">
                  {selectedJob.jobdetails.length > 0
                    ? moment(selectedJob.jobdetails[0].Founded).format('YYYY')
                    : ''}
                </span>
              </div>
              <div className="infoEntity">
                <label>Type</label>
                <span className="value">
                  Company -{' '}
                  {selectedJob.jobdetails.length > 0 ? selectedJob.jobdetails[0].Type : ''}
                </span>
              </div>
              <div className="infoEntity">
                <label>Industry</label>
                <span className="value">
                  {' '}
                  {selectedJob.jobdetails.length > 0 ? selectedJob.jobdetails[0].Industry : ''}
                </span>
              </div>

              <div className="infoEntity">
                <label>Revenue</label>
                <span className="value">
                  {selectedJob.jobdetails.length > 0
                    ? selectedJob.jobdetails[0].Revenue
                    : 'Unknown / Non-Applicable'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="empPhotos noPad">
          <header className="margBot">
            <h2 className="h2 tightVert">{selectedJob.CompanyName} Photos</h2>
          </header>
          <div className="photos">
            <div className="spacer"></div>
            <div className="photoSlider">
              {this.props.companyPhotosStore.PhotoList.length > 0
                ? this.props.companyPhotosStore.PhotoList.map((photo) => (
                    <a href="" target="_blank" rel="noopener noreferrer" className="photo">
                      <figure data-id="13658880" data-num="1">
                        <img alt="Company pic" className="companyPhoto" src={photo.PhotoURL} />
                      </figure>
                    </a>
                  ))
                : ''}
            </div>
            <a style={{ textAlign: 'center' }} class="seeAll" href="#" rel="noopener noreferrer">
              Few of the company Photos<i class="css-1cip1pj"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

// export default JobCompany;

const mapStateToProps = (state) => {
  const { companyOverviewStore, companyPhotosStore } = state.CompanyPageReducer;

  return {
    companyOverviewStore,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobCompany);
