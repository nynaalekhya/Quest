import { updateActiveStringList } from '../constants/action-types';

const defaultState = {
  searchStringStore: {
    companyList: [],
    jobTitleList: [],
    activeList: [],
  },
};

const SearchStringsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateActiveStringList: {
      return {
        ...state,
        searchStringStore: { ...state.searchStringStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default SearchStringsReducer;
