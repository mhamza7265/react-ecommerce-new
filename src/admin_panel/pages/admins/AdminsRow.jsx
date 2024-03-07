function AdminsRow({
  serial,
  id,
  firstName,
  lastName,
  email,
  status,
  role,
  handleBlockUnblockClick,
  handleDeleteClick,
  currentUserRole,
}) {
  return (
    <tr className="admin-row" data={id}>
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
        <div
          className={`action-btns ${
            currentUserRole !== "superAdmin" && "disabled"
          }`}
        >
          <div
            className={`action-buttons d-flex justify-content-start ${
              currentUserRole !== "superAdmin" && "disabled"
            }`}
          >
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
        </div>
      </td>
    </tr>
  );
}

export default AdminsRow;
