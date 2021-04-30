import { updateMasterData } from '../constants/action-types';

const defaultState = {
  masterData: {
    Countries: [],
    Gender: [],
    VeteranStatus: [],
    Disability: [],
    States: [],
    Status: [],
    JobType: [],
    Ethnicity: [],
  },
};

const staticDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateMasterData: {
      return {
        ...state,
        masterData: { ...state.masterData, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default staticDataReducer;
