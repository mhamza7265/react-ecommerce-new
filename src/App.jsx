import "./assets/css/main.css";
import "./assets/css/carousel.css";
import "./assets/css/custom-styles.css";
import "animate.css/animate.min.css";
import Home from "./components/Home/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cart from "./components/cart/Cart";
import Wishlist from "./components/wishlist/Wishlist";
import Compare from "./components/compare/Compare";
import Account from "./components/account/Account";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/Auth/login/Login";
import Register from "./components/Auth/register/Register";
import ForgotPassword from "./components/Auth/forgot-password/ForgotPassword";
import ResetPassword from "./components/Auth/reset-password/ResetPassword";
import Contact from "./components/contact/Contact";
import NotFound404 from "./components/404 not found/NotFound404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductFull from "./components/single product/ProductFull";
import Filter from "./components/filter/Filter";
import About from "./components/about page/About";
import Preloader from "./common/preloader/Preloader";
import ScrollToTop from "./common/ScrollToTop";
import HaveAuth from "./components/Auth/check-auth/HaveAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import sendRequest from "./utility-functions/apiManager";
import { addProduct } from "./redux/reducers/productReducer";
import { addCategory } from "./redux/reducers/categoryReducer";
import { addWishlist } from "./redux/reducers/wishlistReducer";
import AllProducts from "./components/allProductsInCategory/AllProducts";
import { updateOrder } from "./redux/reducers/orderReducer";
import { updateCartQuantity } from "./redux/reducers/cartQuantityReducer";
import { updateWishlistQuantity } from "./redux/reducers/wishlistQuantityReducer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { updateCart } from "./redux/reducers/cartReducer";
import SearchedProducts from "./components/searchedProducts/SearchedProducts";
import UpdatePassword from "./components/Auth/updatePassword/UpdatePassword";
import { dropdownIsOpen } from "./redux/reducers/openCloseCategoryDdReducer";

const stripePromise = loadStripe(
  "pk_test_51OgnngCZAiYypOnUtpzuyqpnUAilEOQyEk9M8aXZ1zl2sfQV7iWNsbdfvEDhlHbe1iF3lkGosYA6TYFExeYElaM3005kpwWTxc"
);

function App() {
  const dispatch = useDispatch();
  const updateWishlist = useSelector(
    (state) => state.updateWishlistNavbar.number
  );

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    paymentMethodCreation: "manual",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  const user = localStorage.getItem("current_user");
  // const currentUser = JSON.parse(user);

  useEffect(() => {
    sendRequest("get", "product")
      .then((res) => {
        dispatch(addProduct(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    sendRequest("get", "cart/qty")
      .then((res) => {
        console.log(res);
        dispatch(updateCartQuantity(res.quantity));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    sendRequest("get", "cart")
      .then((res) => {
        if (res.status) {
          dispatch(updateCart(res.cart[0]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    sendRequest("get", "wishlist/qty")
      .then((res) => {
        console.log(res);
        dispatch(updateWishlistQuantity(res.wishlistQuantity));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    sendRequest("get", "orders")
      .then((res) => {
        if (res.status) dispatch(updateOrder(res.orders));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    sendRequest("get", "category")
      .then((res) => {
        console.log("categories", res);
        dispatch(addCategory(res.categories));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("fetch");
    sendRequest("get", "wishlist")
      .then((res) => {
        dispatch(addWishlist(res.wishlist));
      })
      .catch((err) => console.log(err));
  }, [updateWishlist]);

  const handleClick = (e) => {
    const targetElement = e.target.getAttribute("class");
    if (
      targetElement !== "categories-button-active" &&
      targetElement !== "fi-rs-angle-down" &&
      targetElement !== "fi-rs-angle-up" &&
      targetElement !== "fi-rs-apps" &&
      targetElement !== "et"
    ) {
      dispatch(dropdownIsOpen(false));
    }
  };

  return (
    <div className="app" onClick={handleClick}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Preloader>
                <Home />
              </Preloader>
            }
          />
          <Route
            path="/compare"
            element={
              <Preloader>
                <Compare />
              </Preloader>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Preloader>
                <HaveAuth>
                  <Wishlist />
                </HaveAuth>
              </Preloader>
            }
          />
          <Route
            path="/account"
            element={
              <Preloader>
                <HaveAuth>
                  <Account />
                </HaveAuth>
              </Preloader>
            }
          />
          <Route
            path="/cart"
            element={
              <Preloader>
                <HaveAuth>
                  <Cart />
                </HaveAuth>
              </Preloader>
            }
          />
          <Route
            path="/checkout"
            element={
              <Preloader>
                <HaveAuth>
                  <Elements stripe={stripePromise} options={options}>
                    <Checkout />
                  </Elements>
                </HaveAuth>
              </Preloader>
            }
          />
          <Route
            path="/login"
            element={
              <Preloader>
                <Login />
              </Preloader>
            }
          />
          <Route
            path="/register"
            element={
              <Preloader>
                <Register />
              </Preloader>
            }
          />
          <Route
            path="/forgotpw"
            element={
              <Preloader>
                <ForgotPassword />
              </Preloader>
            }
          />
          <Route
            path="/resetpw"
            element={
              <Preloader>
                <ResetPassword />
              </Preloader>
            }
          />
          <Route
            path="/contact"
            element={
              <Preloader>
                <Contact />
              </Preloader>
            }
          />
          <Route
            path="*"
            element={
              <Preloader>
                <NotFound404 />
              </Preloader>
            }
          />
          <Route
            path="/singleproduct"
            element={
              <Preloader>
                <ProductFull />
              </Preloader>
            }
          />
          <Route
            path="/filter"
            element={
              <Preloader>
                <Filter />
              </Preloader>
            }
          />
          <Route
            path="/about"
            element={
              <Preloader>
                <About />
              </Preloader>
            }
          />
          <Route
            path="/allProducts"
            element={
              <Preloader>
                <AllProducts />
              </Preloader>
            }
          />
          <Route
            path="/searchedProducts"
            element={
              <Preloader>
                <SearchedProducts />
              </Preloader>
            }
          />
          <Route
            path="/updatePw"
            element={
              <Preloader>
                <UpdatePassword />
              </Preloader>
            }
          />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
      =
    </div>
  );
}

export default App;
