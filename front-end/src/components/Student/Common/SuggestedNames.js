import React, { Component } from 'react';
import { connect } from 'react-redux';

class SuggestedNames extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let styleDisplay = {
      width: '364px',
      left: '0px',
      top: '41px',
      display: 'block',
    };
    let styleHidden = {
      width: '364px',
      left: '0px',
      top: '41px',
      display: 'none',
    };

    const activeStyle =
      this.props.searchDropDownStore.SearchString.length === 0
        ? styleHidden
        : this.props.showSuggestion
        ? styleDisplay
        : styleHidden;
    return (
      <div className="autocomplete-suggestions " style={activeStyle}>
        {this.props.searchStrings.map((string) => (
          <div
            key={string}
            onClick={(event) => this.props.selectString(event, string)}
            className="autocomplete-suggestion fullFormat "
            data-val={string}
          >
            <div className="suggestion-content">
              <span>
                <span className="suggestion-content">{string}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchDropDownStore } = state.searchDropDownReducer;
  return {
    searchDropDownStore,
  };
};
// export default SuggestedNames;
export default connect(mapStateToProps, null)(SuggestedNames);
