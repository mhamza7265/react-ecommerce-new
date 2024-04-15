import ScrollAnimation from "react-animate-on-scroll";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import sendRequest from "../../utility-functions/apiManager";
import BASE_URL from "../../utility-functions/config";

function HomeSectionBanner() {
  const products = useSelector((state) => state.products.products);
  const [banners, setBanners] = useState(null);

  useEffect(() => {
    sendRequest("get", "getHomePage/banners")
      .then((res) => {
        if (res.status) {
          setBanners(res.homePage);
        }
      })
      .catch((err) => {
        console.log("banner", err);
      });
  }, []);

  return (
    <div>
      <section className="banners mb-25">
        <div className="container">
          <div className="row">
            {banners &&
              banners?.map((banner, i) => (
                <div className="col-lg-4 col-md-6" key={i}>
                  <ScrollAnimation
                    animateIn="animate__animated animate__fadeInUp"
                    className="banner-img"
                    delay={0}
                    animateOnce={true}
                  >
                    {!products ? (
                      <Skeleton style={{ height: "245px" }} />
                    ) : (
                      <LazyLoadImage
                        src={BASE_URL + "/" + banner.image}
                        alt=""
                        style={{
                          height: "250px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <div className="banner-text">
                      {!products ? (
                        <Skeleton count={3} style={{ width: "200px" }} />
                      ) : (
                        <h4>{banner.text1}</h4>
                      )}
                      {!products && (
                        <Skeleton style={{ width: "30%", height: "32px" }} />
                      )}
                    </div>
                  </ScrollAnimation>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSectionBanner;
