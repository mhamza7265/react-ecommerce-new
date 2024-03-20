import { produce } from "immer";
const ADD_LOG_IN_USER = "ADD_LOG_IN_USER";

export const addLogInUser = (user) => {
  return { type: ADD_LOG_IN_USER, payload: user };
};

const initialState = {
  user: null,
};

const logInUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOG_IN_USER:
      return produce(state, (draft) => {
        draft.user = action.payload;
      });
    default:
      return state;
  }
};

export default logInUserReducer;
