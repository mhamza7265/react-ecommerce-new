import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { addSingleProduct } from "../../../redux/reducers/singleProductReducer";
import { useNavigate } from "react-router";
import sendRequest from "../../../utility-functions/apiManager";
import BASE_URL from "../../../utility-functions/config";

function ViewOrderRow({
  name,
  productPrice,
  discount,
  quantity,
  price,
  image,
  prodId,
}) {
  const navigate = useNavigate();

  const handleSingleProductClick = (e) => {
    const id = e.target.closest(".view-order-parent").getAttribute("data");
    sendRequest("post", "product/detail", { id: id })
      .then((res) => {
        // dispatch(addSingleProduct(res.product));
        navigate("/singleproduct");
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr className="cart-item view-order-parent" data={prodId}>
      <td className="image product-thumbnail">
        <LazyLoadImage src={BASE_URL + "/" + image[0]} alt="#" />
      </td>
      <td className="product-des product-name">
        <h6 className="mb-5">
          <a
            className="product-name mb-10 text-heading"
            onClick={handleSingleProductClick}
          >
            {name}
          </a>
        </h6>
      </td>
      <td className="price" data-title="Price">
        <h4 className="text-body">{productPrice}</h4>
      </td>
      <td className="price" data-title="Price">
        <h4 className="text-body">{discount}%</h4>
      </td>
      <td className="price" data-title="Price">
        <h4 className="text-body">{quantity}</h4>
      </td>
      <td className="price" data-title="Price">
        <h4 className="text-body">${price.toFixed()}</h4>
      </td>
    </tr>
  );
}

export default ViewOrderRow;
