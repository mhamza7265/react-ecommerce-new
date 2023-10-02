import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import wishlistData from "../../Data/wishlistData";
import WishlistRow from "./wishlist-components/WishlistRow";

function Wishlist() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          {loading ? (
            <div className="row path-breadcrumb">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            <div className="breadcrumb">
              <a rel="nofollow">
                <i className="fi-rs-home mr-5"></i>Home
              </a>
              <span></span> Shop <span></span> Wishlist
            </div>
          )}
        </div>
      </div>
      <div className="container mb-30 mt-50">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <div className="mb-50">
              {loading ? (
                <div>
                  <Skeleton style={{ height: "40px", marginBottom: "20px" }} />
                  <Skeleton />
                </div>
              ) : (
                <>
                  <h1 className="heading-2 mb-10">Your Wishlist</h1>
                  <h6 className="text-body">
                    There are <span className="text-brand">5</span> products in
                    this list
                  </h6>
                </>
              )}
            </div>
            <div className="table-responsive shopping-summery">
              <table className="table table-wishlist">
                <thead>
                  <tr className="main-heading">
                    <th className="custome-checkbox start pl-30">
                      {loading ? null : (
                        <>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="exampleCheckbox11"
                            value=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox11"
                          ></label>
                        </>
                      )}
                    </th>
                    <th scope="col" colSpan="2">
                      {loading ? (
                        <div>
                          <Skeleton
                            count={1}
                            style={{
                              width: "200px",
                              "--base-color": "#a9a5a5",
                            }}
                          />
                        </div>
                      ) : (
                        "Product"
                      )}
                    </th>
                    <th scope="col">
                      {loading ? (
                        <div>
                          <Skeleton
                            count={1}
                            style={{
                              width: "80px",
                              "--base-color": "#a9a5a5",
                            }}
                          />
                        </div>
                      ) : (
                        "Price"
                      )}
                    </th>
                    <th scope="col">
                      {loading ? (
                        <div>
                          <Skeleton
                            count={1}
                            style={{
                              width: "80px",
                              "--base-color": "#a9a5a5",
                            }}
                          />
                        </div>
                      ) : (
                        "Stock Status"
                      )}
                    </th>
                    <th scope="col">
                      {loading ? (
                        <div>
                          <Skeleton
                            count={1}
                            style={{
                              width: "80px",
                              "--base-color": "#a9a5a5",
                            }}
                          />
                        </div>
                      ) : (
                        "Action"
                      )}
                    </th>
                    <th scope="col" className="end">
                      {loading ? (
                        <div>
                          <Skeleton
                            count={1}
                            style={{
                              width: "80px",
                              "--base-color": "#a9a5a5",
                            }}
                          />
                        </div>
                      ) : (
                        "Remove"
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody style={{ marginBottom: "30px" }}>
                  {wishlistData.map((_, i) => (
                    <WishlistRow key={i} id={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;
