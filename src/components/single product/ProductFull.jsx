import Slider from "react-slick";
import "../../assets/css/carousel.css";
import thumb9 from "../../assets/imgs/shop/thumbnail-9.webp";
import thumb3 from "../../assets/imgs/shop/thumbnail-3.webp";
import thumb4 from "../../assets/imgs/shop/thumbnail-4.webp";
import thumb5 from "../../assets/imgs/shop/thumbnail-5.webp";
import thumb6 from "../../assets/imgs/shop/thumbnail-6.webp";
import thumb7 from "../../assets/imgs/shop/thumbnail-7.webp";
import thumb8 from "../../assets/imgs/shop/thumbnail-8.webp";
import vend18 from "../../assets/imgs/vendor/vendor-18.svg";
import auth4 from "../../assets/imgs/blog/author-4.webp";
import auth3 from "../../assets/imgs/blog/author-3.webp";
import auth2 from "../../assets/imgs/blog/author-2.webp";
import iconcontact from "../../assets/imgs/theme/icons/icon-contact.svg";
import iconlocation from "../../assets/imgs/theme/icons/icon-location.svg";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import sendRequest, {
  successToast,
  errorToast,
} from "../../utility-functions/apiManager";
import { addWishlist } from "../../redux/reducers/wishlistReducer";
import { updateCartNavbar } from "../../redux/reducers/navbarUpdateReducers/cartUpdateReducer";
import { useNavigate } from "react-router-dom";
import { addCompareProduct } from "../../redux/reducers/compareProductsReducer";
import { startSpinner, stopSpinner } from "../../redux/reducers/spinnerReducer";
import BASE_URL from "../../utility-functions/config";
import { updateCartQuantity } from "../../redux/reducers/cartQuantityReducer";
import { updateWishlistQuantity } from "../../redux/reducers/wishlistQuantityReducer";
import { updateCart } from "../../redux/reducers/cartReducer";

