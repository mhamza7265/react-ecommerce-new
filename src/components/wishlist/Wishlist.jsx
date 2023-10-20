import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import wishlistData from "../../Data/wishlistData";
import WishlistRow from "./wishlist-components/WishlistRow";
import sendRequest from "../../utility-functions/apiManager";
import WishlistSkeleton from "./skeleton-components/WishlistSkeleton";

function Wishlist() {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(null);

  // console.log(wishlist?.map((item) => item))[0];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    sendRequest("get", "wishlist")
      .then((res) => {
        setWishlist(res.wishlist);
        console.log(res.wishlist[0].product);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      {wishlist ? (
        <>
          <div className="page-header breadcrumb-wrap">
            <div className="container">
              <div className="breadcrumb">
                <a rel="nofollow">
                  <i className="fi-rs-home mr-5"></i>Home
                </a>
                <span></span> Shop <span></span> Wishlist
              </div>
            </div>
          </div>
          <div className="container mb-30 mt-50">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <div className="mb-50">
                  <>
                    <h1 className="heading-2 mb-10">Your Wishlist</h1>
                    <h6 className="text-body">
                      There are <span className="text-brand">5</span> products
                      in this list
                    </h6>
                  </>
                </div>
                <div className="table-responsive shopping-summery">
                  <table className="table table-wishlist">
                    <thead>
                      <tr className="main-heading">
                        <th className="custome-checkbox start pl-30">
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
                        </th>
                        <th scope="col" colSpan="2">
                          "Product"
                        </th>
                        <th scope="col">"Price"</th>
                        <th scope="col">"Stock Status"</th>
                        <th scope="col">"Action"</th>
                        <th scope="col" className="end">
                          "Remove"
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ marginBottom: "30px" }}>
                      {wishlist
                        ? wishlist.map((item, i) => (
                            <WishlistRow
                              key={i}
                              id={i}
                              name={item.product?.name}
                              image={item.product?.imageUrl}
                              price={item.product?.price}
                              prodId={item.product?._id}
                            />
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <WishlistSkeleton />
      )}
      <Footer />
    </div>
  );
}

export default Wishlist;
