import "./main-layout.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";

const MainLayout = () => {
  const [registrationModalIsOpen, setRegistrationModalIsOpen] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);
  const [rptPwVisible, setRptPwVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const override = {
    display: "block",
    position: "absolute",
    top: "100%",
    left: 0,
    margin: "0 auto",
    borderColor: "red",
    width: "100%",
    backgroundColor: "#000",
  };

  const onSubmit = (data) => {
    const reqData = {
      email: data.email,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      password: data.password,
      role: data.role,
    };
    setLoading(true);
    sendRequest("post", "register", reqData)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.status) {
          successToast(res.message);
        } else {
          errorToast(res.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        errorToast(err);
        console.log(err);
      });
  };

  const handleEyeClick = (e) => {
    if (e.target.parentNode.id == "pw-toggle") {
      setPwVisible(!pwVisible);
    } else if (e.target.parentNode.id == "confirm-pw-toggle") {
      setRptPwVisible(!rptPwVisible);
    }
  };

  return (
    <>
      <Sidebar setRegistrationModalIsOpen={setRegistrationModalIsOpen} />
      <div className="main">
        <div className="main__content">
          <TopNav />
          <Outlet />
        </div>
      </div>
      {/*register modal*/}
      <>
        <Modal
          size="lg"
          className="category-modal pb-1"
          centered
          show={registrationModalIsOpen}
          onHide={() => {
            reset();
            setRegistrationModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <BarLoader
            color={"#ffffff"}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <Modal.Header style={{ border: "none" }} closeButton>
            <h5>Register</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="container position-relative">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-label">Email*</label>
                  <input
                    {...register("email", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="email"
                    type="text"
                    autoComplete="email"
                  />
                </div>
                <p className="text-danger">{errors?.email?.message}</p>
                <div className="form-group">
                  <label className="form-label">First Name*</label>
                  <input
                    {...register("firstName", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="firstName"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errors?.firstName?.message}</p>
                <div className="form-group">
                  <label className="form-label">Middle Name</label>
                  <input
                    {...register("middleName")}
                    className="form-control"
                    name="middleName"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errors?.middleName?.message}</p>
                <div className="form-group">
                  <label className="form-label">Last Name*</label>
                  <input
                    {...register("lastName", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="lastName"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errors?.lastName?.message}</p>
                <div className="form-group">
                  <label className="form-label">Role*</label>
                  <select
                    {...register("role", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="role"
                  >
                    <option value={""}>Select an option</option>
                    <option value="basic">Basic</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <p className="text-danger">{errors?.role?.message}</p>
                <div className="form-group position-relative">
                  <label className="form-label">Password*</label>
                  <div className="position-relative">
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
                      className="form-control"
                      name="password"
                      type={`${pwVisible ? "text" : "password"}`}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <p className="text-danger">{errors?.password?.message}</p>
                <div className="form-group position-relative">
                  <label className="form-label">Confirm Password*</label>
                  <div className="position-relative">
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
                      {...register("confirmPw", {
                        required: "This field is required",
                        validate: (val) => {
                          if (watch("password") != val) {
                            return "Your passwords do no match";
                          }
                        },
                      })}
                      className="form-control"
                      type={`${rptPwVisible ? "text" : "password"}`}
                      name="confirmPw"
                      autoComplete="confirm-password"
                    />
                  </div>
                </div>
                <p className="text-danger">{errors?.confirmPw?.message}</p>
                <button
                  className="btn btn-sm btn-heading btn-block hover-up my-4"
                  type="submit"
                >
                  Register
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
};

export default MainLayout;
