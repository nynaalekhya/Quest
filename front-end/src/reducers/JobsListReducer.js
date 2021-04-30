import { updateJobList, updateJobSelectList } from '../constants/action-types';

const defaultState = {
  jobsStore: {
    jobsList: [],
    PageNo: 0,
    PageCount: 5,
    Totalcount: 10,
  },
  jobSelectStore: {
    jobsInfo: {},
    ApplicantCount: 0,
  },
};

const JobsListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateJobList: {
      return {
        ...state,
        jobsStore: { ...state.jobsStore, ...action.payload1 },
        //   return Object.assign(state, action.payload);
      };
    }
    case updateJobSelectList: {
      return {
        ...state,
        jobSelectStore: { ...state.jobSelectStore, ...action.payload2 },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default JobsListReducer;
