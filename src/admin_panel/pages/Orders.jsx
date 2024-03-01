// import { useSelector } from "react-redux";
import OrderRow from "./orders/OrderRow";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
// import { useDispatch } from "react-redux";
// import { updateOrder } from "../../redux/reducers/admin_reducers/orderReducerAdmin";
import BASE_URL from "../../utility-functions/config";

function Orders() {
  // const orders = useSelector((state) => state.adminOrder.orders);
  const [orders, setOrders] = useState([]);
  const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [orderedCartItems, setOrderedCartItems] = useState(null);
  const [allDropdownsHidden, setAllDropdownsHidden] = useState(false);
  const [typeOfOrders, setTypeOfOrders] = useState("all");
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [paginateIsDisabled, setPaginateIsDisabled] = useState(false);
  // const dispatch = useDispatch();

  useEffect(() => {
    sendRequest("get", "orders/listing")
      .then((res) => {
        if (res.status) {
          setOrders(res.orders);
        } else {
          console.log("Orders could not be fetched");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelectChange = () => {
    sendRequest("put", "order/process", {
      orderId: orderId.id,
      orderStatus: selectValue,
    })
      .then((res) => {
        if (res.status) {
          successToast("Status Updated!");
          sendRequest("get", "orders/listing")
            .then((res) => {
              if (res.status) {
                setOrders(res.orders);
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
      sendRequest("get", "orders/listing")
        .then((res) => {
          if (res.status) {
            successToast("List updated");
            setOrders(res.orders);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setTypeOfOrders("all");
    } else {
      setOrders([]);
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
    sendRequest("get", `customerorders/listing/${selectedUser}`)
      .then((res) => {
        if (res.status) {
          successToast("List Updated");
          setOrders(res.orders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePaginateClick = (e) => {
    const pageNumber = e.target.getAttribute("data");
    setPaginateIsDisabled(true);
    sendRequest(
      "get",
      `${
        typeOfOrders == "all"
          ? `orders/listing?page=${pageNumber}`
          : `customerorders/listing/${selectedUser}?page=${pageNumber}`
      }`
    )
      .then((res) => {
        if (res.status) {
          setPaginateIsDisabled(false);
          setOrders(res.orders);
          successToast("Orders list updated");
        } else {
          setPaginateIsDisabled(false);
          errorToast("Orders list could not be updated");
        }
      })
      .catch((err) => {
        setPaginateIsDisabled(false);
        console.log(err);
        errorToast("Internal server error");
      });
  };

  const handlePaginateArrowsClick = (e) => {
    const arrowType = e.target.getAttribute("data");
    setPaginateIsDisabled(true);
    sendRequest(
      "get",
      `${
        typeOfOrders == "all"
          ? `${
              arrowType == "decrease" && orders?.hasPrevPage
                ? `orders/listing?page=${orders?.page - 1}`
                : arrowType == "increase" && orders?.hasNextPage
                ? `orders/listing?page=${orders?.page + 1}`
                : null
            }`
          : `${
              arrowType == "decrease" && orders?.hasPrevPage
                ? `customerorders/listing/${selectedUser}?page=${
                    orders?.page - 1
                  }`
                : arrowType == "increase" && orders?.hasNextPage
                ? `customerorders/listing/${selectedUser}?page=${
                    orders?.page + 1
                  }`
                : null
            }`
      }`
    )
      .then((res) => {
        if (res.status) {
          setPaginateIsDisabled(false);
          setOrders(res.orders);
          successToast("Orders list updated");
        } else {
          setPaginateIsDisabled(false);
          errorToast("Orders list could not be updated");
        }
      })
      .catch((err) => {
        setPaginateIsDisabled(false);
        console.log(err);
        errorToast("Internal server error");
      });
  };

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
      <table className="bg-white mb-0">
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
          {orders?.docs?.length > 0 ? (
            orders?.docs?.map((item, i) => (
              <OrderRow
                key={i}
                keyNum={orders?.pagingCounter - 1 + i}
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
      <div
        className={`pagination d-flex justify-content-end p-3 bg-white ${
          paginateIsDisabled && "disabled"
        }`}
      >
        <p
          className={`me-1 paginate cursor-pointer paginate-arrow ${
            !orders?.hasPrevPage && "disable"
          }`}
          data={"decrease"}
          onClick={handlePaginateArrowsClick}
        >
          <i className="fas fa-caret-left" data={"decrease"}></i>
        </p>
        {orders &&
          [...Array(orders?.totalPages)].map((item, i) => (
            <p
              className={`me-1 paginate cursor-pointer ${
                orders?.page == i + 1 && "active"
              } ${paginateIsDisabled && "disable"}`}
              onClick={handlePaginateClick}
              key={i}
              data={i + 1}
            >
              {i + 1}
            </p>
          ))}
        <p
          className={`me-1 paginate cursor-pointer paginate-arrow ${
            !orders?.hasNextPage && "disable"
          }`}
          data={"increase"}
          onClick={handlePaginateArrowsClick}
        >
          <i className="fas fa-caret-right" data={"increase"}></i>
        </p>
      </div>

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
