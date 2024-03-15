import "react-loading-skeleton/dist/skeleton.css";
import { useSelector, useDispatch } from "react-redux";
import { addSingleProduct } from "../../../redux/reducers/singleProductReducer";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useNavigate } from "react-router";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import { addWishlist } from "../../../redux/reducers/wishlistReducer";
import BASE_URL from "../../../utility-functions/config";
import { updateCartQuantity } from "../../../redux/reducers/cartQuantityReducer";
import { updateWishlistQuantity } from "../../../redux/reducers/wishlistQuantityReducer";
import { updateCart } from "../../../redux/reducers/cartReducer";

function HomeBestSellCard({
  name,
  price,
  image,
  prodId,
  setmodal,
  discount,
  category,
  sold,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistList = useSelector((state) => state.wishlist.wishlist);
  const filtered = wishlistList?.find((item) => item.productId == prodId);

  const handleModelClick = (e) => {
    const id = e.target.closest(".best-sell-parent").getAttribute("data");
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

  const handleWishlistClick = (e) => {
    const id = e.target.closest(".best-sell-parent").getAttribute("data");
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

  const handleCartClick = (e) => {
    const id = e.target.closest(".best-sell-parent").getAttribute("data");
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
                dispatch(updateCartQuantity(res.quantity));
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
          console.log("reserror", err);
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
    <div className="product-cart-wrap best-sell-parent" data={prodId}>
      <div className="product-img-action-wrap">
        <>
          <div className="product-img product-img-zoom">
            <a href={void 0}>
              <img
                className="default-img prod-img-2"
                src={BASE_URL + "/" + image[0]}
                alt=""
              />
              <img
                className="hover-img prod-img"
                src={BASE_URL + "/" + image[1]}
                alt=""
              />
            </a>
          </div>
          <div className="product-action-1">
            <a
              href={void 0}
              aria-label="Quick view"
              className="action-btn small hover-up"
              onClick={handleModelClick}
            >
              <i className="fi-rs-eye"></i>
            </a>
            <a
              href={void 0}
              aria-label="Add To Wishlist"
              className="action-btn small hover-up"
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
              className="action-btn small hover-up"
              onClick={handleCompareClick}
            >
              <i className="fi-rs-shuffle"></i>
            </a> */}
          </div>
        </>
        <div className="product-badges product-badges-position product-badges-mrg">
          <span className="hot">Save {discount}%</span>
        </div>
      </div>
      <div className="product-content-wrap">
        <div className="product-category">
          <a href={void 0}>
            {category[0].toUpperCase() + category.substring(1)}
          </a>
        </div>
        <h2 className="prod-name">
          <a href={void 0}>{name}</a>
        </h2>
        <div className="product-rate d-inline-block">
          <div className="product-rating" style={{ width: "80%" }}></div>
        </div>
        <div className="product-price mt-10">
          <>
            <span>${(price / 100) * 100 - discount}</span>
            <span className="old-price">{price}</span>
          </>
        </div>
        <div className="sold mt-15 mb-15">
          {/* <div className="progress mb-5">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "50%" }}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div> */}
          <span className="font-xs text-heading"> Sold: {sold.count}</span>
        </div>
        <a
          href={void 0}
          className="btn w-100 hover-up"
          onClick={handleCartClick}
        >
          <i className="fi-rs-shopping-cart mr-5"></i>Add To Cart
        </a>
      </div>
    </div>
  );
}

export default HomeBestSellCard;
