import cat2 from "../../assets/imgs/shop/cat-2.webp";
import Slider from "react-slick";
import homeCategoryData from "../../Data/homeCategorySectionData";
import HomeCategorySectionCard from "./home components/HomeCategorySectionCard";
import ScrollAnimation from "react-animate-on-scroll";

function HomeSectionCategory() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    draggable: true,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section className="popular-categories section-padding">
        <ScrollAnimation
          animateIn="animate__animated animate__fadeIn"
          className="container"
          animateOnce={true}
        >
          <div className="section-title">
            <div className="title">
              <h3>Featured Categories</h3>
              <ul className="list-inline nav nav-tabs links">
                <li className="list-inline-item nav-item">
                  <a className="nav-link">Cake & Milk</a>
                </li>
                <li className="list-inline-item nav-item">
                  <a className="nav-link">Coffes & Teas</a>
                </li>
                <li className="list-inline-item nav-item">
                  <a className="nav-link active">Pet Foods</a>
                </li>
                <li className="list-inline-item nav-item">
                  <a className="nav-link">Vegetables</a>
                </li>
              </ul>
            </div>
            <div
              className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow"
              id="carausel-10-columns-arrows"
            ></div>
          </div>
          <div className="carausel-10-columns-cover position-relative">
            <div className="carausel-10-columns" id="carausel-10-columns">
              <Slider {...settings}>
                {homeCategoryData.map((_, i) => (
                  <HomeCategorySectionCard key={i} id={`${i}00`} img1={cat2} />
                ))}
              </Slider>
            </div>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  );
}

export default HomeSectionCategory;
