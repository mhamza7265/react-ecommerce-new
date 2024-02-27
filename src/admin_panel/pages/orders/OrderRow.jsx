import { useEffect } from "react";
import { useState } from "react";

function OrderRow({
  keyNum,
  id,
  status,
  orderDate,
  userId,
  cartItems,
  grandTotal,
  setStatusModal,
  setOrderId,
  setOrderedCartItems,
  setCartModalIsOpen,
  setAllDropdownsHidden,
  allDropdownsHidden,
}) {
  const [dropdownHidden, setDropdownHidden] = useState(true);

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
      <td>{id}</td>
      <td>{status}</td>
      <td>{orderDate}</td>
      <td>{userId}</td>
      <td>{Object.keys(cartItems).length}</td>
      <td>{grandTotal}</td>
      <td className="position-relative">
        <button
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
        )}
      </td>
    </tr>
  );
}

export default OrderRow;
