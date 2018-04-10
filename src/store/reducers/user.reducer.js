import { PUT_USER } from "../constants";

const initialState = {
  isLogged: false,
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_USER:
      return { user: { ...action.user }, isLogged: true };

    default:
      return state;
  }
};

export default userReducer;
