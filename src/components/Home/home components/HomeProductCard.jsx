import product21 from "../../../assets/imgs/shop/product-2-1.webp";
import product22 from "../../../assets/imgs/shop/product-2-2.webp";
import ScrollAnimation from "react-animate-on-scroll";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

function HomeProductCard({ setmodal, id }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
        <ScrollAnimation
          animateIn="animate__animated animate__fadeIn"
          className="product-cart-wrap mb-30"
          delay={Number(id)}
          animateOnce={true}
        >
          <div className="product-img-action-wrap">
            {loading ? (
              <Skeleton
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "200px",
                }}
              />
            ) : (
              <>
                <div className="product-img product-img-zoom">
                  <a href={void 0}>
                    <LazyLoadImage
                      className="default-img"
                      src={product21}
                      alt=""
                    />
                    <LazyLoadImage
                      className="hover-img"
                      src={product22}
                      alt=""
                    />
                  </a>
                </div>
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
              </>
            )}
            <div className="product-badges product-badges-position product-badges-mrg">
              {loading ? (
                <Skeleton style={{ width: "40%" }} />
              ) : (
                <span className="sale">Sale</span>
              )}
            </div>
          </div>
          <div className="product-content-wrap">
            <div className="product-category">
              {loading ? (
                <Skeleton style={{ width: "40%" }} />
              ) : (
                <a href={void 0}>Hodo Foods</a>
              )}
            </div>
            <h2>
              {loading ? (
                <Skeleton style={{ width: "80%" }} />
              ) : (
                <a href={void 0}>All Natural Italian-Style Chicken Meatballs</a>
              )}
            </h2>
            {loading ? (
              <Skeleton style={{ width: "40%" }} />
            ) : (
              <div className="product-rate-cover">
                <div className="product-rate d-inline-block">
                  <div
                    className="product-rating"
                    style={{ width: "80%" }}
                  ></div>
                </div>

                <span className="font-small ml-5 text-muted"> (3.5)</span>
              </div>
            )}
            <div>
              {loading ? (
                <Skeleton style={{ width: "30%" }} />
              ) : (
                <span className="font-small text-muted">
                  By <a href={void 0}>Stouffer</a>
                </span>
              )}
            </div>
            {loading ? (
              <Skeleton style={{ width: "100%", height: "50px" }} />
            ) : (
              <div className="product-card-bottom">
                <div className="product-price">
                  <span>$52.85</span>
                  <span className="old-price">$55.8</span>
                </div>

                <div className="add-cart">
                  <a className="add">
                    <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
                  </a>
                </div>
              </div>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </>
  );
}

export default HomeProductCard;
