import { SET_ACTIVE_CATEGORY } from "../constants";

const initialState = {
  uri: "",
  name: ""
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CATEGORY:
      return { ...state, uri: action.category.uri, name: action.category.name };

    default:
      return state;
  }
};

export default categoryReducer;
