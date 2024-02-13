const UPDATE_ORDER = "UPDATE_ORDER";

export const updateOrder = (product) => {
  return { type: UPDATE_ORDER, payload: product };
};

const initialState = { orders: null };

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
