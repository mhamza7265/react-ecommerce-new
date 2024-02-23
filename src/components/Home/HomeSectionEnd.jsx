import HomeEndSection from "./home components/HomeEndSection";
import ScrollAnimation from "react-animate-on-scroll";
import { useSelector } from "react-redux";
import End from "./skeleton-components/End";

function HomeSectionEnd() {
  const products = useSelector((state) => state.products.products);
  const bestSellingProducts = useSelector(
    (state) => state.bestsellingProducts.products
  );
  const fourProductsOne = bestSellingProducts
    ? bestSellingProducts.product.slice(0, 4)
    : null;
  const fourProductsTwo = products ? products.slice(4, 8) : null;
  const fourProductsThree = products ? products.slice(0, 4) : null;
  const fourProductsFour = products ? products.slice(12, 16) : null;

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
                {products ? (
                  fourProductsOne.map((item, i) => (
                    <HomeEndSection
                      key={i}
                      image={item.images}
                      name={item.name}
                      price={item.price}
                      discount={item.discount.discountValue}
                    />
                  ))
                ) : (
                  <End />
                )}
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
                {products ? (
                  fourProductsTwo.map((item, i) => (
                    <HomeEndSection
                      key={i}
                      image={item.images}
                      name={item.name}
                      price={item.price}
                      discount={item.discount.discountValue}
                    />
                  ))
                ) : (
                  <End />
                )}
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
                {products ? (
                  fourProductsThree.map((item, i) => (
                    <HomeEndSection
                      key={i}
                      image={item.images}
                      name={item.name}
                      price={item.price}
                      discount={item.discount.discountValue}
                    />
                  ))
                ) : (
                  <End />
                )}
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
                {products ? (
                  fourProductsFour.map((item, i) => (
                    <HomeEndSection
                      key={i}
                      image={item.images}
                      name={item.name}
                      price={item.price}
                      discount={item.discount.discountValue}
                    />
                  ))
                ) : (
                  <End />
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSectionEnd;
