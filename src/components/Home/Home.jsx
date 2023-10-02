import { useState, useEffect } from "react";
import ScrollToTop from "../../common/ScrollToTop";
import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import HomeSectionBanner from "./HomeSectionBanner";
import HomeSectionBestsell from "./HomeSectionBestsell";
import HomeSectionCategory from "./HomeSectionCategory";
import HomeSectionEnd from "./HomeSectionEnd";
import HomeSectionEndDeal from "./HomeSectionEndDeal";
import HomeSectionHero from "./HomeSectionHero";
import HomeSectionProduct from "./HomeSectionProduct";
import thumb9 from "../../assets/imgs/shop/thumbnail-9.webp";
import thumb3 from "../../assets/imgs/shop/thumbnail-3.webp";
import thumb4 from "../../assets/imgs/shop/thumbnail-4.webp";
import thumb5 from "../../assets/imgs/shop/thumbnail-5.webp";
import thumb6 from "../../assets/imgs/shop/thumbnail-6.webp";
import thumb7 from "../../assets/imgs/shop/thumbnail-7.webp";
import thumb8 from "../../assets/imgs/shop/thumbnail-8.webp";
import prod1 from "../../assets/imgs/shop/product-16-1.webp";
import prod2 from "../../assets/imgs/shop/product-16-2.webp";
import prod3 from "../../assets/imgs/shop/product-16-3.webp";
import prod4 from "../../assets/imgs/shop/product-16-4.webp";
import prod5 from "../../assets/imgs/shop/product-16-5.webp";
import prod6 from "../../assets/imgs/shop/product-16-6.webp";
import prod7 from "../../assets/imgs/shop/product-16-7.webp";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Home() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [count, setCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  return (
    <div className="position-rlative">
      <Navbar />
      <div>
        <main className="main">
          <HomeSectionHero />
          {/* <!--End hero slider--> */}
          <HomeSectionCategory />
          {/* <!--End category slider--> */}
          <HomeSectionBanner />
          {/* <!--End banners--> */}
          <HomeSectionProduct setmodal={setModalIsOpen} />
          {/* <!--Products Tabs--> */}
          <HomeSectionBestsell />
          {/* <!--End Best Sales--> */}
          <HomeSectionEndDeal />
          {/* <!--End Deals--> */}
          <HomeSectionEnd />
          {/* <!--End 4 columns--> */}
        </main>
        <>
          <Modal
            className="custom-modal"
            centered
            show={modalIsOpen}
            onHide={() => setModalIsOpen(false)}
            style={{ zIndex: "9999999", padding: 0 }}
          >
            <Modal.Header style={{ border: "none" }} closeButton></Modal.Header>
            <Modal.Body>
              <div className="row">
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
                          <LazyLoadImage src={prod1} alt="product image" />
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
                        Seeds of Change Organic Quinoa, Brown
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
                        <span className="current-price text-brand">$38</span>
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
                          type="submit"
                          className="button button-add-to-cart"
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
      </div>
      <Footer />
    </div>
  );
}

export default Home;
