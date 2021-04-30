import { showPostJobModal, hidePostJobModal } from '../constants/action-types';

const defaultState = {
  postJobModalStore: {
    popSeen: false,
  },
};

const PostJobModalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case showPostJobModal: {
      return {
        ...state,
        postJobModalStore: { ...state.postJobModalStore, popSeen: true },
        //   return Object.assign(state, action.payload);
      };
    }
    case hidePostJobModal: {
      return {
        ...state,
        postJobModalStore: { ...state.postJobModalStore, popSeen: false },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default PostJobModalReducer;
