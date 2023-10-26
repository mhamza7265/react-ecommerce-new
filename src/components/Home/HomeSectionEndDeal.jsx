import endDealData from "../../Data/homeEndDealData";
import HomeEndDealsCard from "./home components/HomeEndDealsCard";
import ScrollAnimation from "react-animate-on-scroll";
import { useSelector, useDispatch } from "react-redux";
import EndDeals from "./skeleton-components/EndDeals";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
import { updateCartNavbar } from "../../redux/reducers/navbarUpdateReducers/cartUpdateReducer";
import { useNavigate } from "react-router";
import { startSpinner, stopSpinner } from "../../redux/reducers/spinnerReducer";

function HomeSectionEndDeal() {
  const products = useSelector((state) => state.products.products);
  const fourProducts = products ? products.slice(1, 5) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var productArray;
  const handleCartClick = (e) => {
    const id = e.target.closest(".end-deal-parent").getAttribute("data");
    const filtered = products.filter((item) => item._id == id)[0];
    const currentUser = localStorage.getItem("current_user");
    const item = localStorage.getItem("cartItem");
    const cartItem = JSON.parse(item);
    const cartId = localStorage.getItem("cartId");
    const check = cartItem?.find((item) => item._id == id);
    if (currentUser) {
      if (!check) {
        if (!cartId) {
          productArray = [filtered];
          dispatch(startSpinner());
          sendRequest("post", "cart/add", {
            products: [
              {
                product: filtered._id,
                quantity: 1,
                price: 10000,
                taxable: false,
              },
            ],
          })
            .then((res) => {
              dispatch(stopSpinner());
              successToast("Product added into the cart!");
              localStorage.setItem("cartItem", JSON.stringify(productArray));
              localStorage.setItem("cartId", res.cartId);
              dispatch(updateCartNavbar());
            })
            .catch((err) => {
              dispatch(stopSpinner());
              errorToast(err);
            });
        } else {
          productArray = [...cartItem, filtered];
          const cartId = localStorage.getItem("cartId");
          dispatch(startSpinner());
          sendRequest("post", `cart/add/${cartId}`, {
            product: {
              product: filtered._id,
              quantity: 1,
              price: 10000,
              taxable: false,
            },
          })
            .then(() => {
              dispatch(stopSpinner());
              successToast("Product added into the cart!");
              localStorage.setItem("cartItem", JSON.stringify(productArray));
              dispatch(updateCartNavbar());
            })
            .catch((err) => {
              dispatch(stopSpinner());
              errorToast(err);
            });
        }
      } else {
        errorToast("Item is already in the cart!");
      }
    } else {
      errorToast("Please login first!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div>
      <section className="section-padding pb-5">
        <div className="container">
          <ScrollAnimation
            animateIn="animate__animated animate__fadeIn"
            className="section-title"
            delay={0}
            animateOnce={true}
          >
            <h3 className="">Deals Of The Day</h3>
            <a className="show-all">
              All Deals
              <i className="fi-rs-angle-right"></i>
            </a>
          </ScrollAnimation>
          <div className="row">
            {!products
              ? endDealData.map((item, i) => (
                  <EndDeals key={i} id={`${i}00`} className={item.class} />
                ))
              : fourProducts.map((item, i) => (
                  <HomeEndDealsCard
                    key={i}
                    id={`${i}00`}
                    name={item.name}
                    image={item.imageUrl}
                    price={item.price}
                    prodId={item._id}
                    addToCart={handleCartClick}
                  />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSectionEndDeal;
