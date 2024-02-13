import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlistNavbar } from "../../../redux/reducers/navbarUpdateReducers/wishlistUpdateReducer";
import { addCompareProduct } from "../../../redux/reducers/compareProductsReducer";
import { addSingleProduct } from "../../../redux/reducers/singleProductReducer";
import { updateCartNavbar } from "../../../redux/reducers/navbarUpdateReducers/cartUpdateReducer";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { addWishlist } from "../../../redux/reducers/wishlistReducer";

function FilterProductCard({ setmodal, image, name, prodId, price }) {
  const dispatch = useDispatch();
  const compared = useSelector((state) => state.compare.productsToCompare);
  const products = useSelector((state) => state.products.products);

  const handleWishlistClick = (e) => {
    const id = e.target.closest(".filter-card-parent").getAttribute("data");
    sendRequest("post", "wishlist", { product: id, isLiked: true })
      .then((res) => {
        successToast(res.message);

        sendRequest("get", "wishlist")
          .then((res) => {
            dispatch(addWishlist(res.wishlist));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        errorToast(err.message);
      });
  };

  const handleCompareClick = (e) => {
    const id = e.target.closest(".filter-card-parent").getAttribute("data");
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

  const handleModelClick = (e) => {
    const id = e.target.closest(".filter-card-parent").getAttribute("data");
    const filtered = products.filter((item) => item._id == id)[0];
    // dispatch(addSingleProduct(filtered));
    setmodal(true);
  };

  var productArray;
  const handleCartClick = (e) => {
    const id = e.target.closest(".filter-card-parent").getAttribute("data");
    const filtered = products.filter((item) => item._id == id)[0];
    const item = localStorage.getItem("cartItem");
    const cartItem = JSON.parse(item);
    const cartId = localStorage.getItem("cartId");
    const check = cartItem?.find((item) => item._id == id);
    if (!check) {
      if (!cartId) {
        productArray = [filtered];
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
            successToast("Product added into the cart!");
            localStorage.setItem("cartItem", JSON.stringify(productArray));
            localStorage.setItem("cartId", res.cartId);
            dispatch(updateCartNavbar());
          })
          .catch((err) => {
            errorToast(err);
          });
      } else {
        productArray = [...cartItem, filtered];
        const cartId = localStorage.getItem("cartId");
        sendRequest("post", `cart/add/${cartId}`, {
          product: {
            product: filtered._id,
            quantity: 1,
            price: 10000,
            taxable: false,
          },
        })
          .then(() => {
            successToast("Product added into the cart!");
            localStorage.setItem("cartItem", JSON.stringify(productArray));
            dispatch(updateCartNavbar());
          })
          .catch((err) => {
            errorToast(err);
          });
      }
    } else {
      errorToast("Item is already in the cart!");
    }
  };

  return (
    <div
      className={"col-lg-1-5 col-md-4 col-12 col-sm-6 filter-card-parent"}
      data={prodId}
    >
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            <a href={void 0}>
              <LazyLoadImage
                className="default-img prod-img"
                src={image}
                alt=""
              />
            </a>
          </div>
          <>
            <div className="product-action-1">
              <a
                href={void 0}
                aria-label="Add To Wishlist"
                className="action-btn"
                onClick={handleWishlistClick}
              >
                <i className="fi-rs-heart"></i>
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
              >
                <i className="fi-rs-eye"></i>
              </a>
            </div>
            <div className="product-badges product-badges-position product-badges-mrg">
              <span className="hot">Hot</span>
            </div>
          </>
        </div>
        <div className="product-content-wrap">
          <div className="product-category">
            <a href={void 0}>Snack</a>
          </div>
          <h2 className="prod-name">
            <a href={void 0}>{name}</a>
          </h2>
          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted"> (4.0)</span>
          </div>
          <div>
            <span className="font-small text-muted">
              By <a href={void 0}>NestFood</a>
            </span>
          </div>
          <div className="product-card-bottom">
            <div className="product-price">
              <span>${price}</span>
              <span className="old-price">$32.8</span>
            </div>
            <div className="add-cart">
              <a href={void 0} className="add" onClick={handleCartClick}>
                <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterProductCard;
