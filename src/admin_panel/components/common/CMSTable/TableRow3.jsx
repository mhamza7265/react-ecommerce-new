import "yet-another-react-lightbox/styles.css";

function TableRow3({
  srNum,
  id,
  image,
  address,
  email,
  contact,
  location,
  single,
  handleEdit,
  handleDelete,
  section,
  editValues,
  three,
  action,
}) {
  const handleEditClick = (e) => {
    editValues({ address, email, contact, id, location });
    handleEdit(e, { address, email, contact, location });
  };
  return (
    <tr className="table-row" data={id} data-section={section}>
      <td>{srNum}</td>
      <td>
        <span>{address}</span>
      </td>
      <td>
        <span>{email}</span>
      </td>
      <td>
        <span>{contact}</span>
      </td>
      <td>
        <span>{location}</span>
      </td>
      {action && (
        <td>
          <div className="cms-action-btns">
            <button
              className="btn btn-sm btn-secondary me-2"
              onClick={handleEditClick}
            >
              <i className="fa fa-pen"></i> Edit
            </button>
            <button className="btn btn-sm btn-danger" onClick={handleDelete}>
              <i className="fa fa-trash"></i> Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}

export default TableRow3;
