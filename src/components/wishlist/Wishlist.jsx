import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import { useState, useEffect } from "react";
import WishlistRow from "./wishlist-components/WishlistRow";
import sendRequest, { errorToast } from "../../utility-functions/apiManager";
import WishlistSkeleton from "./skeleton-components/WishlistSkeleton";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startSpinner, stopSpinner } from "../../redux/reducers/spinnerReducer";

function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [stockStatus, setStockStatus] = useState(null);
  const [skeletontime, setSkeletontime] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    sendRequest("get", "wishlist/listing")
      .then((res) => {
        if (res.status) {
          setWishlist(res.wishlist.docs);
          setNextPage({
            nextPage: res.wishlist.hasNextPage,
            currentPage: res.wishlist.page,
          });
        } else {
          errorToast(res.error);
          if (res.type == "updatePassword") {
            setTimeout(() => {
              navigate("/updatePw");
            }, 2000);
          } else if (res.type == "loginToContinue") {
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setSkeletontime(true);
    }, 10000);
  }, []);

  useEffect(() => {
    const wishlistArray = wishlist?.map((item) => item.productId);
    sendRequest("post", "products", { productsId: wishlistArray?.toString() })
      .then((res) => {
        console.log(
          "productsQuantity",
          res.products["65ae6d19c97e90026aa2993b"]
        );
        setStockStatus(res.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [wishlist]);

  // const wishArray = wishlist?.map((item) => item.productId);
  // console.log("wishhhh", wishArray?.toString());

  const handleLoadMoreClick = () => {
    dispatch(startSpinner());
    sendRequest("get", `wishlist/listing?page=${nextPage.currentPage + 1}`)
      .then((res) => {
        dispatch(stopSpinner());
        if (res.status) {
          const newWishlist = wishlist.concat(res.wishlist.docs);
          setWishlist(newWishlist);
          setNextPage({
            nextPage: res.wishlist.hasNextPage,
            currentPage: res.wishlist.page,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                      There {wishlist?.length > 1 ? "are" : "is"}{" "}
                      <span className="text-brand">
                        {wishlist ? wishlist.length : 0}
                      </span>{" "}
                      product{wishlist?.length > 1 ? "s" : ""} in this list
                    </h6>
                  </>
                </div>
                <div className="table-responsive shopping-summery">
                  <table className="table table-wishlist">
                    <thead>
                      <tr className="main-heading">
                        <th scope="col" colSpan="2" className="start pl-30">
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
                      {wishlist?.length > 0 ? (
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
                            stockStatus={stockStatus[item.productId]}
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
            {nextPage.nextPage && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-fill-out btn-block mt-30 mx-auto"
                  onClick={handleLoadMoreClick}
                >
                  Load More <i className="fa fa-refresh"></i>
                </button>
              </div>
            )}
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
