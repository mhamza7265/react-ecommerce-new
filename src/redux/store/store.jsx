import { createStore } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import categoryReducer from "../reducers/categoryReducer";
import productReducer from "../reducers/productReducer";
import compareProductsReducer from "../reducers/compareProductsReducer";
import updateWishlistNavbarReducer from "../reducers/navbarUpdateReducers/wishlistUpdateReducer";
import updateCartNavbarReducer from "../reducers/navbarUpdateReducers/cartUpdateReducer";
import singleProductReducer from "../reducers/singleProductReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  compare: compareProductsReducer,
  updateWishlistNavbar: updateWishlistNavbarReducer,
  updateCartNavbar: updateCartNavbarReducer,
  singleProduct: singleProductReducer,
});
const store = createStore(rootReducer, composeWithDevTools());

export default store;
