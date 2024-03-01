import { produce } from "immer";
const ADD_CURRENT_USER = "ADD_CURRENT_USER";

export const addCurrentUser = (user) => {
  return { type: ADD_CURRENT_USER, payload: user };
};

const initialState = {
  user: null,
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_USER:
      return produce(state, (draft) => {
        draft.user = action.payload;
      });
    default:
      return state;
  }
};

export default currentUserReducer;
