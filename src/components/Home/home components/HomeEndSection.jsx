import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BASE_URL from "../../../utility-functions/config";

function HomeEndSection({ image, name, price, discount }) {
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
            <LazyLoadImage src={BASE_URL + "/" + image[0]} alt="" />
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
            <span>${(price / 100) * 100 - discount}</span>
            <span className="old-price">${price}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default HomeEndSection;
