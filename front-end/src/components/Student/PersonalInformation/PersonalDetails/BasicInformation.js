import React, { Component } from 'react';

class BasicInformation extends Component {
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
              class="gd-ui-button  css-1iue7ku"
            >
              Basic Information
            </button>
            <button
              onClick={(event) => this.props.switchTab(event, 'ContactInformation')}
              class="gd-ui-button  css-ymq3jr"
            >
              Contact Information
            </button>
          </div>
        </div>
        <div class="pb-sm css-1ohf0ui">
          <label for="fname" class="css-1opum1l">
            <span>Name</span>
          </label>
          <div class="input-wrapper css-q444d9">
            <input
              onChange={this.props.onChangeCommonHandler}
              name="Name"
              id="fname"
              data-test="firstname"
              aria-label=""
              class="css-ofiv3k"
              value={this.props.studentProfile.Name}
            />
          </div>
        </div>
        <div class="pb-sm css-1ohf0ui">
          <label for="Autocomplete-c1513d-2600-21dc-4351-68f716dd3ef" class="css-1opum1l">
            <span>Title</span>
          </label>
          <div aria-expanded="false" role="combobox" aria-autocomplete="list" class="css-1xtvih1">
            <div class=" css-1ohf0ui">
              <div class="input-wrapper css-q444d9">
                <input
                  onChange={this.props.onChangeCommonHandler}
                  placeholder=""
                  autocomplete="off"
                  name="CurrentJobTitle"
                  id="Autocomplete-c1513d-2600-21dc-4351-68f716dd3ef"
                  data-test=""
                  aria-label="Title"
                  class="css-ofiv3k"
                  value={this.props.studentProfile.CurrentJobTitle}
                />
              </div>
            </div>
            <ul class="suggestions down"></ul>
            <div>
              <div data-test="FilterChips"></div>
            </div>
          </div>
        </div>

        <div class="pb-sm profileInfoStyle__basicInfoSpacer___1IUs8 css-1ohf0ui">
          <label for="email" class="css-1opum1l">
            <span>Email Address</span>
          </label>
          <div class="input-wrapper css-q444d9">
            <input
              id="email"
              data-test="email"
              maxlength="400"
              aria-label=""
              class="css-ofiv3k"
              value={this.props.studentProfile.Email}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BasicInformation;
