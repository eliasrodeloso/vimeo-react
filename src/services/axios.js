import axios from "axios";

export default axios.create({
  baseURL: "https://api.vimeo.com/",
  timeout: 10000,
  headers: {
    Authorization: "Bearer c4819bdb2cb20ff47a25609a882b7a50",
    Accept: "application/vnd.vimeo.*+json;version=3.4"
  }
});

export let endpoints = {
  categories: () => "/categories",
  video: id => {
    return `/videos/${id}`;
  },
  categoryVideos(categoryId, page = 1, perPage = 27) {
    return `/categories/${categoryId}/videos?page=${page}&per_page=${perPage}`;
  }
};
