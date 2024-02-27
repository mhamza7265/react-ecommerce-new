import { useSelector } from "react-redux";
import OrderRow from "./orders/OrderRow";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../redux/reducers/admin_reducers/orderReducerAdmin";
import BASE_URL from "../../utility-functions/config";

function Orders() {
  const orders = useSelector((state) => state.adminOrder.orders);
  const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [orderedCartItems, setOrderedCartItems] = useState(null);
  const [allDropdownsHidden, setAllDropdownsHidden] = useState(false);
  const [typeOfOrders, setTypeOfOrders] = useState("all");
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const handleSelectChange = () => {
    sendRequest("put", "order/process", {
      orderId: orderId.id,
      orderStatus: selectValue,
    })
      .then((res) => {
        if (res.status) {
          successToast("Status Updated!");
          sendRequest("get", "orders")
            .then((res) => {
              if (res.status) {
                dispatch(updateOrder(res.orders));
                setStatusModalIsOpen(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          errorToast(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRadioChange = (e) => {
    const type = e.target.getAttribute("data");
    if (type == "all") {
      sendRequest("get", "orders")
        .then((res) => {
          if (res.status) {
            successToast("List updated");
            dispatch(updateOrder(res.orders));
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setTypeOfOrders("all");
    } else {
      dispatch(updateOrder([]));
      setTypeOfOrders("specific");
      sendRequest("get", "users")
        .then((res) => {
          setAllUsers(res.users);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUserSubmitClick = () => {
    sendRequest("get", `customerorders/${selectedUser}`)
      .then((res) => {
        if (res.status) {
          successToast("List Updated");
          dispatch(updateOrder(res.orders));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("orders", orders);

  return (
    <div className="container">
      <h3 className="mb-4">Orders</h3>
      <div className="order-radio-btns payment_option">
        <div className="custome-radio">
          <input
            className="form-check-input"
            type="radio"
            name="orders"
            id="orders-radio-1"
            data="all"
            defaultChecked
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="orders-radio-1">
            All Orders
          </label>
        </div>
        <div className="custome-radio">
          <input
            className="form-check-input"
            id="orders-radio-2"
            type="radio"
            name="orders"
            data="specific"
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="orders-radio-2">
            Orders by customer
          </label>
        </div>
      </div>
      {typeOfOrders == "specific" && (
        <div className="my-4">
          <div className="form-group col-4 ps-0">
            <label className="form-label">Customer</label>
            <select
              className="form-control bg-white"
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {allUsers?.map((item, i) => (
                <option value={item._id} key={i}>
                  {item.firstName +
                    " " +
                    item.lastName +
                    " " +
                    `(${item.email})`}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-sm btn-fill-out btn-block"
            onClick={handleUserSubmitClick}
          >
            Submit
          </button>
        </div>
      )}
      <table className="bg-white">
        <thead>
          <tr>
            <th>Serial#</th>
            <th>Order ID</th>
            <th>Status</th>
            <th>Order date</th>
            <th>User ID</th>
            <th>Cart Items</th>
            <th>Grand Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 ? (
            orders?.map((item, i) => (
              <OrderRow
                key={i}
                keyNum={i}
                id={item._id}
                status={item.status}
                orderDate={item.orderDate}
                userId={item.userId}
                cartItems={item.cartItems[0]}
                grandTotal={item.grandTotal}
                setStatusModal={setStatusModalIsOpen}
                setOrderId={setOrderId}
                setOrderedCartItems={setOrderedCartItems}
                setCartModalIsOpen={setCartModalIsOpen}
                setAllDropdownsHidden={setAllDropdownsHidden}
                allDropdownsHidden={allDropdownsHidden}
              />
            ))
          ) : (
            <tr>
              <td>No order(s) found</td>
            </tr>
          )}
        </tbody>
      </table>
      {/*Status Modal*/}
      <>
        <Modal
          className="status-modal"
          centered
          show={statusModalIsOpen}
          onHide={() => {
            setStatusModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <Modal.Header style={{ border: "none" }} closeButton></Modal.Header>
          <Modal.Body>
            <h5>Order ID: {orderId.id}</h5>
            <select
              className="status-select my-5"
              onChange={(e) => setSelectValue(e.target.value)}
              defaultValue={orderId.status}
            >
              <option value="Processing">Processing</option>
              <option value="Canceled">Canceled</option>
              <option value="Shipped">Shipped</option>
            </select>
            <button
              className="btn btn-sm btn-heading btn-block hover-up"
              onClick={handleSelectChange}
            >
              Update Status
            </button>
          </Modal.Body>
        </Modal>
      </>
      {/*Cart Modal*/}
      <>
        <Modal
          className="custom-modal"
          centered
          show={cartModalIsOpen}
          onHide={() => {
            setCartModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <Modal.Header style={{ border: "none" }} closeButton></Modal.Header>
          <Modal.Body>
            <h5>Cart</h5>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Sub Total</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderedCartItems &&
                  Object.values(orderedCartItems).map((item, i) => (
                    <tr key={i}>
                      <td>
                        <img src={`${BASE_URL}/${item.images[0][0]}`} />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.calculations.discount + "%"}</td>
                      <td>{item.calculations.subTotal}</td>
                      <td>{item.calculations.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default Orders;
