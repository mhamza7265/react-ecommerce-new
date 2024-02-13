import icon1 from "../../assets/imgs/theme/icons/icon-1.svg";
import icon2 from "../../assets/imgs/theme/icons/icon-2.svg";
import icon3 from "../../assets/imgs/theme/icons/icon-3.svg";
import icon4 from "../../assets/imgs/theme/icons/icon-4.svg";
import icon5 from "../../assets/imgs/theme/icons/icon-5.svg";
import icon6 from "../../assets/imgs/theme/icons/icon-6.svg";
import banner9 from "../../assets/imgs/banner/banner-9.webp";
import logo from "../../assets/imgs/theme/logo.svg";
import clockicon from "../../assets/imgs/theme/icons/icon-clock.svg";
import emailicon from "../../assets/imgs/theme/icons/icon-email-2.svg";
import contacticon from "../../assets/imgs/theme/icons/icon-contact.svg";
import locationicon from "../../assets/imgs/theme/icons/icon-location.svg";
import paymentmthdicn from "../../assets/imgs/theme/payment-method.png";
import playicn from "../../assets/imgs/theme/google-play.jpg";
import appstoreicn from "../../assets/imgs/theme/app-store.jpg";
import yticon from "../../assets/imgs/theme/icons/icon-youtube-white.svg";
import pinteresticon from "../../assets/imgs/theme/icons/icon-pinterest-white.svg";
import instaicon from "../../assets/imgs/theme/icons/icon-instagram-white.svg";
import twittericon from "../../assets/imgs/theme/icons/icon-twitter-white.svg";
import fbicon from "../../assets/imgs/theme/icons/icon-facebook-white.svg";
import phonecallicon from "../../assets/imgs/theme/icons/phone-call.svg";
import ScrollAnimation from "react-animate-on-scroll";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

