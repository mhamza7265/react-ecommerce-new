import BASE_URL from "../../../utility-functions/config";

function CategoryRow({ serial, id, name, description, image, created }) {
  return (
    <tr data={id}>
      <td>{serial + 1}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <img className="category-img" src={BASE_URL + "/" + image} />
      </td>
      <td>{created}</td>
      <td>
        <button className="btn btn-sm btn-success">
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </td>
    </tr>
  );
}

export default CategoryRow;
