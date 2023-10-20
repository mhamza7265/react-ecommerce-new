import ScrollAnimation from "react-animate-on-scroll";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductsSection({ id }) {
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
            <Skeleton
              style={{
                borderRadius: "50%",
                width: "100%",
                height: "200px",
              }}
            />
            <div className="product-badges product-badges-position product-badges-mrg">
              <Skeleton style={{ width: "40%" }} />
            </div>
          </div>
          <div className="product-content-wrap">
            <div className="product-category">
              <Skeleton style={{ width: "40%" }} />
            </div>
            <h2>
              <Skeleton style={{ width: "80%" }} />
            </h2>

            <Skeleton style={{ width: "40%" }} />
            <div>
              <Skeleton style={{ width: "30%" }} />
            </div>

            <Skeleton style={{ width: "100%", height: "50px" }} />
          </div>
        </ScrollAnimation>
      </div>
    </>
  );
}

export default ProductsSection;
