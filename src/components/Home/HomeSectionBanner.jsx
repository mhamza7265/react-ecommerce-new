import banner1 from "../../assets/imgs/banner/banner-1.webp";
import banner2 from "../../assets/imgs/banner/banner-2.webp";
import banner3 from "../../assets/imgs/banner/banner-3.webp";
import ScrollAnimation from "react-animate-on-scroll";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

function HomeSectionBanner() {
  const products = useSelector((state) => state.products.products);

  return (
    <div>
      <section className="banners mb-25">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="banner-img"
                delay={0}
                animateOnce={true}
              >
                {!products ? (
                  <Skeleton style={{ height: "245px" }} />
                ) : (
                  <LazyLoadImage src={banner1} alt="" />
                )}
                <div className="banner-text">
                  {!products ? (
                    <Skeleton count={3} style={{ width: "200px" }} />
                  ) : (
                    <h4>
                      Everyday Fresh & <br />
                      Clean with Our
                      <br />
                      Products
                    </h4>
                  )}
                  {
                    !products && (
                      <Skeleton style={{ width: "30%", height: "32px" }} />
                    ) /*: (
                    <a className="btn btn-xs">
                      Shop Now <i className="fi-rs-arrow-small-right"></i>
                    </a>
                  )*/
                  }
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-lg-4 col-md-6">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="banner-img"
                delay={200}
                animateOnce={true}
              >
                {!products ? (
                  <Skeleton style={{ height: "245px" }} />
                ) : (
                  <LazyLoadImage src={banner2} alt="" />
                )}
                <div className="banner-text">
                  {!products ? (
                    <Skeleton count={3} style={{ width: "200px" }} />
                  ) : (
                    <h4>
                      Make your Breakfast
                      <br />
                      Healthy and Easy
                    </h4>
                  )}
                  {
                    !products && (
                      <Skeleton style={{ width: "30%", height: "32px" }} />
                    ) /*: (
                    <a className="btn btn-xs">
                      Shop Now <i className="fi-rs-arrow-small-right"></i>
                    </a>
                  )*/
                  }
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-lg-4  d-none d-lg-block">
              <ScrollAnimation
                animateIn="animate__animated animate__fadeInUp"
                className="banner-img mb-sm-0"
                delay={400}
                animateOnce={true}
              >
                {!products ? (
                  <Skeleton style={{ height: "245px" }} />
                ) : (
                  <LazyLoadImage src={banner3} alt="" />
                )}
                <div className="banner-text">
                  {!products ? (
                    <Skeleton count={3} style={{ width: "200px" }} />
                  ) : (
                    <h4>
                      The best Organic <br />
                      Products Online
                    </h4>
                  )}
                  {
                    !products && (
                      <Skeleton style={{ width: "30%", height: "32px" }} />
                    ) /*: (
                    <a className="btn btn-xs">
                      Shop Now <i className="fi-rs-arrow-small-right"></i>
                    </a>
                  )*/
                  }
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSectionBanner;
