import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import { updateCartNavbar } from "../../../redux/reducers/navbarUpdateReducers/cartUpdateReducer";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";

function FilterLowerCard({ name, price, image, prodId }) {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  var productArray;
  const handleCartClick = (e) => {
    const id = e.target.closest(".lower-card-parent").getAttribute("data");
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
            localStorage.setItem("cartId", res.cartId);
            localStorage.setItem("cartItem", JSON.stringify(productArray));
            dispatch(updateCartNavbar());
          })
          .catch((err) => {
            errorToast(err.message);
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
            errorToast(err.message);
          });
      }
    } else {
      errorToast("Item is already in the cart!");
    }
  };
  return (
    <div
      className={"col-xl-3 col-lg-4 col-md-6 lower-card-parent"}
      data={prodId}
    >
      <div className="product-cart-wrap style-2">
        <div className="product-img-action-wrap">
          <div className="product-img">
            <a href={void 0}>
              <LazyLoadImage
                className="default-img prod-img-3"
                src={image}
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="deals-countdown-wrap">
            <div
              className="deals-countdown"
              data-countdown="2025/03/25 00:00:00"
            ></div>
          </div>
          <div className="deals-content">
            <>
              <h2 className="prod-name">
                <a href={void 0}>{name}</a>
              </h2>
              <div className="product-rate-cover">
                <div className="product-rate d-inline-block">
                  <div
                    className="product-rating"
                    style={{ width: "90%" }}
                  ></div>
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
                  <span className="old-price">$33.8</span>
                </div>
                <div className="add-cart">
                  <a href={void 0} className="add" onClick={handleCartClick}>
                    <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
                  </a>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterLowerCard;
