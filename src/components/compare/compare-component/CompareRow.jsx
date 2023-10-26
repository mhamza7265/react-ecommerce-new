import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { updateCartNavbar } from "../../../redux/reducers/navbarUpdateReducers/cartUpdateReducer";
import { removeCompareProducts } from "../../../redux/reducers/compareProductsReducer";
import { useNavigate } from "react-router";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";

function CompareRow({ image, name, price, prodId, description }) {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveClick = (e) => {
    const id = e.target.closest(".compare-row-parent").getAttribute("data");
    dispatch(removeCompareProducts(id));
  };

  var productArray;
  const handleCartClick = (e) => {
    const id = e.target.closest(".compare-row-parent").getAttribute("data");
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
    <tr className="compare-row-parent" data={prodId}>
      <td className="row_img">
        <LazyLoadImage src={image} alt="compare-img" />
      </td>
      <td className="product_name">
        <h6>
          <a className="text-heading">{name}</a>
        </h6>
      </td>
      <td className="product_price">
        <h4 className="price text-brand">${price}</h4>
      </td>
      <td>
        <div className="rating_wrap">
          <div className="product-rate d-inline-block">
            <div className="product-rating" style={{ width: "90%" }}></div>
          </div>
          <span className="rating_num">(121)</span>
        </div>
      </td>
      <td className="row_text font-xs">
        <p className="font-sm text-muted">{description}</p>
      </td>
      <td className="row_stock">
        <span className="stock-status in-stock mb-0">In Stock</span>
      </td>
      <td className="row_weight">"320 gram"</td>
      <td className="row_btn">
        <button className="btn btn-sm text-nowrap" onClick={handleCartClick}>
          <i className="fi-rs-shopping-bag mr-5"></i>Add to cart
        </button>
      </td>
      <td>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "4px",
            padding: "5px ",
          }}
          className="btn btn-sm"
          onClick={handleRemoveClick}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CompareRow;
