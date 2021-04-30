import { updateSalaryList } from '../constants/action-types';

const defaultState = {
  salaryListStore: {
    SalarySearchList: [],
    PageNo: 0,
    PageCount: 5,
    Totalcount: 10,
  },
};

const SalaryListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateSalaryList: {
      return {
        ...state,
        salaryListStore: { ...state.salaryListStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default SalaryListReducer;
