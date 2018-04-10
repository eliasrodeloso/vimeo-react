import { SET_ACTIVE_CATEGORY, SET_CATEGORIES } from "../constants";

const initialState = {
  activeCategory: {},
  categories: []
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: { ...action.activeCategory } };

    case SET_CATEGORIES:
      return { ...state, categories: [...action.categories] };

    default:
      return state;
  }
};

export default categoryReducer;
