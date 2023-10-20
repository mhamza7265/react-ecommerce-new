import ScrollAnimation from "react-animate-on-scroll";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EndDeals({ className, id }) {
  return (
    <div className={`${className} position-relative`}>
      <ScrollAnimation
        animateIn="animate__animated animate__fadeInUp"
        className="product-cart-wrap style-2"
        delay={Number(id)}
        animateOnce={true}
      >
        <div className="product-img-action-wrap">
          <div className="product-img">
            <Skeleton style={{ width: "100%", height: "270px" }} />
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="deals-content">
            <h2>
              <Skeleton count={2} style={{ width: "90%" }} />
            </h2>
            <Skeleton style={{ width: "30%" }} />
            <div>
              <Skeleton style={{ width: "30%" }} />
            </div>
            <Skeleton style={{ height: " 50px" }} />
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}

export default EndDeals;
