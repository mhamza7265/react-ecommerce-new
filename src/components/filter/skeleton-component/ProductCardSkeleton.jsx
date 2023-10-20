import Skeleton from "react-loading-skeleton";

function ProductCardSkeleton() {
  return (
    <div className={"col-lg-1-5 col-md-4 col-12 col-sm-6"}>
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            <Skeleton style={{ borderRadius: "15px", height: "150px" }} />
          </div>
        </div>
        <>
          <Skeleton count={2} style={{ margin: "0px 0", width: "70%" }} />
          <Skeleton count={4} style={{ margin: "0px 0" }} />
          <Skeleton count={1} style={{ margin: "0px 0" }} />
        </>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
