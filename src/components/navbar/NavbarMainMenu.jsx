import banner from "../../assets/imgs/banner/banner-menu.webp";
import { NavLink, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function NavbarMainMenu() {
  return (
    <div className="ms-5">
      <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading">
        <nav>
          <ul>
            <li>
              <NavLink to="/" className="">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="d-none">
              <a href={void 0}>
                Shop <i className="fi-rs-angle-down"></i>
              </a>
              <ul className="sub-menu">
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
                <li>
                  <a href={void 0}>
                    Single Product <i className="fi-rs-angle-right"></i>
                  </a>
                  <ul className="level-menu">
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
                      <a href={void 0}>Product – Vendor Info</a>
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
                <li>
                  <a href={void 0}>
                    Shop Invoice<i className="fi-rs-angle-right"></i>
                  </a>
                  <ul className="level-menu">
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
              </ul>
            </li>
            <li className="d-none">
              <a href={void 0}>
                Vendors <i className="fi-rs-angle-down"></i>
              </a>
              <ul className="sub-menu">
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
              </ul>
            </li>
            {/* <li className="position-static">
              <a href={void 0}>
                Mega menu <i className="fi-rs-angle-down"></i>
              </a>
              <ul className="mega-menu">
                <li className="sub-mega-menu sub-mega-menu-width-22">
                  <a className="menu-title">Fruit & Vegetables</a>
                  <ul>
                    <li>
                      <a href={void 0}>Meat & Poultry</a>
                    </li>
                    <li>
                      <a href={void 0}>Fresh Vegetables</a>
                    </li>
                    <li>
                      <a href={void 0}>Herbs & Seasonings</a>
                    </li>
                    <li>
                      <a href={void 0}>Cuts & Sprouts</a>
                    </li>
                    <li>
                      <a href={void 0}>Exotic Fruits & Veggies</a>
                    </li>
                    <li>
                      <a href={void 0}>Packaged Produce</a>
                    </li>
                  </ul>
                </li>
                <li className="sub-mega-menu sub-mega-menu-width-22">
                  <a className="menu-title">Breakfast & Dairy</a>
                  <ul>
                    <li>
                      <a href={void 0}>Milk & Flavoured Milk</a>
                    </li>
                    <li>
                      <a href={void 0}>Butter and Margarine</a>
                    </li>
                    <li>
                      <a href={void 0}>Eggs Substitutes</a>
                    </li>
                    <li>
                      <a href={void 0}>Marmalades</a>
                    </li>
                    <li>
                      <a href={void 0}>Sour Cream</a>
                    </li>
                    <li>
                      <a href={void 0}>Cheese</a>
                    </li>
                  </ul>
                </li>
                <li className="sub-mega-menu sub-mega-menu-width-22">
                  <a className="menu-title">Meat & Seafood</a>
                  <ul>
                    <li>
                      <a href={void 0}>Breakfast Sausage</a>
                    </li>
                    <li>
                      <a href={void 0}>Dinner Sausage</a>
                    </li>
                    <li>
                      <a href={void 0}>Chicken</a>
                    </li>
                    <li>
                      <a href={void 0}>Sliced Deli Meat</a>
                    </li>
                    <li>
                      <a href={void 0}>Wild Caught Fillets</a>
                    </li>
                    <li>
                      <a href={void 0}>Crab and Shellfish</a>
                    </li>
                  </ul>
                </li>
                <li className="sub-mega-menu sub-mega-menu-width-34">
                  <div className="menu-banner-wrap">
                    <a href={void 0}>
                      <LazyLoadImage src={banner} alt="Nest" />
                    </a>
                    <div className="menu-banner-content">
                      <h4>Hot deals</h4>
                      <h3>
                        Don't miss
                        <br />
                        Trending
                      </h3>
                      <div className="menu-banner-price">
                        <span className="new-price text-success">
                          Save to 50%
                        </span>
                      </div>
                      <div className="menu-banner-btn">
                        <a href={void 0}>Shop now</a>
                      </div>
                    </div>
                    <div className="menu-banner-discount">
                      <h3>
                        <span>25%</span>
                        off
                      </h3>
                    </div>
                  </div>
                </li>
              </ul>
            </li> */}
            <li className="d-none">
              <a href={void 0}>
                Blog <i className="fi-rs-angle-down"></i>
              </a>
              <ul className="sub-menu">
                <li>
                  <a href={void 0}>Blog Category Grid</a>
                </li>
                <li>
                  <a href={void 0}>Blog Category List</a>
                </li>
                <li>
                  <a href={void 0}>Blog Category Big</a>
                </li>
                <li>
                  <a href={void 0}>Blog Category Wide</a>
                </li>
                <li>
                  <a href={void 0}>
                    Single Post <i className="fi-rs-angle-right"></i>
                  </a>
                  <ul className="level-menu level-menu-modify">
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
              </ul>
            </li>
            <li>
              <a href={void 0}>
                Pages <i className="fi-rs-angle-down"></i>
              </a>
              <ul className="sub-menu">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/account">My Account</Link>
                </li>
                {/* <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li> */}
                {/* <li>
                  <Link to="/forgotpw">Forgot password</Link>
                </li> */}
                <li>
                  <Link to="/resetpw">Reset password</Link>
                </li>
                <li>
                  <Link to="/notfound">404 Page</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavbarMainMenu;
