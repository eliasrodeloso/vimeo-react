import axios, { endpoints } from "./axios";

export let getVideo = videoId => {
  return axios.get(endpoints.video(videoId)).then(response => {
    if (response.status === 200) {
      return response.data;
    }
  });
};

export let getVideoComments = (videoId, page, perPage) => {
  return axios
    .get(endpoints.videoComments(videoId, page, perPage))
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    });
};
