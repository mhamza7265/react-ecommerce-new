const ADD_WISHLIST = "ADD_WISHLIST";

export const addWishlist = (product) => {
  return { type: ADD_WISHLIST, payload: product };
};

const initialState = { wishlist: null };

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    default:
      return state;
  }
};

export default wishlistReducer;
