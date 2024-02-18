import ScrollAnimation from "react-animate-on-scroll";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import sendRequest from "../../../utility-functions/apiManager";
import { useNavigate } from "react-router";
import { addAllProduct } from "../../../redux/reducers/allProductReducers";
import { useEffect, useState } from "react";

function HomeCategorySectionCard({ img1, id, name, quantity, prodId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState(0);
  const images = `http://localhost:3000/${img1}`;

  useEffect(() => {
    sendRequest("get", `product/${prodId}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAllProductsClick = (e) => {
    const id = e.target.closest(".category-card").getAttribute("data");
    dispatch(startSpinner());
    sendRequest("get", `product/${id}`)
      .then((res) => {
        dispatch(stopSpinner());
        dispatch(addAllProduct(res.data));
        navigate("/allproducts");
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopSpinner());
      });
  };
  return (
    <div className="category-card" data={prodId}>
      <ScrollAnimation
        animateIn="animate__animated animate__fadeInUp"
        className="card-2 bg-9"
        delay={Number(id)}
        animateOnce={true}
      >
        <figure className="img-hover-scale overflow-hidden">
          <a href={void 0} onClick={handleAllProductsClick}>
            <LazyLoadImage src={images} alt="" />
          </a>
        </figure>
        <h6>
          <a href={void 0} onClick={handleAllProductsClick}>
            {name[0].toUpperCase() + name.substring(1)}
          </a>
        </h6>
        <span>
          {products?.length} {products?.length > 1 ? "items" : "item"}
        </span>
      </ScrollAnimation>
    </div>
  );
}

export default HomeCategorySectionCard;
