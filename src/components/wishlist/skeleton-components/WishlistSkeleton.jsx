import Skeleton from "react-loading-skeleton";
import WishlistRowSkeleton from "./WishlistRowSkeleton";

function WishlistSkeleton() {
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
      <div className="container mb-30 mt-50">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <div className="mb-50">
              <div>
                <Skeleton style={{ height: "40px", marginBottom: "20px" }} />
                <Skeleton />
              </div>
            </div>
            <div className="table-responsive shopping-summery">
              <table className="table table-wishlist">
                <thead>
                  <tr className="main-heading">
                    <th className="custome-checkbox start pl-30"></th>
                    <th scope="col" colSpan="2">
                      <div>
                        <Skeleton
                          count={1}
                          style={{
                            width: "200px",
                            "--base-color": "#a9a5a5",
                          }}
                        />
                      </div>
                    </th>
                    <th scope="col">
                      <div>
                        <Skeleton
                          count={1}
                          style={{
                            width: "80px",
                            "--base-color": "#a9a5a5",
                          }}
                        />
                      </div>
                    </th>
                    <th scope="col">
                      <div>
                        <Skeleton
                          count={1}
                          style={{
                            width: "80px",
                            "--base-color": "#a9a5a5",
                          }}
                        />
                      </div>
                    </th>
                    <th scope="col">
                      <div>
                        <Skeleton
                          count={1}
                          style={{
                            width: "80px",
                            "--base-color": "#a9a5a5",
                          }}
                        />
                      </div>
                    </th>
                    <th scope="col" className="end">
                      <div>
                        <Skeleton
                          count={1}
                          style={{
                            width: "80px",
                            "--base-color": "#a9a5a5",
                          }}
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody style={{ marginBottom: "30px" }}>
                  <WishlistRowSkeleton />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistSkeleton;
