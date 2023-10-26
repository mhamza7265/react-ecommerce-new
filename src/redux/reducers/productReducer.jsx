const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCTS = "REMOVE_PRODUCTS";

export const addProduct = (product) => {
  return { type: ADD_PRODUCT, payload: product };
};

export const removeProducts = () => {
  return {
    type: REMOVE_PRODUCTS,
    payload: null,
  };
};

const initialState = { products: null };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case REMOVE_PRODUCTS:
      return {
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
