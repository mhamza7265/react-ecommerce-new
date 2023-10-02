import page404img from "../../assets/imgs/page/page-404.webp";
import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function NotFound404() {
  return (
    <div className="page-404">
      <Navbar />
      <div className="page-content pt-150 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-md-12 m-auto text-center">
              <p className="mb-20">
                <LazyLoadImage src={page404img} alt="" className="hover-up" />
              </p>
              <h1 className="display-2 mb-30">Page Not Found</h1>
              <p className="font-lg text-grey-700 mb-30">
                The link you clicked may be broken or the page may have been
                removed.
                <br />
                visit the{" "}
                <a href="index.html">
                  {" "}
                  <span> Homepage</span>
                </a>{" "}
                or{" "}
                <a href="page-contact.html">
                  <span>Contact us</span>
                </a>{" "}
                about the problem
              </p>
              <div className="search-form">
                <form action="#">
                  <input type="text" placeholder="Search…" />
                  <button type="submit">
                    <i className="fi-rs-search"></i>
                  </button>
                </form>
              </div>
              <Link
                to="/"
                className="btn btn-default submit-auto-width font-xs hover-up mt-30"
              >
                <i className="fi-rs-home mr-5"></i> Back To Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound404;
