import ScrollAnimation from "react-animate-on-scroll";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

function HomeCategorySectionCard({ img1, id }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <ScrollAnimation
      animateIn="animate__animated animate__fadeInUp"
      className="card-2 bg-9"
      delay={Number(id)}
      animateOnce={true}
    >
      {loading ? (
        <Skeleton
          circle
          style={{ borderRadius: "50%", width: "50px", height: "50px" }}
        />
      ) : (
        <figure className="img-hover-scale overflow-hidden">
          <a href={void 0}>
            <LazyLoadImage src={img1} alt="" />
          </a>
        </figure>
      )}
      {loading ? (
        <Skeleton
          style={{
            marginTop: "30px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      ) : (
        <h6>
          <a href={void 0}>Cake & Milk</a>
        </h6>
      )}
      {loading ? (
        <Skeleton style={{ width: "50%", margin: "auto" }} />
      ) : (
        <span>26 items</span>
      )}
    </ScrollAnimation>
  );
}

export default HomeCategorySectionCard;
