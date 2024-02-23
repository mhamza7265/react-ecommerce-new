import HomeProductCard from "./home components/HomeProductCard";
import ScrollAnimation from "react-animate-on-scroll";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sendRequest, { errorToast } from "../../utility-functions/apiManager";
import { startSpinner, stopSpinner } from "../../redux/reducers/spinnerReducer";
import { useDispatch } from "react-redux";

function HomeSectionProduct({ setmodal }) {
  const productsByPage = useSelector((state) => state.productsByPage.products);
  const [nextPage, setNextPage] = useState(null);
  const [productsList, setProductsList] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setProductsList(productsByPage);
    sendRequest("get", "products/listing")
      .then((res) => {
        if (res.status) {
          setNextPage({
            nextPage: res.products.hasNextPage,
            currentPage: res.products.page,
          });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLoadMoreClick = () => {
    dispatch(startSpinner());
    sendRequest("get", `products/listing?page=${nextPage.currentPage + 1}`)
      .then((res) => {
        dispatch(stopSpinner());
        if (res.status) {
          const newProductsPage = productsList.concat(res.products.docs);
          setProductsList(newProductsPage);

          setNextPage({
            nextPage: res.products.hasNextPage,
            currentPage: res.products.page,
          });
        }
      })
      .catch((err) => {
        errorToast(err.error);
        console.log(err);
      });
  };

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
            {/* <ul className="nav nav-tabs links" id="myTab" role="tablist">
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
            </ul> */}
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
                {productsList &&
                  productsList?.map((item, i) => (
                    <HomeProductCard
                      setmodal={setmodal}
                      id={`${i}00`}
                      key={i}
                      name={item.name}
                      img1={item.images[0]}
                      img2={item.images[1]}
                      price={item.price}
                      discountVal={item.discount.discountValue}
                      prodId={item._id}
                      category={item.category.name}
                    />
                  ))}
              </div>
              {/* <!--End product-grid-4--> */}
            </div>
            {/* <!--En tab one--> */}
          </div>
          {/* <!--End tab-content--> */}
        </div>
        {nextPage?.nextPage && (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-fill-out btn-block mt-30 mx-auto"
              onClick={handleLoadMoreClick}
            >
              Load More <i className="fa fa-refresh"></i>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default HomeSectionProduct;
