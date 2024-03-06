function CustomerRow({
  id,
  firstName,
  lastName,
  email,
  role,
  status,
  handleBlockUnblockClick,
}) {
  // console.log("status", status);
  return (
    <tr className="customer-row" data={id}>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td className={``}>
        <span className={`badge ${status ? "bg-danger" : "bg-success"}`}>
          {status ? "Deactivated" : "Active"}
        </span>
      </td>
      <td>
        <div className="d-flex justify-content-start">
          {status ? (
            <button
              className="btn btn-sm btn-success me-1"
              data="unblock"
              onClick={handleBlockUnblockClick}
            >
              <i className="fa fa-unlock"></i> Activate
            </button>
          ) : (
            <button
              className="btn btn-sm btn-danger"
              data="block"
              onClick={handleBlockUnblockClick}
            >
              <i className="fa fa-lock"></i> Deactivate
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default CustomerRow;
