import {
  showReplyModal,
  hideReplyModal,
  updateReviewList,
  updateReviewFeature,
  updateReviewFavorite,
} from '../constants/action-types';

const defaultState = {
  replyModalStore: {
    popSeen: false,
  },
  reviewListStore: {
    reviewList: [],
    PageNo: 0,
    PageCount: 5,
    Totalcount: 10,
  },
  reviewFeatureStore: {
    reviewFeature: 0,
  },
  reviewFavoriteStore: {
    reviewFavorite: 0,
  },
};

const ReviewReplyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case showReplyModal: {
      return {
        ...state,
        replyModalStore: { ...state.replyModalStore, popSeen: true },
        //   return Object.assign(state, action.payload);
      };
    }
    case hideReplyModal: {
      return {
        ...state,
        replyModalStore: { ...state.replyModalStore, popSeen: false },
        //   return Object.assign(state, action.payload);
      };
    }
    case updateReviewList: {
      return {
        ...state,
        reviewListStore: { ...state.reviewListStore, ...action.payload1 },
        //   return Object.assign(state, action.payload);
      };
    }

    case updateReviewFeature: {
      return {
        ...state,
        reviewFeatureStore: { ...state.reviewFeatureStore, ...action.payload2 },
        //   return Object.assign(state, action.payload);
      };
    }

    case updateReviewFavorite: {
      return {
        ...state,
        reviewFavoriteStore: { ...state.reviewFavoriteStore, ...action.payload3 },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default ReviewReplyReducer;
