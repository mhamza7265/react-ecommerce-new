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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import sendRequest from "./utility-functions/apiManager";
import { addProduct } from "./redux/reducers/productReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    sendRequest("get", "product/")
      .then((res) => {
        dispatch(addProduct(res.products));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Preloader state={true}>
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
              <Wishlist />
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
              <Cart />
            </Preloader>
          }
        />
        <Route
          path="/checkout"
          element={
            <Preloader>
              <Checkout />
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
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;