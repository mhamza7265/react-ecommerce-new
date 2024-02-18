import { produce } from "immer";
const DROPDOWN_IS_OPEN = "DROPDOWN_IS_OPEN";

export const dropdownIsOpen = (payload) => {
  return {
    type: DROPDOWN_IS_OPEN,
    payload,
  };
};

const initialState = {
  open: false,
};

const openCloseCategoryDdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROPDOWN_IS_OPEN:
      return produce(state, (draft) => {
        draft.open = action.payload;
      });
    default:
      return state;
  }
};

export default openCloseCategoryDdReducer;
