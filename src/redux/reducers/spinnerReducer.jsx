import { produce } from "immer";

const START_SPINNER = "START_SPINNER";

const STOP_SPINNER = "STOP_SPINNER";

export const startSpinner = () => {
  return {
    type: START_SPINNER,
    payload: true,
  };
};

export const stopSpinner = () => {
  return {
    type: STOP_SPINNER,
    payload: false,
  };
};

const initialState = {
  status: false,
};

const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SPINNER:
      return produce(state, (draft) => {
        draft.status = action.payload;
      });
    case STOP_SPINNER:
      return produce(state, (draft) => {
        draft.status = action.payload;
      });
    default:
      return state;
  }
};

export default spinnerReducer;
