import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sendRequest from "../../utility-functions/apiManager";
import BASE_URL from "../../utility-functions/config";

function HomeSectionHero() {
  const products = useSelector((state) => state.products.products);
  const [sliders, getSliders] = useState(null);

  useEffect(() => {
    sendRequest("get", "getHomePage/sliders")
      .then((res) => {
        if (res.status) {
          getSliders(res.homePage);
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
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    easing: "linear",
    fade: true,
  };
  return (
    <div>
      <section className="home-slider position-relative mb-30">
        <div className="container">
          <div className="home-slide-cover mt-30">
            <div className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1">
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
                <Slider {...settings}>
                  {sliders &&
                    sliders?.map((slider, i) => (
                      <div key={i}>
                        <div
                          className="single-hero-slider single-animation-wrap"
                          style={{
                            backgroundImage: `url(${
                              BASE_URL + "/" + slider.image
                            })`,
                          }}
                        >
                          <div className="slider-contents">
                            <h1
                              className="display-2 mb-40"
                              style={{
                                textAlign: slider.textAlign,
                              }}
                            >
                              {slider.text1}
                            </h1>
                            <p
                              className="mb-65"
                              style={{
                                textAlign: slider.textAlign,
                              }}
                            >
                              {slider.text2}
                            </p>
                            <form className="form-subcriber d-flex">
                              <input
                                type="email"
                                placeholder="Your emaill address"
                              />
                              <button className="btn" type="submit">
                                Subscribe
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    ))}
                </Slider>
              )}
            </div>
            <div className="slider-arrow hero-slider-1-arrow"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSectionHero;
