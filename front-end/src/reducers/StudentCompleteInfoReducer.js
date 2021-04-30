import { updateStudentProfile } from '../constants/action-types';

const defaultState = {
  studentInfoStore: {
    studentProfile: {
      Name: '',
      CurrentJobTitle: '',
      PhoneNo: '',
      AboutMe: '',
      Skills: [],
      Website: '',
      StreetAddress: '',
      City: '',
      State: '',
      Country: '',
      Zip: '',
      Disability: '',
      Gender: '',
      Race: [],
      VeteranStatus: '',
      FavouriteJobs: [],
      JobStatus: '',
      PreferredJobTitle: '',
      JobType: [],
      Resumes: [],
      AppliedJobs: [],
      PreferredIndustry: '',
    },
  },
};

const StudentCompleteInfoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateStudentProfile: {
      return {
        ...state,
        studentInfoStore: { ...state.studentInfoStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default StudentCompleteInfoReducer;
