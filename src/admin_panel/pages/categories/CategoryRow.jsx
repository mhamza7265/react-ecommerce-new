import { addCategory } from "../../../redux/reducers/categoryReducer";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import BASE_URL from "../../../utility-functions/config";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    setCategoryId({ id, name, description, image });
    deleteCategory();
  };

  const handleEditClick = () => {
    setCategoryId({ id, name, description, image });
    setEditCategoryModalIsOpen(true);
  };

  return (
    <tr data={id}>
      <td>{serial + 1}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <img className="category-img" src={BASE_URL + "/" + image} />
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
