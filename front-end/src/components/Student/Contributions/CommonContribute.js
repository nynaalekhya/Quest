import React, { Component } from 'react';
import ChooseOption from './ChooseOption';
import './CommonContribute.css';
import { LowerNavBarOther, updateCompanyList } from '../../../constants/action-types';
import { connect } from 'react-redux';

class CommonContribute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <header id="header">
          <div class="background">
            <nav>
              <div class="logoContainer">
                <a class="logo green " aria-label="Go To Glassdoor homepage"></a>
              </div>
            </nav>
          </div>
        </header>
        <div></div>
        <ChooseOption />
      </div>
    );
  }
}

// export default CommonContribute;
const mapStateToProps = (state) => {
  const { companyListStore } = state.CompaniesListReducer;
  return {
    companyListStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
    updateCompanyList: (payload) => {
      dispatch({
        type: updateCompanyList,
        payload,
      });
    },
  };
};

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(CommonContribute);
