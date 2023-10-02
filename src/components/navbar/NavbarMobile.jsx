import wishicon from "../../assets/imgs/theme/icons/icon-heart.svg";
import carticon from "../../assets/imgs/theme/icons/icon-cart.svg";
import thumb3 from "../../assets/imgs/shop/thumbnail-3.webp";
import thumb4 from "../../assets/imgs/shop/thumbnail-4.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";

function NavbarMobile({ setactive, isactive }) {
  return (
    <>
      <div className="header-action-icon-2 d-block d-lg-none">
        <div
          className="burger-icon burger-icon-white"
          onClick={() => setactive(!isactive)}
        >
          <span className="burger-icon-top"></span>
          <span className="burger-icon-mid"></span>
          <span className="burger-icon-bottom"></span>
        </div>
      </div>
      <div className="header-action-right d-block d-lg-none">
        <div className="header-action-2">
          <div className="header-action-icon-2">
            <a href={void 0}>
              <LazyLoadImage alt="Nest" src={wishicon} />
              <span className="pro-count white">4</span>
            </a>
          </div>
          <div className="header-action-icon-2">
            <a className="mini-cart-icon">
              <LazyLoadImage alt="Nest" src={carticon} />
              <span className="pro-count white">2</span>
            </a>
            <div className="cart-dropdown-wrap cart-dropdown-hm2">
              <ul>
                <li>
                  <div className="shopping-cart-img">
                    <a href={void 0}>
                      <LazyLoadImage alt="Nest" src={thumb3} />
                    </a>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <a href={void 0}>Plain Striola Shirts</a>
                    </h4>
                    <h3>
                      <span>1 × </span>$800.00
                    </h3>
                  </div>
                  <div className="shopping-cart-delete">
                    <a href={void 0}>
                      <i className="fi-rs-cross-small"></i>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="shopping-cart-img">
                    <a href={void 0}>
                      <LazyLoadImage alt="Nest" src={thumb4} />
                    </a>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <a href={void 0}>Macbook Pro 2022</a>
                    </h4>
                    <h3>
                      <span>1 × </span>$3500.00
                    </h3>
                  </div>
                  <div className="shopping-cart-delete">
                    <a href={void 0}>
                      <i className="fi-rs-cross-small"></i>
                    </a>
                  </div>
                </li>
              </ul>
              <div className="shopping-cart-footer">
                <div className="shopping-cart-total">
                  <h4>
                    Total <span>$383.00</span>
                  </h4>
                </div>
                <div className="shopping-cart-button">
                  <a href={void 0}>View cart</a>
                  <a href={void 0}>Checkout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarMobile;
