import { switchTab } from '../constants/action-types';

const defaultState = {
  companyNavbarStore: {
    selectedTab: 'Overview',
  },
  companyProfileStore: {
    companyProfile: [],
  },
};

const CompanyResultPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case switchTab: {
      return {
        ...state,
        companyNavbarStore: { ...state.companyNavbarStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default CompanyResultPageReducer;
