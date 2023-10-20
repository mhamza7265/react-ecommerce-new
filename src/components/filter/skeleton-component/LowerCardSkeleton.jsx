import Skeleton from "react-loading-skeleton";

function LowerCardSkeleton() {
  return (
    <div className={"col-xl-3 col-lg-4 col-md-6"}>
      <div className="product-cart-wrap style-2">
        <div className="product-img-action-wrap">
          <div className="product-img">
            <Skeleton style={{ height: "280px", borderRadius: "15px" }} />
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="deals-countdown-wrap">
            <div
              className="deals-countdown"
              data-countdown="2025/03/25 00:00:00"
            ></div>
          </div>
          <div className="deals-content">
            <Skeleton count={6} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LowerCardSkeleton;
