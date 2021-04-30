import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContactInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="profileInfoStyle__edit___1qogn">
        <div class="d-flex justify-content-center align-items-center mb">
          <div class="profileInfoStyle__headingButtonGroup___2UKMP css-g7wkni">
            <button
              onClick={(event) => this.props.switchTab(event, 'BasicInformation')}
              class="gd-ui-button  css-ymq3jr"
            >
              Basic Information
            </button>
            <button
              onClick={(event) => this.props.switchTab(event, 'ContactInformation')}
              class="gd-ui-button  css-1iue7ku"
            >
              Contact Information
            </button>
          </div>
        </div>
        <div class="pb-sm css-1ohf0ui">
          <label for="address1" class="css-1opum1l">
            <span>Address (Street)</span>
          </label>
          <div class="input-wrapper css-q444d9">
            <input
              onChange={this.props.onChangeCommonHandler}
              name="StreetAddress"
              id="address1"
              data-test="address1"
              maxlength="400"
              aria-label=""
              class="css-ofiv3k"
              value={this.props.studentProfile.StreetAddress}
            />
          </div>
        </div>
        <div class="pb-sm css-1ohf0ui">
          <label for="cityName" class="css-1opum1l">
            <span>City</span>
          </label>
          <div class="input-wrapper css-q444d9">
            <input
              onChange={this.props.onChangeCommonHandler}
              value={this.props.studentProfile.City}
              name="City"
              id="cityName"
              data-test="city"
              maxlength="100"
              aria-label=""
              class="css-ofiv3k"
            />
          </div>
        </div>
        <div class="no-gutters d-flex flex-row justify-content-between align-items-center">
          <div class="col-6 pr-xsm pb-sm css-1ohf0ui">
            <label for="stateName" class="css-1opum1l">
              <span>State</span>
            </label>
            <div class="input-wrapper css-q444d9">
              <select
                style={{ backgroundColor: '#fff' }}
                id="stateName"
                data-test="state"
                maxlength="100"
                aria-label=""
                class="css-ofiv3k"
                onChange={this.props.onChangeCommonHandler}
                value={this.props.studentProfile.State}
                name="State"
              >
                <option value=""></option>
                {this.props.masterData.States.map((state) => (
                  <option value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
          <div class="col-6 pl-xsm pb-sm css-1ohf0ui">
            <label for="zip" class="css-1opum1l">
              <span>Zip</span>
            </label>
            <div class="input-wrapper css-q444d9">
              <input
                id="zip"
                data-test="zip"
                maxlength="5"
                aria-label=""
                class="css-ofiv3k"
                onChange={this.props.onChangeCommonHandler}
                value={this.props.studentProfile.Zip}
                name="Zip"
              />
            </div>
          </div>
        </div>
        <div class="pb-sm css-1ohf0ui">
          <label for="phone" class="css-1opum1l">
            <span>Phone Number</span>
          </label>
          <div class="input-wrapper css-q444d9">
            <input
              id="phone"
              data-test="phone"
              aria-label=""
              class="css-ofiv3k"
              onChange={this.props.onChangeCommonHandler}
              value={this.props.studentProfile.PhoneNo}
              name="PhoneNo"
              maxlength="10"
            />
          </div>
        </div>
        <div class="pb-sm css-1ohf0ui">
          <label for="" class="css-1opum1l">
            <span>Website</span>
          </label>
          <div class="input-wrapper css-q444d9">
            <input
              data-test="newWebsite-1"
              maxlength="1000"
              aria-label=""
              class="css-ofiv3k"
              onChange={this.props.onChangeCommonHandler}
              value={this.props.studentProfile.Website}
              name="Website"
            />
          </div>
        </div>
      </div>
    );
  }
}

// export default ContactInformation;
const mapStateToProps = (state) => {
  const { masterData } = state.staticDataReducer;

  return {
    masterData,
  };
};

// export default LeftBlock;
export default connect(mapStateToProps, null)(ContactInformation);
