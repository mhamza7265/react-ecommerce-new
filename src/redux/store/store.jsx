import { createStore } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import categoryReducer from "../reducers/categoryReducer";
import productReducer from "../reducers/productReducer";
import compareProductsReducer from "../reducers/compareProductsReducer";
import updateWishlistNavbarReducer from "../reducers/navbarUpdateReducers/wishlistUpdateReducer";
import updateCartNavbarReducer from "../reducers/navbarUpdateReducers/cartUpdateReducer";
import singleProductReducer from "../reducers/singleProductReducer";
import wishlistReducer from "../reducers/wishlistReducer";
import searchReducer from "../reducers/searchReducer";
import spinnerReducer from "../reducers/spinnerReducer";
import allProductReducer from "../reducers/allProductReducers";
import cartReducer from "../reducers/cartReducer";
import orderReducer from "../reducers/orderReducer";
import cartQuantityReducer from "../reducers/cartQuantityReducer";
import wishlistQuantityReducer from "../reducers/wishlistQuantityReducer";
import searchProductReducer from "../reducers/searchedProductsReducer";
import passwordUpdateModalReducer from "../reducers/PasswordUpdateModelReducer";
import openCloseCategoryDdReducer from "../reducers/openCloseCategoryDdReducer";
import bestsellingProductReducer from "../reducers/bestsellingProductReducer";
import ProductsByPageReducer from "../reducers/productsByPageReducer";
import orderReducerAdmin from "../reducers/admin_reducers/orderReducerAdmin";
import currentUserReducer from "../reducers/currentUserReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  wishlist: wishlistReducer,
  compare: compareProductsReducer,
  search: searchReducer,
  singleProduct: singleProductReducer,
  spinner: spinnerReducer,
  updateWishlistNavbar: updateWishlistNavbarReducer,
  updateCartNavbar: updateCartNavbarReducer,
  allProducts: allProductReducer,
  cart: cartReducer,
  order: orderReducer,
  cartQuantity: cartQuantityReducer,
  wishlistQuantity: wishlistQuantityReducer,
  searchProducts: searchProductReducer,
  passwordUpdateModal: passwordUpdateModalReducer,
  openCloseDdReducer: openCloseCategoryDdReducer,
  bestsellingProducts: bestsellingProductReducer,
  productsByPage: ProductsByPageReducer,
  currentUser: currentUserReducer,
  //admin reducers,
  adminOrder: orderReducerAdmin,
});
const store = createStore(rootReducer, composeWithDevTools());

export default store;
