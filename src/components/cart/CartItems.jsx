import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CartItems({
  id,
  prodId,
  name,
  price,
  image,
  del,
  setIncrementTotal,
  setDecrementTotal,
  cartItems,
  setTotal,
}) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    var val = (parseInt(price) * count).toFixed(1);
    setValue(val);
  }, [count]);

  useEffect(() => {
    setCount(0);
    setTotal(0);
  }, [cartItems]);

  const handleDecrementClick = () => {
    count > 0 ? setCount(() => count - 1) : null;
    setDecrementTotal(price, value);
  };

  const handleIncrementClick = () => {
    setCount(() => count + 1);
    setIncrementTotal(price);
  };

  const delItem = (e) => {
    del(e, value, setCount);
  };

  return (
    <tr className="cart-item" data={prodId}>
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
        <LazyLoadImage src={image} alt="#" />
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
            <input className="qty-val" value={count} />
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
        <h4 className="text-brand">${(parseInt(price) * count).toFixed(1)}</h4>
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
