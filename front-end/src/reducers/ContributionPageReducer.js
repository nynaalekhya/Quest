import { updateContributionOption } from '../constants/action-types';

const defaultState = {
  contributionOptionStore: {
    radioSelected: 'CompanyReview',
    employmentStatus: 'Current',
    companyList: [],
    employerName: '',
  },
};

const ContributionPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateContributionOption: {
      return {
        ...state,
        contributionOptionStore: { ...state.contributionOptionStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default ContributionPageReducer;
