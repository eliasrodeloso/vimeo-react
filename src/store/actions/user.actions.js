import { IS_LOGGED, PUT_USER } from "../constants";

export const isLogged = () => ({ type: IS_LOGGED });
export const setUser = user => ({ type: PUT_USER, user })
