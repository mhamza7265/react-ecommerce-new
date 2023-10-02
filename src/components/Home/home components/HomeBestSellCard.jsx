import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HomeBestSellCard({ img1, img2 }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="product-cart-wrap">
      <div className="product-img-action-wrap">
        {loading ? (
          <Skeleton
            style={{ borderRadius: "14%", width: "100%", height: "180px" }}
          />
        ) : (
          <>
            <div className="product-img product-img-zoom">
              <a href={void 0}>
                <LazyLoadImage className="default-img" src={img1} alt="" />
                <LazyLoadImage className="hover-img" src={img2} alt="" />
              </a>
            </div>
            <div className="product-action-1">
              <a
                aria-label="Quick view"
                className="action-btn small hover-up"
                data-bs-toggle="modal"
                data-bs-target="#quickViewModal"
              >
                {" "}
                <i className="fi-rs-eye"></i>
              </a>
              <a
                aria-label="Add To Wishlist"
                className="action-btn small hover-up"
              >
                <i className="fi-rs-heart"></i>
              </a>
              <a aria-label="Compare" className="action-btn small hover-up">
                <i className="fi-rs-shuffle"></i>
              </a>
            </div>
          </>
        )}
        <div className="product-badges product-badges-position product-badges-mrg">
          {loading ? <Skeleton /> : <span className="hot">Save 15%</span>}
        </div>
      </div>
      <div className="product-content-wrap">
        <div className="product-category">
          {loading ? <Skeleton /> : <a href={void 0}>Hodo Foods</a>}
        </div>
        <h2>
          {loading ? (
            <Skeleton />
          ) : (
            <a href={void 0}>Seeds of Change Organic Quinoa, Brown</a>
          )}
        </h2>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="product-rate d-inline-block">
            <div className="product-rating" style={{ width: "80%" }}></div>
          </div>
        )}
        <div className="product-price mt-10">
          {loading ? (
            <Skeleton />
          ) : (
            <>
              <span>$238.85 </span>
              <span className="old-price">$245.8</span>
            </>
          )}
        </div>
        <div className="sold mt-15 mb-15">
          {loading ? (
            <Skeleton />
          ) : (
            <div className="progress mb-5">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "50%" }}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <span className="font-xs text-heading"> Sold: 90/120</span>
          )}
        </div>
        {loading ? (
          <Skeleton style={{ height: "50px" }} />
        ) : (
          <a className="btn w-100 hover-up">
            <i className="fi-rs-shopping-cart mr-5"></i>Add To Cart
          </a>
        )}
      </div>
    </div>
  );
}

export default HomeBestSellCard;
