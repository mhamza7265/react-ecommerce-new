import { LazyLoadImage } from "react-lazy-load-image-component";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import BASE_URL from "../../../utility-functions/config";
import { updateCartQuantity } from "../../../redux/reducers/cartQuantityReducer";
import { updateWishlistQuantity } from "../../../redux/reducers/wishlistQuantityReducer";

function WishlistRow({
  id,
  name,
  image,
  price,
  discount,
  prodId,
  setLoading,
  setWishlist,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    const id = e.target.closest(".wishlist-item").getAttribute("data");
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      dispatch(startSpinner());
      sendRequest("post", "cart", { id, quantity: 1 })
        .then((res) => {
          if (res.status) {
            dispatch(stopSpinner());
            successToast("Product added into the cart!");
            sendRequest("get", "cart/qty")
              .then((res) => {
                console.log(res);
                dispatch(updateCartQuantity(res.quantity));
              })
              .catch((err) => {
                console.log(err);
              });
            sendRequest("post", "wishlist", { prodId: id })
              .then((res) => {
                if (res.status) {
                  sendRequest("get", "wishlist")
                    .then((res) => {
                      setWishlist(res.wishlist);
                    })
                    .catch((err) => console.log(err));

                  sendRequest("get", "wishlist/qty")
                    .then((res) => {
                      console.log(res);
                      dispatch(updateWishlistQuantity(res.wishlistQuantity));
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              })
              .catch((err) => {
                errorToast(err);
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

  const handleRemoveItem = (e) => {
    const id = e.target.closest(".wishlist-item").getAttribute("data");
    setLoading(true);
    sendRequest("post", "wishlist", { prodId: id })
      .then((res) => {
        if (res.status) {
          setLoading(false);
          successToast(res.message);
          sendRequest("get", "wishlist")
            .then((res) => {
              setWishlist(res.wishlist);
            })
            .catch((err) => console.log(err));

          sendRequest("get", "wishlist/qty")
            .then((res) => {
              console.log(res);
              dispatch(updateWishlistQuantity(res.wishlistQuantity));
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
        errorToast(err);
      });
  };

  return (
    <tr className="wishlist-item" data={prodId}>
      <td className="custome-checkbox pl-30">
        <>
          <input
            className="form-check-input"
            type="checkbox"
            name="checkbox"
            id={`exampleCheckbox${id}`}
            value=""
          />
          <label
            className="form-check-label"
            htmlFor={`exampleCheckbox${id}`}
          ></label>
        </>
      </td>
      <td className="image product-thumbnail">
        <LazyLoadImage src={BASE_URL + "/" + image} alt="#" />
      </td>
      <td className="product-des product-name">
        <>
          <h6>
            <a className="product-name mb-10">{name}</a>
          </h6>
          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted"> (4.0)</span>
          </div>
        </>
      </td>
      <td className="price" data-title="Price">
        <h3 className="text-brand">${price}</h3>
      </td>
      <td className="price" data-title="Price">
        <h3 className="text-brand">{discount}%</h3>
      </td>
      <td className="price" data-title="Price">
        <h3 className="text-brand">${(price / 100) * discount}</h3>
      </td>
      <td className="text-center detail-info" data-title="Stock">
        <span className="stock-status in-stock mb-0"> In Stock </span>
      </td>
      <td className="text-right" data-title="Cart">
        <button onClick={handleCartClick} className="btn btn-sm">
          Add to cart
        </button>
      </td>
      <td className="action text-center" data-title="Remove">
        <a className="text-body" onClick={handleRemoveItem}>
          <i className="fi-rs-trash"></i>
        </a>
      </td>
    </tr>
  );
}

export default WishlistRow;
