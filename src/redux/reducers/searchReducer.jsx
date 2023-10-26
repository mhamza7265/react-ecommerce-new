import { produce } from "immer";

const SET_SEARCH = "SET_SEARCH";

export const setSearch = (data) => {
  return {
    type: SET_SEARCH,
    payload: data,
  };
};

const initialState = {
  search: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return produce(state, (draft) => {
        draft.search = action.payload;
      });
    default:
      return state;
  }
};

export default searchReducer;
