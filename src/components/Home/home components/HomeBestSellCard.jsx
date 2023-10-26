import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector, useDispatch } from "react-redux";
import { updateCartNavbar } from "../../../redux/reducers/navbarUpdateReducers/cartUpdateReducer";
import { addSingleProduct } from "../../../redux/reducers/singleProductReducer";
import { addCompareProduct } from "../../../redux/reducers/compareProductsReducer";
import { updateWishlistNavbar } from "../../../redux/reducers/navbarUpdateReducers/wishlistUpdateReducer";
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

function HomeBestSellCard({ name, price, image, prodId, setmodal, wishlist }) {
  const products = useSelector((state) => state.products.products);
  const compared = useSelector((state) => state.compare.productsToCompare);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filtered = wishlist?.find((item) => item.product?._id == prodId);

  const handleModelClick = (e) => {
    const id = e.target.closest(".best-sell-parent").getAttribute("data");
    dispatch(startSpinner());
    sendRequest("post", "product/detail", { id: id })
      .then((res) => {
        dispatch(stopSpinner());
        dispatch(addSingleProduct(res.product));
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
      sendRequest("post", "wishlist", { product: id, isLiked: true })
        .then((res) => {
          dispatch(stopSpinner());
          successToast(res.message);

          sendRequest("get", "wishlist")
            .then((res) => {
              dispatch(addWishlist(res.wishlist));
            })
            .catch((err) => console.log(err));
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

  const handleCompareClick = (e) => {
    const id = e.target.closest(".best-sell-parent").getAttribute("data");
    const filteredProduct = products.find((item) => item._id == id);
    const filtered = compared.find((item) => item._id == id);
    if (!filtered && compared.length < 3) {
      dispatch(addCompareProduct(filteredProduct));
      successToast("Product added to compare!");
    } else if (compared.length >= 3) {
      errorToast("Only 3 products can be compared!");
    } else {
      errorToast("Product already added!");
    }
  };

  var productArray;
  const handleCartClick = (e) => {
    const id = e.target.closest(".best-sell-parent").getAttribute("data");
    const filtered = products.filter((item) => item._id == id)[0];
    const currentUser = localStorage.getItem("current_user");
    const item = localStorage.getItem("cartItem");
    const cartItem = JSON.parse(item);
    const cartId = localStorage.getItem("cartId");
    const check = cartItem?.find((item) => item._id == id);
    if (currentUser) {
      if (!check) {
        if (!cartId) {
          productArray = [filtered];
          dispatch(startSpinner());
          sendRequest("post", "cart/add", {
            products: [
              {
                product: filtered._id,
                quantity: 1,
                price: 10000,
                taxable: false,
              },
            ],
          })
            .then((res) => {
              dispatch(stopSpinner());
              successToast("Product added into the cart!");
              localStorage.setItem("cartItem", JSON.stringify(productArray));
              localStorage.setItem("cartId", res.cartId);
              dispatch(updateCartNavbar());
            })
            .catch((err) => {
              dispatch(stopSpinner());
              errorToast(err);
            });
        } else {
          productArray = [...cartItem, filtered];
          const cartId = localStorage.getItem("cartId");
          dispatch(startSpinner());
          sendRequest("post", `cart/add/${cartId}`, {
            product: {
              product: filtered._id,
              quantity: 1,
              price: 10000,
              taxable: false,
            },
          })
            .then(() => {
              dispatch(stopSpinner());
              successToast("Product added into the cart!");
              localStorage.setItem("cartItem", JSON.stringify(productArray));
              dispatch(updateCartNavbar());
            })
            .catch((err) => {
              dispatch(stopSpinner());
              errorToast(err);
            });
        }
      } else {
        errorToast("Item is already in the cart!");
      }
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
              <img className="default-img prod-img-2" src={image} alt="" />
              {/* <img className="hover-img" src={img2} alt="" /> */}
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
            <a
              href={void 0}
              aria-label="Compare"
              className="action-btn small hover-up"
              onClick={handleCompareClick}
            >
              <i className="fi-rs-shuffle"></i>
            </a>
          </div>
        </>
        <div className="product-badges product-badges-position product-badges-mrg">
          <span className="hot">Save 15%</span>
        </div>
      </div>
      <div className="product-content-wrap">
        <div className="product-category">
          <a href={void 0}>Hodo Foods</a>
        </div>
        <h2 className="prod-name">
          <a href={void 0}>{name}</a>
        </h2>
        <div className="product-rate d-inline-block">
          <div className="product-rating" style={{ width: "80%" }}></div>
        </div>
        <div className="product-price mt-10">
          <>
            <span>${price}</span>
            <span className="old-price">$245.8</span>
          </>
        </div>
        <div className="sold mt-15 mb-15">
          <div className="progress mb-5">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "50%" }}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <span className="font-xs text-heading"> Sold: 90/120</span>
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
