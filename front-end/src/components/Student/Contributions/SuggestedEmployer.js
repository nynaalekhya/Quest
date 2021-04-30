import React, { Component } from 'react';
import { connect } from 'react-redux';

class SuggestedEmployer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ul class="suggestions down">
        {this.props.searchStrings.map((string) => (
          <li onClick={(event) => this.props.selectString(event, string)}>
            <div class="" role="presentation">
              <span>
                <span class="suggestionLabel">{string.name}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

// export default SuggestedEmployer;
const mapStateToProps = (state) => {
  const { contributionOptionStore } = state.ContributionPageReducer;
  return {
    contributionOptionStore,
  };
};
// export default SuggestedNames;
export default connect(mapStateToProps, null)(SuggestedEmployer);
