import Skeleton from "react-loading-skeleton";
import CartitemSkeleton from "./CartitemSkeleton";

function CartSkeleton() {
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
      <div className="container mb-80 mt-50">
        <div className="row">
          <div className="col-lg-8 mb-40">
            <div>
              <Skeleton style={{ height: "40px" }} />
              <Skeleton style={{}} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive shopping-summery">
              <table className="table table-wishlist">
                <thead>
                  <tr className="main-heading">
                    <th className="custome-checkbox start pl-30"></th>
                    <th scope="col" colSpan="2">
                      <Skeleton
                        count={1}
                        style={{
                          width: "80px",
                          "--base-color": "#a9a5a5",
                        }}
                      />
                    </th>
                    <th scope="col">
                      <Skeleton
                        count={1}
                        style={{
                          width: "80px",
                          "--base-color": "#a9a5a5",
                        }}
                      />
                    </th>
                    <th scope="col">
                      <Skeleton
                        count={1}
                        style={{
                          width: "80px",
                          "--base-color": "#a9a5a5",
                        }}
                      />
                    </th>
                    <th scope="col">
                      <Skeleton
                        count={1}
                        style={{
                          width: "80px",
                          "--base-color": "#a9a5a5",
                        }}
                      />
                    </th>
                    <th scope="col" className="end">
                      <Skeleton
                        count={1}
                        style={{
                          width: "80px",
                          "--base-color": "#a9a5a5",
                        }}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <CartitemSkeleton />
                </tbody>
              </table>
            </div>
            <div className="divider-2 mb-30"></div>
            <div className="cart-action d-flex justify-content-between">
              <Skeleton style={{ width: "180px", height: "40px" }} />
            </div>
            <div className="row mt-50">
              <div className="col-lg-7">
                <div className="calculate-shiping p-40 border-radius-15 border">
                  <Skeleton style={{ marginBottom: "200px" }} />
                </div>
              </div>
              <div className="col-lg-5">
                <>
                  <Skeleton style={{ marginBottom: "20px" }} />
                  <Skeleton style={{ marginBottom: "20px", height: "40px" }} />
                </>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Skeleton style={{ height: "300px", borderRadius: "15px" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSkeleton;
