import frflag from "../../assets/imgs/theme/flag-fr.png";
import dtflag from "../../assets/imgs/theme/flag-dt.png";
import ruflag from "../../assets/imgs/theme/flag-ru.png";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

function NavbarHeaderTop() {
  const products = useSelector((state) => state.products.products);

  return (
    <div>
      <div className="header-top header-top-ptb-1 d-none d-lg-block">
        {!products ? (
          <div className="row justify-content-between top-skeleton">
            <Skeleton style={{ width: "100%" }} />
            <Skeleton style={{ width: "100%" }} />
            <Skeleton style={{ width: "100%" }} />
          </div>
        ) : (
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-4">
                <div className="header-info">
                  <ul>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/account">My Account</Link>
                    </li>
                    <li>
                      <Link to="/wishlist">Wishlist</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-5 col-lg-4">
                <div className="text-center">
                  <div id="news-flash" className="d-inline-block">
                    <ul>
                      <li>
                        100% Secure delivery without contacting the courier
                      </li>
                      <li className="d-none">
                        Supper Value Deals - Save more with coupons
                      </li>
                      <li className="d-none">
                        Trendy 25silver jewelry, save up 35% off today
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <div className="header-info header-info-right">
                  <ul>
                    <li>
                      Need help? Call Us:{" "}
                      <strong className="text-brand"> + 1800 900</strong>
                    </li>
                    <li>
                      <a className="language-dropdown-active">
                        English <i className="fi-rs-angle-small-down"></i>
                      </a>
                      <ul className="language-dropdown">
                        <li>
                          <a href={void 0}>
                            <LazyLoadImage src={frflag} alt="" />
                            Français
                          </a>
                        </li>
                        <li>
                          <a href={void 0}>
                            <LazyLoadImage src={dtflag} alt="" />
                            Deutsch
                          </a>
                        </li>
                        <li>
                          <a href={void 0}>
                            <LazyLoadImage src={ruflag} alt="" />
                            Pусский
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="language-dropdown-active">
                        USD <i className="fi-rs-angle-small-down"></i>
                      </a>
                      <ul className="language-dropdown">
                        <li>
                          <a href={void 0}>
                            <LazyLoadImage src={frflag} alt="" />
                            INR
                          </a>
                        </li>
                        <li>
                          <a href={void 0}>
                            <LazyLoadImage src={dtflag} alt="" />
                            MBP
                          </a>
                        </li>
                        <li>
                          <a href={void 0}>
                            <LazyLoadImage src={ruflag} alt="" />
                            EU
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/admin">Admin Panel</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarHeaderTop;
