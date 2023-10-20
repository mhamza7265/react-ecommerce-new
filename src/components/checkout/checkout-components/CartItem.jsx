import { LazyLoadImage } from "react-lazy-load-image-component";

function CartItem({ image, name, price }) {
  return (
    <tr>
      <td className="image product-thumbnail">
        <LazyLoadImage src={image} alt="#" />
      </td>
      <td>
        <h6 className="w-160 mb-5">
          <a className="text-heading">{name}</a>
        </h6>
        <div className="product-rate-cover">
          <div className="product-rate d-inline-block">
            <div className="product-rating" style={{ width: "90%" }}></div>
          </div>
          <span className="font-small ml-5 text-muted"> (4.0)</span>
        </div>
      </td>
      <td>
        <h6 className="text-muted pl-20 pr-20">x 1</h6>
      </td>
      <td>
        <h4 className="text-brand">${price}</h4>
      </td>
    </tr>
  );
}

export default CartItem;
