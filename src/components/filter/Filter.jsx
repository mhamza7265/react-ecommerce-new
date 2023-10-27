import cat1 from "../../assets/imgs/theme/icons/category-1.svg";
import cat2 from "../../assets/imgs/theme/icons/category-2.svg";
import cat3 from "../../assets/imgs/theme/icons/category-3.svg";
import cat4 from "../../assets/imgs/theme/icons/category-4.svg";
import thumb9 from "../../assets/imgs/shop/thumbnail-9.webp";
import thumb3 from "../../assets/imgs/shop/thumbnail-3.webp";
import thumb4 from "../../assets/imgs/shop/thumbnail-4.webp";
import thumb5 from "../../assets/imgs/shop/thumbnail-5.webp";
import thumb6 from "../../assets/imgs/shop/thumbnail-6.webp";
import thumb7 from "../../assets/imgs/shop/thumbnail-7.webp";
import thumb8 from "../../assets/imgs/shop/thumbnail-8.webp";
import prod2 from "../../assets/imgs/shop/product-16-2.webp";
import prod3 from "../../assets/imgs/shop/product-16-3.webp";
import prod4 from "../../assets/imgs/shop/product-16-4.webp";
import prod5 from "../../assets/imgs/shop/product-16-5.webp";
import prod6 from "../../assets/imgs/shop/product-16-6.webp";
import prod7 from "../../assets/imgs/shop/product-16-7.webp";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";
import FilterProductCard from "./filter-components/FilterProductCard";
import FilterLowerCard from "./filter-components/FilterLowerCard";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import FilterSkeleton from "./skeleton-component/FilterSkeleton";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
import { updateCartNavbar } from "../../redux/reducers/navbarUpdateReducers/cartUpdateReducer";
import { Link } from "react-router-dom";

