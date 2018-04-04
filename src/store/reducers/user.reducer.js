import { IS_LOGGED, PUT_USER } from "../constants";

const initialState = {
  isLogged: false,
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED:
      return state.isLogged;

    case PUT_USER:
      return { user: { ...action.user }, isLogged: true };

    default:
      return state;
  }
};

export default userReducer;
