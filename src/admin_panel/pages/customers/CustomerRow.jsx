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
      <td>
        <div className="d-flex justify-content-start">
          {status ? (
            <button
              className="btn btn-sm btn-success me-1"
              data="unblock"
              onClick={handleBlockUnblockClick}
            >
              <i className="fa fa-unlock"></i> Unblock
            </button>
          ) : (
            <button
              className="btn btn-sm btn-danger"
              data="block"
              onClick={handleBlockUnblockClick}
            >
              <i className="fa fa-lock"></i> Block
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default CustomerRow;
