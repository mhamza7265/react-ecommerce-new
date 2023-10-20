import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HomeEndSection({ image, name }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <article className="row align-items-center hover-up">
      <figure className="col-md-4 mb-0">
        {loading ? (
          <Skeleton
            style={{ borderRadius: "50%", width: "50px", height: "50px" }}
          />
        ) : (
          <a href={void 0}>
            <LazyLoadImage src={image} alt="" />
          </a>
        )}
      </figure>
      <div className="col-md-8 mb-0">
        <h6>
          {loading ? (
            <Skeleton count={2} style={{ width: "50%" }} />
          ) : (
            <a href={void 0}>{name}</a>
          )}
        </h6>
        {loading ? (
          <Skeleton style={{ width: "30%" }} />
        ) : (
          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted"> (4.0)</span>
          </div>
        )}
        {loading ? (
          <Skeleton style={{ width: "40%" }} />
        ) : (
          <div className="product-price">
            <span>$32.85</span>
            <span className="old-price">$33.8</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default HomeEndSection;
