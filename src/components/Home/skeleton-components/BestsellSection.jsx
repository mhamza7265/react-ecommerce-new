import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function BestSellSection() {
  return (
    <div className="product-cart-wrap">
      <div className="product-img-action-wrap">
        <Skeleton
          style={{ borderRadius: "14%", width: "100%", height: "180px" }}
        />
        <div className="product-badges product-badges-position product-badges-mrg">
          <Skeleton />
        </div>
      </div>
      <div className="product-content-wrap">
        <div className="product-category">
          <Skeleton />
        </div>
        <h2>
          <Skeleton />
        </h2>

        <Skeleton />
        <div className="product-price mt-10">
          <Skeleton />
        </div>
        <div className="sold mt-15 mb-15">
          <Skeleton />

          <Skeleton />
        </div>
        <Skeleton style={{ height: "50px" }} />
      </div>
    </div>
  );
}

export default BestSellSection;
