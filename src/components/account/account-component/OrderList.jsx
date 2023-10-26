import { useEffect } from "react";
import sendRequest, { errorToast } from "../../../utility-functions/apiManager";
import {
  startSpinner,
  stopSpinner,
} from "../../../redux/reducers/spinnerReducer";
import { useDispatch } from "react-redux";

function OrderList({ prodId, total, date, setModal, setOrders }) {
  const dispatch = useDispatch();

  const handleModalClick = (e) => {
    const id = e.target.closest(".order-row-parent").getAttribute("data");
    dispatch(startSpinner());
    sendRequest("get", `order/${id}`)
      .then((res) => {
        dispatch(stopSpinner());
        setOrders(res.order.products);
        setModal(true);
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopSpinner());
      });
  };

  useEffect(() => {}, []);

  return (
    <tr className="order-row-parent" data={prodId}>
      <td>#{prodId}</td>
      <td>{date}</td>
      <td>Processing</td>
      <td>${total}</td>
      <td>
        <a href={void 0} onClick={handleModalClick}>
          View
        </a>
      </td>
    </tr>
  );
}

export default OrderList;
