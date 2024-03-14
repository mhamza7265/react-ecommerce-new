import ScrollAnimation from "react-animate-on-scroll";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useDispatch, useSelector } from "react-redux";
import { addSingleProduct } from "../../../redux/reducers/singleProductReducer";
import { useNavigate } from "react-router";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import { addWishlist } from "../../../redux/reducers/wishlistReducer";
import { updateCartQuantity } from "../../../redux/reducers/cartQuantityReducer";
import { updateWishlistQuantity } from "../../../redux/reducers/wishlistQuantityReducer";
import { updateCart } from "../../../redux/reducers/cartReducer";

function HomeProductCard({
  setmodal,
  id,
  name,
  img1,
  img2,
  price,
  discountVal,
  prodId,
  category,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgs1 = `http://localhost:3000/${img1}`;
  const imgs2 = `http://localhost:3000/${img2}`;
  const wishlistList = useSelector((state) => state.wishlist.wishlist);

  const filtered = wishlistList?.find((item) => item.productId == prodId);

  const handleWishlistClick = (e) => {
    const id = e.target.closest(".product-parent").getAttribute("data");
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      dispatch(startSpinner());
      sendRequest("post", "wishlist", { prodId: id })
        .then((res) => {
          dispatch(stopSpinner());
          if (res.status) {
            successToast(res.message);

            sendRequest("get", "wishlist")
              .then((res) => {
                dispatch(addWishlist(res.wishlist));
              })
              .catch((err) => console.log(err));

            sendRequest("get", "wishlist/qty")
              .then((res) => {
                console.log(res);
                dispatch(updateWishlistQuantity(res.wishlistQuantity));
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
            } else if (res.type == "loginToContinue") {
              setTimeout(() => {
                navigate("/login");
              }, 3000);
            }
          }
        })
        .catch((err) => {
          dispatch(stopSpinner());
          errorToast(err);
        });
    } else {
      errorToast("Please login first!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const handleModelClick = (e) => {
    const id = e.target.closest(".product-parent").getAttribute("data");
    dispatch(startSpinner());
    sendRequest("get", `product/single/${id}`)
      .then((res) => {
        dispatch(stopSpinner());
        dispatch(addSingleProduct(res.data[0]));
        setmodal(true);
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopSpinner());
      });
  };

  const handleSingleProductClick = (e) => {
    const id = e.target.closest(".product-parent").getAttribute("data");
    dispatch(startSpinner());
    sendRequest("get", `product/single/${id}`)
      .then((res) => {
        dispatch(stopSpinner());
        dispatch(addSingleProduct(res.data[0]));
        navigate("/singleproduct");
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopSpinner());
      });
  };

  const handleCartClick = (e) => {
    const id = e.target.closest(".product-parent").getAttribute("data");
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      dispatch(startSpinner());
      sendRequest("post", "cart", { id, quantity: 1 })
        .then((res) => {
          dispatch(stopSpinner());
          if (res.status) {
            dispatch(updateCart(res.cart));
            successToast(res.message);
            sendRequest("get", "cart/qty")
              .then((res) => {
                console.log(res);
                dispatch(updateCartQuantity(res.quantity));
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            errorToast(res.error);
            console.log("reserror", res.type);
            if (res.type == "updatePassword") {
              setTimeout(() => {
                navigate("/updatePw");
              }, 2000);
            } else if (res.type == "loginToContinue") {
              setTimeout(() => {
                navigate("/login");
              }, 3000);
            }
          }
        })
        .catch((err) => {
          dispatch(stopSpinner());
          errorToast(err);
        });
    } else {
      errorToast("Please login first!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <>
      <div
        className="col-lg-1-5 col-md-4 col-12 col-sm-6 product-parent"
        data={prodId}
      >
        <ScrollAnimation
          animateIn="animate__animated animate__fadeIn"
          className="product-cart-wrap mb-30"
          delay={Number(id)}
          animateOnce={true}
        >
          <div className="product-img-action-wrap">
            <>
              <div className="product-img product-img-zoom">
                <a href={void 0}>
                  <LazyLoadImage
                    className="default-img prod-img"
                    src={imgs1}
                    alt=""
                  />
                  <LazyLoadImage
                    className="hover-img prod-img"
                    src={imgs2}
                    alt=""
                  />
                </a>
              </div>
              <div className="product-action-1">
                <a
                  aria-label="Add To Wishlist"
                  className="action-btn"
                  onClick={handleWishlistClick}
                >
                  {filtered ? (
                    <i className="fa-solid fa-heart"></i>
                  ) : (
                    <i className="fi-rs-heart"></i>
                  )}
                </a>
                {/* <a
                  href={void 0}
                  aria-label="Compare"
                  className="action-btn"
                  onClick={handleCompareClick}
                >
                  <i className="fi-rs-shuffle"></i>
                </a> */}
                <a
                  href={void 0}
                  aria-label="Quick view"
                  className="action-btn"
                  onClick={handleModelClick}
                  // onClick={() => setmodal(true)}
                >
                  <i className="fi-rs-eye"></i>
                </a>
              </div>
            </>
            <div className="product-badges product-badges-position product-badges-mrg">
              <span className="sale">Sale</span>
            </div>
          </div>
          <div className="product-content-wrap">
            <div className="product-category">
              <a href={void 0}>
                {category &&
                  category[0]?.toUpperCase() + category?.substring(1)}
              </a>
            </div>
            <h2 className="prod-name">
              <a onClick={handleSingleProductClick} href={void 0}>
                {name}
              </a>
            </h2>
            <div className="product-rate-cover">
              <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: "80%" }}></div>
              </div>

              <span className="font-small ml-5 text-muted"> (3.5)</span>
            </div>
            <div>
              <span className="font-small text-muted">
                By <a href={void 0}>Stouffer</a>
              </span>
            </div>
            <div className="product-card-bottom">
              <div className="product-price">
                <span>${(price / 100) * 100 - discountVal}</span>
                <span className="old-price">${price}</span>
              </div>

              <div className="add-cart">
                <a href={void 0} className="add" onClick={handleCartClick}>
                  <i className="fi-rs-shopping-cart mr-5"></i>Add
                </a>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </>
  );
}

export default HomeProductCard;
