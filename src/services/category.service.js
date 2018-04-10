import axios from "./axios";
import { endpoints } from "./axios";

export let getCategoriesList = () => {
  return axios.get(endpoints.categories()).then(response => {
    if (response.status === 200) {
      return response.data;
    }
  });
};
