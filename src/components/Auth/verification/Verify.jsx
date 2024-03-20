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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";

function Verify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.logInUser.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(startSpinner());
    sendRequest("post", "verify", {
      email: data.email,
      code: Number(data.code),
    })
      .then((res) => {
        if (res.status) {
          dispatch(stopSpinner());
          successToast(res.verified);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          dispatch(stopSpinner());
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
                      <div className="heading_s1 mb-4">
                        <h1 className="">Verify Account</h1>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="form-group">
                          <input
                            {...register("email", {
                              required: "This field is required",
                            })}
                            type="text"
                            name="email"
                            placeholder="Enter your email *"
                            defaultValue={user}
                            className="readonly"
                            readOnly
                          />
                        </div>
                        <p className="text-danger">{errors.email?.message}</p>
                        <div className="form-group position-relative">
                          <input
                            {...register("code", {
                              required: "This field is required",
                            })}
                            type="text"
                            name="code"
                            placeholder="Enter verification code *"
                            maxLength={6}
                          />
                        </div>
                        <p className="text-danger">{errors.code?.message}</p>
                        <div className="form-group position-relative">
                          <button className="btn btn-heading btn-block hover-up">
                            Verify
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

export default Verify;
