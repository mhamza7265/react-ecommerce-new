import { LazyLoadImage } from "react-lazy-load-image-component";
import BASE_URL from "../../../utility-functions/config";

function NavbarMidCartDropdown({
  image,
  name,
  price,
  discount,
  quantity,
  prodId,
  delItem,
}) {
  const del = (e) => {
    const id = e.target
      .closest(".cart-dropdown-single-parent")
      .getAttribute("data");
    delItem(id, quantity);
  };
  return (
    <li className="cart-dropdown-single-parent" data={prodId}>
      <div className="shopping-cart-img">
        <a href={void 0}>
          <LazyLoadImage alt="Nest" src={BASE_URL + "/" + image} />
        </a>
      </div>
      <div className="shopping-cart-title">
        <h4>
          <a href={void 0}>{name}</a>
        </h4>
        <h4>
          <span>{quantity} × </span>${(price / 100) * discount}
        </h4>
      </div>
      <div className="shopping-cart-delete">
        <a href={void 0} onClick={del}>
          <i className="fi-rs-cross-small"></i>
        </a>
      </div>
    </li>
  );
}

export default NavbarMidCartDropdown;
