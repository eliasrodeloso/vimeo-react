import {
  SET_ACTIVE_CATEGORY,
  SET_CATEGORIES,
  SET_CATEGORY_VIDEOS
} from "../constants";
import {
  getCategoriesList,
  getCategoryVideos
} from "../../services/category.service";

export const setActiveCategory = activeCategory => ({
  type: SET_ACTIVE_CATEGORY,
  activeCategory
});

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
});

export const setCategoryVideos = videos => ({
  type: SET_CATEGORY_VIDEOS,
  videos
});

export function fetchCategoriesList(isHome, location = "/") {
  return dispatch => {
    getCategoriesList().then(response => {
      dispatch(setCategories(response.data));
      if (isHome) {
        dispatch(setActiveCategory(response.data[0]));
      } else {
        response.data.forEach(category => {
          if (category.uri === location) {
            dispatch(setActiveCategory(category));
          }
        });
      }
    });
  };
}

export function fetchCategoryVideos(uri, page = 1, perPage = 27) {
  return dispatch => {
    return getCategoryVideos(uri, page, perPage).then(response => {
      dispatch(setCategoryVideos(response));
      return true;
    });
  };
}
