import productData from "../productdata/ProductData";
import HomeProductCard from "./home components/HomeProductCard";
import ScrollAnimation from "react-animate-on-scroll";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sendRequest from "../../utility-functions/apiManager";
import ProductsSection from "./skeleton-components/ProductsSection";
import { addProduct } from "../../redux/reducers/productReducer";

function HomeSectionProduct({ setmodal }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const reqProducts = products ? products.slice(1, 11) : null;

  useEffect(() => {
    sendRequest("get", "product/")
      .then((res) => {
        dispatch(addProduct(res.products));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <section className="product-tabs section-padding position-relative">
        <div className="container">
          <ScrollAnimation
            animateIn="animate__animated animate__fadeIn"
            className="section-title style-2"
            animateOnce={true}
          >
            <h3>Popular Products</h3>
            <ul className="nav nav-tabs links" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="nav-tab-one"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-one"
                  type="button"
                  role="tab"
                  aria-controls="tab-one"
                  aria-selected="true"
                >
                  All
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="nav-tab-two"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-two"
                  type="button"
                  role="tab"
                  aria-controls="tab-two"
                  aria-selected="false"
                >
                  Milks & Dairies
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="nav-tab-three"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-three"
                  type="button"
                  role="tab"
                  aria-controls="tab-three"
                  aria-selected="false"
                >
                  Coffes & Teas
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="nav-tab-four"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-four"
                  type="button"
                  role="tab"
                  aria-controls="tab-four"
                  aria-selected="false"
                >
                  Pet Foods
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="nav-tab-five"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-five"
                  type="button"
                  role="tab"
                  aria-controls="tab-five"
                  aria-selected="false"
                >
                  Meats
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="nav-tab-six"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-six"
                  type="button"
                  role="tab"
                  aria-controls="tab-six"
                  aria-selected="false"
                >
                  Vegetables
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="nav-tab-seven"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-seven"
                  type="button"
                  role="tab"
                  aria-controls="tab-seven"
                  aria-selected="false"
                >
                  Fruits
                </button>
              </li>
            </ul>
          </ScrollAnimation>
          {/* <!--End nav-tabs--> */}
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="tab-one"
              role="tabpanel"
              aria-labelledby="tab-one"
            >
              <div className="row product-grid-4">
                {!products
                  ? productData.map((_, index) => (
                      <ProductsSection key={index} id={`${index}00`} />
                    ))
                  : reqProducts.map((item, i) => (
                      <HomeProductCard
                        setmodal={setmodal}
                        id={`${i}00`}
                        key={i}
                        name={item.name}
                        image={item.imageUrl}
                        price={item.price}
                        prodId={item._id}
                      />
                    ))}
              </div>
              {/* <!--End product-grid-4--> */}
            </div>
            {/* <!--En tab one--> */}
          </div>
          {/* <!--End tab-content--> */}
        </div>
      </section>
    </div>
  );
}

export default HomeSectionProduct;