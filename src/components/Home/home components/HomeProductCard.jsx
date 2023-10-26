import ScrollAnimation from "react-animate-on-scroll";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useDispatch, useSelector } from "react-redux";
import { addCompareProduct } from "../../../redux/reducers/compareProductsReducer";
import { updateWishlistNavbar } from "../../../redux/reducers/navbarUpdateReducers/wishlistUpdateReducer";
import { updateCartNavbar } from "../../../redux/reducers/navbarUpdateReducers/cartUpdateReducer";
import { addSingleProduct } from "../../../redux/reducers/singleProductReducer";
import { useNavigate } from "react-router";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import { addWishlist } from "../../../redux/reducers/wishlistReducer";

function HomeProductCard({
  setmodal,
  id,
  image,
  name,
  price,
  prodId,
  wishlist,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const compared = useSelector((state) => state.compare.productsToCompare);
  const products = useSelector((state) => state.products.products);
  // const wishlist = useSelector((state) => state.wishlist.wishlist);

  const filtered = wishlist?.find((item) => item.product?._id == prodId);

  const handleWishlistClick = (e) => {
    const id = e.target.closest(".product-parent").getAttribute("data");
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
    const id = e.target.closest(".product-parent").getAttribute("data");
    const filteredProduct = products.find((item) => item._id == id);
    const filtered = compared.find((item) => item._id == id);
    console.log(filtered);
    if (!filtered && compared.length < 3) {
      dispatch(addCompareProduct(filteredProduct));
      successToast("Product added to compare!");
    } else if (compared.length >= 3) {
      errorToast("Only 3 products can be compared!");
    } else {
      errorToast("Product already added!");
    }
  };

  const handleModelClick = (e) => {
    const id = e.target.closest(".product-parent").getAttribute("data");
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

  const handleSingleProductClick = (e) => {
    const id = e.target.closest(".product-parent").getAttribute("data");
    dispatch(startSpinner());
    sendRequest("post", "product/detail", { id: id })
      .then((res) => {
        dispatch(stopSpinner());
        dispatch(addSingleProduct(res.product));
        navigate("/singleproduct");
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopSpinner());
      });
  };

  var productArray;
  const handleCartClick = (e) => {
    const id = e.target.closest(".product-parent").getAttribute("data");
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
                    src={image}
                    alt=""
                  />
                  {/* <LazyLoadImage
                      className="hover-img"
                      src={product22}
                      alt=""
                    /> */}
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
                <a
                  href={void 0}
                  aria-label="Compare"
                  className="action-btn"
                  onClick={handleCompareClick}
                >
                  <i className="fi-rs-shuffle"></i>
                </a>
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
              <a href={void 0}>Hodo Foods</a>
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
                <span>${price}</span>
                <span className="old-price">$55.8</span>
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
