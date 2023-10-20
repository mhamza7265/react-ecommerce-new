import { produce } from "immer";

const ADD_COMPARE_PRODUCT = "ADD_COMPARE_PRODUCT";

export const addCompareProduct = (add) => {
  return {
    type: ADD_COMPARE_PRODUCT,
    payload: add,
  };
};

const initialState = {
  productsToCompare: [],
};

const compareProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPARE_PRODUCT:
      return produce(state, (draft) => {
        draft.productsToCompare.push(action.payload);
      });
    default:
      return state;
  }
};

export default compareProductsReducer;
