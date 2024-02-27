import logo from "../../assets/imgs/theme/logo.svg";
import wishicon from "../../assets/imgs/theme/icons/icon-heart.svg";
import carticon from "../../assets/imgs/theme/icons/icon-cart.svg";
import accnticon from "../../assets/imgs/theme/icons/icon-user.svg";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
import { useSelector, useDispatch } from "react-redux";
import NavbarMidCartDropdown from "./navbar-components/NavbarMidCartDropdown";
import { useNavigate } from "react-router-dom";
import { stopSpinner, startSpinner } from "../../redux/reducers/spinnerReducer";
import { updateCart } from "../../redux/reducers/cartReducer";
import { updateCartQuantity } from "../../redux/reducers/cartQuantityReducer";

function NavbarHeaderMid({
  setAutocomplete,
  search,
  setSearch,
  searchError,
  setSearchError,
  handleSearchClick,
}) {
  const products = useSelector((state) => state.products.products);
  const cartQuantity = useSelector((state) => state.cartQuantity.quantity);
  const wishlistQuantity = useSelector(
    (state) => state.wishlistQuantity.quantity
  );
  const currentUser = localStorage.getItem("current_user");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCart = useSelector((state) => state.cart.cart);

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

  const handleRemoveClick = (id, quantity) => {
    dispatch(startSpinner());
    sendRequest("delete", `cart`, { product: id, quantity })
      .then((res) => {
        if (res.status) {
          dispatch(stopSpinner());
          successToast("Product removed from cart!");
          sendRequest("get", "cart")
            .then((res) => {
              if (res.status) {
                sendRequest("get", "cart/qty")
                  .then((res) => {
                    dispatch(updateCartQuantity(res.quantity));
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                dispatch(updateCart(res.cart[0]));
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          errorToast(res.error);
          if (res.type == "updatePassword") {
            setTimeout(() => {
              navigate("/updatePw");
            }, 2000);
          }
        }
      })
      .catch((err) => {
        dispatch(stopSpinner());
        console.log(err);
      });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchError(false);
    setSearch(value);
    if (value !== "") {
      sendRequest("post", "products/filter", {
        products: value,
        autoComplete: true,
      })
        .then((res) => {
          setAutocomplete(res.filteredNames);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAutocomplete("");
    }
  };

  return (
    <div className="position-relative">
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
                  <Link to="/" href={void 0}>
                    <LazyLoadImage src={logo} alt="logo" />
                  </Link>
                </div>
                <div className="header-right">
                  <div className="search-style-2 position-relative">
                    <form onSubmit={(e) => e.preventDefault()}>
                      {/* <select className="select-active">
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
                      </select> */}
                      <input
                        type="text"
                        onChange={handleSearchChange}
                        placeholder="Search for items..."
                        value={search}
                      />
                      <button
                        type="submit"
                        className="search-btn"
                        onClick={handleSearchClick}
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                    {searchError ? (
                      <p style={{ color: "red", textAlign: "center" }}>
                        Please type product name to search!
                      </p>
                    ) : null}
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
                      {/* <div className="header-action-icon-2">
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
                      </div> */}
                      <div className="header-action-icon-2">
                        <Link to="/Wishlist">
                          <LazyLoadImage
                            className="svgInject"
                            alt="Nest"
                            src={wishicon}
                          />
                          <span className="pro-count blue">
                            {wishlistQuantity ? wishlistQuantity : 0}
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
                            {cartQuantity ? cartQuantity : 0}
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
                              {currentCart &&
                              Object.keys(currentCart?.cartItems[0])?.length >
                                0 ? (
                                Object.values(currentCart?.cartItems[0])?.map(
                                  (item, i) => (
                                    <NavbarMidCartDropdown
                                      key={i}
                                      image={item.images[0][0]}
                                      name={item.name}
                                      price={item.price}
                                      discount={item.discount.discountValue}
                                      quantity={item.quantity}
                                      prodId={item.productId}
                                      delItem={handleRemoveClick}
                                    />
                                  )
                                )
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
                              <span className="lable ml-0">Dashboard</span>
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
                                Dashboard
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
