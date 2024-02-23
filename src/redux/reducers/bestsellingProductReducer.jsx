const ADD_BESTSELL_PRODUCT = "ADD_BESTSELL_PRODUCT";

export const addBestsellProduct = (product) => {
  return { type: ADD_BESTSELL_PRODUCT, payload: product };
};

const initialState = { products: null };

const bestsellingProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BESTSELL_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default bestsellingProductReducer;
