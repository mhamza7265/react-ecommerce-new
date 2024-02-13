import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import { useState, useEffect } from "react";
import WishlistRow from "./wishlist-components/WishlistRow";
import sendRequest from "../../utility-functions/apiManager";
import WishlistSkeleton from "./skeleton-components/WishlistSkeleton";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [skeletontime, setSkeletontime] = useState(false);
  const [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    position: "absolute",
    top: 0,
    left: "90%",
    margin: "0 auto",
    borderColor: "red",
    width: "10px",
    height: "55px",
  };

  useEffect(() => {
    sendRequest("get", "wishlist")
      .then((res) => {
        setWishlist(res.wishlist);
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setSkeletontime(true);
    }, 10000);
  }, []);

  return (
    <div>
      <Navbar />
      {wishlist || skeletontime ? (
        <>
          <div className="page-header breadcrumb-wrap">
            <div className="container">
              <div className="breadcrumb">
                <Link to={"/"} rel="nofollow">
                  <i className="fi-rs-home mr-5"></i>Home
                </Link>
                <span></span> Shop <span></span> Wishlist
                <BounceLoader
                  color={"#3bb77e"}
                  loading={loading}
                  cssOverride={override}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
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
                      There are{" "}
                      <span className="text-brand">
                        {wishlist ? wishlist.length : 0}
                      </span>{" "}
                      products in this list
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
                          Product
                        </th>
                        <th scope="col">Price</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Discounted Price</th>
                        <th scope="col">Stock Status</th>
                        <th scope="col">Action</th>
                        <th scope="col" className="end">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ marginBottom: "30px" }}>
                      {wishlist.length > 0 ? (
                        wishlist.map((item, i) => (
                          <WishlistRow
                            key={i}
                            id={i}
                            name={item?.product[0].name}
                            image={item.product[0].images[0]}
                            price={item.product[0].price}
                            discount={item.product[0].discount.discountValue}
                            prodId={item.productId}
                            setLoading={setLoading}
                            setWishlist={setWishlist}
                          />
                        ))
                      ) : (
                        <tr>No item in the wishlist.</tr>
                      )}
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
