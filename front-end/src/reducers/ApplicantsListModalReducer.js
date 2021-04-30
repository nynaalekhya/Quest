import {
  showApplicantsModal,
  hideApplicantsModal,
  updateApplicantsList,
  updateApplicantStatus,
} from '../constants/action-types';

const defaultState = {
  applicantsListStore: {
    applicantsList: [],
    PageNo: 0,
    PageCount: 5,
    Totalcount: 10,
  },
  applicantsModalStore: {
    popSeen: false,
  },
  applicantStatusStore: {
    applicantStatusDropDown: 'Submitted',
  },
};

const ApplicantsListModalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case showApplicantsModal: {
      return {
        ...state,
        applicantsModalStore: { ...state.applicantsModalStore, popSeen: true },
        //   return Object.assign(state, action.payload);
      };
    }
    case hideApplicantsModal: {
      return {
        ...state,
        applicantsModalStore: { ...state.applicantsModalStore, popSeen: false },
        //   return Object.assign(state, action.payload);
      };
    }

    case updateApplicantsList: {
      return {
        ...state,
        applicantsListStore: { ...state.applicantsListStore, ...action.payload1 },
        //   return Object.assign(state, action.payload);
      };
    }

    case updateApplicantStatus: {
      return {
        ...state,
        applicantStatusDropDown: { ...state.applicantStatusDropDown, ...action.payload2 },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default ApplicantsListModalReducer;
