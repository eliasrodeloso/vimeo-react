import { SET_ACTIVE_CATEGORY, SET_CATEGORIES } from "../constants";
import { getCategoriesList } from "../../services/category.service";

export const setActiveCategory = activeCategory => ({
  type: SET_ACTIVE_CATEGORY,
  activeCategory
});

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
});

export function fetchCategoriesList() {
  return dispatch => {
    getCategoriesList().then(response => {
      dispatch(setCategories(response.data));
      dispatch(setActiveCategory(response.data[0]));
    });
  };
}
