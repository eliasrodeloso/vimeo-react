import axios from "./axios";
import { endpoints } from "./axios";

export let getCategoriesList = () => {
  return axios.get(endpoints.categories()).then(response => {
    if (response.status === 200) {
      return response.data;
    }
  });
};

export let getCategoryVideos = (categoryId, page, perPage) => {
  return axios
    .get(endpoints.categoryVideos(categoryId, page, perPage))
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    });
};
