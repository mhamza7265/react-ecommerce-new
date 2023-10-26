import { produce } from "immer";

const ADD_COMPARE_PRODUCT = "ADD_COMPARE_PRODUCT";
const REMOVE_COMPARE_PRODUCT = "REMOVE_COMPARE_PRODUCT";

export const addCompareProduct = (add) => {
  return {
    type: ADD_COMPARE_PRODUCT,
    payload: add,
  };
};

export const removeCompareProducts = (data) => {
  return {
    type: REMOVE_COMPARE_PRODUCT,
    payload: data,
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

    case REMOVE_COMPARE_PRODUCT:
      return produce(state, (draft) => {
        const filtered = draft.productsToCompare.filter(
          (item) => item._id !== action.payload
        );
        draft.productsToCompare = filtered;
      });
    default:
      return state;
  }
};

export default compareProductsReducer;
