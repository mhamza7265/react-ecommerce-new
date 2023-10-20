import { LazyLoadImage } from "react-lazy-load-image-component";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useSelector } from "react-redux";

function WishlistRow({ id, name, image, price, prodId }) {
  const products = useSelector((state) => state.products.products);

  var productArray;
  const handleCartClick = (e) => {
    const id = e.target.closest(".wishlist-item").getAttribute("data");
    const filtered = products.filter((item) => item._id == id)[0];
    const item = localStorage.getItem("cartItem");
    const cartItem = JSON.parse(item);
    const check = cartItem?.find((item) => item._id == id);
    if (!check) {
      if (!cartItem) {
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
          })
          .catch((err) => {
            errorToast(err.message);
          });
      } else {
        productArray = [...cartItem, filtered];
        const cartId = localStorage.getItem("cartId");
        sendRequest("post", `cart/add/${cartId}`, {
          products: {
            product: filtered._id,
            quantity: 1,
            price: 10000,
            taxable: false,
          },
        })
          .then(() => {
            successToast("Product added into the cart!");
          })
          .catch((err) => {
            errorToast(err.message);
          });
      }

      localStorage.setItem("cartItem", JSON.stringify(productArray));
    } else {
      errorToast("Item is already in the cart!");
    }
  };

  return (
    <tr className="wishlist-item" data={prodId}>
      <td className="custome-checkbox pl-30">
        <>
          <input
            className="form-check-input"
            type="checkbox"
            name="checkbox"
            id={`exampleCheckbox${id}`}
            value=""
          />
          <label
            className="form-check-label"
            htmlFor={`exampleCheckbox${id}`}
          ></label>
        </>
      </td>
      <td className="image product-thumbnail">
        <LazyLoadImage src={image} alt="#" />
      </td>
      <td className="product-des product-name">
        <>
          <h6>
            <a className="product-name mb-10">{name}</a>
          </h6>
          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted"> (4.0)</span>
          </div>
        </>
      </td>
      <td className="price" data-title="Price">
        <h3 className="text-brand">${price}</h3>
      </td>
      <td className="text-center detail-info" data-title="Stock">
        <span className="stock-status in-stock mb-0"> In Stock </span>
      </td>
      <td className="text-right" data-title="Cart">
        <button onClick={handleCartClick} className="btn btn-sm">
          Add to cart
        </button>
      </td>
      <td className="action text-center" data-title="Remove">
        <a className="text-body">
          <i className="fi-rs-trash"></i>
        </a>
      </td>
    </tr>
  );
}

export default WishlistRow;