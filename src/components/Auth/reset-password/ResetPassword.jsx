import resetpwicon from "../../../assets/imgs/page/reset_password.svg";
import Footer from "../../footer/footer";
import Navbar from "../../navbar/Navbar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function ResetPassword() {
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
            <div className="col-xl-6 col-lg-8 col-md-12 m-auto">
              <div className="row">
                <div className="heading_s1">
                  <LazyLoadImage
                    className="border-radius-15"
                    src={resetpwicon}
                    alt=""
                  />
                  <h2 className="mb-15 mt-15">Set new password</h2>
                  <p className="mb-30">
                    Please create a new password that you don’t use on any other
                    site.
                  </p>
                </div>
                <div className="col-lg-6 col-md-8">
                  <div className="login_wrap widget-taber-content background-white">
                    <div className="padding_eight_all bg-white">
                      <form method="post">
                        <div className="form-group">
                          <input
                            type="text"
                            required=""
                            name="email"
                            placeholder="Password *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            required=""
                            name="email"
                            placeholder="Confirm you password *"
                          />
                        </div>
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-heading btn-block hover-up"
                            name="login"
                          >
                            Reset password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 pl-50">
                  <h6 className="mb-15">Password must:</h6>
                  <p>Be between 9 and 64 characters</p>
                  <p>Include at least tow of the following:</p>
                  <ol className="list-insider">
                    <li>An uppercase character</li>
                    <li>A lowercase character</li>
                    <li>A number</li>
                    <li>A special character</li>
                  </ol>
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

export default ResetPassword;
