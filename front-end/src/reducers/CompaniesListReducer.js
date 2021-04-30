import { updateCompanyList } from '../constants/action-types';

const defaultState = {
  companyListStore: {
    companyList: [],
    PageNo: 0,
    PageCount: 5,
    Totalcount: 10,
  },
};

const CompaniesListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateCompanyList: {
      return {
        ...state,
        companyListStore: { ...state.companyListStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default CompaniesListReducer;
