import { produce } from "immer";

const UPDATE_NAVBAR_WISHLIST = "UPDATE_NAVBAR_WISHLIST";

export const updateWishlistNavbar = () => {
  return {
    type: UPDATE_NAVBAR_WISHLIST,
    payload: Math.random(),
  };
};

const initialState = {
  number: 0,
};

const updateWishlistNavbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAVBAR_WISHLIST:
      return produce(state, (draft) => {
        draft.number = action.payload;
      });
    default:
      return state;
  }
};

export default updateWishlistNavbarReducer;
