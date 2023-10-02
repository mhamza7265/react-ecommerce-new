import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CartItems({ img1, id }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <tr>
      <td className="custome-checkbox pl-30">
        {loading ? null : (
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
        )}
      </td>
      <td className="image product-thumbnail">
        {loading ? (
          <Skeleton
            style={{ borderRadius: "15px", width: "70px", height: "70px" }}
          />
        ) : (
          <LazyLoadImage src={img1} alt="#" />
        )}
      </td>
      <td className="product-des product-name">
        {loading ? (
          <div>
            <Skeleton count={2} style={{ width: "200px" }} />
          </div>
        ) : (
          <>
            <h6 className="mb-5">
              <a className="product-name mb-10 text-heading">
                Blue Diamond Almonds Lightly Salted
              </a>
            </h6>
            <div className="product-rate-cover">
              <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: "90%" }}></div>
              </div>
              <span className="font-small ml-5 text-muted"> (4.0)</span>
            </div>
          </>
        )}
      </td>
      <td className="price" data-title="Price">
        {loading ? (
          <Skeleton style={{ width: "50px" }} />
        ) : (
          <h4 className="text-body">$3.2 </h4>
        )}
      </td>
      <td
        className="text-center detail-info"
        data="prod2"
        data-title="Stock"
        id="count"
      >
        {loading ? (
          <Skeleton style={{ width: "80px", height: "40px" }} />
        ) : (
          <div className="detail-extralink mr-15">
            <div className="detail-qty border radius">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => (count > 0 ? setCount(() => count - 1) : null)}
                className="qty-down"
              >
                <i className="fi-rs-angle-small-down"></i>
              </a>
              <span className="qty-val">{count}</span>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => setCount(() => count + 1)}
                className="qty-up"
              >
                <i className="fi-rs-angle-small-up"></i>
              </a>
            </div>
          </div>
        )}
      </td>
      <td className="price" data-title="Price">
        {loading ? (
          <Skeleton style={{ width: "50px" }} />
        ) : (
          <h4 className="text-brand">{`$${(3.2 * count).toFixed(1)}`} </h4>
        )}
      </td>
      <td className="action text-center" data-title="Remove">
        {loading ? (
          <Skeleton style={{ width: "30px" }} />
        ) : (
          <a className="text-body">
            <i className="fi-rs-trash"></i>
          </a>
        )}
      </td>
    </tr>
  );
}

export default CartItems;
