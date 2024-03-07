function CustomerRow({
  serial,
  id,
  firstName,
  lastName,
  email,
  role,
  status,
  handleBlockUnblockClick,
  handleDeleteClick,
}) {
  // console.log("status", status);
  return (
    <tr className="customer-row" data={id}>
      <td>{serial + 1}</td>
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
          <button
            className="btn btn-sm btn-danger ms-2"
            onClick={handleDeleteClick}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CustomerRow;
