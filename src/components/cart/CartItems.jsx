import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
import { useDispatch } from "react-redux";
import { startSpinner, stopSpinner } from "../../redux/reducers/spinnerReducer";
import BASE_URL from "../../utility-functions/config";
import { useNavigate } from "react-router";
import { updateCart } from "../../redux/reducers/cartReducer";

function CartItems({
  id,
  prodId,
  name,
  price,
  image,
  del,
  total,
  subTotal,
  quantity,
  setCartItems,
  setTotal,
  discount,
}) {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCount(quantity);
    setValue(quantity);
  }, [value]);

  useEffect(() => {
    sendRequest("get", `product/quantity/${prodId}`).then((res) => {
      setProductQuantity(res.availableQuantity);
    });
  });

  const handleDecrementClick = (e) => {
    if (count > 1) {
      setCount(() => count - 1);
    } else {
      return;
    }
    const handleSendRequest = (countValue) => {
      const id = e.target.closest(".cart-item").getAttribute("data");
      let calculate = quantity - countValue;
      dispatch(startSpinner());
      sendRequest("post", "cart", {
        id,
        quantity: calculate,
        decreaseQuantity: true,
      })
        .then((res) => {
          dispatch(stopSpinner());
          if (res.status) {
            dispatch(updateCart(res.cart));
            setCartItems(res.cart.cartItems[0]);
            successToast(res.message);
            sendRequest("get", "cart/total")
              .then((res) => {
                if (res.status) {
                  setTotal(res.calculation);
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
          errorToast(err.error);
        });
    };
    handleSendRequest(count > 1 ? count - 1 : count);
  };

  const handleIncrementClick = (e) => {
    productQuantity > 0 ? setCount((prevCount) => prevCount + 1) : null;

    const handleSendRequest = (countValue) => {
      const id = e.target.closest(".cart-item").getAttribute("data");
      dispatch(startSpinner());
      sendRequest("post", "cart", {
        id,
        quantity: Math.abs(parseInt(countValue) - parseInt(quantity)),
        increaseQuantity: true,
      })
        .then((res) => {
          dispatch(stopSpinner());
          if (res.status) {
            setCartItems(res.cart.cartItems[0]);
            successToast(res.message);
            sendRequest("get", `product/quantity/${id}`).then((res) => {
              setProductQuantity(res.availableQuantity);
            });
            dispatch(updateCart(res.cart));
            sendRequest("get", "cart/total")
              .then((res) => {
                if (res.status) {
                  setTotal(res.calculation);
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
          errorToast(err.error);
        });
    };

    handleSendRequest(count + 1);
  };

  const delItem = (e) => {
    if (window.confirm("Do you want to remove this product from cart?")) {
      del(e, quantity);
    } else {
      return;
    }
  };

  return (
    <tr className="cart-item position-relative" data={prodId}>
      {/* <td className="custome-checkbox pl-30">
        <>
          <input
            className="form-check-input"
            type="checkbox"
            name="checkbox"
            id={`exampleCheckbox${id}`}
          />
          <label
            className="form-check-label"
            htmlFor={`exampleCheckbox${id}`}
          ></label>
        </>
      </td> */}
      <td className="image product-thumbnail pl-30">
        <LazyLoadImage src={BASE_URL + "/" + image} alt="#" />
      </td>
      <td className="product-des product-name">
        <>
          <h6 className="mb-5">
            <a className="product-name mb-10 text-heading">{name}</a>
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
        <h4 className="text-body">${price}</h4>
      </td>
      <td
        className="text-center detail-info"
        data="prod2"
        data-title="Stock"
        id="count"
      >
        <div className="detail-extralink mr-15">
          <div className="detail-qty border radius">
            <a
              style={{ cursor: "pointer" }}
              onClick={handleDecrementClick}
              className="qty-down"
            >
              <i className="fi-rs-angle-small-down"></i>
            </a>
            <input className="qty-val" readOnly value={quantity} />
            <a
              style={{ cursor: "pointer" }}
              onClick={handleIncrementClick}
              className="qty-up"
            >
              <i className="fi-rs-angle-small-up"></i>
            </a>
          </div>
        </div>
      </td>
      <td className="price" data-title="Price">
        <h4 className="text-brand">${subTotal.toFixed()}</h4>
      </td>
      <td className="discount" data-title="discount">
        <h4 className="text-body">{discount}%</h4>
      </td>
      <td className="price" data-title="Price">
        <h4 className="text-brand">${total.toFixed()}</h4>
      </td>
      <td className="action text-center" data-title="Remove">
        <a href={void 0} className="text-body" onClick={delItem}>
          <i className="fi-rs-trash"></i>
        </a>
      </td>
    </tr>
  );
}

export default CartItems;
