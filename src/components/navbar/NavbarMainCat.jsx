import cat1 from "../../assets/imgs/theme/icons/category-1.svg";
import cat2 from "../../assets/imgs/theme/icons/category-2.svg";
import cat3 from "../../assets/imgs/theme/icons/category-3.svg";
import cat4 from "../../assets/imgs/theme/icons/category-4.svg";
import cat5 from "../../assets/imgs/theme/icons/category-5.svg";
import cat6 from "../../assets/imgs/theme/icons/category-6.svg";
import cat7 from "../../assets/imgs/theme/icons/category-7.svg";
import cat8 from "../../assets/imgs/theme/icons/category-8.svg";
import cat9 from "../../assets/imgs/theme/icons/category-9.svg";
import cat10 from "../../assets/imgs/theme/icons/category-10.svg";
import icon1 from "../../assets/imgs/theme/icons/icon-1.svg";
import icon2 from "../../assets/imgs/theme/icons/icon-2.svg";
import icon3 from "../../assets/imgs/theme/icons/icon-3.svg";
import icon4 from "../../assets/imgs/theme/icons/icon-4.svg";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import NavebarMidMainCatComponent from "./navbar-components/NavebarMidMainCatComponent";

function NavbarMainCat() {
  const [classActive, setClassActive] = useState(false);
  const [expandActive, setExpandActive] = useState(false);
  const handleClick = () => {
    setClassActive(!classActive);
    expandActive ? setExpandActive(false) : null;
  };
  const categories = useSelector((state) => state.categories.categories);

  // const handleExpandClick = () => {
  //   setExpandActive(true);
  // };
  return (
    <div>
      <div className="main-categori-wrap d-none d-lg-block me-5">
        <a className="categories-button-active" onClick={handleClick}>
          <span className="fi-rs-apps"></span>{" "}
          <span className="et">Browse</span> All Categories
          <i
            className={`${classActive ? "fi-rs-angle-up" : "fi-rs-angle-down"}`}
          ></i>
        </a>
        <div
          className={`categories-dropdown-wrap categories-dropdown-active-large font-heading ${
            classActive ? "open" : null
          }`}
        >
          <div
            className="categori-dropdown-inner"
            style={{ height: "250px", overflowY: "auto" }}
          >
            <ul className="w-100">
              {/* <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat1} alt="" />
                  Milks and Dairies
                </a>
              </li>
              <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat2} alt="" />
                  Clothing & beauty
                </a>
              </li>
              <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat3} alt="" />
                  Pet Foods & Toy
                </a>
              </li>
              <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat4} alt="" />
                  Baking material
                </a>
              </li>
              <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat5} alt="" />
                  Fresh Fruit
                </a>
              </li>
              <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat6} alt="" />
                  Wines & Drinks
                </a>
              </li>
              <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat7} alt="" />
                  Fresh Seafood
                </a>
              </li>
              <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat8} alt="" />
                  Fast food
                </a>
              </li>
              <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat9} alt="" />
                  Vegetables
                </a>
              </li>
              <li>
                <a href={void 0}>
                  {" "}
                  <LazyLoadImage src={cat10} alt="" />
                  Bread and Juice
                </a>
              </li> */}
              {categories &&
                categories.map((item, i) => (
                  <NavebarMidMainCatComponent
                    key={i}
                    id={item._id}
                    name={item.name}
                    image={item.image}
                  />
                ))}
            </ul>
          </div>
          {/* <div
            className="more_slide_open"
            style={{ display: `${expandActive ? "block" : "none"}` }}
          >
            <div className="d-flex categori-dropdown-inner">
              <ul>
                <li>
                  <a href={void 0}>
                    {" "}
                    <LazyLoadImage src={icon1} alt="" />
                    Milks and Dairies
                  </a>
                </li>
                <li>
                  <a href={void 0}>
                    {" "}
                    <LazyLoadImage src={icon2} alt="" />
                    Clothing & beauty
                  </a>
                </li>
              </ul>
              <ul className="end">
                <li>
                  <a href={void 0}>
                    {" "}
                    <LazyLoadImage src={icon3} alt="" />
                    Wines & Drinks
                  </a>
                </li>
                <li>
                  <a href={void 0}>
                    {" "}
                    <LazyLoadImage src={icon4} alt="" />
                    Fresh Seafood
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="more_categories"
            style={{
              display: expandActive ? "none" : "block",
              maxWidth: "max-content",
              margin: "auto",
            }}
          >
            <a onClick={handleExpandClick}>
              <span className="icon"></span>{" "}
              <span className="heading-sm-1">Show more...</span>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NavbarMainCat;
