import resetpwicon from "../../../assets/imgs/page/reset_password.svg";
import Footer from "../../footer/footer";
import Navbar from "../../navbar/Navbar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useNavigate } from "react-router-dom";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";

function ResetPassword() {
  const [pwVisible, setPwVisible] = useState(false);
  const [rptPwVisible, setRptPwVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.logInUser.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleEyeClick = (e) => {
    if (e.target.parentNode.id == "pw-toggle") {
      setPwVisible(!pwVisible);
    } else if (e.target.parentNode.id == "confirm-pw-toggle") {
      setRptPwVisible(!rptPwVisible);
    }
  };

  const onSubmitForm = (data) => {
    console.log("data", data);
    dispatch(startSpinner());
    sendRequest("put", "resetPw", {
      email: data.email,
      code: Number(data.code),
      password: data.password,
    })
      .then((res) => {
        dispatch(stopSpinner());
        if (res.status) {
          successToast(res.message);
          setTimeout(() => {
            navigate("/login");
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
              <div className="row">
                <div className="heading_s1">
                  <LazyLoadImage
                    className="border-radius-15"
                    src={resetpwicon}
                    alt=""
                  />
                  <h2 className="mb-15 mt-15">Reset password</h2>
                </div>
                <div className="login_wrap widget-taber-content background-white">
                  <div className="padding_eight_all bg-white">
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                      <div className="form-group">
                        <input
                          {...register("email", {
                            required: "This field is required",
                          })}
                          type="text"
                          name="email"
                          placeholder="Enter Email *"
                          value={user}
                          readOnly
                          className="readonly"
                        />
                      </div>

                      <div className="form-group mb-0">
                        <input
                          {...register("code", {
                            required: "This field is required",
                          })}
                          type="text"
                          name="code"
                          placeholder="Enter verification code *"
                          className="mb-0"
                          autoComplete="new-password"
                          maxLength={6}
                        />
                      </div>
                      <p className="text-danger mb-4">
                        {errors?.code?.message}
                      </p>

                      <p className="">
                        Please create a new password that you don’t use on any
                        other site.
                      </p>

                      <div className="form-group mb-0 position-relative">
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
                            minLength: {
                              value: 6,
                              message: "Minimum length is 6",
                            },
                          })}
                          type={`${pwVisible ? "text" : "password"}`}
                          name="password"
                          placeholder="Enter new Password *"
                          className="mb-0"
                          autoComplete="new-password"
                        />
                      </div>
                      <p className="text-danger mb-2">
                        {errors?.password?.message}
                      </p>

                      <div className="form-group mb-0 position-relative">
                        <a
                          href={void 0}
                          id="confirm-pw-toggle"
                          className="pw-toggle-eye"
                          onClick={handleEyeClick}
                        >
                          <i
                            className={`fa-solid ${
                              rptPwVisible ? "fa-eye" : "fa-eye-slash"
                            }`}
                          ></i>
                        </a>
                        <input
                          {...register("confirmPassword", {
                            required: "This field is required",
                            validate: (val) => {
                              if (watch("password") != val) {
                                return "Password does not match";
                              }
                            },
                          })}
                          type={`${rptPwVisible ? "text" : "password"}`}
                          name="confirmPassword"
                          placeholder="Confirm you password *"
                          className="mb-0"
                          autoComplete="new-password"
                        />
                      </div>
                      <p className="text-danger mb-2">
                        {errors?.confirmPassword?.message}
                      </p>

                      <div className="form-group mt-4">
                        <button
                          type="submit"
                          className="btn btn-heading btn-block hover-up"
                        >
                          Reset password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div className="col-lg-6 pl-50">
                  <h6 className="mb-15">Password must:</h6>
                  <p>Be between 9 and 64 characters</p>
                  <p>Include at least tow of the following:</p>
                  <ol className="list-insider">
                    <li>An uppercase character</li>
                    <li>A lowercase character</li>
                    <li>A number</li>
                    <li>A special character</li>
                  </ol>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
