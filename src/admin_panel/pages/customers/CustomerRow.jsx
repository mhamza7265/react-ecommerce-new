import BASE_URL from "../../../utility-functions/config";
import profilePlaceholder from "../../../assets/imgs/profile_placeholder_img.jpg";
import sendRequest from "../../../utility-functions/apiManager";

function CustomerRow({
  serial,
  id,
  image,
  firstName,
  lastName,
  email,
  role,
  status,
  handleBlockUnblockClick,
  handleDeleteClick,
  changeRole,
}) {
  // console.log("status", status);
  const handleRoleChange = () => {
    changeRole(id, "admin");
  };
  return (
    <tr className="customer-row" data={id}>
      <td>{serial + 1}</td>
      <td>
        {
          <img
            className="prof-pic"
            src={image ? `${BASE_URL + "/" + image}` : profilePlaceholder}
          />
        }
      </td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{role == "basic" ? "User" : role}</td>
      <td>
        <button className="btn btn-sm btn-secondary" onClick={handleRoleChange}>
          Make Admin
        </button>
      </td>
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
