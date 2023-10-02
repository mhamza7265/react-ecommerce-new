import endDealData from "../../Data/homeEndDealData";
import banner5 from "../../assets/imgs/banner/banner-5.webp";
import HomeEndDealsCard from "./home components/HomeEndDealsCard";
import ScrollAnimation from "react-animate-on-scroll";

function HomeSectionEndDeal() {
  return (
    <div>
      <section className="section-padding pb-5">
        <div className="container">
          <ScrollAnimation
            animateIn="animate__animated animate__fadeIn"
            className="section-title"
            delay={0}
            animateOnce={true}
          >
            <h3 className="">Deals Of The Day</h3>
            <a className="show-all">
              All Deals
              <i className="fi-rs-angle-right"></i>
            </a>
          </ScrollAnimation>
          <div className="row">
            {endDealData.map((item, i) => (
              <HomeEndDealsCard
                key={i}
                id={`${i}00`}
                className={item.class}
                img1={banner5}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSectionEndDeal;
