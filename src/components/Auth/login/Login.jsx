import login from "../../../assets/imgs/page/login-1.webp";
import Footer from "../../footer/footer";
import Navbar from "../../navbar/Navbar";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useForm } from "react-hook-form";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
// import { BounceLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWishlist } from "../../../redux/reducers/wishlistReducer";
import { updateCartQuantity } from "../../../redux/reducers/cartQuantityReducer";
import { updateCart } from "../../../redux/reducers/cartReducer";
import { updateWishlistQuantity } from "../../../redux/reducers/wishlistQuantityReducer";
import { updateOrder } from "../../../redux/reducers/orderReducer";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import { addCurrentUser } from "../../../redux/reducers/currentUserReducer";
import { addLogInUser } from "../../../redux/reducers/logingInUserReducer";
import requestPermission from "../../../utility-functions/notifications";

function Login() {
  // const [loading, setLoading] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const override = {
  //   display: "block",
  //   position: "absolute",
  //   top: 0,
  //   left: "90%",
  //   margin: "0 auto",
  //   borderColor: "red",
  //   width: "10px",
  //   height: "55px",
  // };

  const handleEyeClick = () => {
    setPwVisible(!pwVisible);
  };

  const onSubmit = (data) => {
    dispatch(startSpinner());
    dispatch(addLogInUser(data.email));
    sendRequest("post", "login", {
      email: data.email,
      password: data.password,
      userRole: "basic",
    })
      .then((res) => {
        if (res.status) {
          dispatch(stopSpinner());
          successToast(res.login);
          const userObj = {
            token: res.token,
          };
          localStorage.setItem("current_user", JSON.stringify(userObj));

          requestPermission(null);

          // dispatch(updateWishlistNavbar());
          sendRequest("get", "cart/qty")
            .then((res) => {
              console.log(res);
              dispatch(updateCartQuantity(res.quantity));
            })
            .catch((err) => {
              console.log(err);
            });

          sendRequest("get", "cart")
            .then((res) => {
              if (res.status) {
                dispatch(updateCart(res.cart[0]));
              }
            })
            .catch((err) => {
              console.log(err);
            });

          sendRequest("get", "wishlist/qty")
            .then((res) => {
              console.log(res);
              dispatch(updateWishlistQuantity(res.wishlistQuantity));
            })
            .catch((err) => {
              console.log(err);
            });

          sendRequest("get", "orders")
            .then((res) => {
              if (res.status) dispatch(updateOrder(res.orders));
            })
            .catch((err) => {
              console.log(err);
            });

          sendRequest("get", "wishlist")
            .then((res) => {
              dispatch(addWishlist(res.wishlist));
            })
            .catch((err) => console.log(err));

          sendRequest("get", "user")
            .then((res) => {
              if (res.status) {
                dispatch(addCurrentUser(res.user));
              }
            })
            .catch((err) => {
              console.log("currentUser", err.error);
            });

          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          dispatch(stopSpinner());
          errorToast(res.error);
          if (res.verify) {
            setTimeout(() => {
              navigate("/verify");
            }, 3000);
          }
        }
      })
      .catch((err) => {
        dispatch(stopSpinner());
        errorToast(err);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link to={"/"} rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </Link>
            <span></span> Pages <span></span> My Account
          </div>
        </div>
      </div>
      <div className="page-content pt-150 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
              <div className="row">
                <div className="col-lg-6 pr-30 d-none d-lg-block">
                  <LazyLoadImage
                    className="border-radius-15"
                    src={login}
                    alt=""
                  />
                </div>
                <div className="col-lg-6 col-md-8">
                  <div className="login_wrap widget-taber-content background-white">
                    <div className="padding_eight_all bg-white position-relative">
                      <div className="heading_s1">
                        <h1 className="mb-5">Login</h1>
                        <p className="mb-30">
                          {"Don't have an account?"}{" "}
                          <Link to="/register">Create here</Link>
                        </p>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                          <input
                            {...register("email", {
                              required: "This field is required",
                            })}
                            type="text"
                            name="email"
                            placeholder="Username or Email *"
                          />
                        </div>
                        <p className="text-danger">{errors.email?.message}</p>
                        <div className="form-group position-relative">
                          <a
                            href={void 0}
                            id="pw-toggle"
                            className="pw-toggle-eye"
                            onClick={handleEyeClick}
                          >
                            <i
                              className={`fa-solid ${
                                pwVisible ? "fa-eye" : "fa-eye-slash"
                              }`}
                            ></i>
                          </a>
                          <input
                            {...register("password", {
                              required: "This field is required",
                            })}
                            type={`${pwVisible ? "text" : "password"}`}
                            name="password"
                            placeholder="Your password *"
                          />
                        </div>
                        <p className="text-danger">
                          {errors.password?.message}
                        </p>
                        {/* <div className="login_footer form-group">
                          <div className="chek-form">
                            <input
                              type="text"
                              required=""
                              name="email"
                              placeholder="Security code *"
                            />
                          </div>
                          <span className="security-code">
                            <b className="text-new">8</b>
                            <b className="text-hot">6</b>
                            <b className="text-sale">7</b>
                            <b className="text-best">5</b>
                          </span>
                        </div>
                        <div className="login_footer form-group mb-50">
                          <div className="chek-form">
                            <div className="custome-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkbox"
                                id="exampleCheckbox1"
                                value=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleCheckbox1"
                              >
                                <span>Remember me</span>
                              </label>
                            </div>
                          </div>
                          <a className="text-muted">Forgot password?</a>
                        </div> */}
                        <div className="d-flex justify-content-between position-relative">
                          <button className="btn btn-heading btn-block hover-up">
                            Log in
                          </button>
                          <p className="mb-30">
                            <Link to="/forgotPw">Forgot password?</Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
