import { useState } from "react";
import { useForm } from "react-hook-form";
import login from "../../../assets/imgs/page/login-1.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Footer from "../../footer/footer";
import { useDispatch } from "react-redux";
import Navbar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";

function UpdatePassword() {
  const [pwVisible, setPwVisible] = useState(false);
  const [rptPwVisible, setRptPwVisible] = useState(false);
  const [currentPwVisible, setCurrentPwVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(startSpinner());
    sendRequest("post", "user/password", {
      current_pw: data.current_password,
      new_pw: data.new_password,
    })
      .then((res) => {
        dispatch(stopSpinner());
        if (res.status) {
          successToast(res.passwordUpdated);
          localStorage.removeItem("current_user");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          errorToast(res.error);
        }
      })
      .catch((err) => {
        dispatch(stopSpinner());
        errorToast(err);
      });
  };

  const handleEyeClick = (e) => {
    if (e.target.parentNode.id == "pw-toggle") {
      setPwVisible(!pwVisible);
    } else if (e.target.parentNode.id == "confirm-pw-toggle") {
      setRptPwVisible(!rptPwVisible);
    } else if (e.target.parentNode.id == "current-pw-toggle") {
      setCurrentPwVisible(!currentPwVisible);
    }
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
            <span></span> Update Password
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
                      <div className="heading_s1 mb-5">
                        <h1 className="mb-5">Update Password</h1>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Current Password</label>
                        <div className="form-group position-relative mt-5">
                          <a
                            href={void 0}
                            id="current-pw-toggle"
                            className="pw-toggle-eye"
                            onClick={handleEyeClick}
                          >
                            <i
                              className={`fa-solid ${
                                currentPwVisible ? "fa-eye" : "fa-eye-slash"
                              }`}
                            ></i>
                          </a>
                          <input
                            {...register("current_password", {
                              required: "This field is required",
                            })}
                            name="current_password"
                            placeholder="current Password"
                            defaultValue={"111111"}
                            type={`${currentPwVisible ? "text" : "password"}`}
                          />
                        </div>
                        <p className="text-danger">
                          {errors.current_password?.message}
                        </p>
                        <label>New Password</label>
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
                            {...register("new_password", {
                              required: "This field is required",
                            })}
                            type={`${pwVisible ? "text" : "password"}`}
                            name="new_password"
                            placeholder="New Password"
                          />
                        </div>
                        <p className="text-danger">
                          {errors?.new_password?.message}
                        </p>
                        <label>Confirm Password</label>
                        <div className="form-group position-relative">
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
                            {...register("confirm_password", {
                              required: "This field is required",
                              validate: (val) => {
                                if (watch("new_password") != val) {
                                  return "Your passwords do no match";
                                }
                              },
                            })}
                            type={`${rptPwVisible ? "text" : "password"}`}
                            name="confirm_password"
                            placeholder="Confirm password"
                          />
                        </div>
                        <p className="text-danger">
                          {errors.confirm_password?.message}
                        </p>

                        <div className="form-group position-relative">
                          <button className="btn btn-heading btn-block hover-up">
                            Update
                          </button>
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

export default UpdatePassword;
