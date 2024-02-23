import Footer from "../../footer/footer";
import Navbar from "../../navbar/Navbar";
import { useForm } from "react-hook-form";
import sendRequest, {
  errorToast,
  successToast,
  warningToast,
} from "../../../utility-functions/apiManager";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Register() {
  const [loading, setLoading] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);
  const [rptPwVisible, setRptPwVisible] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const override = {
    display: "block",
    position: "absolute",
    top: 0,
    left: "90%",
    margin: "0 auto",
    borderColor: "red",
    width: "10px",
    height: "55px",
  };

  const handleEyeClick = (e) => {
    if (e.target.parentNode.id == "pw-toggle") {
      setPwVisible(!pwVisible);
    } else if (e.target.parentNode.id == "confirm-pw-toggle") {
      setRptPwVisible(!rptPwVisible);
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    const reqData = {
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      password: data.password,
      role: "basic",
    };
    sendRequest("post", "register", reqData)
      .then((res) => {
        setLoading(false);
        if (res.status) {
          toast({
            title: res.message,
            position: "top-right",
            isClosable: true,
            duration: 3000,
            status: "success",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          toast({
            title: res.error,
            position: "top-right",
            isClosable: true,
            duration: 3000,
            status: "error",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: err.error,
          position: "top-right",
          isClosable: true,
          duration: 3000,
          status: "error",
        });
        console.log(err);
      });
  };

  // const handleSocialClick = async (e) => {
  //   // sendRequest("get", "auth/google/callback");
  //   location.replace(
  //     "https://accounts.google.com/o/oauth2/v2/auth?display=popup&client_id=813599049172-c41a2al6qbidi189fnj2i528bt8i93d1.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/google/callback&response_type=code&scope=profile email"
  //   );
  // };

  const handleSuccess = (response) => {
    const user = jwtDecode(response.credential);
    sendRequest("post", "register", {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      password: "111111",
      role: "basic",
      passwordCreated: false,
    }).then((res) => {
      console.log(res);
      if (res.status) {
        successToast(res.message);
        sendRequest("post", "login", {
          email: user.email,
          password: "111111",
        }).then((res) => {
          if (res.status) {
            const userObj = {
              token: res.token,
            };
            localStorage.setItem("current_user", JSON.stringify(userObj));

            warningToast(
              "Current password is '111111', please update to use your account."
            );
            setTimeout(() => {
              navigate("/");
            }, 5000);
          }
        });
      } else {
        errorToast(res.error);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    });
  };

  // const handleGoogleFailure = (error) => {
  //   console.error("Google login failed", error);
  // };

  // const login = useGoogleLogin({
  //   onSuccess: async (codeResponse) => {
  //     console.log("code", codeResponse.code);
  //     // sendRequest("get", "auth/google/callback", {
  //     //   code: codeResponse.code,
  //     // }).then((res) => console.log("googleRes", res));
  //     // const fetching = await fetch(
  //     //   "http://localhost:3000/auth/google/callback",
  //     //   {
  //     //     method: "post",
  //     //     headers: { "Content-Type": "application/json" },
  //     //     body: { code: codeResponse.code },
  //     //     mode: "no-cors",
  //     //   }
  //     // );

  //     // console.log("googleRes", fetching);
  //   },
  //   flow: "auth-code",
  // });

  return (
    <div>
      <Navbar />
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          ;
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
                <div className="col-lg-6 col-md-8">
                  <div className="login_wrap widget-taber-content background-white">
                    <div className="padding_eight_all bg-white position-relative">
                      <div className="heading_s1">
                        <h1 className="mb-5 text-nowrap">Create an Account</h1>
                        <p className="mb-30">
                          Already have an account?{" "}
                          <Link to="/login">Login</Link>
                        </p>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                          <input
                            {...register("first_name", {
                              required: "This field is required",
                            })}
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                          />
                        </div>
                        <p className="text-danger">
                          {errors.first_name?.message}
                        </p>
                        <div className="form-group">
                          <input
                            {...register("last_name", {
                              required: "This field is required",
                            })}
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                          />
                        </div>
                        <p className="text-danger">
                          {errors.last_name?.message}
                        </p>
                        <div className="form-group">
                          <input
                            {...register("email", {
                              required: "This field is required",
                            })}
                            type="text"
                            name="email"
                            placeholder="Email"
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
                              minLength: {
                                value: 6,
                                message: "Minimum length is 6",
                              },
                            })}
                            type={`${pwVisible ? "text" : "password"}`}
                            name="password"
                            placeholder="Password"
                          />
                        </div>
                        <p className="text-danger">
                          {errors.password?.message}
                        </p>
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
                                if (watch("password") != val) {
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
                        <div className="payment_option mb-50">
                          <div className="custome-radio">
                            <input
                              className="form-check-input"
                              required=""
                              type="radio"
                              name="payment_option"
                              id="exampleRadios3"
                              checked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios3"
                              data-bs-toggle="collapse"
                              data-target="#bankTranfer"
                              aria-controls="bankTranfer"
                            >
                              I am a customer
                            </label>
                          </div>
                          <div className="custome-radio">
                            <input
                              className="form-check-input"
                              required=""
                              type="radio"
                              name="payment_option"
                              id="exampleRadios4"
                              checked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios4"
                              data-bs-toggle="collapse"
                              data-target="#checkPayment"
                              aria-controls="checkPayment"
                            >
                              I am a vendor
                            </label>
                          </div>
                        </div>
                        <div className="login_footer form-group mb-50">
                          <div className="chek-form">
                            <div className="custome-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkbox"
                                id="exampleCheckbox12"
                                value=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleCheckbox12"
                              >
                                <span>I agree to terms &amp; Policy.</span>
                              </label>
                            </div>
                          </div>
                          <a href={void 0}>
                            <i className="fi-rs-book-alt mr-5 text-muted"></i>
                            Lean more
                          </a>
                        </div> */}
                        <div className="form-group mb-30 position-relative">
                          <button className="btn btn-fill-out btn-block hover-up font-weight-bold">
                            Submit &amp; Register
                          </button>
                          <BounceLoader
                            color={"#3bb77e"}
                            loading={loading}
                            cssOverride={override}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>

                        <p className="font-xs text-muted">
                          <strong>Note:</strong>Your personal data will be used
                          to support your experience throughout this website, to
                          manage access to your account, and for other purposes
                          described in our privacy policy
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 pr-30 d-none d-lg-block">
                  <div className="card-login mt-115">
                    {/* <a
                      className="social-login facebook-login"
                      onClick={handleSocialClick}
                      data={"facebook"}
                    >
                      <LazyLoadImage src={fbicon} alt="" />
                      <span>Continue with Facebook</span>
                    </a>
                    <a
                      className="social-login google-login"
                      onClick={() => login()}
                      data={"google"}
                    >
                      <LazyLoadImage src={googleicon} alt="" />
                      <span>Continue with Google</span>
                    </a> */}
                    {/* <a className="social-login apple-login">
                      <LazyLoadImage src={appleicon} alt="" />
                      <span>Continue with Apple</span>
                    </a> */}
                    {/* <GoogleLoginButton
                      onSuccess={handleGoogleSuccess}
                      onFailure={handleGoogleFailure}
                    /> */}
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        // console.log(credentialResponse);
                        // console.log(
                        //   "decode",
                        //   jwtDecode(credentialResponse.credential)
                        // );
                        handleSuccess(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
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

export default Register;
