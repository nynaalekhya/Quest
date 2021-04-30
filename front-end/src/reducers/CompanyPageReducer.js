import {
  updateCompanyOverview,
  updatespecialReviews,
  updateCompanyReviewsStore,
  updateCompanyJobStore,
  updateCompanyInterviewStore,
  updateCompanySalariesStore,
  updateCompanyPhotosStore,
} from '../constants/action-types';

const defaultState = {
  companyOverviewStore: {
    companyOverview: {},
    featuredReview: {},
    positiveReview: {},
    negatieReview: {},
  },
  companyReviewsStore: {
    ReviewList: [],
    PageNo: 0,
    Totalcount: 0,
    PageCount: 0,
    PendingTab: false,
    ApprovedTab: false,
    DisapprovedTab: false,
  },
  companyJobStore: {
    JobList: [],
    PageNo: 0,
    Totalcount: 0,
    PageCount: 0,
  },
  companyInterviewStore: {
    InterViewList: [],
    PageNo: 0,
    Totalcount: 0,
    PageCount: 0,
    avgDifficulty: 0,
    negative: 0,
    neutral: 0,
    positive: 0,
  },
  companySalariesStore: {
    SalaryList: [],
    PageNo: 0,
    Totalcount: 0,
    PageCount: 0,
    PendingTab: false,
    ApprovedTab: false,
    DisapprovedTab: false,
  },
  companyPhotosStore: {
    PhotoList: [],
    PageNo: 0,
    Totalcount: 0,
    PageCount: 0,
    PendingTab: false,
    ApprovedTab: false,
    DisapprovedTab: false,
  },
};

const CompanyPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateCompanyOverview: {
      return {
        ...state,
        companyOverviewStore: { ...state.companyOverviewStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }
    case updatespecialReviews: {
      return {
        ...state,
        companyOverviewStore: { ...state.companyOverviewStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }
    case updateCompanyReviewsStore: {
      return {
        ...state,
        companyReviewsStore: { ...state.companyReviewsStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }
    case updateCompanyJobStore: {
      return {
        ...state,
        companyJobStore: { ...state.companyJobStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }
    case updateCompanyInterviewStore: {
      return {
        ...state,
        companyInterviewStore: { ...state.companyInterviewStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }
    case updateCompanySalariesStore: {
      return {
        ...state,
        companySalariesStore: { ...state.companySalariesStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }

    case updateCompanyPhotosStore: {
      console.log('inside company interview store');
      return {
        ...state,
        companyPhotosStore: { ...state.companyPhotosStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default CompanyPageReducer;
