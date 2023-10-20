const ADD_PRODUCT = "ADD_PRODUCT";

export const addProduct = (product) => {
  return { type: ADD_PRODUCT, payload: product };
};

const initialState = { products: null };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
