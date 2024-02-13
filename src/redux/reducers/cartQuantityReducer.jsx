const UPDATE_CART_QTY = "UPDATE_CART_QTY";

export const updateCartQuantity = (product) => {
  return { type: UPDATE_CART_QTY, payload: product };
};

const initialState = { quantity: null };

const cartQuantityReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART_QTY:
      return {
        ...state,
        quantity: action.payload,
      };

    default:
      return state;
  }
};

export default cartQuantityReducer;