function ProductFull() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [count, setCount] = useState(1);
  const [wishlist, setWishlist] = useState(null);
  const products = useSelector((state) => state.products.products);
  const singleProduct = useSelector((state) => state.singleProduct.product);
  const compared = useSelector((state) => state.compare.productsToCompare);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filtered = wishlist?.find(
    (item) => item.product?._id == singleProduct?._id
  );

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });
  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const settingsSecondary = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "10px",
  };

  useEffect(() => {
    sendRequest("get", "wishlist")
      .then((res) => {
        // dispatch(addWishlist(res.wishlist));
        setWishlist(res.wishlist);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCartClick = (e) => {
    const id = e.target.closest(".single-product-parent").getAttribute("data");
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      dispatch(startSpinner());
      sendRequest("post", "cart", { id, quantity: count })
        .then((res) => {
          dispatch(stopSpinner());
          if (res.status) {
            dispatch(updateCart(res.cart));
            successToast(res.message);
            sendRequest("get", "cart/qty")
              .then((res) => {
                console.log(res);
                dispatch(updateCartQuantity(res.quantity));
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            errorToast(res.error);
            if (res.type == "updatePassword") {
              setTimeout(() => {
                navigate("/updatePw");
              }, 2000);
            }
          }
        })
        .catch((err) => {
          dispatch(stopSpinner());
          errorToast(err);
        });
    } else {
      errorToast("Please login first!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  // const handleCompareClick = (e) => {
  //   const id = e.target.closest(".single-product-parent").getAttribute("data");
  //   const filteredProduct = products.find((item) => item._id == id);
  //   const filtered = compared.find((item) => item._id == id);
  //   if (!filtered && compared.length < 3) {
  //     dispatch(addCompareProduct(filteredProduct));
  //     successToast("Product added to compare!");
  //   } else if (compared.length >= 3) {
  //     errorToast("Only 3 products can be compared!");
  //   } else {
  //     errorToast("Product already added!");
  //   }
  // };

  const handleWishlistClick = (e) => {
    const id = e.target.closest(".single-product-parent").getAttribute("data");
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      dispatch(startSpinner());
      sendRequest("post", "wishlist", { prodId: id })
        .then((res) => {
          dispatch(stopSpinner());
          if (res.status) {
            successToast(res.message);

            sendRequest("get", "wishlist")
              .then((res) => {
                dispatch(addWishlist(res.wishlist));
              })
              .catch((err) => console.log(err));

            sendRequest("get", "wishlist/qty")
              .then((res) => {
                console.log(res);
                dispatch(updateWishlistQuantity(res.wishlistQuantity));
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            errorToast(res.error);
            if (res.type == "updatePassword") {
              setTimeout(() => {
                navigate("/updatePw");
              }, 2000);
            }
          }
        })
        .catch((err) => {
          dispatch(stopSpinner());
          errorToast(err);
        });
    } else {
      errorToast("Please login first!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="single-product-parent" data={singleProduct?._id}>
      <Navbar />
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link to={"/"} rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </Link>
            <span></span>
            {singleProduct?.name}
          </div>
        </div>
      </div>
      <div className="container mb-30">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <div className="product-detail accordion-detail">
              <div className="row mb-50 mt-30">
                <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                  <div className="detail-gallery">
                    <span className="zoom-icon">
                      <i className="fi-rs-search"></i>
                    </span>

                    <div className="single-prod">
                      <Slider
                        {...settingsMain}
                        asNavFor={nav2}
                        ref={(slider) => setSlider1(slider)}
                      >
                        <div className="single-prod">
                          <LazyLoadImage
                            src={`${BASE_URL}/${singleProduct?.images[0]}`}
                            alt="product image"
                          />
                        </div>
                        <div className="single-prod">
                          <LazyLoadImage
                            src={`${BASE_URL}/${singleProduct?.images[1]}`}
                            alt="product image"
                          />
                        </div>
                        <div className="single-prod">
                          <LazyLoadImage
                            src={`${BASE_URL}/${singleProduct?.images[0]}`}
                            alt="product image"
                          />
                        </div>
                        <div className="single-prod">
                          <LazyLoadImage
                            src={`${BASE_URL}/${singleProduct?.images[1]}`}
                            alt="product image"
                          />
                        </div>
                        <div className="single-prod">
                          <LazyLoadImage
                            src={`${BASE_URL}/${singleProduct?.images[0]}`}
                            alt="product image"
                          />
                        </div>
                        <div className="single-prod">
                          <LazyLoadImage
                            src={`${BASE_URL}/${singleProduct?.images[1]}`}
                            alt="product image"
                          />
                        </div>
                        <div className="single-prod">
                          <LazyLoadImage
                            src={`${BASE_URL}/${singleProduct?.images[0]}`}
                            alt="product image"
                          />
                        </div>
                      </Slider>
                    </div>
                    <div className="slider-nav-thumbnails">
                      <Slider
                        {...settingsSecondary}
                        asNavFor={nav1}
                        ref={(slider) => setSlider2(slider)}
                      >
                        <div className="single-prod-thumb">
                          <LazyLoadImage src={thumb3} alt="product image" />
                        </div>
                        <div className="single-prod-thumb">
                          <LazyLoadImage src={thumb4} alt="product image" />
                        </div>
                        <div className="single-prod-thumb">
                          <LazyLoadImage src={thumb5} alt="product image" />
                        </div>
                        <div className="single-prod-thumb">
                          <LazyLoadImage src={thumb6} alt="product image" />
                        </div>
                        <div className="single-prod-thumb">
                          <LazyLoadImage src={thumb7} alt="product image" />
                        </div>
                        <div className="single-prod-thumb">
                          <LazyLoadImage src={thumb8} alt="product image" />
                        </div>
                        <div className="single-prod-thumb">
                          <LazyLoadImage src={thumb9} alt="product image" />
                        </div>
                      </Slider>
                    </div>
                  </div>
                  {/* <!-- End Gallery --> */}
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="detail-info pr-30 pl-30">
                    <span className="stock-status out-stock"> Sale Off </span>
                    <h2 className="title-detail">{singleProduct?.name}</h2>
                    <div className="product-detail-rating">
                      <div className="product-rate-cover text-end">
                        <div className="product-rate d-inline-block">
                          <div
                            className="product-rating"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                        <span className="font-small ml-5 text-muted">
                          (32 reviews)
                        </span>
                      </div>
                    </div>
                    <div className="clearfix product-price-cover">
                      <div className="product-price primary-color float-left">
                        <span className="current-price text-brand">
                          $
                          {(singleProduct?.price / 100) *
                            singleProduct?.discount.discountValue}
                        </span>
                        <span>
                          <span className="save-price font-md color3 ml-15">
                            {singleProduct?.discount.discountValue}% Off
                          </span>
                          <span className="old-price font-md ml-15">
                            ${singleProduct?.price}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="short-desc mb-30">
                      <p className="font-lg">{singleProduct?.description}</p>
                    </div>
                    <div className="attr-detail attr-size mb-30">
                      <strong className="mr-10">Size / Weight: </strong>
                      <ul className="list-filter size-filter font-small">
                        <li>
                          <a href={void 0}>50g</a>
                        </li>
                        <li className="active">
                          <a href={void 0}>60g</a>
                        </li>
                        <li>
                          <a href={void 0}>80g</a>
                        </li>
                        <li>
                          <a href={void 0}>100g</a>
                        </li>
                        <li>
                          <a href={void 0}>150g</a>
                        </li>
                      </ul>
                    </div>
                    <div className="detail-extralink mb-50">
                      <div className="detail-qty border radius">
                        <a
                          className="qty-down"
                          onClick={() =>
                            count > 0 ? setCount(() => count - 1) : null
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fi-rs-angle-small-down"></i>
                        </a>
                        <input
                          type="text"
                          name="quantity"
                          className="qty-val"
                          value={count}
                          readOnly
                        />
                        <a
                          className="qty-up"
                          onClick={() => setCount(() => count + 1)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fi-rs-angle-small-up"></i>
                        </a>
                      </div>
                      <div className="product-extra-link2">
                        <button
                          className="button button-add-to-cart"
                          onClick={handleCartClick}
                        >
                          <i className="fi-rs-shopping-cart"></i>Add to cart
                        </button>
                        <a
                          aria-label="Add To Wishlist"
                          className="action-btn hover-up"
                          onClick={handleWishlistClick}
                        >
                          {filtered ? (
                            <i className="fa-solid fa-heart"></i>
                          ) : (
                            <i className="fi-rs-heart"></i>
                          )}
                        </a>
                        {/* <a
                          aria-label="Compare"
                          className="action-btn hover-up"
                          onClick={handleCompareClick}
                        >
                          <i className="fi-rs-shuffle"></i>
                        </a> */}
                      </div>
                    </div>
                    <div className="font-xs">
                      <ul className="mr-50 float-start">
                        <li className="mb-5">
                          Type: <span className="text-brand">Organic</span>
                        </li>
                        <li className="mb-5">
                          MFG:<span className="text-brand"> Jun 4.2022</span>
                        </li>
                        <li>
                          LIFE: <span className="text-brand">70 days</span>
                        </li>
                      </ul>
                      <ul className="float-start">
                        <li className="mb-5">
                          SKU: <a href={void 0}>FWM15VKT</a>
                        </li>
                        <li className="mb-5">
                          Tags: <a rel="tag">Snack</a>, <a rel="tag">Organic</a>
                          , <a rel="tag">Brown</a>
                        </li>
                        <li>
                          Stock:
                          <span className="in-stock text-brand ml-5">
                            8 Items In Stock
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <!-- Detail Info --> */}
                </div>
              </div>
              <div className="product-info">
                <Tabs className="tab-style3">
                  <TabList className="nav nav-tabs text-uppercase">
                    <Tab className="nav-item">
                      <a className="nav-link" id="Description-tab">
                        Description
                      </a>
                    </Tab>
                    <Tab className="nav-item">
                      <a className="nav-link" id="Additional-info-tab">
                        Additional info
                      </a>
                    </Tab>
                    <Tab className="nav-item">
                      <a className="nav-link" id="Vendor-info-tab">
                        Vendor
                      </a>
                    </Tab>
                    <Tab className="nav-item">
                      <a className="nav-link" id="Reviews-tab">
                        Reviews (3)
                      </a>
                    </Tab>
                  </TabList>
                  <div className="tab-content shop_info_tab entry-main-content">
                    <TabPanel className="" id="Description">
                      <div className="">
                        <p>
                          Uninhibited carnally hired played in whimpered dear
                          gorilla koala depending and much yikes off far quetzal
                          goodness and from for grimaced goodness unaccountably
                          and meadowlark near unblushingly crucial scallop
                          tightly neurotic hungrily some and dear furiously this
                          apart.
                        </p>
                        <p>
                          Spluttered narrowly yikes left moth in yikes bowed
                          this that grizzly much hello on spoon-fed that alas
                          rethought much decently richly and wow against the
                          frequent fluidly at formidable acceptably flapped
                          besides and much circa far over the bucolically hey
                          precarious goldfinch mastodon goodness gnashed a
                          jellyfish and one however because.
                        </p>
                        <ul className="product-more-infor mt-30">
                          <li>
                            <span>Type Of Packing</span> Bottle
                          </li>
                          <li>
                            <span>Color</span> Green, Pink, Powder Blue, Purple
                          </li>
                          <li>
                            <span>Quantity Per Case</span> 100ml
                          </li>
                          <li>
                            <span>Ethyl Alcohol</span> 70%
                          </li>
                          <li>
                            <span>Piece In One</span> Carton
                          </li>
                        </ul>
                        <hr className="wp-block-separator is-style-dots" />
                        <p>
                          Laconic overheard dear woodchuck wow this outrageously
                          taut beaver hey hello far meadowlark imitatively
                          egregiously hugged that yikes minimally unanimous
                          pouted flirtatiously as beaver beheld above forward
                          energetic across this jeepers beneficently cockily
                          less a the raucously that magic upheld far so the this
                          where crud then below after jeez enchanting drunkenly
                          more much wow callously irrespective limpet.
                        </p>
                        <h4 className="mt-30">Packaging & Delivery</h4>
                        <hr className="wp-block-separator is-style-wide" />
                        <p>
                          Less lion goodness that euphemistically robin
                          expeditiously bluebird smugly scratched far while thus
                          cackled sheepishly rigid after due one assenting
                          regarding censorious while occasional or this more
                          crane went more as this less much amid overhung
                          anathematic because much held one exuberantly sheep
                          goodness so where rat wry well concomitantly.
                        </p>
                        <p>
                          Scallop or far crud plain remarkably far by thus far
                          iguana lewd precociously and and less rattlesnake
                          contrary caustic wow this near alas and next and pled
                          the yikes articulate about as less cackled dalmatian
                          in much less well jeering for the thanks blindly
                          sentimental whimpered less across objectively fanciful
                          grimaced wildly some wow and rose jeepers outgrew
                          lugubrious luridly irrationally attractively
                          dachshund.
                        </p>
                        <h4 className="mt-30">Suggested Use</h4>
                        <ul className="product-more-infor mt-30">
                          <li>Refrigeration not necessary.</li>
                          <li>Stir before serving</li>
                        </ul>
                        <h4 className="mt-30">Other Ingredients</h4>
                        <ul className="product-more-infor mt-30">
                          <li>Organic raw pecans, organic raw cashews.</li>
                          <li>
                            This butter was produced using a LTG (Low
                            Temperature Grinding) process
                          </li>
                          <li>
                            Made in machinery that processes tree nuts but does
                            not process peanuts, gluten, dairy or soy
                          </li>
                        </ul>
                        <h4 className="mt-30">Warnings</h4>
                        <ul className="product-more-infor mt-30">
                          <li>
                            Oil separation occurs naturally. May contain pieces
                            of shell.
                          </li>
                        </ul>
                      </div>
                    </TabPanel>
                    <TabPanel className="" id="Additional-info">
                      <table className="font-md">
                        <tbody>
                          <tr className="stand-up">
                            <th>Stand Up</th>
                            <td>
                              <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                            </td>
                          </tr>
                          <tr className="folded-wo-wheels">
                            <th>Folded (w/o wheels)</th>
                            <td>
                              <p>32.5″L x 18.5″W x 16.5″H</p>
                            </td>
                          </tr>
                          <tr className="folded-w-wheels">
                            <th>Folded (w/ wheels)</th>
                            <td>
                              <p>32.5″L x 24″W x 18.5″H</p>
                            </td>
                          </tr>
                          <tr className="door-pass-through">
                            <th>Door Pass Through</th>
                            <td>
                              <p>24</p>
                            </td>
                          </tr>
                          <tr className="frame">
                            <th>Frame</th>
                            <td>
                              <p>Aluminum</p>
                            </td>
                          </tr>
                          <tr className="weight-wo-wheels">
                            <th>Weight (w/o wheels)</th>
                            <td>
                              <p>20 LBS</p>
                            </td>
                          </tr>
                          <tr className="weight-capacity">
                            <th>Weight Capacity</th>
                            <td>
                              <p>60 LBS</p>
                            </td>
                          </tr>
                          <tr className="width">
                            <th>Width</th>
                            <td>
                              <p>24″</p>
                            </td>
                          </tr>
                          <tr className="handle-height-ground-to-handle">
                            <th>Handle height (ground to handle)</th>
                            <td>
                              <p>37-45″</p>
                            </td>
                          </tr>
                          <tr className="wheels">
                            <th>Wheels</th>
                            <td>
                              <p>12″ air / wide track slick tread</p>
                            </td>
                          </tr>
                          <tr className="seat-back-height">
                            <th>Seat back height</th>
                            <td>
                              <p>21.5″</p>
                            </td>
                          </tr>
                          <tr className="head-room-inside-canopy">
                            <th>Head room (inside canopy)</th>
                            <td>
                              <p>25″</p>
                            </td>
                          </tr>
                          <tr className="pa_color">
                            <th>Color</th>
                            <td>
                              <p>Black, Blue, Red, White</p>
                            </td>
                          </tr>
                          <tr className="pa_size">
                            <th>Size</th>
                            <td>
                              <p>M, S</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </TabPanel>
                    <TabPanel className="" id="Vendor-info">
                      <div className="vendor-logo d-flex mb-30">
                        <LazyLoadImage src={vend18} alt="" />
                        <div className="vendor-name ml-15">
                          <h6>
                            <a href={void 0}>Noodles Co.</a>
                          </h6>
                          <div className="product-rate-cover text-end">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (32 reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul className="contact-infor mb-50">
                        <li>
                          <LazyLoadImage src={iconlocation} alt="" />
                          <strong>Address: </strong>{" "}
                          <span>
                            5171 W Campbell Ave undefined Kent, Utah 53127
                            United States
                          </span>
                        </li>
                        <li>
                          <LazyLoadImage src={iconcontact} alt="" />
                          <strong>Contact Seller:</strong>
                          <span>(+91) - 540-025-553</span>
                        </li>
                      </ul>
                      <div className="d-flex mb-55">
                        <div className="mr-30">
                          <p className="text-brand font-xs">Rating</p>
                          <h4 className="mb-0">92%</h4>
                        </div>
                        <div className="mr-30">
                          <p className="text-brand font-xs">Ship on time</p>
                          <h4 className="mb-0">100%</h4>
                        </div>
                        <div>
                          <p className="text-brand font-xs">Chat response</p>
                          <h4 className="mb-0">89%</h4>
                        </div>
                      </div>
                      <p>
                        Noodles & Company is an American fast-casual restaurant
                        that offers international and American noodle dishes and
                        pasta in addition to soups and salads. Noodles & Company
                        was founded in 1995 by Aaron Kennedy and is
                        headquartered in Broomfield, Colorado. The company went
                        public in 2013 and recorded a $457 million revenue in
                        2017.In late 2018, there were 460 Noodles & Company
                        locations across 29 states and Washington, D.C.
                      </p>
                    </TabPanel>
                    <TabPanel className="" id="Reviews">
                      {/* <!--Comments--> */}
                      <div className="comments-area">
                        <div className="row">
                          <div className="col-lg-8">
                            <h4 className="mb-30">
                              Customer questions & answers
                            </h4>
                            <div className="comment-list">
                              <div className="single-comment justify-content-between d-flex mb-30">
                                <div className="user justify-content-between d-flex">
                                  <div className="thumb text-center">
                                    <LazyLoadImage src={auth2} alt="" />
                                    <a className="font-heading text-brand">
                                      Sienna
                                    </a>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          December 4, 2022 at 3:12 pm{" "}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "100%" }}
                                        ></div>
                                      </div>
                                    </div>
                                    <p className="mb-10">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Delectus, suscipit
                                      exercitationem accusantium obcaecati quos
                                      voluptate nesciunt facilis itaque modi
                                      commodi dignissimos sequi repudiandae
                                      minus ab deleniti totam officia id
                                      incidunt? <a className="reply">Reply</a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="single-comment justify-content-between d-flex mb-30 ml-30">
                                <div className="user justify-content-between d-flex">
                                  <div className="thumb text-center">
                                    <LazyLoadImage src={auth3} alt="" />
                                    <a className="font-heading text-brand">
                                      Brenna
                                    </a>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          December 4, 2022 at 3:12 pm{" "}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "80%" }}
                                        ></div>
                                      </div>
                                    </div>
                                    <p className="mb-10">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Delectus, suscipit
                                      exercitationem accusantium obcaecati quos
                                      voluptate nesciunt facilis itaque modi
                                      commodi dignissimos sequi repudiandae
                                      minus ab deleniti totam officia id
                                      incidunt? <a className="reply">Reply</a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="single-comment justify-content-between d-flex">
                                <div className="user justify-content-between d-flex">
                                  <div className="thumb text-center">
                                    <LazyLoadImage src={auth4} alt="" />
                                    <a className="font-heading text-brand">
                                      Gemma
                                    </a>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          December 4, 2022 at 3:12 pm{" "}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "80%" }}
                                        ></div>
                                      </div>
                                    </div>
                                    <p className="mb-10">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Delectus, suscipit
                                      exercitationem accusantium obcaecati quos
                                      voluptate nesciunt facilis itaque modi
                                      commodi dignissimos sequi repudiandae
                                      minus ab deleniti totam officia id
                                      incidunt? <a className="reply">Reply</a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <h4 className="mb-30">Customer reviews</h4>
                            <div className="d-flex mb-30">
                              <div className="product-rate d-inline-block mr-15">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <h6>4.8 out of 5</h6>
                            </div>
                            <div className="progress">
                              <span>5 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "50%" }}
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                50%
                              </div>
                            </div>
                            <div className="progress">
                              <span>4 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                25%
                              </div>
                            </div>
                            <div className="progress">
                              <span>3 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "45%" }}
                                aria-valuenow="45"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                45%
                              </div>
                            </div>
                            <div className="progress">
                              <span>2 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "65%" }}
                                aria-valuenow="65"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                65%
                              </div>
                            </div>
                            <div className="progress mb-30">
                              <span>1 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow="85"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                85%
                              </div>
                            </div>
                            <a className="font-xs text-muted">
                              How are ratings calculated?
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* <!--comment form--> */}
                      <div className="comment-form">
                        <h4 className="mb-15">Add a review</h4>
                        <div className="product-rate d-inline-block mb-30"></div>
                        <div className="row">
                          <div className="col-lg-8 col-md-12">
                            <form
                              className="form-contact comment_form"
                              action="#"
                              id="commentForm"
                            >
                              <div className="row">
                                <div className="col-12">
                                  <div className="form-group">
                                    <textarea
                                      className="form-control w-100"
                                      name="comment"
                                      id="comment"
                                      cols="30"
                                      rows="9"
                                      placeholder="Write Comment"
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      name="name"
                                      id="name"
                                      type="text"
                                      placeholder="Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      name="email"
                                      id="email"
                                      type="email"
                                      placeholder="Email"
                                    />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      name="website"
                                      id="website"
                                      type="text"
                                      placeholder="Website"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <button
                                  type="submit"
                                  className="button button-contactForm"
                                >
                                  Submit Review
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
              {/* <div className="row mt-60">
                <div className="col-12">
                  <h2 className="section-title style-1 mb-30">
                    Related products
                  </h2>
                </div>
                <div className="col-12">
                  <div className="row related-products">
                    <div className="col-lg-3 col-md-4 col-12 col-sm-6">
                      <div className="product-cart-wrap hover-up">
                        <div className="product-img-action-wrap">
                          <div className="product-img product-img-zoom">
                            <a tabIndex="0">
                              <LazyLoadImage
                                className="default-img"
                                src={prod21}
                                alt=""
                              />
                              <LazyLoadImage
                                className="hover-img prod-img"
                                src={prod22}
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="product-action-1">
                            <a
                              aria-label="Quick view"
                              className="action-btn small hover-up"
                              data-bs-toggle="modal"
                              data-bs-target="#quickViewModal"
                            >
                              <i className="fi-rs-search"></i>
                            </a>
                            <a
                              aria-label="Add To Wishlist"
                              className="action-btn small hover-up"
                              tabIndex="0"
                            >
                              <i className="fi-rs-heart"></i>
                            </a>
                            <a
                              aria-label="Compare"
                              className="action-btn small hover-up"
                            >
                              <i className="fi-rs-shuffle"></i>
                            </a>
                          </div>
                          <div className="product-badges product-badges-position product-badges-mrg">
                            <span className="hot">Hot</span>
                          </div>
                        </div>
                        <div className="product-content-wrap">
                          <h2>
                            <a tabIndex="0">Ulstra Bass Headphone</a>
                          </h2>
                          <div className="rating-result" title="90%">
                            <span> </span>
                          </div>
                          <div className="product-price">
                            <span>$238.85 </span>
                            <span className="old-price">$245.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-12 col-sm-6">
                      <div className="product-cart-wrap hover-up">
                        <div className="product-img-action-wrap">
                          <div className="product-img product-img-zoom">
                            <a tabIndex="0">
                              <LazyLoadImage
                                className="default-img"
                                src={prod31}
                                alt=""
                              />
                              <LazyLoadImage
                                className="hover-img prod-img"
                                src={prod42}
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="product-action-1">
                            <a
                              aria-label="Quick view"
                              className="action-btn small hover-up"
                              data-bs-toggle="modal"
                              data-bs-target="#quickViewModal"
                            >
                              <i className="fi-rs-search"></i>
                            </a>
                            <a
                              aria-label="Add To Wishlist"
                              className="action-btn small hover-up"
                            >
                              <i className="fi-rs-heart"></i>
                            </a>
                            <a
                              aria-label="Compare"
                              className="action-btn small hover-up"
                            >
                              <i className="fi-rs-shuffle"></i>
                            </a>
                          </div>
                          <div className="product-badges product-badges-position product-badges-mrg">
                            <span className="sale">-12%</span>
                          </div>
                        </div>
                        <div className="product-content-wrap">
                          <h2>
                            <a href={void 0}>Smart Bluetooth Speaker</a>
                          </h2>
                          <div className="rating-result" title="90%">
                            <span> </span>
                          </div>
                          <div className="product-price">
                            <span>$138.85 </span>
                            <span className="old-price">$145.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-12 col-sm-6">
                      <div className="product-cart-wrap hover-up">
                        <div className="product-img-action-wrap">
                          <div className="product-img product-img-zoom">
                            <a href={void 0}>
                              <LazyLoadImage
                                className="default-img"
                                src={prod41}
                                alt=""
                              />
                              <LazyLoadImage
                                className="hover-img prod-img"
                                src={prod42}
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="product-action-1">
                            <a
                              aria-label="Quick view"
                              className="action-btn small hover-up"
                              data-bs-toggle="modal"
                              data-bs-target="#quickViewModal"
                            >
                              <i className="fi-rs-search"></i>
                            </a>
                            <a
                              aria-label="Add To Wishlist"
                              className="action-btn small hover-up"
                            >
                              <i className="fi-rs-heart"></i>
                            </a>
                            <a
                              aria-label="Compare"
                              className="action-btn small hover-up"
                            >
                              <i className="fi-rs-shuffle"></i>
                            </a>
                          </div>
                          <div className="product-badges product-badges-position product-badges-mrg">
                            <span className="new">New</span>
                          </div>
                        </div>
                        <div className="product-content-wrap">
                          <h2>
                            <a href={void 0}>HomeSpeak 12UEA Goole</a>
                          </h2>
                          <div className="rating-result" title="90%">
                            <span> </span>
                          </div>
                          <div className="product-price">
                            <span>$738.85 </span>
                            <span className="old-price">$1245.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-12 col-sm-6 d-lg-block d-none">
                      <div className="product-cart-wrap hover-up mb-0">
                        <div className="product-img-action-wrap">
                          <div className="product-img product-img-zoom">
                            <a href={void 0}>
                              <LazyLoadImage
                                className="default-img"
                                src={prod52}
                                alt=""
                              />
                              <LazyLoadImage
                                className="hover-img prod-img"
                                src={prod32}
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="product-action-1">
                            <a
                              aria-label="Quick view"
                              className="action-btn small hover-up"
                              data-bs-toggle="modal"
                              data-bs-target="#quickViewModal"
                            >
                              <i className="fi-rs-search"></i>
                            </a>
                            <a
                              aria-label="Add To Wishlist"
                              className="action-btn small hover-up"
                            >
                              <i className="fi-rs-heart"></i>
                            </a>
                            <a
                              aria-label="Compare"
                              className="action-btn small hover-up"
                            >
                              <i className="fi-rs-shuffle"></i>
                            </a>
                          </div>
                          <div className="product-badges product-badges-position product-badges-mrg">
                            <span className="hot">Hot</span>
                          </div>
                        </div>
                        <div className="product-content-wrap">
                          <h2>
                            <a href={void 0}>Dadua Camera 4K 2022EF</a>
                          </h2>
                          <div className="rating-result" title="90%">
                            <span> </span>
                          </div>
                          <div className="product-price">
                            <span>$89.8 </span>
                            <span className="old-price">$98.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductFull;