function Footer() {
  const products = useSelector((state) => state.products.products);

  return (
    <footer className="main">
      <ScrollAnimation
        animateIn="animate__animated animate__fadeIn"
        className="newsletter mb-15 wow animate__animated animate__fadeIn"
        animateOnce={true}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {!products ? (
                  <div
                    style={{
                      height: "467px",
                      border: "1px solid #ebebeb",
                      borderRadius: "30px",
                    }}
                    className="position-relative"
                  >
                    <Skeleton
                      style={{
                        height: "50px",
                        borderRadius: "30px",
                        position: "absolute",
                        top: "80px",
                        left: "90px",
                        width: "40%",
                      }}
                    />
                    <Skeleton
                      style={{
                        height: "50px",
                        borderRadius: "30px",
                        position: "absolute",
                        top: "150px",
                        left: "90px",
                        width: "30%",
                      }}
                    />
                    <Skeleton
                      style={{
                        height: "50px",
                        borderRadius: "30px",
                        position: "absolute",
                        top: "240px",
                        left: "90px",
                        width: "30%",
                      }}
                    />
                    <Skeleton
                      style={{
                        height: "70px",
                        borderRadius: "30px",
                        position: "absolute",
                        top: "340px",
                        left: "90px",
                        width: "30%",
                      }}
                    />
                    <Skeleton
                      style={{
                        height: "400px",
                        borderRadius: "30px",
                        position: "absolute",
                        top: "30px",
                        left: "60%",
                        width: "30%",
                      }}
                    />
                  </div>
                ) : (
                  <div className="position-relative newsletter-inner">
                    <div className="newsletter-content">
                      <h2 className="mb-20">
                        Stay home & get your daily <br />
                        needs from our shop
                      </h2>
                      <p className="mb-45">
                        Start You'r Daily Shopping with{" "}
                        <span className="text-brand">Nest Mart</span>
                      </p>
                      <form className="form-subcriber d-flex">
                        <input type="email" placeholder="Your emaill address" />
                        <button className="btn" type="submit">
                          Subscribe
                        </button>
                      </form>
                    </div>
                    <LazyLoadImage src={banner9} alt="newsletter" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      <section className="featured section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="banner-left-icon d-flex align-items-center "
                delay={0}
                animateOnce={true}
              >
                <div className="banner-icon">
                  <LazyLoadImage src={icon1} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Best prices & offers</h3>
                  <p>Orders $50 or more</p>
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="banner-left-icon d-flex align-items-center"
                delay={200}
                animateOnce={true}
              >
                <div className="banner-icon">
                  <LazyLoadImage src={icon2} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Free delivery</h3>
                  <p>24/7 amazing services</p>
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="banner-left-icon d-flex align-items-center"
                delay={400}
                animateOnce={true}
              >
                <div className="banner-icon">
                  <LazyLoadImage src={icon3} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Great daily deal</h3>
                  <p>When you sign up</p>
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="banner-left-icon d-flex align-items-center"
                delay={600}
                animateOnce={true}
              >
                <div className="banner-icon">
                  <LazyLoadImage src={icon4} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Wide assortment</h3>
                  <p>Mega Discounts</p>
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="banner-left-icon d-flex align-items-center"
                delay={800}
                animateOnce={true}
              >
                <div className="banner-icon">
                  <LazyLoadImage src={icon5} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Easy returns</h3>
                  <p>Within 30 days</p>
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-xl-none">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="banner-left-icon d-flex align-items-center"
                delay={0}
                animateOnce={true}
              >
                <div className="banner-icon">
                  <LazyLoadImage src={icon6} alt="" />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Safe delivery</h3>
                  <p>Within 30 days</p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding footer-mid">
        <div className="container pt-15 pb-20">
          <div className="row">
            <div className="col">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0"
                delay={0}
                animateOnce={true}
              >
                <div className="logo mb-30">
                  <a href={void 0} className="mb-15">
                    <LazyLoadImage src={logo} alt="logo" />
                  </a>
                  <p className="font-lg text-heading">
                    Awesome grocery store website template
                  </p>
                </div>
                <ul className="contact-infor">
                  <li>
                    <LazyLoadImage src={locationicon} alt="" />
                    <strong>Address: </strong>{" "}
                    <span>
                      5171 W Campbell Ave undefined Kent, Utah 53127 United
                      States
                    </span>
                  </li>
                  <li>
                    <LazyLoadImage src={contacticon} alt="" />
                    <strong>Call Us:</strong>
                    <span>(+91) - 540-025-124553</span>
                  </li>
                  <li>
                    <LazyLoadImage src={emailicon} alt="" />
                    <strong>Email:</strong>
                    <span>sale@Nest.com</span>
                  </li>
                  <li>
                    <LazyLoadImage src={clockicon} alt="" />
                    <strong>Hours:</strong>
                    <span>10:00 - 18:00, Mon - Sat</span>
                  </li>
                </ul>
              </ScrollAnimation>
            </div>
            <div className="col"></div>
            <ScrollAnimation
              animateIn="animate__animated animate__fadeInUp"
              className="footer-link-widget col"
              delay={200}
              animateOnce={true}
            >
              <h4 className="widget-title">Company</h4>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li>
                  <a href={void 0}>About Us</a>
                </li>
                {/* <li>
                  <a href={void 0}>Delivery Information</a>
                </li> */}
                {/* <li>
                  <a href={void 0}>Privacy Policy</a>
                </li> */}
                {/* <li>
                  <a href={void 0}>Terms &amp; Conditions</a>
                </li> */}
                <li>
                  <a href={void 0}>Contact Us</a>
                </li>
                {/* <li>
                  <a href={void 0}>Support Center</a>
                </li> */}
                {/* <li>
                  <a href={void 0}>Careers</a>
                </li> */}
              </ul>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="animate__animated animate__fadeInUp"
              className="footer-link-widget col"
              delay={400}
              animateOnce={true}
            >
              <h4 className="widget-title">Account</h4>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li>
                  <a href={void 0}>Sign In</a>
                </li>
                <li>
                  <a href={void 0}>View Cart</a>
                </li>
                <li>
                  <a href={void 0}>My Wishlist</a>
                </li>
                {/* <li>
                  <a href={void 0}>Track My Order</a>
                </li> */}
                {/* <li>
                  <a href={void 0}>Help Ticket</a>
                </li> */}
                {/* <li>
                  <a href={void 0}>Shipping Details</a>
                </li> */}
                {/* <li>
                  <a href={void 0}>Compare products</a>
                </li> */}
              </ul>
            </ScrollAnimation>
            {/* <ScrollAnimation
              animateIn="animate__animated animate__fadeInUp"
              className="footer-link-widget col"
              delay={600}
              animateOnce={true}
            >
              <h4 className="widget-title">Corporate</h4>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li>
                  <a href={void 0}>Become a Vendor</a>
                </li>
                <li>
                  <a href={void 0}>Affiliate Program</a>
                </li>
                <li>
                  <a href={void 0}>Farm Business</a>
                </li>
                <li>
                  <a href={void 0}>Farm Careers</a>
                </li>
                <li>
                  <a href={void 0}>Our Suppliers</a>
                </li>
                <li>
                  <a href={void 0}>Accessibility</a>
                </li>
                <li>
                  <a href={void 0}>Promotions</a>
                </li>
              </ul>
            </ScrollAnimation> */}
            {/* <ScrollAnimation
              animateIn="animate__animated animate__fadeInUp"
              className="footer-link-widget col"
              delay={800}
              animateOnce={true}
            >
              <h4 className="widget-title">Popular</h4>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li>
                  <a href={void 0}>Milk & Flavoured Milk</a>
                </li>
                <li>
                  <a href={void 0}>Butter and Margarine</a>
                </li>
                <li>
                  <a href={void 0}>Eggs Substitutes</a>
                </li>
                <li>
                  <a href={void 0}>Marmalades</a>
                </li>
                <li>
                  <a href={void 0}>Sour Cream and Dips</a>
                </li>
                <li>
                  <a href={void 0}>Tea & Kombucha</a>
                </li>
                <li>
                  <a href={void 0}>Cheese</a>
                </li>
              </ul>
            </ScrollAnimation> */}
            <ScrollAnimation
              animateIn="animate__animated animate__fadeInUp"
              className="footer-link-widget widget-install-app col"
              delay={200}
              animateOnce={true}
            >
              <h4 className="widget-title">Install App</h4>
              <p className="">From App Store or Google Play</p>
              <div className="download-app">
                <a className="hover-up mb-sm-2 mb-lg-0">
                  <LazyLoadImage className="active" src={appstoreicn} alt="" />
                </a>
                <a className="hover-up mb-sm-2">
                  <LazyLoadImage src={playicn} alt="" />
                </a>
              </div>
              <p className="mb-20">Secured Payment Gateways</p>
              <LazyLoadImage className="" src={paymentmthdicn} alt="" />
            </ScrollAnimation>
          </div>
        </div>
      </section>
      <ScrollAnimation
        animateIn="animate__animated animate__fadeInUp"
        className="container pb-30"
        delay={200}
        animateOnce={true}
      >
        <div className="row align-items-center">
          <div className="col-12 mb-30">
            <div className="footer-bottom"></div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <p className="font-sm mb-0">
              &copy; 2022, <strong className="text-brand">Nest</strong> - HTML
              Ecommerce Template <br />
              All rights reserved
            </p>
          </div>
          <div className="col-xl-4 col-lg-6 text-center d-none d-xl-block">
            <div className="hotline d-lg-inline-flex mr-30">
              <LazyLoadImage src={phonecallicon} alt="hotline" />
              <p>
                1900 - 6666<span>Working 8:00 - 22:00</span>
              </p>
            </div>
            <div className="hotline d-lg-inline-flex">
              <LazyLoadImage src={phonecallicon} alt="hotline" />
              <p>
                1900 - 8888<span>24/7 Support Center</span>
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
            <div className="mobile-social-icon">
              <h6>Follow Us</h6>
              <a href={void 0}>
                <LazyLoadImage src={fbicon} alt="" />
              </a>
              <a href={void 0}>
                <LazyLoadImage src={twittericon} alt="" />
              </a>
              <a href={void 0}>
                <LazyLoadImage src={instaicon} alt="" />
              </a>
              <a href={void 0}>
                <LazyLoadImage src={pinteresticon} alt="" />
              </a>
              <a href={void 0}>
                <LazyLoadImage src={yticon} alt="" />
              </a>
            </div>
            <p className="font-sm">
              Up to 15% discount on your first subscribe
            </p>
          </div>
        </div>
      </ScrollAnimation>
    </footer>
  );
}

export default Footer;
