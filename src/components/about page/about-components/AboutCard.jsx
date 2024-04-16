import icon2 from "../../../assets/imgs/theme/icons/icon-2.svg";
import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BASE_URL from "../../../utility-functions/config";

function AboutCard({ image, title, description }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <div className="col-lg-4 col-md-6 mb-24">
        <div className="featured-card">
          {loading ? (
            <div>
              <Skeleton
                style={{ borderRadius: "50%", width: "130px", height: "130px" }}
              />
              <Skeleton style={{ height: "20px", margin: "20px 0" }} />
              <Skeleton count={3} />
              <Skeleton />
            </div>
          ) : (
            <>
              <LazyLoadImage src={BASE_URL + "/" + image} alt="" />
              <h4>{title}</h4>
              <p>{description}</p>
              {/* <a href={void 0}>Read more</a> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AboutCard;
