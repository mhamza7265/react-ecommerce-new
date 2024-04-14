import BASE_URL from "../../../../utility-functions/config";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";

function TableRow({
  srNum,
  id,
  image,
  text1,
  text1Sub,
  text2,
  text2Sub,
  align,
  single,
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
        <div className="cms-img">
          <img
            src={BASE_URL + "/" + image}
            style={{ height: "50px", width: "50px" }}
          />
        </div>
      </td>
      <td>
        <span>{text1Sub}</span>
        {text1Sub && (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>{text1}</Tooltip>}
          >
            <i className="fa fa-question-circle ms-2"></i>
          </OverlayTrigger>
        )}
      </td>
      {!single && (
        <td>
          <span>{text2Sub}</span>
          {text2Sub && (
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>{text2}</Tooltip>}
            >
              <i className="fa fa-question-circle ms-2"></i>
            </OverlayTrigger>
          )}
        </td>
      )}
      <td>{align}</td>
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
    </tr>
  );
}

export default TableRow;
