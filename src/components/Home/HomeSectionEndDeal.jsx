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
import { updateCartQuantity } from "../../redux/reducers/cartQuantityReducer";
import { updateCart } from "../../redux/reducers/cartReducer";

function HomeSectionEndDeal() {
  const products = useSelector((state) => state.products.products);
  const fourProducts = products ? products.slice(1, 5) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    const id = e.target.closest(".end-deal-parent").getAttribute("data");
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      dispatch(startSpinner());
      sendRequest("post", "cart", { id, quantity: 1 })
        .then((res) => {
          dispatch(stopSpinner());
          if (res.status) {
            dispatch(updateCart(res.cart));
            successToast(res.message);
            sendRequest("get", "cart/qty")
              .then((res) => {
                console.log(res);
                dispatch(updateCartQuantity(res.quantity));
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            errorToast(res.error);
            if (res.type == "updatePassword") {
              setTimeout(() => {
                navigate("/updatePw");
              }, 2000);
            }
          }
        })
        .catch((err) => {
          dispatch(stopSpinner());
          errorToast(err);
        });
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
            {/* <a className="show-all">
              All Deals
              <i className="fi-rs-angle-right"></i>
            </a> */}
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
                    image={item.images}
                    price={item.price}
                    discount={item.discount.discountValue}
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
