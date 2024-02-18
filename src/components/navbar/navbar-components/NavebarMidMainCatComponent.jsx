import { LazyLoadImage } from "react-lazy-load-image-component";
import BASE_URL from "../../../utility-functions/config";
import { useDispatch } from "react-redux";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import sendRequest from "../../../utility-functions/apiManager";
import { addAllProduct } from "../../../redux/reducers/allProductReducers";
import { useNavigate } from "react-router";

function NavebarMidMainCatComponent({ id, name, image, closeDropdown }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    closeDropdown();
  };

  return (
    <li className="category-card" data={id}>
      <a onClick={handleAllProductsClick}>
        <LazyLoadImage src={BASE_URL + "/" + image} alt="" />
        {name[0].toUpperCase() + name.substring(1)}
      </a>
    </li>
  );
}

export default NavebarMidMainCatComponent;
