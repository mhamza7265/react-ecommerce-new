import about from "../../assets/imgs/page/about-1.webp";
import about2 from "../../assets/imgs/page/about-2.webp";
import about3 from "../../assets/imgs/page/about-3.webp";
import about4 from "../../assets/imgs/page/about-4.webp";
import about5 from "../../assets/imgs/page/about-5.webp";
import about6 from "../../assets/imgs/page/about-6.webp";
import about8 from "../../assets/imgs/page/about-8.webp";
import yticon from "../../assets/imgs/theme/icons/icon-youtube-brand.svg";
import instaicon from "../../assets/imgs/theme/icons/icon-instagram-brand.svg";
import twittericon from "../../assets/imgs/theme/icons/icon-twitter-brand.svg";
import fbicon from "../../assets/imgs/theme/icons/icon-facebook-brand.svg";
import Slider from "react-slick";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import "../../assets/css/carousel.css";
import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import aboutCardData from "../../Data/aboutCardData";
import AboutCard from "./about-components/AboutCard";
import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function About() {
  const [loading, setLoading] = useState(true);
  const [viewPortEntered, setViewPortEntered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
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
      <Navbar />
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          {loading ? (
            <div className="row path-breadcrumb">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            <div className="breadcrumb">
              <Link rel="nofollow" to={"/"}>
                <i className="fi-rs-home mr-5"></i>Home
              </Link>
              <span></span> Pages <span></span> About us
            </div>
          )}
        </div>
      </div>
      <div className="page-content pt-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              <section className="row align-items-center about-carousel mb-50">
                <div className="col-lg-6">
                  {loading ? (
                    <Skeleton
                      style={{ height: "635px", borderRadius: "15px" }}
                    />
                  ) : (
                    <LazyLoadImage
                      src={about}
                      alt=""
                      className="border-radius-15 mb-md-3 mb-lg-0 mb-sm-4"
                    />
                  )}
                </div>
                <div className="col-lg-6">
                  <div className="pl-25">
                    {loading ? (
                      <div style={{ marginBottom: "40px" }}>
                        <Skeleton
                          style={{ height: "35px", marginBottom: "20px" }}
                        />
                        <Skeleton count={5} style={{ marginBottom: "0px" }} />
                        <Skeleton count={5} />
                      </div>
                    ) : (
                      <>
                        <h2 className="mb-30">Welcome to Nest</h2>
                        <p className="mb-25">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate id est laborum.
                        </p>
                        <p className="mb-50">
                          Ius ferri velit sanctus cu, sed at soleat accusata.
                          Dictas prompta et Ut placerat legendos interpre.Donec
                          vitae sapien ut libero venenatis faucibus. Nullam quis
                          ante Etiam sit amet orci eget. Quis commodo odio
                          aenean sed adipiscing. Turpis massa tincidunt dui ut
                          ornare lectus. Auctor elit sed vulputate mi sit amet.
                          Commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate id est laborum.
                        </p>
                      </>
                    )}
                    <div className="carausel-3-columns-cover position-relative">
                      <div id="carausel-3-columns-arrows"></div>
                      <div
                        className="carausel-3-columns"
                        id="carausel-3-columns"
                      >
                        <Slider {...settings}>
                          <div className="img-card">
                            {loading ? (
                              <Skeleton style={{ height: "195px" }} />
                            ) : (
                              <LazyLoadImage src={about2} alt="" />
                            )}
                          </div>
                          <div className=" img-card">
                            {loading ? (
                              <Skeleton style={{ height: "195px" }} />
                            ) : (
                              <LazyLoadImage src={about3} alt="" />
                            )}
                          </div>
                          <div className=" img-card">
                            {loading ? (
                              <Skeleton style={{ height: "195px" }} />
                            ) : (
                              <LazyLoadImage src={about4} alt="" />
                            )}
                          </div>
                          <div className=" img-card">
                            {loading ? (
                              <Skeleton style={{ height: "195px" }} />
                            ) : (
                              <LazyLoadImage src={about2} alt="" />
                            )}
                          </div>
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="text-center mb-50">
                {loading ? (
                  <Skeleton
                    style={{
                      width: "50%",
                      height: "40px",
                      marginBottom: "20px",
                    }}
                  />
                ) : (
                  <h2 className="title style-3 mb-40">What We Provide?</h2>
                )}
                <div className="row">
                  {aboutCardData.map((_, i) => (
                    <AboutCard key={i} />
                  ))}
                </div>
              </section>
              <section className="row align-items-center mb-50">
                <div className="row mb-50 align-items-center">
                  <div className="col-lg-7 pr-30">
                    {loading ? (
                      <Skeleton
                        style={{ height: "430px", borderRadius: "15px" }}
                      />
                    ) : (
                      <LazyLoadImage
                        src={about5}
                        alt=""
                        className="mb-md-3 mb-lg-0 mb-sm-4"
                      />
                    )}
                  </div>
                  <div className="col-lg-5">
                    {loading ? (
                      <div>
                        <Skeleton
                          style={{ height: "20px", marginBottom: "20px" }}
                        />
                        <Skeleton
                          count={3}
                          style={{ height: "35px", marginBottom: "10px" }}
                        />
                        <Skeleton count={8} style={{ height: "15px" }} />
                      </div>
                    ) : (
                      <>
                        <h4 className="mb-20 text-muted">Our performance</h4>
                        <h1 className="heading-1 mb-40">
                          Your Partner for e-commerce grocery solution
                        </h1>
                        <p className="mb-30">
                          Ed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto
                        </p>
                        <p>
                          Pitatis et quasi architecto beatae vitae dicta sunt
                          explicabo. Nemo enim ipsam voluptatem quia voluptas
                          sit aspernatur aut odit aut fugit, sed quia
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5">
                    {loading ? (
                      <div>
                        <Skeleton
                          style={{ height: "25px", marginBottom: "30px" }}
                        />
                        <Skeleton count={4} />
                      </div>
                    ) : (
                      <>
                        <h3 className="mb-30">Who we are</h3>
                        <p>
                          Volutpat diam ut venenatis tellus in metus. Nec dui
                          nunc mattis enim ut tellus eros donec ac odio orci
                          ultrices in. ellus eros donec ac odio orci ultrices
                          in.
                        </p>
                      </>
                    )}
                  </div>
                  <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5">
                    {loading ? (
                      <div>
                        <Skeleton
                          style={{ height: "25px", marginBottom: "30px" }}
                        />
                        <Skeleton count={4} />
                      </div>
                    ) : (
                      <>
                        <h3 className="mb-30">Our history</h3>
                        <p>
                          Volutpat diam ut venenatis tellus in metus. Nec dui
                          nunc mattis enim ut tellus eros donec ac odio orci
                          ultrices in. ellus eros donec ac odio orci ultrices
                          in.
                        </p>
                      </>
                    )}
                  </div>
                  <div className="col-lg-4">
                    {loading ? (
                      <div>
                        <Skeleton
                          style={{ height: "25px", marginBottom: "30px" }}
                        />
                        <Skeleton count={4} />
                      </div>
                    ) : (
                      <>
                        <h3 className="mb-30">Our mission</h3>
                        <p>
                          Volutpat diam ut venenatis tellus in metus. Nec dui
                          nunc mattis enim ut tellus eros donec ac odio orci
                          ultrices in. ellus eros donec ac odio orci ultrices
                          in.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <section className="container mb-50 d-none d-md-block">
          {loading ? (
            <Skeleton style={{ height: "300px", borderRadius: "15px" }} />
          ) : (
            <div className="row about-count">
              <div className="col-lg-1-5 col-md-6 text-center mb-lg-0 mb-md-5">
                <h1 className="heading-1">
                  <span className="count">
                    <CountUp end={12} start={viewPortEntered ? null : 0}>
                      {({ countUpRef }) => (
                        <ReactVisibilitySensor
                          active={!viewPortEntered}
                          onChange={(isVisible) => {
                            if (isVisible) {
                              setViewPortEntered(true);
                            }
                          }}
                          delayedCall
                        >
                          <span ref={countUpRef} />
                        </ReactVisibilitySensor>
                      )}
                    </CountUp>
                  </span>
                  +
                </h1>
                <h4>Glorious years</h4>
              </div>
              <div className="col-lg-1-5 col-md-6 text-center">
                <h1 className="heading-1">
                  <span className="count">
                    <CountUp end={36} start={viewPortEntered ? null : 0}>
                      {({ countUpRef }) => (
                        <ReactVisibilitySensor
                          active={!viewPortEntered}
                          onChange={(isVisible) => {
                            if (isVisible) {
                              setViewPortEntered(true);
                            }
                          }}
                          delayedCall
                        >
                          <span ref={countUpRef} />
                        </ReactVisibilitySensor>
                      )}
                    </CountUp>
                  </span>
                  +
                </h1>
                <h4>Happy clients</h4>
              </div>
              <div className="col-lg-1-5 col-md-6 text-center">
                <h1 className="heading-1">
                  <span className="count">
                    <CountUp end={58} start={viewPortEntered ? null : 0}>
                      {({ countUpRef }) => (
                        <ReactVisibilitySensor
                          active={!viewPortEntered}
                          onChange={(isVisible) => {
                            if (isVisible) {
                              setViewPortEntered(true);
                            }
                          }}
                          delayedCall
                        >
                          <span ref={countUpRef} />
                        </ReactVisibilitySensor>
                      )}
                    </CountUp>
                  </span>
                  +
                </h1>
                <h4>Projects complete</h4>
              </div>
              <div className="col-lg-1-5 col-md-6 text-center">
                <h1 className="heading-1">
                  <span className="count">
                    <CountUp end={24} start={viewPortEntered ? null : 0}>
                      {({ countUpRef }) => (
                        <ReactVisibilitySensor
                          active={!viewPortEntered}
                          onChange={(isVisible) => {
                            if (isVisible) {
                              setViewPortEntered(true);
                            }
                          }}
                          delayedCall
                        >
                          <span ref={countUpRef} />
                        </ReactVisibilitySensor>
                      )}
                    </CountUp>
                  </span>
                  +
                </h1>
                <h4>Team advisor</h4>
              </div>
              <div className="col-lg-1-5 text-center d-none d-lg-block">
                <h1 className="heading-1">
                  <span className="count">
                    <CountUp end={26} start={viewPortEntered ? null : 0}>
                      {({ countUpRef }) => (
                        <ReactVisibilitySensor
                          active={!viewPortEntered}
                          onChange={(isVisible) => {
                            if (isVisible) {
                              setViewPortEntered(true);
                            }
                          }}
                          delayedCall
                        >
                          <span ref={countUpRef} />
                        </ReactVisibilitySensor>
                      )}
                    </CountUp>
                  </span>
                  +
                </h1>
                <h4>Products Sale</h4>
              </div>
            </div>
          )}
        </section>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              <section className="mb-50">
                {loading ? (
                  <Skeleton
                    style={{
                      width: "50%",
                      height: "30px",
                      margin: "0 275px 50px 275px",
                    }}
                  />
                ) : (
                  <h2 className="title style-3 mb-40 text-center">Our Team</h2>
                )}
                <div className="row">
                  <div className="col-lg-4 mb-lg-0 mb-md-5 mb-sm-5">
                    {loading ? (
                      <div>
                        <Skeleton style={{ marginBottom: "10px" }} />
                        <Skeleton
                          count={2}
                          style={{ height: "30px", marginBottom: "10px" }}
                        />
                        <Skeleton count={8} style={{ marginBottom: "10px" }} />
                        <Skeleton style={{ height: "40px" }} />
                      </div>
                    ) : (
                      <>
                        <h6 className="mb-5 text-brand">Our Team</h6>
                        <h1 className="mb-30">Meet Our Expert Team</h1>
                        <p className="mb-30">
                          Proin ullamcorper pretium orci. Donec necscele risque
                          leo. Nam massa dolor imperdiet neccon sequata congue
                          idsem. Maecenas malesuada faucibus finibus.
                        </p>
                        <p className="mb-30">
                          Proin ullamcorper pretium orci. Donec necscele risque
                          leo. Nam massa dolor imperdiet neccon sequata congue
                          idsem. Maecenas malesuada faucibus finibus.
                        </p>
                        <a className="btn">View All Members</a>
                      </>
                    )}
                  </div>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="team-card">
                          {loading ? (
                            <Skeleton
                              style={{ height: "360px", borderRadius: "15px" }}
                            />
                          ) : (
                            <LazyLoadImage src={about6} alt="" />
                          )}
                          <div className="content text-center">
                            {loading ? (
                              <div>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton style={{ marginTop: "20px" }} />
                              </div>
                            ) : (
                              <>
                                <h4 className="mb-5">H. Merinda</h4>
                                <span>CEO & Co-Founder</span>
                                <div className="social-network mt-20">
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
                                    <LazyLoadImage src={yticon} alt="" />
                                  </a>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="team-card">
                          {loading ? (
                            <Skeleton
                              style={{ height: "360px", borderRadius: "15px" }}
                            />
                          ) : (
                            <LazyLoadImage src={about8} alt="" />
                          )}
                          <div className="content text-center">
                            {loading ? (
                              <div>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton style={{ marginTop: "20px" }} />
                              </div>
                            ) : (
                              <>
                                <h4 className="mb-5">Dilan Specter</h4>
                                <span>Head Engineer</span>
                                <div className="social-network mt-20">
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
                                    <LazyLoadImage src={yticon} alt="" />
                                  </a>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
