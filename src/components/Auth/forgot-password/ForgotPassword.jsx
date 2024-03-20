import forgotpwicon from "../../../assets/imgs/page/forgot_password.svg";
import Footer from "../../footer/footer";
import Navbar from "../../navbar/Navbar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import { addLogInUser } from "../../../redux/reducers/logingInUserReducer";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(startSpinner());
    dispatch(addLogInUser(data.email));
    sendRequest("post", "sendEmail", { email: data.email })
      .then((res) => {
        dispatch(stopSpinner());
        if (res.status) {
          successToast(res.message);
          setTimeout(() => {
            navigate("/resetPw");
          }, 3000);
        } else {
          errorToast(res.error);
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
      <div className="page-content pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-12 m-auto">
              <div className="login_wrap widget-taber-content background-white">
                <div className="padding_eight_all bg-white">
                  <div className="heading_s1">
                    <LazyLoadImage
                      className="border-radius-15"
                      src={forgotpwicon}
                      alt=""
                    />
                    <h2 className="mb-15 mt-15">Forgot your password?</h2>
                    <p className="mb-30">
                      Not to worry, we got you! Let’s get you a new password.
                      Please enter your email address or your Username.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
                        {...register("email", {
                          required: "This field is regquired",
                        })}
                        type="text"
                        name="email"
                        placeholder="Enter your email *"
                      />
                    </div>
                    <p className="text-danger">{errors?.email?.message}</p>
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
                    </div> */}
                    {/* <div className="login_footer form-group mb-50">
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
                            <span>I agree to terms & Policy.</span>
                          </label>
                        </div>
                      </div>
                      <a className="text-muted">Learn more</a>
                    </div> */}
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-heading btn-block hover-up"
                        name="login"
                      >
                        Next
                      </button>
                    </div>
                  </form>
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

export default ForgotPassword;
