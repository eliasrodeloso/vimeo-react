import {
  SET_ACTIVE_CATEGORY,
  SET_CATEGORIES,
  SET_CATEGORY_VIDEOS
} from "../constants";

const initialState = {
  activeCategory: {},
  categories: [],
  categoryVideos: []
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: { ...action.activeCategory } };

    case SET_CATEGORIES:
      return { ...state, categories: [...action.categories] };

    case SET_CATEGORY_VIDEOS:
      return { ...state, categoryVideos: [...action.videos] };

    default:
      return state;
  }
};

export default categoryReducer;
