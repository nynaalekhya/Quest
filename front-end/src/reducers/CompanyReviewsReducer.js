import { updateCompanyReviews } from '../constants/action-types';

const defaultState = {
  companyReviewStore: {
    companyReviews: [],
  },
};

const CompaniesReviewsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateCompanyReviews: {
      return {
        ...state,
        companyReviewStore: { ...state.companyReviewStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default CompaniesReviewsReducer;
