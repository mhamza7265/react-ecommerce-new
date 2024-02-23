import { useEffect } from "react";
import sendRequest, { errorToast } from "../../../utility-functions/apiManager";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function OrderList({
  orderId,
  total,
  date,
  quantity,
  status,
  setModal,
  setOrders,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModalClick = (e) => {
    const id = e.target.closest(".order-row-parent").getAttribute("data");
    dispatch(startSpinner());
    sendRequest("get", `order/${id}`)
      .then((res) => {
        dispatch(stopSpinner());
        if (res.status) {
          setOrders(res.orderDetail);
          setModal(true);
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
        console.log(err);
        dispatch(stopSpinner());
      });
  };

  return (
    <tr className="order-row-parent" data={orderId}>
      <td>{orderId}</td>
      <td>{date}</td>
      <td>{status}</td>
      <td>{Object.keys(quantity).length}</td>
      <td>${total.toFixed()}</td>
      <td>
        <button
          className="btn btn-sm btn-fill-out submit font-weight-bold"
          onClick={handleModalClick}
        >
          View
        </button>
      </td>
    </tr>
  );
}

export default OrderList;
