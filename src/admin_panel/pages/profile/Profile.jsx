import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BounceLoader } from "react-spinners";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const override2 = {
    display: "block",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "85%",
    margin: "0 auto",
    borderColor: "red",
    width: "10px",
    height: "55px",
  };

  useEffect(() => {
    sendRequest("get", "user")
      .then((res) => {
        if (res.status) {
          setCurrentUser(res.user);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    setLoadingUser(true);
    sendRequest("put", "user", data)
      .then((res) => {
        setLoadingUser(false);
        if (res.status) {
          successToast(res.message);
          setCurrentUser(res.user);
        } else {
          errorToast(res.error);
        }
      })
      .catch((err) => {
        setLoadingUser(false);
        errorToast(err);
      });
  };

  return (
    <div className="container">
      <h3>User Profile</h3>
      <div className="card mt-4">
        <div className="card-header">
          <h5>Account Details</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="form-group col-md-6">
                <label>
                  First Name <span className="required">*</span>
                </label>
                <input
                  {...register("first_name", {
                    required: "This field is required!",
                  })}
                  className="form-control"
                  name="first_name"
                  type="text"
                  defaultValue={currentUser?.first_name}
                />
                <p className="text-danger">{errors?.first_name?.message}</p>
              </div>
              <div className="form-group col-md-6">
                <label>
                  Last Name
                  <span className="required">*</span>
                </label>
                <input
                  {...register("last_name", {
                    required: "This field is required!",
                  })}
                  className="form-control"
                  name="last_name"
                  defaultValue={currentUser?.last_name}
                  type="text"
                />
                <p className="text-danger">{errors?.last_name?.message}</p>
              </div>
              <div className="form-group col-md-12">
                <label>
                  Display Name <span className="required">*</span>
                </label>
                <input
                  required=""
                  className="form-control"
                  name="dname"
                  type="text"
                  value={currentUser?.first_name + " " + currentUser?.last_name}
                  disabled
                />
              </div>
              <div className="form-group col-md-12">
                <label>
                  Email Address <span className="required">*</span>
                </label>
                <input
                  required=""
                  className="form-control"
                  name="email"
                  type="email"
                  defaultValue={currentUser?.email}
                  disabled
                />
              </div>
              <div className="form-group col-md-12">
                <label>
                  Current Password <span className="required">*</span>
                </label>
                <input
                  {...register("current_pw")}
                  name="current_pw"
                  className="form-control"
                  type="password"
                />
              </div>
              <div className="form-group col-md-12">
                <label>
                  New Password
                  <span className="required">*</span>
                </label>
                <input
                  {...register("new_pw")}
                  name="new_pw"
                  className="form-control"
                  type="password"
                />
              </div>
              <div className="form-group col-md-12">
                <label>
                  Confirm Password
                  <span className="required">*</span>
                </label>
                <input
                  {...register("confirm_pw", {
                    validate: (val) => {
                      if (watch("new_pw") !== val) {
                        return "Passwords does'nt match";
                      }
                    },
                  })}
                  name="confirm_pw"
                  className="form-control"
                  type="password"
                />
                <p className="text-danger">{errors?.confirm_pw?.message}</p>
              </div>

              <div className="col-md-12 position-relative">
                <BounceLoader
                  color={"#3bb77e"}
                  loading={loadingUser}
                  cssOverride={override2}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <button
                  type="submit"
                  className="btn btn-md btn-fill-out submit font-weight-bold"
                >
                  Save Change
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
