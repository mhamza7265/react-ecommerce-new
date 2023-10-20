import { produce } from "immer";

const UPDATE_NAVBAR_CART = "UPDATE_NAVBAR_CART";

export const updateCartNavbar = () => {
  return {
    type: UPDATE_NAVBAR_CART,
    payload: Math.random(),
  };
};

const initialState = {
  number: 0,
};

const updateCartNavbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAVBAR_CART:
      return produce(state, (draft) => {
        draft.number = action.payload;
      });
    default:
      return state;
  }
};

export default updateCartNavbarReducer;
