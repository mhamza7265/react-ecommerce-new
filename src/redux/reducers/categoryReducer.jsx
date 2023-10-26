const ADD_CATEGORY = "ADD_CATEGORY";
const REMOVE_CATEGORIES = "REMOVE_CATEGORIES";

export const addCategory = (category) => {
  return { type: ADD_CATEGORY, payload: category };
};

export const removeCategories = () => {
  return { type: REMOVE_CATEGORIES, payload: null };
};

const initialState = { categories: null };

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case REMOVE_CATEGORIES:
      return {
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
