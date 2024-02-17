import { produce } from "immer";
const OPEN_UPDATE_MODAL = "OPEN_UPDATE_MODAL";

export const openUpdateModel = (modal) => {
  return { type: OPEN_UPDATE_MODAL, payload: modal };
};

const initialState = {
  open: false,
};

const passwordUpdateModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_UPDATE_MODAL:
      return produce(state, (draft) => {
        draft.open = action.payload;
      });
    default:
      return state;
  }
};

export default passwordUpdateModalReducer;
