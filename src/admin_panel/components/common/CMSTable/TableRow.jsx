import BASE_URL from "../../../../utility-functions/config";

function TableRow({
  srNum,
  id,
  image,
  text1,
  text2,
  align,
  handleEdit,
  handleDelete,
}) {
  const handleEditClick = (e) => {
    handleEdit(e, { image, text1, text2, align });
  };
  return (
    <tr className="table-row" data={id}>
      <td>{srNum}</td>
      <td>
        {" "}
        <img
          src={BASE_URL + "/" + image}
          style={{ height: "50px", width: "50px" }}
        />
      </td>
      <td>
        <span>{text1}</span>
      </td>
      <td>
        <span>{text2}</span>
      </td>
      <td>{align}</td>
      <td>
        <button
          className="btn btn-sm btn-secondary me-2"
          onClick={handleEditClick}
        >
          <i className="fa fa-pen"></i> Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          <i className="fa fa-trash"></i> Delete
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