function Filter() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const fourProducts = products?.slice(0, 4);
  const singleProduct = useSelector((state) => state.singleProduct.product);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  var productArray;
  const handleCartClick = (e) => {
    const id = e.target.closest(".single-product-parent").getAttribute("data");
    const filtered = products.filter((item) => item._id == id)[0];
    const item = localStorage.getItem("cartItem");
    const cartItem = JSON.parse(item);
    const cartId = localStorage.getItem("cartId");
    const check = cartItem?.find((item) => item._id == id);
    if (!check) {
      if (!cartId) {
        productArray = [filtered];
        sendRequest("post", "cart/add", {
          products: [
            {
              product: filtered._id,
              quantity: 1,
              price: 10000,
              taxable: false,
            },
          ],
        })
          .then((res) => {
            successToast("Product added into the cart!");
            localStorage.setItem("cartId", res.cartId);
            localStorage.setItem("cartItem", JSON.stringify(productArray));
            dispatch(updateCartNavbar());
          })
          .catch((err) => {
            errorToast(err.message);
          });
      } else {
        productArray = [...cartItem, filtered];
        const cartId = localStorage.getItem("cartId");
        sendRequest("post", `cart/add/${cartId}`, {
          product: {
            product: filtered._id,
            quantity: 1,
            price: 10000,
            taxable: false,
          },
        })
          .then(() => {
            successToast("Product added into the cart!");
            localStorage.setItem("cartItem", JSON.stringify(productArray));
            dispatch(updateCartNavbar());
          })
          .catch((err) => {
            errorToast(err.message);
          });
      }
    } else {
      errorToast("Item is already in the cart!");
    }
  };

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

  return (
    <div>
      <Navbar />
      {products ? (
        <>
          <div className="page-header breadcrumb-wrap">
            <div className="container">
              <div className="breadcrumb">
                <Link to={"/"} rel="nofollow">
                  <i className="fi-rs-home mr-5"></i>Home
                </Link>
                <span></span> Shop <span></span> Fillter
              </div>
            </div>
          </div>
          <div className="container mb-30 mt-30">
            <div className="row">
              <div className="col-lg-12">
                <a className="shop-filter-toogle">
                  <span className="fi-rs-filter mr-5"></span>
                  Filters
                  <i className="fi-rs-angle-small-down angle-down"></i>
                  <i className="fi-rs-angle-small-up angle-up"></i>
                </a>
                <div className="shop-product-fillter-header">
                  <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                      <div className="card">
                        <h5 className="mb-30">By Categories</h5>
                        <div className="categories-dropdown-wrap font-heading">
                          <ul>
                            <li>
                              <a href={void 0}>
                                {" "}
                                <LazyLoadImage src={cat1} alt="" />
                                Milks and Dairies
                              </a>
                            </li>
                            <li>
                              <a href={void 0}>
                                {" "}
                                <LazyLoadImage src={cat2} alt="" />
                                Clothing &amp; beauty
                              </a>
                            </li>
                            <li>
                              <a href={void 0}>
                                {" "}
                                <LazyLoadImage src={cat3} alt="" />
                                Pet Foods &amp; Toy
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href={void 0}>
                                {" "}
                                <LazyLoadImage src={cat4} alt="" />
                                Baking material
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                      <div className="card">
                        <h5 className="mb-30">By Vendors</h5>
                        <div className="d-flex">
                          <div className="custome-checkbox mr-80">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox1"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox1"
                            >
                              <span>Aldi</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox2"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox2"
                            >
                              <span>Adidas</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox3"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox3"
                            >
                              <span>Burbe</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox4"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox4"
                            >
                              <span>Chanel</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox5"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox5"
                            >
                              <span>Prada</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox6"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox6"
                            >
                              <span>Kroger</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox7"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox7"
                            >
                              <span>Traders</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox8"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox8"
                            >
                              <span>Publix</span>
                            </label>
                          </div>
                          <div className="custome-checkbox">
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
                            >
                              <span>Harris</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox21"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox21"
                            >
                              <span>Costco</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox31"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox31"
                            >
                              <span>Targets</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox41"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox41"
                            >
                              <span>Green Tea</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox51"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox51"
                            >
                              <span>iSnack</span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox61"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox61"
                            >
                              <span>Pambox</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                      <div className="card">
                        <h5 className="mb-30">By Tags</h5>
                        <div className="sidebar-widget widget-tags">
                          <ul className="tags-list">
                            <li className="hover-up">
                              <a href={void 0}>
                                <i className="fi-rs-cross mr-10"></i>Milk
                              </a>
                            </li>
                            <li className="hover-up">
                              <a href={void 0}>
                                <i className="fi-rs-cross mr-10"></i>Broccoli
                              </a>
                            </li>
                            <li className="hover-up">
                              <a href={void 0}>
                                <i className="fi-rs-cross mr-10"></i>Smoothie
                              </a>
                            </li>
                            <li className="hover-up">
                              <a href={void 0}>
                                <i className="fi-rs-cross mr-10"></i>Fruit
                              </a>
                            </li>
                            <li className="hover-up mr-0">
                              <a href={void 0}>
                                <i className="fi-rs-cross mr-10"></i>Salad
                              </a>
                            </li>
                            <li className="hover-up mr-0">
                              <a href={void 0}>
                                <i className="fi-rs-cross mr-10"></i>Appetizer
                              </a>
                            </li>
                            <li className="hover-up mr-0 mb-0">
                              <a href={void 0}>
                                <i className="fi-rs-cross mr-10"></i>Appetizer
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-5 mb-sm-5">
                      <div className="card">
                        <h5 className="mb-10">By Price</h5>
                        <div className="sidebar-widget price_range range">
                          <div className="price-filter mb-20">
                            <div className="price-filter-inner">
                              <div id="slider-range" className="mb-20"></div>
                              <div className="d-flex justify-content-between">
                                <div className="caption">
                                  From:{" "}
                                  <strong
                                    id="slider-range-value1"
                                    className="text-brand"
                                  ></strong>
                                </div>
                                <div className="caption">
                                  To:{" "}
                                  <strong
                                    id="slider-range-value2"
                                    className="text-brand"
                                  ></strong>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="custome-checkbox">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox211"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox211"
                            >
                              <span>$0.00 - $20.00 </span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox22"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox22"
                            >
                              <span>$20.00 - $40.00 </span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox23"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox23"
                            >
                              <span>$40.00 - $60.00 </span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox24"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox24"
                            >
                              <span>$60.00 - $80.00 </span>
                            </label>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox25"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheckbox25"
                            >
                              <span>Over $100.00</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="shop-product-fillter">
                  <div className="totall-product">
                    <p>
                      We found <strong className="text-brand">29</strong> items
                      htmlFor you!
                    </p>
                  </div>
                  <div className="sort-by-product-area">
                    <div className="sort-by-cover mr-10">
                      <div className="sort-by-product-wrap">
                        <div className="sort-by">
                          <span>
                            <i className="fi-rs-apps"></i>Show:
                          </span>
                        </div>
                        <div className="sort-by-dropdown-wrap">
                          <span>
                            {" "}
                            50 <i className="fi-rs-angle-small-down"></i>
                          </span>
                        </div>
                      </div>
                      <div className="sort-by-dropdown">
                        <ul>
                          <li>
                            <a className="active">50</a>
                          </li>
                          <li>
                            <a href={void 0}>100</a>
                          </li>
                          <li>
                            <a href={void 0}>150</a>
                          </li>
                          <li>
                            <a href={void 0}>200</a>
                          </li>
                          <li>
                            <a href={void 0}>All</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="sort-by-cover">
                      <div className="sort-by-product-wrap">
                        <div className="sort-by">
                          <span>
                            <i className="fi-rs-apps-sort"></i>Sort by:
                          </span>
                        </div>
                        <div className="sort-by-dropdown-wrap">
                          <span>
                            {" "}
                            Featured <i className="fi-rs-angle-small-down"></i>
                          </span>
                        </div>
                      </div>
                      <div className="sort-by-dropdown">
                        <ul>
                          <li>
                            <a className="active">Featured</a>
                          </li>
                          <li>
                            <a href={void 0}>Price: Low to High</a>
                          </li>
                          <li>
                            <a href={void 0}>Price: High to Low</a>
                          </li>
                          <li>
                            <a href={void 0}>Release Date</a>
                          </li>
                          <li>
                            <a href={void 0}>Avg. Rating</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row product-grid">
                  {products
                    ? products.map((item, i) => (
                        <FilterProductCard
                          key={i}
                          setmodal={setModalIsOpen}
                          name={item.name}
                          image={item.imageUrl}
                          prodId={item._id}
                          price={item.price}
                        />
                      ))
                    : null}
                </div>
                {/* <!--product grid--> */}
                <div className="pagination-area mt-20 mb-20">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-start">
                      <li className="page-item">
                        <a className="page-link">
                          <i className="fi-rs-arrow-small-left"></i>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">1</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link">2</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">3</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link dot">...</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">6</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">
                          <i className="fi-rs-arrow-small-right"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <section className="section-padding pb-5">
                  <div className="section-title">
                    <h3 className="">Deals Of The Day</h3>
                    <a className="show-all">
                      All Deals
                      <i className="fi-rs-angle-right"></i>
                    </a>
                  </div>
                  <div className="row">
                    {products
                      ? fourProducts.map((item, i) => (
                          <FilterLowerCard
                            key={i}
                            name={item.name}
                            price={item.price}
                            image={item.imageUrl}
                            prodId={item._id}
                          />
                        ))
                      : null}
                  </div>
                </section>
                {/* <!--End Deals--> */}
              </div>
            </div>
          </div>
          <>
            <Modal
              className="custom-modal"
              centered
              show={modalIsOpen}
              onHide={() => setModalIsOpen(false)}
              style={{ zIndex: "9999999", padding: 0 }}
            >
              <Modal.Header
                style={{ border: "none" }}
                closeButton
              ></Modal.Header>
              <Modal.Body>
                <div
                  className="row single-product-parent"
                  data={singleProduct?._id}
                >
                  <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                    <div className="detail-gallery">
                      <span className="zoom-icon">
                        <i className="fi-rs-search"></i>
                      </span>
                      {/* <!-- MAIN SLIDES --> */}
                      <div className="single-prod">
                        <Slider
                          {...settingsMain}
                          asNavFor={nav2}
                          ref={(slider) => setSlider1(slider)}
                        >
                          <div className="single-prod">
                            <LazyLoadImage
                              src={singleProduct?.imageUrl}
                              alt="product image"
                            />
                          </div>
                          <div className="single-prod">
                            <LazyLoadImage src={prod2} alt="product image" />
                          </div>
                          <div className="single-prod">
                            <LazyLoadImage src={prod3} alt="product image" />
                          </div>
                          <div className="single-prod">
                            <LazyLoadImage src={prod4} alt="product image" />
                          </div>
                          <div className="single-prod">
                            <LazyLoadImage src={prod5} alt="product image" />
                          </div>
                          <div className="single-prod">
                            <LazyLoadImage src={prod6} alt="product image" />
                          </div>
                          <div className="single-prod">
                            <LazyLoadImage src={prod7} alt="product image" />
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
                      <h3 className="title-detail">
                        <a
                          href="shop-product-right.html"
                          className="text-heading"
                        >
                          {singleProduct?.name}
                        </a>
                      </h3>
                      <div className="product-detail-rating">
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
                      <div className="clearfix product-price-cover">
                        <div className="product-price primary-color float-left">
                          <span className="current-price text-brand">
                            ${singleProduct?.price}
                          </span>
                          <span>
                            <span className="save-price font-md color3 ml-15">
                              26% Off
                            </span>
                            <span className="old-price font-md ml-15">$52</span>
                          </span>
                        </div>
                      </div>
                      <div className="detail-extralink mb-30">
                        <div className="detail-qty border radius">
                          <a
                            href={void 0}
                            className="qty-down"
                            onClick={() =>
                              count == 0 ? null : setCount(count - 1)
                            }
                          >
                            <i className="fi-rs-angle-small-down"></i>
                          </a>
                          <span className="qty-val">{count}</span>
                          <a
                            href={void 0}
                            className="qty-up"
                            onClick={() => setCount(count + 1)}
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
                        </div>
                      </div>
                      <div className="font-xs">
                        <ul>
                          <li className="mb-5">
                            Vendor: <span className="text-brand">Nest</span>
                          </li>
                          <li className="mb-5">
                            MFG:<span className="text-brand"> Jun 4.2022</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <!-- Detail Info --> */}
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        </>
      ) : (
        <FilterSkeleton />
      )}
      <Footer />
    </div>
  );
}

export default Filter;
