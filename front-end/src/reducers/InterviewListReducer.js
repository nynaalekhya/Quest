import { updateInterviewList } from '../constants/action-types';

const defaultState = {
  interviewListStore: {
    interviewSearchList: [],
    PageNo: 0,
    PageCount: 0,
    Totalcount: 0,
    PendingTab: false,
    ApprovedTab: false,
    DisapprovedTab: false,
  },
};

const InterviewListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateInterviewList: {
      return {
        ...state,
        interviewListStore: { ...state.interviewListStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default InterviewListReducer;
