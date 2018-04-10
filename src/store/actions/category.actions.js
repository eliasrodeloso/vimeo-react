import { SET_ACTIVE_CATEGORY, SET_CATEGORIES } from "../constants";

export const setActiveCategory = activeCategory => ({
  type: SET_ACTIVE_CATEGORY,
  activeCategory
});

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
});
