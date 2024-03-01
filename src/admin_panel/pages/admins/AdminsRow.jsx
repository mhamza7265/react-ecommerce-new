function AdminsRow({ id, firstName, lastName, email, role }) {
  return (
    <tr data={id}>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{role}</td>
      {/* <td>
        <div className="d-flex justify-content-start">
          <button
            className="btn btn-sm btn-secondary me-1"
            // onClick={handleEditClick}
          >
            <i className="fa fa-pen"></i>
          </button>
          <button
            className="btn btn-sm btn-danger"
            // onClick={handleDeleteClick}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </td> */}
    </tr>
  );
}

export default AdminsRow;
