import { updateCompanyProfile } from '../constants/action-types';

const defaultState = {
  companyInfo: {
    CompanyName: '',
    Website: '',
    Size: '',
    ProfileImg: '',
    Type: '',
    Revenue: '',
    Headquarter: '',
    Industry: '',
    Founded: '',
    CompanyDescription: '',
    CompanyMission: '',
    CEO: '',
    City: '',
    State: '',
    FeaturedReview: {},
    CoverPhoto: '',
  },
};

const CompaniesProfileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateCompanyProfile: {
      return {
        ...state,
        companyInfo: { ...state.companyInfo, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default CompaniesProfileReducer;
