import { produce } from "immer";

const ADD_SINGLE_PRODUCT = "ADD_SINGLE_PRODUCT";

export const addSingleProduct = (data) => {
  return {
    type: ADD_SINGLE_PRODUCT,
    payload: data,
  };
};

const initialState = {
  product: null,
};

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SINGLE_PRODUCT:
      return produce(state, (draft) => {
        draft.product = action.payload;
      });
    default:
      return state;
  }
};

export default singleProductReducer;
