import { SET_ACTIVE_CATEGORY } from "../constants";

export const setActiveCategory = category => ({
  type: SET_ACTIVE_CATEGORY,
  category
});
