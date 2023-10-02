import login from "../../assets/imgs/page/login-1.webp";
import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Login() {
  return (
    <div>
      <Navbar />
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <a rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </a>
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
                    <div className="padding_eight_all bg-white">
                      <div className="heading_s1">
                        <h1 className="mb-5">Login</h1>
                        <p className="mb-30">
                          Don't have an account?{" "}
                          <a href={void 0}>Create here</a>
                        </p>
                      </div>
                      <form method="post">
                        <div className="form-group">
                          <input
                            type="text"
                            required=""
                            name="email"
                            placeholder="Username or Email *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            required=""
                            type="password"
                            name="password"
                            placeholder="Your password *"
                          />
                        </div>
                        <div className="login_footer form-group">
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
                        </div>
                        <div className="form-group">
                          <Link
                            to="/"
                            className="btn btn-heading btn-block hover-up"
                            name="login"
                          >
                            Log in
                          </Link>
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
