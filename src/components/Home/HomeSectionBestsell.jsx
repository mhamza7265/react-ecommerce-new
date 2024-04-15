import bestCellData from "../../Data/homeBestSellData";
import Slider from "react-slick";
import HomeBestSellCard from "./home components/HomeBestSellCard";
import ScrollAnimation from "react-animate-on-scroll";
import BestSellSection from "./skeleton-components/BestsellSection";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sendRequest from "../../utility-functions/apiManager";
import BASE_URL from "../../utility-functions/config";

function HomeSectionBestsell({ setmodal }) {
  const bestsellProducts = useSelector(
    (state) => state.bestsellingProducts.products
  );
  const [wishlist, setWishlist] = useState(null);
  const [bestsellImage, setBestsellImage] = useState(null);

  useEffect(() => {
    sendRequest("get", "wishlist")
      .then((res) => {
        if (res.status) {
          setWishlist(res.wishlist);
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => console.log(err));

    sendRequest("get", "getHomePage/bestSelling")
      .then((res) => {
        if (res.status) {
          setBestsellImage(res.homePage[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <section className="section-padding section-bestsell pb-5">
        <div className="container">
          <ScrollAnimation
            animateIn="animate__animated animate__fadeIn"
            className="section-title"
            animateOnce={true}
          >
            <h3 className="">Daily Best Sells</h3>
          </ScrollAnimation>
          <div className="row">
            <ScrollAnimation
              animateIn="animate__animated animate__fadeIn"
              className="col-lg-3 d-none d-lg-flex"
              animateOnce={true}
            >
              <div
                className="banner-img style-2"
                style={{
                  background: `url(${BASE_URL}/${bestsellImage?.image})`,
                }}
              >
                <div className="banner-text">
                  <h2
                    className="mb-100"
                    style={{ textWrap: "wrap", width: "200px" }}
                  >
                    {bestsellImage?.text1}
                  </h2>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="animate__animated animate__fadeIn"
              className="col-lg-9 col-md-12"
              delay={400}
              animateOnce={true}
            >
              <div className="tab-content" id="myTabContent-1">
                <div
                  className="tab-pane fade show active"
                  id="tab-one-1"
                  role="tabpanel"
                  aria-labelledby="tab-one-1"
                >
                  <div className="carausel-4-columns-cover arrow-center position-relative">
                    <div
                      className="slider-arrow slider-arrow-2 carausel-4-columns-arrow"
                      id="carausel-4-columns-arrows"
                    ></div>
                    <div
                      className="carausel-4-columns carausel-arrow-center"
                      id="carausel-4-columns"
                    >
                      <Slider {...settings}>
                        {!bestsellProducts
                          ? bestCellData.map((_, i) => (
                              <BestSellSection key={i} />
                            ))
                          : bestsellProducts.product.map((item, i) => (
                              <HomeBestSellCard
                                key={i}
                                name={item.name}
                                image={item.images}
                                price={item.price}
                                prodId={item._id}
                                setmodal={setmodal}
                                wishlist={wishlist}
                                discount={item.discount.discountValue}
                                category={item.category.name}
                                sold={bestsellProducts.productIds[item._id]}
                              />
                            ))}
                      </Slider>
                    </div>
                  </div>
                </div>
                {/* <!--End tab-pane--> */}
              </div>
              {/* <!--End tab-content--> */}
            </ScrollAnimation>
            {/* <!--End Col-lg-9--> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSectionBestsell;
