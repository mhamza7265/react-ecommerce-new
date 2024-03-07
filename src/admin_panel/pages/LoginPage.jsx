import { useForm } from "react-hook-form";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
import { BounceLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../redux/reducers/admin_reducers/orderReducerAdmin";
import { startSpinner, stopSpinner } from "../../redux/reducers/spinnerReducer";
import { addCurrentUser } from "../../redux/reducers/currentUserReducer";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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
    setPwVisible(!pwVisible);
  };

  const onSubmit = (data) => {
    sendRequest("post", "login", {
      email: data.email,
      password: data.password,
      userRole: "admin",
    })
      .then((res) => {
        if (res.status) {
          successToast(res.login);
          const userObj = {
            token: res.token,
          };
          localStorage.setItem("current_user", JSON.stringify(userObj));
          localStorage.setItem("admin", true);

          sendRequest("get", "orders").then((res) => {
            dispatch(updateOrder(res.orders));
          });

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
            navigate("/admin");
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
    <div className="admin-login">
      <div className="page-content pt-150 pb-150">
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="login col-lg-6 col-md-4 px-4 py-3">
              <div className="login_wrap widget-taber-content background-white">
                <div className="padding_eight_all position-relative">
                  <div className="heading_s1">
                    <h1 className="text-white mb-5">Login</h1>
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
                        className="admin-login-input"
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
                        className="admin-login-input"
                      />
                    </div>
                    <p className="text-danger">{errors.password?.message}</p>

                    <div className="form-group position-relative">
                      <button className="btn btn-heading btn-block hover-up">
                        Log in
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
