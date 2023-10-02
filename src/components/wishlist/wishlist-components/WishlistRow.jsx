import product21 from "../../../assets/imgs/shop/product-2-1.webp";
import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function WishlistRow({ id }) {
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
              value=""
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
          <LazyLoadImage src={product21} alt="#" />
        )}
      </td>
      <td className="product-des product-name">
        {loading ? (
          <div>
            <Skeleton count={2} style={{ width: "200px" }} />
          </div>
        ) : (
          <>
            <h6>
              <a className="product-name mb-10">
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
          <h3 className="text-brand">$3.2</h3>
        )}
      </td>
      <td className="text-center detail-info" data-title="Stock">
        {loading ? (
          <Skeleton style={{ width: "50px" }} />
        ) : (
          <span className="stock-status in-stock mb-0"> In Stock </span>
        )}
      </td>
      <td className="text-right" data-title="Cart">
        {loading ? (
          <Skeleton style={{ width: "90px", height: "35px" }} />
        ) : (
          <button className="btn btn-sm">Add to cart</button>
        )}
      </td>
      <td className="action text-center" data-title="Remove">
        {loading ? (
          <Skeleton style={{ width: "20px" }} />
        ) : (
          <a className="text-body">
            <i className="fi-rs-trash"></i>
          </a>
        )}
      </td>
    </tr>
  );
}

export default WishlistRow;
