import { showSignupModal, hideSignupModal } from '../constants/action-types';

const defaultState = {
  sinupModalStore: {
    popSeen: false,
  },
};

const SignupModalViewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case showSignupModal: {
      return {
        ...state,
        sinupModalStore: { ...state.sinupModalStore, popSeen: true },
        //   return Object.assign(state, action.payload);
      };
    }
    case hideSignupModal: {
      return {
        ...state,
        sinupModalStore: { ...state.sinupModalStore, popSeen: false },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default SignupModalViewReducer;
