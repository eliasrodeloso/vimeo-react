import { IS_LOGGED } from "../constants";

const initialState = {
  isLogged: false,
  user: {
    user: "pepito.perez",
    name: "Pepito Perez"
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED:
      return state.isLogged;

    default:
      return state;
  }
};

export default userReducer;
