import { LazyLoadImage } from "react-lazy-load-image-component";

function NavbarMidCartDropdown({ image, name, price, prodId, delItem }) {
  return (
    <li className="cart-dropdown-single-parent" data={prodId}>
      <div className="shopping-cart-img">
        <a href={void 0}>
          <LazyLoadImage alt="Nest" src={image} />
        </a>
      </div>
      <div className="shopping-cart-title">
        <h4>
          <a href={void 0}>{name}</a>
        </h4>
        <h4>
          <span>1 × </span>${price}
        </h4>
      </div>
      <div className="shopping-cart-delete">
        <a href={void 0} onClick={delItem}>
          <i className="fi-rs-cross-small"></i>
        </a>
      </div>
    </li>
  );
}

export default NavbarMidCartDropdown;
