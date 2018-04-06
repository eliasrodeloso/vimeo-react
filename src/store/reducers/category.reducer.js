import { SET_ACTIVE_CATEGORY } from "../constants";

const initialState = {};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CATEGORY:
      return { ...state, ...action.category };

    default:
      return state;
  }
};

export default categoryReducer;
