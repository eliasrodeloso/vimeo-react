import { SET_VIDEO, SET_VIDEO_COMMENTS } from "../constants";
import { getVideo, getVideoComments } from "../../services/video.service";

export const setVideo = video => ({
  type: SET_VIDEO,
  video
});

export const setVideoComments = comments => ({
  type: SET_VIDEO_COMMENTS,
  comments
});

export let fetchVideo = videoId => {
  return dispatch => {
    getVideo(videoId).then(response => {
      dispatch(setVideo(response));
    });
  };
};

export let fetchVideoAndComments = (videoId, page = 1, perPage = 10) => {
  return dispatch => {
    getVideo(videoId).then(response => {
      dispatch(setVideo(response));
      getVideoComments(videoId, page, perPage).then(response => {
        dispatch(setVideoComments(response));
      });
    });
  };
};
