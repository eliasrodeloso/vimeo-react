import { SET_VIDEO, SET_VIDEO_COMMENTS } from "../constants";

const initialState = {
  video: {},
  comments: {}
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO:
      return { ...state, video: { ...action.video } };

    case SET_VIDEO_COMMENTS:
      return { ...state, comments: { ...action.comments } };

    default:
      return state;
  }
};

export default videoReducer;
