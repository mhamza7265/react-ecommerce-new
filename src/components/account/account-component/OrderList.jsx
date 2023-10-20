function OrderList({ prodId, total, date }) {
  return (
    <tr>
      <td>#{prodId}</td>
      <td>{date}</td>
      <td>Processing</td>
      <td>${total}</td>
      <td>
        <a className="btn-small d-block">View</a>
      </td>
    </tr>
  );
}

export default OrderList;
