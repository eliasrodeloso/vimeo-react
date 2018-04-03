import { IS_LOGGED } from "../constants";

const initialState = {
  isLogged: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED:
      return state.isLogged;

    default:
      return false;
  }
};

export default userReducer;
