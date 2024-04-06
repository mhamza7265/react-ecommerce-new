import { LazyLoadImage } from "react-lazy-load-image-component";
import BASE_URL from "../../../utility-functions/config";

function CategoryRow({
  serial,
  id,
  name,
  description,
  image,
  created,
  setCategoryId,
  setEditCategoryModalIsOpen,
  deleteCategory,
}) {
  const handleDeleteClick = () => {
    setCategoryId({ id, name, description, image: BASE_URL + "/" + image });
    deleteCategory();
  };

  const handleEditClick = () => {
    setCategoryId({ id, name, description, image: BASE_URL + "/" + image });
    setEditCategoryModalIsOpen(true);
  };

  return (
    <tr data={id}>
      <td>{serial + 1}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <LazyLoadImage className="category-img" src={BASE_URL + "/" + image} />
      </td>
      <td>{created}</td>
      <td className="position-relative">
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-sm btn-secondary"
            onClick={handleEditClick}
          >
            <i className="fa fa-pen"></i>
          </button>
          <button className="btn btn-sm btn-danger" onClick={handleDeleteClick}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CategoryRow;
