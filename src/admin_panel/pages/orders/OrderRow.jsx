import { useEffect } from "react";
import { useState } from "react";

function OrderRow({
  keyNum,
  id,
  orderId,
  status,
  orderDate,
  userId,
  cartItems,
  grandTotal,
  setStatusModal,
  setOrderId,
  setOrderedCartItems,
  setCartModalIsOpen,
}) {
  // const [dropdownHidden, setDropdownHidden] = useState(true);

  //   useEffect(() => {
  //     setDropdownHidden(allDropdownsHidden);
  //   }, [allDropdownsHidden]);

  const handleModalClick = (e) => {
    const curTarget = e.currentTarget.getAttribute("data");
    setOrderId({ id, status });
    if (curTarget == "statusModal") {
      setStatusModal(true);
    } else {
      setOrderedCartItems(cartItems);
      setCartModalIsOpen(true);
    }
  };

  return (
    <tr className="order-row" key={keyNum} data={id}>
      <td>{keyNum + 1}</td>
      <td>{orderId}</td>
      <td>{status}</td>
      <td>{orderDate}</td>
      <td>{userId}</td>
      <td>{Object.keys(cartItems).length}</td>
      <td>{grandTotal}</td>
      <td className="position-relative">
        {/* <button
          className="btn btn-sm btn-success"
          onClick={() => {
            setAllDropdownsHidden(true);
            setDropdownHidden(!dropdownHidden);
          }}
        >
          {dropdownHidden ? (
            <i className="fas fa-chevron-down"></i>
          ) : (
            <i className="fas fa-chevron-up"></i>
          )}
        </button>
        {!dropdownHidden && (
          <div className="order-action-dd">
            <span
              className="text-small cursor-pointer"
              data="statusModal"
              onClick={handleModalClick}
            >
              Status
            </span>
            <span
              className="text-small cursor-pointer"
              data="cartModal"
              onClick={handleModalClick}
            >
              View cart
            </span>
          </div>
        )} */}
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-sm btn-secondary me-1"
            data="statusModal"
            onClick={handleModalClick}
          >
            <i className="fa fa-pen"></i>
          </button>
          <button
            className="btn btn-sm btn-success"
            data="cartModal"
            onClick={handleModalClick}
          >
            <i className="fa fa-eye"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default OrderRow;
