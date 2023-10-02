import thumb1 from "../../assets/imgs/shop/thumbnail-1.webp";
import {
  recentlyAdded,
  topRated,
  topSelling,
  trendingProducts,
} from "../../Data/homeEndSectionData";
import HomeEndSection from "./home components/HomeEndSection";
import ScrollAnimation from "react-animate-on-scroll";

function HomeSectionEnd() {
  return (
    <div>
      <section className="section-padding mb-30">
        <div className="container">
          <div className="row">
            <ScrollAnimation
              animateIn="animate__animated animate__fadeInUp"
              className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0"
              delay={0}
              animateOnce={true}
            >
              <h4 className="section-title style-1 mb-30 animated animated">
                Top Selling
              </h4>
              <div className="product-list-small animated animated">
                {topSelling.map((_, i) => (
                  <HomeEndSection key={i} img1={thumb1} />
                ))}
              </div>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="animate__animated animate__fadeInUp"
              className="col-xl-3 col-lg-4 col-md-6 mb-md-0"
              delay={100}
              animateOnce={true}
            >
              <h4 className="section-title style-1 mb-30 animated animated">
                Trending Products
              </h4>
              <div className="product-list-small animated animated">
                {trendingProducts.map((_, i) => (
                  <HomeEndSection key={i} img1={thumb1} />
                ))}
              </div>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="animate__animated animate__fadeInUp"
              className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-lg-block"
              delay={200}
              animateOnce={true}
            >
              <h4 className="section-title style-1 mb-30 animated animated">
                Recently added
              </h4>
              <div className="product-list-small animated animated">
                {recentlyAdded.map((_, i) => (
                  <HomeEndSection key={i} img1={thumb1} />
                ))}
              </div>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="animate__animated animate__fadeInUp"
              className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-xl-block"
              delay={300}
              animateOnce={true}
            >
              <h4 className="section-title style-1 mb-30 animated animated">
                Top Rated
              </h4>
              <div className="product-list-small animated animated">
                {topRated.map((_, i) => (
                  <HomeEndSection key={i} img1={thumb1} />
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSectionEnd;
