import { openProfileTabOnClick } from '../constants/action-types';

const defaultState = {
  leftPannelStore: {
    openTab: 'Profile',
  },
};

const studentProfileLeftPanelReducer = (state = defaultState, action) => {
  switch (action.type) {
    case openProfileTabOnClick: {
      return {
        ...state,
        leftPannelStore: { ...state.leftPannelStore, ...action.payload },
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default studentProfileLeftPanelReducer;
