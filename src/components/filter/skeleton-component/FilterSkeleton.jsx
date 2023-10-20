import Skeleton from "react-loading-skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";
import LowerCardSkeleton from "./LowerCardSkeleton";

function FilterSkeleton() {
  return (
    <>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="row path-breadcrumb">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
      <div className="container mb-30 mt-30">
        <div className="row">
          <div className="col-lg-12">
            <Skeleton
              style={{ height: "40px", width: "10%", marginBottom: "20px" }}
            />
            <div className="shop-product-fillter-header">
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                  <Skeleton style={{ borderRadius: "15px", height: "350px" }} />
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                  <Skeleton style={{ borderRadius: "15px", height: "450px" }} />
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                  <Skeleton style={{ borderRadius: "15px", height: "550px" }} />
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-5 mb-sm-5">
                  <Skeleton style={{ borderRadius: "15px", height: "350px" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="shop-product-fillter">
              <Skeleton style={{ height: "15px", width: "200px" }} />
              <Skeleton style={{ height: "40px", width: "350px" }} />
            </div>
            <div className="row product-grid">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
            {/* <!--product grid--> */}
            <Skeleton style={{ height: "40px", width: "350px" }} />
            <section className="section-padding pb-5">
              <div className="section-title">
                <Skeleton style={{ height: "40px", width: "380px" }} />
                <Skeleton style={{ width: "100px", height: "20px" }} />
              </div>
              <div className="row">
                <LowerCardSkeleton />
                <LowerCardSkeleton />
                <LowerCardSkeleton />
                <LowerCardSkeleton />
              </div>
            </section>
            {/* <!--End Deals--> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSkeleton;
