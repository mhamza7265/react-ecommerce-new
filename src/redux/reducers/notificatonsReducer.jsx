const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
import { produce } from "immer";

export const addNotifications = (notification) => {
  return {
    type: ADD_NOTIFICATIONS,
    payload: notification,
  };
};

const initialState = {
  notifications: null,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return produce(state, (draft) => {
        draft.notifications = action.payload;
      });

    default:
      return state;
  }
};

export default notificationsReducer;
