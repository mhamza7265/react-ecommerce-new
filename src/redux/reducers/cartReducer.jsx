const UPDATE_CART = "UPDATE_CART";

export const updateCart = (product) => {
  return { type: UPDATE_CART, payload: product };
};

const initialState = { cart: null };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
