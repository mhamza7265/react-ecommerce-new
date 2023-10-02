import logo from "../../assets/imgs/theme/logo.svg";
import compicon from "../../assets/imgs/theme/icons/icon-compare.svg";
import wishicon from "../../assets/imgs/theme/icons/icon-heart.svg";
import carticon from "../../assets/imgs/theme/icons/icon-cart.svg";
import accnticon from "../../assets/imgs/theme/icons/icon-user.svg";
import thumb3 from "../../assets/imgs/shop/thumbnail-3.webp";
import thumb2 from "../../assets/imgs/shop/thumbnail-2.webp";
import { Link } from "react-router-dom";
import Wishlist from "../wishlist/Wishlist";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

function NavbarHeaderMid() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <div>
      <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
        <div className="container">
          <div className="header-wrap">
            {loading ? (
              <div
                style={{
                  border: "2px solid #bce3c9",
                  borderRadius: "4px",
                  maxWidth: "700px",
                  backgroundColor: "#fff",
                  width: "50%",
                  height: "57px",
                  padding: "12px 20px",
                  margin: "auto",
                }}
              >
                Search for items...
              </div>
            ) : (
              <>
                <div className="logo logo-width-1">
                  <a href={void 0}>
                    <LazyLoadImage src={logo} alt="logo" />
                  </a>
                </div>
                <div className="header-right">
                  <div className="search-style-2">
                    <form action="#">
                      <select className="select-active">
                        <option>All Categories</option>
                        <option>Milks and Dairies</option>
                        <option>Wines & Alcohol</option>
                        <option>Clothing & Beauty</option>
                        <option>Pet Foods & Toy</option>
                        <option>Fast food</option>
                        <option>Baking material</option>
                        <option>Vegetables</option>
                        <option>Fresh Seafood</option>
                        <option>Noodles & Rice</option>
                        <option>Ice cream</option>
                      </select>
                      <input type="text" placeholder="Search for items..." />
                    </form>
                  </div>
                  <div className="header-action-right">
                    <div className="header-action-2">
                      <div className="search-location">
                        <form action="#">
                          <select className="select-active">
                            <option>Your Location</option>
                            <option>Alabama</option>
                            <option>Alaska</option>
                            <option>Arizona</option>
                            <option>Delaware</option>
                            <option>Florida</option>
                            <option>Georgia</option>
                            <option>Hawaii</option>
                            <option>Indiana</option>
                            <option>Maryland</option>
                            <option>Nevada</option>
                            <option>New Jersey</option>
                            <option>New Mexico</option>
                            <option>New York</option>
                          </select>
                        </form>
                      </div>
                      <div className="header-action-icon-2">
                        <Link to="/compare">
                          <LazyLoadImage
                            className="svgInject"
                            alt="Nest"
                            src={compicon}
                          />
                          <span className="pro-count blue">3</span>
                        </Link>
                        <Link to="/compare">
                          <span className="lable ml-0">Compare</span>
                        </Link>
                      </div>
                      <div className="header-action-icon-2">
                        <Link to="/Wishlist">
                          <LazyLoadImage
                            className="svgInject"
                            alt="Nest"
                            src={wishicon}
                          />
                          <span className="pro-count blue">6</span>
                        </Link>
                        <Link to="/Wishlist">
                          <span className="lable">Wishlist</span>
                        </Link>
                      </div>
                      <div className="header-action-icon-2">
                        <Link to="/cart" className="mini-cart-icon">
                          <LazyLoadImage alt="Nest" src={carticon} />
                          <span className="pro-count blue">2</span>
                        </Link>
                        <Link to="/cart">
                          <span className="lable">Cart</span>
                        </Link>
                        {loading ? (
                          <Skeleton
                            style={{ borderRadius: "15px", height: "250px" }}
                          />
                        ) : (
                          <div className="cart-dropdown-wrap cart-dropdown-hm2">
                            <ul>
                              <li>
                                <div className="shopping-cart-img">
                                  <a href={void 0}>
                                    <LazyLoadImage alt="Nest" src={thumb3} />
                                  </a>
                                </div>
                                <div className="shopping-cart-title">
                                  <h4>
                                    <a href={void 0}>Daisy Casual Bag</a>
                                  </h4>
                                  <h4>
                                    <span>1 × </span>$800.00
                                  </h4>
                                </div>
                                <div className="shopping-cart-delete">
                                  <a href={void 0}>
                                    <i className="fi-rs-cross-small"></i>
                                  </a>
                                </div>
                              </li>
                              <li>
                                <div className="shopping-cart-img">
                                  <a href={void 0}>
                                    <LazyLoadImage alt="Nest" src={thumb2} />
                                  </a>
                                </div>
                                <div className="shopping-cart-title">
                                  <h4>
                                    <a href={void 0}>Corduroy Shirts</a>
                                  </h4>
                                  <h4>
                                    <span>1 × </span>$3200.00
                                  </h4>
                                </div>
                                <div className="shopping-cart-delete">
                                  <a href={void 0}>
                                    <i className="fi-rs-cross-small"></i>
                                  </a>
                                </div>
                              </li>
                            </ul>
                            <div className="shopping-cart-footer">
                              <div className="shopping-cart-total">
                                <h4>
                                  Total <span>$4000.00</span>
                                </h4>
                              </div>
                              <div className="shopping-cart-button">
                                <a className="outline">View cart</a>
                                <a href={void 0}>Checkout</a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="header-action-icon-2">
                        <Link to="/account">
                          <LazyLoadImage
                            className="svgInject"
                            alt="Nest"
                            src={accnticon}
                          />
                        </Link>
                        <Link to="/account">
                          <span className="lable ml-0">Account</span>
                        </Link>
                        <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                          <ul>
                            <li>
                              <a href={void 0}>
                                <i className="fi fi-rs-user mr-10"></i>My
                                Account
                              </a>
                            </li>
                            <li>
                              <a href={void 0}>
                                <i className="fi fi-rs-location-alt mr-10"></i>
                                Order Tracking
                              </a>
                            </li>
                            <li>
                              <a href={void 0}>
                                <i className="fi fi-rs-label mr-10"></i>My
                                Voucher
                              </a>
                            </li>
                            <li>
                              <a href={void 0}>
                                <i className="fi fi-rs-heart mr-10"></i>My
                                Wishlist
                              </a>
                            </li>
                            <li>
                              <a href={void 0}>
                                <i className="fi fi-rs-settings-sliders mr-10"></i>
                                Setting
                              </a>
                            </li>
                            <li>
                              <a href={void 0}>
                                <i className="fi fi-rs-sign-out mr-10"></i>Sign
                                out
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarHeaderMid;
