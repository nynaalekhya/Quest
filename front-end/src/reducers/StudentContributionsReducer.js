import {
  updateStudentReviewsStore,
  updateStudentInterviewStore,
  updateStudentSalariesStore,
  updateStudentPhotosStore,
} from '../constants/action-types';

const defaultState = {
  studentReviewsStore: {
    ReviewList: [],
    PageNo: 0,
    Totalcount: 0,
    PageCount: 0,
  },
  studentInterviewStore: {
    InterViewList: [],
    PageNo: 0,
    Totalcount: 0,
    PageCount: 0,
  },
  studentSalariesStore: {
    SalaryList: [],
    PageNo: 0,
    Totalcount: 0,
    PageCount: 0,
  },
  studentPhotosStore: {
    PhotoList: [],
    PageNo: 0,
    Totalcount: 0,
    PageCount: 0,
  },
};

const StudentContributionsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateStudentReviewsStore: {
      return {
        ...state,
        studentReviewsStore: { ...state.studentReviewsStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }
    case updateStudentInterviewStore: {
      return {
        ...state,
        studentInterviewStore: { ...state.studentInterviewStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }
    case updateStudentSalariesStore: {
      return {
        ...state,
        studentSalariesStore: { ...state.studentSalariesStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }
    case updateStudentPhotosStore: {
      return {
        ...state,
        studentPhotosStore: { ...state.studentPhotosStore, ...action.payload },

        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default StudentContributionsReducer;
