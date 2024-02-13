import { produce } from "immer";

const ADD_ALL_PRODUCT = "ADD_ALL_PRODUCT";

export const addAllProduct = (data) => {
  return {
    type: ADD_ALL_PRODUCT,
    payload: data,
  };
};

const initialState = {
  product: null,
};

const allProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALL_PRODUCT:
      return produce(state, (draft) => {
        draft.product = action.payload;
      });
    default:
      return state;
  }
};

export default allProductReducer;
