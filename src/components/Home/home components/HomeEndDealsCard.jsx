import CountdownTimer from "../../countdown/CountDownTimer";
import ScrollAnimation from "react-animate-on-scroll";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BASE_URL from "../../../utility-functions/config";

function HomeEndDealsCard({
  image,
  id,
  name,
  price,
  discount,
  prodId,
  addToCart,
}) {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div
      className={`col-xl-3 col-lg-4 col-md-6 position-relative end-deal-parent`}
      data={prodId}
    >
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          zIndex: 5,
          transform: "translateX(-50%)",
        }}
        className="col-lg-11"
      >
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
      </div>
      <ScrollAnimation
        animateIn="animate__animated animate__fadeInUp"
        className="product-cart-wrap style-2"
        delay={Number(id)}
        animateOnce={true}
      >
        <div className="product-img-action-wrap">
          <div className="product-img">
            <a href={void 0}>
              <LazyLoadImage
                className="default-img prod-img-3"
                src={BASE_URL + "/" + image[0]}
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="deals-content">
            <h2>
              <a href={void 0}>{name}</a>
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
                <span>${(price / 100) * 100 - discount}</span>
                <span className="old-price">${price}</span>
              </div>
              <div className="add-cart">
                <a href={void 0} className="add" onClick={addToCart}>
                  <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}

export default HomeEndDealsCard;
