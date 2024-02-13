import { produce } from "immer";

const ADD_SEARCH_PRODUCT = "ADD_SEARCH_PRODUCT";

export const addSearchProduct = (data) => {
  return {
    type: ADD_SEARCH_PRODUCT,
    payload: data,
  };
};

const initialState = {
  product: null,
};

const searchProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCH_PRODUCT:
      return produce(state, (draft) => {
        draft.product = action.payload;
      });
    default:
      return state;
  }
};

export default searchProductReducer;
