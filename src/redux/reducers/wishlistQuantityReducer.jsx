const UPDATE_WISHLIST_QTY = "UPDATE_WISHLIST_QTY";

export const updateWishlistQuantity = (product) => {
  return { type: UPDATE_WISHLIST_QTY, payload: product };
};

const initialState = { quantity: null };

const wishlistQuantityReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WISHLIST_QTY:
      return {
        ...state,
        quantity: action.payload,
      };

    default:
      return state;
  }
};

export default wishlistQuantityReducer;
