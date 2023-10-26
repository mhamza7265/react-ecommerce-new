import logo from "../../assets/imgs/theme/logo.svg";
import compicon from "../../assets/imgs/theme/icons/icon-compare.svg";
import wishicon from "../../assets/imgs/theme/icons/icon-heart.svg";
import carticon from "../../assets/imgs/theme/icons/icon-cart.svg";
import accnticon from "../../assets/imgs/theme/icons/icon-user.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
import { useSelector, useDispatch } from "react-redux";
import NavbarMidCartDropdown from "./navbar-components/NavbarMidCartDropdown";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../../redux/reducers/searchReducer";
import { stopSpinner, startSpinner } from "../../redux/reducers/spinnerReducer";
import { addWishlist } from "../../redux/reducers/wishlistReducer";
import { updateWishlistNavbar } from "../../redux/reducers/navbarUpdateReducers/wishlistUpdateReducer";

function NavbarHeaderMid() {
  const updateCart = useSelector((state) => state.updateCartNavbar.number);
  const products = useSelector((state) => state.products.products);
  const search = useSelector((state) => state.search.search);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const productsToCompare = useSelector(
    (state) => state.compare.productsToCompare
  );
  // const [wishlist, setWishlist] = useState(null);
  const currentUser = localStorage.getItem("current_user");
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   sendRequest("get", "wishlist")
  //     .then((res) => {
  //       // dispatch(addWishlist(res.wishlist));
  //       setWishlist(res.wishlist);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const item = localStorage.getItem("cartItem");
    const cartItem = JSON.parse(item);
    setCart(cartItem);
  }, [updateCart]);

  const handleWishlistNavClick = () => {
    const currentUser = localStorage.getItem("current_user");

    if (currentUser) {
      navigate("/wishlist");
    } else {
      errorToast("Please login first!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const handleCartNavClick = () => {
    const currentUser = localStorage.getItem("current_user");

    if (currentUser) {
      navigate("/cart");
    } else {
      errorToast("Please login first!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const handleRemoveClick = (e) => {
    const id = e.target
      .closest(".cart-dropdown-single-parent")
      .getAttribute("data");
    const cartId = localStorage.getItem("cartId");
    dispatch(startSpinner());
    sendRequest("delete", `cart/delete/${cartId}/${id}`)
      .then(() => {
        dispatch(stopSpinner());
        successToast("Product removed from cart!");
        const item = localStorage.getItem("cartItem");
        const cartItem = JSON.parse(item);
        const filtered = cartItem.filter((item) => item._id !== id);
        localStorage.setItem("cartItem", JSON.stringify(filtered));
        setCart(filtered);
      })
      .catch((err) => {
        dispatch(stopSpinner());
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearch(value));
  };

  return (
    <div>
      <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
        <div className="container">
          <div className="header-wrap">
            {!products ? (
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
                      <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search for items..."
                        value={search}
                      />
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
                          <span className="pro-count blue">
                            {productsToCompare ? productsToCompare.length : 0}
                          </span>
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
                          <span className="pro-count blue">
                            {wishlist ? wishlist?.length : 0}
                          </span>
                        </Link>
                        <a href={void 0} onClick={handleWishlistNavClick}>
                          <span className="lable">Wishlist</span>
                        </a>
                      </div>
                      <div className="header-action-icon-2">
                        <Link to="/cart" className="mini-cart-icon">
                          <LazyLoadImage alt="Nest" src={carticon} />
                          <span className="pro-count blue">
                            {cart ? cart.length : 0}
                          </span>
                        </Link>
                        {
                          <a href={void 0} onClick={handleCartNavClick}>
                            <span className="lable">Cart</span>
                          </a>
                        }
                        {!products ? (
                          <Skeleton
                            style={{ borderRadius: "15px", height: "250px" }}
                          />
                        ) : (
                          <div
                            className="cart-dropdown-wrap cart-dropdown-hm2"
                            style={{
                              zIndex: 1,
                              maxHeight: "400px",
                              height: "auto",
                              overflowY: "auto",
                            }}
                          >
                            <ul>
                              {cart?.length > 0 ? (
                                cart.map((item, i) => (
                                  <NavbarMidCartDropdown
                                    key={i}
                                    image={item.imageUrl}
                                    name={item.name}
                                    price={item.price}
                                    prodId={item._id}
                                    delItem={handleRemoveClick}
                                  />
                                ))
                              ) : (
                                <p className="text-center">
                                  No item in the cart.
                                </p>
                              )}
                            </ul>
                            <div className="shopping-cart-footer">
                              {/* <div className="shopping-cart-total">
                                <h4>
                                  Total <span>$4000.00</span>
                                </h4>
                              </div> */}
                              <div className="shopping-cart-button">
                                <Link to={"/cart"} className="outline">
                                  View cart
                                </Link>
                                <Link to={"/checkout"} href={void 0}>
                                  Checkout
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="header-action-icon-2">
                        {currentUser ? (
                          <>
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
                          </>
                        ) : (
                          <Link to={"/login"}>
                            <span className="lable ml-0">Login</span>
                          </Link>
                        )}
                        {/* <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
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
                        </div> */}
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
