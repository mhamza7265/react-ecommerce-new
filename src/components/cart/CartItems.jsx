import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sendRequest from "../../utility-functions/apiManager";
import { BarLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { startSpinner, stopSpinner } from "../../redux/reducers/spinnerReducer";
import BASE_URL from "../../utility-functions/config";

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
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const dispatch = useDispatch();

  const override = {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    margin: "0 auto",
    borderColor: "red",
    height: "1px",
    width: "100%",
    backgroundColor: "#3bb77e",
    padding: 0,
  };

  useEffect(() => {
    setCount(quantity);
    setValue(quantity);
  }, [value]);

  const handleDecrementClick = (e) => {
    count > 1 ? setCount(() => count - 1) : null;
    const handleSendRequest = (countValue) => {
      const id = e.target.closest(".cart-item").getAttribute("data");
      console.log("count", count);
      let calculate = quantity - countValue;
      console.log("calculate", calculate);
      console.log("quantity", quantity);
      // setSpinnerStatus(true);
      dispatch(startSpinner());
      sendRequest("post", "cart", {
        id,
        quantity: calculate,
        decreaseQuantity: true,
      }).then((res) => {
        // setSpinnerStatus(false);
        dispatch(stopSpinner());
        console.log(res);
        setCartItems(res.cart.cartItems[0]);
        sendRequest("get", "cart/total")
          .then((res) => {
            if (res.status) {
              setTotal(res.calculation);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };
    handleSendRequest(count > 1 ? count - 1 : count);
  };

  const handleIncrementClick = (e) => {
    setCount((prevCount) => prevCount + 1);

    const handleSendRequest = (countValue) => {
      const id = e.target.closest(".cart-item").getAttribute("data");
      dispatch(startSpinner());
      sendRequest("post", "cart", {
        id,
        quantity: Math.abs(parseInt(countValue) - parseInt(quantity)),
      }).then((res) => {
        dispatch(stopSpinner());
        setCartItems(res.cart.cartItems[0]);
        sendRequest("get", "cart/total")
          .then((res) => {
            if (res.status) {
              setTotal(res.calculation);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

    handleSendRequest(count + 1);
  };

  const delItem = (e) => {
    del(e, quantity);
  };

  return (
    <tr className="cart-item position-relative" data={prodId}>
      <BarLoader
        color={"#ffffff"}
        loading={spinnerStatus}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <td className="custome-checkbox pl-30">
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
      </td>
      <td className="image product-thumbnail">
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
