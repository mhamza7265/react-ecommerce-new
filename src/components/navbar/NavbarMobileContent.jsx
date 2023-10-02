import logo from "../../assets/imgs/theme/logo.svg";
import yticon from "../../assets/imgs/theme/icons/icon-youtube-white.svg";
import pinteresticon from "../../assets/imgs/theme/icons/icon-pinterest-white.svg";
import instaicon from "../../assets/imgs/theme/icons/icon-instagram-white.svg";
import twittericon from "../../assets/imgs/theme/icons/icon-twitter-white.svg";
import fbicon from "../../assets/imgs/theme/icons/icon-facebook-white.svg";
import { Accordion } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

function NavbarMobileContent({ setactive, isactive }) {
  const handleClick = () => {
    setactive(false);
  };

  return (
    <>
      <div
        className={`mobile-header-active mobile-header-wrapper-style ${
          isactive ? "sidebar-visible" : null
        }`}
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-top">
            <div className="mobile-header-logo">
              <a href={void 0}>
                <LazyLoadImage src={logo} alt="logo" />
              </a>
            </div>
            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
              <button
                className="close-style search-close"
                onClick={handleClick}
              >
                <i className="icon-top"></i>
                <i className="icon-bottom"></i>
              </button>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-3 mobile-header-border">
              <form action="#">
                <input type="text" placeholder="Search for items…" />
                <button type="submit">
                  <i className="fi-rs-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              {/* <!-- mobile menu start --> */}
              <nav>
                <Accordion className="mobile-menu font-heading" flush>
                  <Accordion.Item
                    className="menu-item-has-children"
                    eventKey="0"
                  >
                    <Accordion.Header>Home</Accordion.Header>
                    <Accordion.Body className="dropdown">
                      <li>
                        <a href={void 0}> ome 1</a>
                      </li>
                      <li>
                        <a href={void 0}>Home 2</a>
                      </li>
                      <li>
                        <a href={void 0}>Home 3</a>
                      </li>
                      <li>
                        <a href={void 0}>Home 4</a>
                      </li>
                      <li>
                        <a href={void 0}>Home 5</a>
                      </li>
                      <li>
                        <a href={void 0}>Home 6</a>
                      </li>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    className="menu-item-has-children"
                    eventKey="1"
                  >
                    <Accordion.Header>shop</Accordion.Header>
                    <Accordion.Body className="dropdown">
                      <li>
                        <a href={void 0}>Shop Grid – Right Sidebar</a>
                      </li>
                      <li>
                        <a href={void 0}>Shop Grid – Left Sidebar</a>
                      </li>
                      <li>
                        <a href={void 0}>Shop List – Right Sidebar</a>
                      </li>
                      <li>
                        <a href={void 0}>Shop List – Left Sidebar</a>
                      </li>
                      <li>
                        <a href={void 0}>Shop - Wide</a>
                      </li>
                      <li className="menu-item-has-children">
                        <a href={void 0}>Single Product</a>
                        <ul className="dropdown">
                          <li>
                            <a href={void 0}>Product – Right Sidebar</a>
                          </li>
                          <li>
                            <a href={void 0}>Product – Left Sidebar</a>
                          </li>
                          <li>
                            <a href={void 0}>Product – No sidebar</a>
                          </li>
                          <li>
                            <a href={void 0}>Product – Vendor Infor</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href={void 0}>Shop – Filter</a>
                      </li>
                      <li>
                        <a href={void 0}>Shop – Wishlist</a>
                      </li>
                      <li>
                        <a href={void 0}>Shop – Cart</a>
                      </li>
                      <li>
                        <a href={void 0}>Shop – Checkout</a>
                      </li>
                      <li>
                        <a href={void 0}>Shop – Compare</a>
                      </li>
                      <li className="menu-item-has-children">
                        <a href={void 0}>Shop Invoice</a>
                        <ul className="dropdown">
                          <li>
                            <a href={void 0}>Shop Invoice 1</a>
                          </li>
                          <li>
                            <a href={void 0}>Shop Invoice 2</a>
                          </li>
                          <li>
                            <a href={void 0}>Shop Invoice 3</a>
                          </li>
                          <li>
                            <a href={void 0}>Shop Invoice 4</a>
                          </li>
                          <li>
                            <a href={void 0}>Shop Invoice 5</a>
                          </li>
                          <li>
                            <a href={void 0}>Shop Invoice 6</a>
                          </li>
                        </ul>
                      </li>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    className="menu-item-has-children"
                    eventKey="2"
                  >
                    <Accordion.Header>Vendors</Accordion.Header>
                    <Accordion.Body className="dropdown">
                      <li>
                        <a href={void 0}>Vendors Grid</a>
                      </li>
                      <li>
                        <a href={void 0}>Vendors List</a>
                      </li>
                      <li>
                        <a href={void 0}>Vendor Details 01</a>
                      </li>
                      <li>
                        <a href={void 0}>Vendor Details 02</a>
                      </li>
                      <li>
                        <a href={void 0}>Vendor Dashboard</a>
                      </li>
                      <li>
                        <a href={void 0}>Vendor Guide</a>
                      </li>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    className="menu-item-has-children"
                    eventKey="3"
                  >
                    <Accordion.Header>Mega menu</Accordion.Header>
                    <Accordion.Body className="dropdown">
                      <li className="menu-item-has-children">
                        <a href={void 0}>{"Women's Fashion"}</a>
                        <ul className="dropdown">
                          <li>
                            <a href={void 0}>Dresses</a>
                          </li>
                          <li>
                            <a href={void 0}>Blouses & Shirts</a>
                          </li>
                          <li>
                            <a href={void 0}>Hoodies & Sweatshirts</a>
                          </li>
                          <li>
                            <a href={void 0}>{"Women's Sets"}</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href={void 0}>{"Men's Fashion"}</a>
                        <ul className="dropdown">
                          <li>
                            <a href={void 0}>Jackets</a>
                          </li>
                          <li>
                            <a href={void 0}>Casual Faux Leather</a>
                          </li>
                          <li>
                            <a href={void 0}>Genuine Leather</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href={void 0}>Technology</a>
                        <ul className="dropdown">
                          <li>
                            <a href={void 0}>Gaming Laptops</a>
                          </li>
                          <li>
                            <a href={void 0}>Ultraslim Laptops</a>
                          </li>
                          <li>
                            <a href={void 0}>Tablets</a>
                          </li>
                          <li>
                            <a href={void 0}>Laptop Accessories</a>
                          </li>
                          <li>
                            <a href={void 0}>Tablet Accessories</a>
                          </li>
                        </ul>
                      </li>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    className="menu-item-has-children"
                    eventKey="4"
                  >
                    <Accordion.Header>Blog</Accordion.Header>
                    <Accordion.Body className="dropdown">
                      <li>
                        <a href={void 0}>Blog Category Grid</a>
                      </li>
                      <li>
                        <a href={void 0}>Blog Category List</a>
                      </li>
                      <li>
                        <a href={void 0}> Blog Category Big</a>
                      </li>
                      <li>
                        <a href={void 0}>Blog Category Wide</a>
                      </li>
                      <li className="menu-item-has-children">
                        <a href={void 0}>Single Product Layout</a>
                        <ul className="dropdown">
                          <li>
                            <a href={void 0}>Left Sidebar</a>
                          </li>
                          <li>
                            <a href={void 0}>Right Sidebar</a>
                          </li>
                          <li>
                            <a href={void 0}>No Sidebar</a>
                          </li>
                        </ul>
                      </li>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    className="menu-item-has-children"
                    eventKey="5"
                  >
                    <Accordion.Header>Pages</Accordion.Header>
                    <Accordion.Body className="dropdown">
                      <li>
                        <a href={void 0}>About Us</a>
                      </li>
                      <li>
                        <a href={void 0}>Contact</a>
                      </li>
                      <li>
                        <a href={void 0}>My Account</a>
                      </li>
                      <li>
                        <a href={void 0}>Login</a>
                      </li>
                      <li>
                        <a href={void 0}>Register</a>
                      </li>
                      <li>
                        <a href={void 0}>Forgot password</a>
                      </li>
                      <li>
                        <a href={void 0}>Reset password</a>
                      </li>
                      <li>
                        <a href={void 0}>Purchase Guide</a>
                      </li>
                      <li>
                        <a href={void 0}>Privacy Policy</a>
                      </li>
                      <li>
                        <a href={void 0}>Terms of Service</a>
                      </li>
                      <li>
                        <a href={void 0}>404 Page</a>
                      </li>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    className="menu-item-has-children"
                    eventKey="6"
                  >
                    <Accordion.Header>Language</Accordion.Header>
                    <Accordion.Body className="dropdown">
                      <li>
                        <a href={void 0}>English</a>
                      </li>
                      <li>
                        <a href={void 0}>French</a>
                      </li>
                      <li>
                        <a href={void 0}>German</a>
                      </li>
                      <li>
                        <a href={void 0}>Spanish</a>
                      </li>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </nav>
              {/* <!-- mobile menu end --> */}
            </div>
            <div className="mobile-header-info-wrap">
              <div className="single-mobile-header-info">
                <a href={void 0}>
                  <i className="fi-rs-marker"></i> Our location{" "}
                </a>
              </div>
              <div className="single-mobile-header-info">
                <a href={void 0}>
                  <i className="fi-rs-user"></i>Log In / Sign Up{" "}
                </a>
              </div>
              <div className="single-mobile-header-info">
                <a href={void 0}>
                  <i className="fi-rs-headphones"></i>(+01) - 2345 - 6789{" "}
                </a>
              </div>
            </div>
            <div className="mobile-social-icon mb-50">
              <h6 className="mb-15">Follow Us</h6>
              <a href={void 0}>
                <LazyLoadImage src={fbicon} alt="" />
              </a>
              <a href={void 0}>
                <LazyLoadImage src={twittericon} alt="" />
              </a>
              <a href={void 0}>
                <LazyLoadImage src={instaicon} alt="" />
              </a>
              <a href={void 0}>
                <LazyLoadImage src={pinteresticon} alt="" />
              </a>
              <a href={void 0}>
                <LazyLoadImage src={yticon} alt="" />
              </a>
            </div>
            <div className="site-copyright">
              Copyright 2022 © Nest. All rights reserved. Powered by AliThemes.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarMobileContent;
