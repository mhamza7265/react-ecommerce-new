const ADD_CATEGORY = "ADD_CATEGORY";

export const addCategory = (category) => {
  return { type: ADD_CATEGORY, payload: category };
};

const initialState = { categories: null };

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
