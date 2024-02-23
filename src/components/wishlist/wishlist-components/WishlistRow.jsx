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
import { addWishlist } from "../../../redux/reducers/wishlistReducer";
import { updateCart } from "../../../redux/reducers/cartReducer";
import { useState } from "react";
import { useEffect } from "react";

function WishlistRow({
  id,
  name,
  image,
  price,
  discount,
  prodId,
  setLoading,
  setWishlist,
  stockStatus,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [stockStatus, setStockStatus] = useState(0);
  // useEffect(() => {
  //   sendRequest("get", `product/quantity/${prodId}`)
  //     .then((res) => {
  //       if (res.status) {
  //         setStockStatus(res.availableQuantity);
  //       } else {
  //         console.log(res.error);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.error);
  //     });
  // });

  const handleCartClick = (e) => {
    const id = e.target.closest(".wishlist-item").getAttribute("data");
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      dispatch(startSpinner());
      sendRequest("post", "cart", { id, quantity: 1 })
        .then((res) => {
          dispatch(stopSpinner());
          if (res.status) {
            successToast(res.message);
            dispatch(updateCart(res.cart));

            sendRequest("get", "cart/qty")
              .then((res) => {
                if (res.status) {
                  dispatch(updateCartQuantity(res.quantity));
                }
              })
              .catch((err) => {
                console.log(err);
              });
            sendRequest("post", "wishlist", { prodId: id })
              .then((res) => {
                if (res.status) {
                  sendRequest("get", "wishlist")
                    .then((res) => {
                      if (res.status) {
                        setWishlist(res.wishlist);
                        dispatch(addWishlist(res.wishlist));
                      } else {
                        console.log(res);
                      }
                    })
                    .catch((err) => console.log(err));

                  sendRequest("get", "wishlist/qty")
                    .then((res) => {
                      if (res.status) {
                        dispatch(updateWishlistQuantity(res.wishlistQuantity));
                      } else {
                        console.log(res);
                      }
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
    dispatch(startSpinner());
    sendRequest("post", "wishlist", { prodId: id })
      .then((res) => {
        if (res.status) {
          dispatch(stopSpinner());
          successToast(res.message);
          sendRequest("get", "wishlist")
            .then((res) => {
              dispatch(stopSpinner());
              if (res.status) {
                setWishlist(res.wishlist);
                dispatch(addWishlist(res.wishlist));
              } else {
                console.log(res);
              }
            })
            .catch((err) => console.log(err));

          sendRequest("get", "wishlist/qty")
            .then((res) => {
              if (res.status) {
                dispatch(updateWishlistQuantity(res.wishlistQuantity));
              } else {
                console.log(res);
              }
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
      <td className="image product-thumbnail pl-30">
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
        {stockStatus?.quantity > 0 ? (
          <span className="stock-status in-stock mb-0"> In Stock </span>
        ) : (
          <span className="stock-status out-stock mb-0"> Out of Stock </span>
        )}
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
