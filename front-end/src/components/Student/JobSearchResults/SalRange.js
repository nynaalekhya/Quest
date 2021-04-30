import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateJobFilterStore } from '../../../constants/action-types';

class SalRange extends Component {
  constructor(props) {
    super(props);
    this.state = { StartSalary: 0, UptoSalary: 0 };
  }
  onCommonCHangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  selectFilter = (event) => {
    this.props.filterChangeCall(
      this.props.jobListStore.JobType,
      this.props.jobListStore.State,
      this.state.StartSalary,
      this.state.UptoSalary,
      0
    );
  };
  cancel = (event) => {
    const payload = {
      fiterSlected: '',
    };
    this.props.updateJobFilterStore(payload);
  };
  render() {
    let salRange =
      '$' + this.props.jobListStore.SalStart + 'K-$' + this.props.jobListStore.SalEnd + 'K';
    if (this.props.jobListStore.SalStart === this.props.jobListStore.SalEnd) {
      salRange = 'All salaries';
    }

    return (
      <div
        style={{ width: '65%' }}
        data-test="salRangeFilterWrapper"
        className="css-zchhs8 eq4mdy51"
      >
        <div>
          <div className="salRangeFilter pad css-1sb7ngv eq4mdy50">
            <div className="gd-ui-slider  css-105ljcl">
              <div className="histogramLabel" id="salary-range-hist-label">
                <h4 className="salRange"> {salRange}</h4>
              </div>
              <div className="slideContainer" style={{ display: 'flex', height: '50px' }}>
                <div className="ml-xsm col-4 p-0 headerSearchInput search__SearchStyles__searchBarLocationInput css-1ohf0ui">
                  <div className="input-wrapper css-q444d9" style={{ flexDirection: 'row' }}>
                    <h4 className="salRange">$</h4>
                    <input
                      style={{ minWidth: '10px' }}
                      onChange={this.onCommonCHangeHandler}
                      name="StartSalary"
                      type="number"
                      id="sc.location"
                      placeholder="From"
                      data-test="search-bar-location-input"
                      aria-label=""
                      className="css-1etjok6"
                      autocomplete="off"
                      value={this.state.StartSalary}
                    />
                    <h4 className="salRange">K</h4>
                    <div
                      className="autocomplete-suggestions "
                      style={{ left: '0px', top: '41px', width: '266px' }}
                    ></div>
                  </div>
                </div>
                <div className="ml-xsm col-4 p-0 headerSearchInput search__SearchStyles__searchBarLocationInput css-1ohf0ui">
                  <div className="input-wrapper css-q444d9" style={{ flexDirection: 'row' }}>
                    <h4 className="salRange">$</h4>
                    <input
                      style={{ minWidth: '10px' }}
                      onChange={this.onCommonCHangeHandler}
                      name="UptoSalary"
                      type="number"
                      id="sc.location"
                      placeholder="To"
                      data-test="search-bar-location-input"
                      aria-label=""
                      className="css-1etjok6"
                      autocomplete="off"
                      value={this.state.UptoSalary}
                    />
                    <h4 className="salRange">K</h4>
                    <div
                      className="autocomplete-suggestions "
                      style={{ left: '0px', top: '41px', width: '266px' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="spacer"></div>
          </div>
        </div>
        <div className="buttons hideHH noPadTop">
          <button
            onClick={this.cancel}
            className="cancelButton gd-btn gd-btn-link gradient gd-btn-3 gd-btn-sm"
          >
            {' '}
            Cancel
          </button>
          <button
            onClick={this.selectFilter}
            className="applybutton gd-btn gd-btn-link gradient gd-btn-2 gd-btn-sm"
            style={{ backgroundColor: '#1861bf' }}
          >
            Apply
          </button>
        </div>
      </div>
    );
  }
}

// export default SalRange;
const mapStateToProps = (state) => {
  const { jobListStore } = state.JobSearchPageReducer;
  const { masterData } = state.staticDataReducer;

  return {
    jobListStore,
    masterData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateJobFilterStore: (payload) => {
      dispatch({
        type: updateJobFilterStore,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalRange);
