import { updateSearcFilter, updateLowerNavBar, updateApplicantStatus } from '../constants/action-types';

const defaultState = {
  searchDropDownStore: {
    selectedDropDown: 'Jobs',
    mainDropDown: false,
    selectedMenuoption: '',
    LowerNavBarDropdown: '',
    Location: '',
    SearchString: '',    
  },
 
};

const searchDropDownReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateSearcFilter: {
      return {
        ...state,
        searchDropDownStore: { ...state.searchDropDownStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }
    case updateLowerNavBar: {
      return {
        ...state,
        searchDropDownStore: { ...state.searchDropDownStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default searchDropDownReducer;
