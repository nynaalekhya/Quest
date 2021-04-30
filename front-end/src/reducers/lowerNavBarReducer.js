import { LowerNavBarHome, LowerNavBarOther } from '../constants/action-types';

const defaultState = {
  lowerNavbarType: {
    type: 'LowerNavBarHome',
  },
};

const lowerNavBarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LowerNavBarHome: {
      return {
        ...state,
        lowerNavbarType: { ...state.lowerNavbarType, type: 'LowerNavBarHome' },
      };
    }
    case LowerNavBarOther: {
      return {
        ...state,
        lowerNavbarType: { ...state.lowerNavbarType, type: 'LowerNavBarOther' },
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default lowerNavBarReducer;
