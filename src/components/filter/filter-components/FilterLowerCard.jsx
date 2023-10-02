import ban5 from "../../../assets/imgs/banner/banner-5.webp";
import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function FilterLowerCard({ className }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className={`${className}`}>
      <div className="product-cart-wrap style-2">
        <div className="product-img-action-wrap">
          <div className="product-img">
            {loading ? (
              <Skeleton style={{ height: "280px", borderRadius: "15px" }} />
            ) : (
              <a href={void 0}>
                <LazyLoadImage src={ban5} alt="" />
              </a>
            )}
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
            {loading ? (
              <Skeleton count={6} />
            ) : (
              <>
                <h2>
                  <a href={void 0}>Seeds of Change Organic Quinoa, Brown</a>
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
                    <span>$32.85</span>
                    <span className="old-price">$33.8</span>
                  </div>
                  <div className="add-cart">
                    <a className="add">
                      <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterLowerCard;
