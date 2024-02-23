const ADD_PRODUCT_BY_PAGE = "ADD_PRODUCT_BY_PAGE";

export const addProductByPage = (product) => {
  return { type: ADD_PRODUCT_BY_PAGE, payload: product };
};

const initialState = { products: null };

const ProductsByPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_BY_PAGE:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default ProductsByPageReducer;
