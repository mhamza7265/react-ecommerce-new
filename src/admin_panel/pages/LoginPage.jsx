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
import { stopSpinner } from "../../redux/reducers/spinnerReducer";
import { addCurrentUser } from "../../redux/reducers/currentUserReducer";
import requestPermission from "../../utility-functions/notifications";

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

  const handleEyeClick = () => {
    setPwVisible(!pwVisible);
  };

  const onSubmit = (data) => {
    setLoading(true);
    sendRequest("post", "login", {
      email: data.email,
      password: data.password,
      userRole: "admin",
    })
      .then((res) => {
        setLoading(false);
        if (res.status) {
          successToast(res.login);
          const userObj = {
            token: res.token,
          };
          localStorage.setItem("admin_user", JSON.stringify(userObj));

          requestPermission("admin");

          sendRequest("get", "orders", undefined, undefined, "admin").then(
            (res) => {
              dispatch(updateOrder(res.orders));
            }
          );

          sendRequest("get", "user", undefined, undefined, "admin")
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
          setLoading(false);
          errorToast(res.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        dispatch(stopSpinner());
        errorToast(err);
      });
  };
  return (
    <div className="admin-login h-100">
      <div className="page-content pt-5 pb-5 h-100">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-6 bg-img-login h-100"></div>
            <div className="col-lg-6 h-100 position-relative">
              <div className="login px-4 py-3 mx-4">
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
    </div>
  );
}

export default LoginPage;
