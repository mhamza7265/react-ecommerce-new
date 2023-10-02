import prod11 from "../../../assets/imgs/shop/product-1-1.webp";
import prod12 from "../../../assets/imgs/shop/product-1-2.webp";
import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function FilterProductCard({ className, setmodal }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className={`${className}`}>
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            {loading ? (
              <Skeleton style={{ borderRadius: "15px", height: "150px" }} />
            ) : (
              <a href={void 0}>
                <LazyLoadImage className="default-img" src={prod11} alt="" />
                <LazyLoadImage className="hover-img" src={prod12} alt="" />
              </a>
            )}
          </div>
          {loading ? null : (
            <>
              <div className="product-action-1">
                <a aria-label="Add To Wishlist" className="action-btn">
                  <i className="fi-rs-heart"></i>
                </a>
                <a aria-label="Compare" className="action-btn">
                  <i className="fi-rs-shuffle"></i>
                </a>
                <a
                  aria-label="Quick view"
                  className="action-btn"
                  onClick={() => setmodal(true)}
                >
                  <i className="fi-rs-eye"></i>
                </a>
              </div>
              <div className="product-badges product-badges-position product-badges-mrg">
                <span className="hot">Hot</span>
              </div>
            </>
          )}
        </div>
        {loading ? (
          <>
            <Skeleton count={2} style={{ margin: "0px 0", width: "70%" }} />
            <Skeleton count={4} style={{ margin: "0px 0" }} />
            <Skeleton count={1} style={{ margin: "0px 0" }} />
          </>
        ) : (
          <div className="product-content-wrap">
            <div className="product-category">
              <a href={void 0}>Snack</a>
            </div>
            <h2>
              <a href={void 0}>Seeds of Change Organic Quinoe Naturel</a>
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
                <span>$28.85</span>
                <span className="old-price">$32.8</span>
              </div>
              <div className="add-cart">
                <a className="add">
                  <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterProductCard;
