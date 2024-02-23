import NavbarMobile from "./NavbarMobile";
import logo from "../../assets/imgs/theme/logo.svg";
import icnhp from "../../assets/imgs/theme/icons/icon-headphone.svg";
import NavbarMainCat from "./NavbarMainCat";
import NavbarMainMenu from "./NavbarMainMenu";
import { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { BarLoader } from "react-spinners";

function NavbarHeaderBottom({ setactive, isactive }) {
  const products = useSelector((state) => state.products.products);
  const [sticky, setSticky] = useState(false);
  const spinnerStatus = useSelector((state) => state.spinner.status);

  const navbarOffset = useRef();

  useEffect(() => {
    const handleScroll = () => {
      // Get the offset to the top
      const value = navbarOffset?.current?.clientHeight;

      // Set the boolean value
      setSticky(window.pageYOffset >= value + 150);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  const override = {
    display: "block",
    position: "absolute",
    top: "100%",
    left: 0,
    margin: "0 auto",
    borderColor: "red",
    width: "100%",
    backgroundColor: "#3bb77e",
  };

  return (
    <div className="">
      <div
        ref={navbarOffset}
        className={`header-bottom header-bottom-bg-color sticky-bar ${
          sticky ? "setfixed" : null
        }`}
      >
        <div className="container position-relative">
          <BarLoader
            color={"#ffffff"}
            loading={spinnerStatus}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="header-wrap header-space-between position-relative">
            {!products ? (
              <div className="row justify-content-between top-skeleton w-100 h-auto my-2">
                <Skeleton style={{ width: "100%", height: "40px" }} />
                <Skeleton
                  style={{ width: "100%", height: "20px", marginTop: "10px" }}
                />
                <Skeleton
                  style={{ width: "50%", marginLeft: "200px", height: "40px" }}
                />
              </div>
            ) : (
              <>
                <div className="logo logo-width-1 d-block d-lg-none">
                  <a href={void 0}>
                    <LazyLoadImage src={logo} alt="logo" />
                  </a>
                </div>
                <div className="header-nav d-none d-lg-flex">
                  <NavbarMainCat />
                  <NavbarMainMenu />
                </div>
                <div className="hotline d-none d-lg-flex ms-auto">
                  <LazyLoadImage src={icnhp} alt="hotline" />
                  <p>
                    1900 - 888<span>24/7 Support Center</span>
                  </p>
                </div>
                <NavbarMobile setactive={setactive} isactive={isactive} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarHeaderBottom;
