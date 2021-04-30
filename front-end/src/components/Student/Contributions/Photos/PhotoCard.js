import React, { Component } from 'react';
import moment from 'moment';
import { switchTab } from '../../../../constants/action-types';
import { connect } from 'react-redux';

class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openCompanyTab = (event, tab) => {
    const payload = {
      selectedTab: tab,
    };
    //CompanySalaries
    //CompanyInterviews
    //GeneralReview
    localStorage.setItem('companyID', this.props.photo.CompanyID);
    this.props.switchTab(payload);
    this.props.openCompanyProfile(event);
  };

  render() {
    const photo = this.props.photo;
    return (
      <tr>
        <td class="summary">
          <a href="#" onClick={(event) => this.openCompanyTab(event, 'CompanyPhotos')}>
            <p>
              Company: <strong>{photo.CompanyName}</strong>
            </p>
          </a>
          <img style={{ width: '100px', height: '100px' }} src={photo.PhotoURL}></img>
        </td>
        <td class="submitted center"> {moment(photo.DateUploaded).format('ll')}</td>
        <td class="itemStatus hideMob center"> {photo.Status}</td>
        {/*  <td class="actions center noWrap">
       
          <a href="#" onClick={(event) => this.props.delete(event)}>
            Delete
          </a>
    </td>*/}
      </tr>
    );
  }
}

// export default PhotoCard;
const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (payload) => {
      dispatch({
        type: switchTab,
        payload,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(PhotoCard);
