import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import CompareRow from "./compare-component/CompareRow";
import CompareSkeleton from "./skeleton-components/CompareSkeleton";
import { Link } from "react-router-dom";

function Compare() {
  const productsToCompare = useSelector(
    (state) => state.compare.productsToCompare
  );

  return (
    <div>
      <Navbar />
      {productsToCompare ? (
        <>
          <div className="page-header breadcrumb-wrap">
            <div className="container">
              <div className="breadcrumb">
                <Link to={"/"} rel="nofollow">
                  <i className="fi-rs-home mr-5"></i>Home
                </Link>
                <span></span> Shop <span></span> Compare
              </div>
            </div>
          </div>
          <div className="container mb-80 mt-50">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <>
                  <h1 className="heading-2 mb-10">Products Compare</h1>
                  <h6 className="text-body mb-40">
                    There are{" "}
                    <span className="text-brand">
                      {productsToCompare ? productsToCompare.length : 0}{" "}
                    </span>
                    products to compare
                  </h6>
                </>
                <div className="table-responsive">
                  <table className="table text-center table-compare">
                    <tbody>
                      <tr className="pr_image">
                        <td className="text-muted font-sm fw-600 font-heading mw-200">
                          "Preview"
                        </td>
                        <td className="text-muted font-sm fw-600 font-heading">
                          "Name"
                        </td>
                        <td className="text-muted font-sm fw-600 font-heading">
                          "Price"
                        </td>
                        <td className="text-muted font-sm fw-600 font-heading">
                          "Rating"
                        </td>
                        <td className="text-muted font-sm fw-600 font-heading">
                          Description
                        </td>
                        <td className="text-muted font-sm fw-600 font-heading">
                          "Stock status"
                        </td>
                        <td className="text-muted font-sm fw-600 font-heading">
                          "Weight"
                        </td>
                        <td className="text-muted font-sm fw-600 font-heading">
                          "Buy now"
                        </td>
                      </tr>
                      {productsToCompare ? (
                        productsToCompare.map((item, i) => (
                          <CompareRow
                            key={i}
                            image={item.imageUrl}
                            name={item.name}
                            price={item.price}
                            prodId={item._id}
                            description={item.description}
                          />
                        ))
                      ) : (
                        <tr>No item to compare.</tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <div className="table-responsive">
              <table className="table text-center table-compare">
                <tbody>
                  <tr className="pr_image">
                    <td className="text-muted font-sm fw-600 font-heading mw-200">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        "Preview"
                      )}
                    </td>
                    <td className="row_img">
                      {loading ? (
                        <Skeleton
                          style={{
                            borderRadius: "15px",
                            width: "130px",
                            height: "220px",
                          }}
                        />
                      ) : (
                        <LazyLoadImage src={product21} alt="compare-img" />
                      )}
                    </td>
                    <td className="row_img">
                      {loading ? (
                        <Skeleton
                          style={{
                            borderRadius: "15px",
                            width: "130px",
                            height: "220px",
                          }}
                        />
                      ) : (
                        <LazyLoadImage src={product11} alt="compare-img" />
                      )}
                    </td>
                    <td className="row_img">
                      {loading ? (
                        <Skeleton
                          style={{
                            borderRadius: "15px",
                            width: "130px",
                            height: "220px",
                          }}
                        />
                      ) : (
                        <LazyLoadImage src={product31} alt="compare-img" />
                      )}
                    </td>
                  </tr>
                  <tr className="pr_title">
                    <td className="text-muted font-sm fw-600 font-heading">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        "Name"
                      )}
                    </td>
                    <td className="product_name">
                      {loading ? (
                        <Skeleton style={{}} />
                      ) : (
                        <h6>
                          <a className="text-heading">
                            J.Crew Mercantile Women's Short
                          </a>
                        </h6>
                      )}
                    </td>
                    <td className="product_name">
                      {loading ? (
                        <Skeleton style={{}} />
                      ) : (
                        <h6>
                          <a className="text-heading">
                            Amazon Essentials Women's Tanks
                          </a>
                        </h6>
                      )}
                    </td>
                    <td className="product_name">
                      {loading ? (
                        <Skeleton style={{}} />
                      ) : (
                        <h6>
                          <a className="text-heading">
                            Amazon Brand - Daily Ritual Wom
                          </a>
                        </h6>
                      )}
                    </td>
                  </tr>
                  <tr className="pr_price">
                    <td className="text-muted font-sm fw-600 font-heading">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        "Price"
                      )}
                    </td>
                    <td className="product_price">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        <h4 className="price text-brand">$12.00</h4>
                      )}
                    </td>
                    <td className="product_price">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        <h4 className="price text-brand">$12.00</h4>
                      )}
                    </td>
                    <td className="product_price">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        <h4 className="price text-brand">$12.00</h4>
                      )}
                    </td>
                  </tr>
                  <tr className="pr_rating">
                    <td className="text-muted font-sm fw-600 font-heading">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        "Rating"
                      )}
                    </td>
                    <td>
                      {loading ? (
                        <Skeleton style={{ width: "90px" }} />
                      ) : (
                        <div className="rating_wrap">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{ width: "90%" }}
                            ></div>
                          </div>
                          <span className="rating_num">(121)</span>
                        </div>
                      )}
                    </td>
                    <td>
                      {loading ? (
                        <Skeleton style={{ width: "90px" }} />
                      ) : (
                        <div className="rating_wrap">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{ width: "90%" }}
                            ></div>
                          </div>
                          <span className="rating_num">(121)</span>
                        </div>
                      )}
                    </td>
                    <td>
                      {loading ? (
                        <Skeleton style={{ width: "90px" }} />
                      ) : (
                        <div className="rating_wrap">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{ width: "90%" }}
                            ></div>
                          </div>
                          <span className="rating_num">(121)</span>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr className="description">
                    <td className="text-muted font-sm fw-600 font-heading">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        " Description"
                      )}
                    </td>
                    <td className="row_text font-xs">
                      {loading ? (
                        <Skeleton count={5} style={{ width: "280px" }} />
                      ) : (
                        <p className="font-sm text-muted">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                        </p>
                      )}
                    </td>
                    <td className="row_text font-xs">
                      {loading ? (
                        <Skeleton count={5} style={{ width: "280px" }} />
                      ) : (
                        <p className="font-sm text-muted">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                        </p>
                      )}
                    </td>
                    <td className="row_text font-xs">
                      {loading ? (
                        <Skeleton count={5} style={{ width: "280px" }} />
                      ) : (
                        <p className="font-sm text-muted">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr className="pr_stock">
                    <td className="text-muted font-sm fw-600 font-heading">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        "Stock status"
                      )}
                    </td>
                    <td className="row_stock">
                      {loading ? (
                        <Skeleton style={{ width: "100px", height: "30px" }} />
                      ) : (
                        <span className="stock-status in-stock mb-0">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="row_stock">
                      {loading ? (
                        <Skeleton style={{ width: "100px", height: "30px" }} />
                      ) : (
                        <span className="stock-status out-stock mb-0">
                          Out of stock
                        </span>
                      )}
                    </td>
                    <td className="row_stock">
                      {loading ? (
                        <Skeleton style={{ width: "100px", height: "30px" }} />
                      ) : (
                        <span className="stock-status in-stock mb-0">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="pr_weight">
                    <td className="text-muted font-sm fw-600 font-heading">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        "Weight"
                      )}
                    </td>
                    <td className="row_weight">
                      {loading ? (
                        <Skeleton style={{ width: "80px" }} />
                      ) : (
                        "320 gram"
                      )}
                    </td>
                    <td className="row_weight">
                      {loading ? (
                        <Skeleton style={{ width: "80px" }} />
                      ) : (
                        "370 gram"
                      )}
                    </td>
                    <td className="row_weight">
                      {loading ? (
                        <Skeleton style={{ width: "80px" }} />
                      ) : (
                        "380 gram"
                      )}
                    </td>
                  </tr>
                  <tr className="pr_dimensions">
                    <td className="text-muted font-sm fw-600 font-heading">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        "Dimensions"
                      )}
                    </td>
                    <td className="row_dimensions">
                      {loading ? <Skeleton style={{ width: "50px" }} /> : "NA"}
                    </td>
                    <td className="row_dimensions">
                      {loading ? <Skeleton style={{ width: "50px" }} /> : "NA"}
                    </td>
                    <td className="row_dimensions">
                      {loading ? <Skeleton style={{ width: "50px" }} /> : "NA"}
                    </td>
                  </tr>
                  <tr className="pr_add_to_cart">
                    <td className="text-muted font-sm fw-600 font-heading">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        "Buy now"
                      )}
                    </td>
                    <td className="row_btn">
                      {loading ? (
                        <Skeleton style={{ width: "100px", height: "30px" }} />
                      ) : (
                        <button className="btn btn-sm">
                          <i className="fi-rs-shopping-bag mr-5"></i>Add to cart
                        </button>
                      )}
                    </td>
                    <td className="row_btn">
                      {loading ? (
                        <Skeleton style={{ width: "100px", height: "30px" }} />
                      ) : (
                        <button className="btn btn-sm btn-secondary">
                          <i className="fi-rs-headset mr-5"></i>Contact Us
                        </button>
                      )}
                    </td>
                    <td className="row_btn">
                      {loading ? (
                        <Skeleton style={{ width: "100px", height: "30px" }} />
                      ) : (
                        <button className="btn btn-sm">
                          <i className="fi-rs-shopping-bag mr-5"></i>Add to cart
                        </button>
                      )}
                    </td>
                  </tr>
                  <tr className="pr_remove text-muted">
                    <td className="text-muted font-md fw-600"></td>
                    <td className="row_remove">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        <a className="text-muted">
                          <i className="fi-rs-trash mr-5"></i>
                          <span>Remove</span>{" "}
                        </a>
                      )}
                    </td>
                    <td className="row_remove">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        <a className="text-muted">
                          <i className="fi-rs-trash mr-5"></i>
                          <span>Remove</span>{" "}
                        </a>
                      )}
                    </td>
                    <td className="row_remove">
                      {loading ? (
                        <Skeleton style={{ width: "50px" }} />
                      ) : (
                        <a className="text-muted">
                          <i className="fi-rs-trash mr-5"></i>
                          <span>Remove</span>{" "}
                        </a>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
                <div className="d-flex"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CompareSkeleton />
      )}
      <Footer />
    </div>
  );
}

export default Compare;
