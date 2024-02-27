import { useSelector } from "react-redux";
import CategoryRow from "./CategoryRow";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/reducers/categoryReducer";

function Categories() {
  const categories = useSelector((state) => state.categories.categories);
  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);
  const [editCategoryModalIsOpen, setEditCategoryModalIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const dispatch = useDispatch();
  const {
    register: registerNew,
    handleSubmit: handleNewCatSubmit,
    formState: { errors: errorsNew },
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleEditCatSubmit,
    formState: { errors: errorsEdit },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("name", data.name);
    formData.append("description", data.desc);
    sendRequest("post", "category/add", formData, "formData")
      .then((res) => {
        if (res.status) {
          successToast("Category added");
          sendRequest("get", "category")
            .then((res) => {
              if (res.status) {
                dispatch(addCategory(res.categories));
                setNewCategoryModalIsOpen(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          errorToast("Category could not be added");
        }
      })
      .catch((err) => console.log(err));
  };

  const onEditSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("name", data.name);
    formData.append("description", data.desc);
    sendRequest("put", `category/${categoryId.id}`, formData, "formData")
      .then((res) => {
        if (res.status) {
          successToast("Category updated");
          sendRequest("get", "category")
            .then((res) => {
              if (res.status) {
                dispatch(addCategory(res.categories));
                setEditCategoryModalIsOpen(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          errorToast("Category could not be updated");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h3>Categories</h3>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm btn-fill-out btn-block"
          onClick={() => setNewCategoryModalIsOpen(true)}
        >
          Add New Category
        </button>
      </div>
      <table className="bg-white">
        <thead>
          <tr>
            <th>Serial#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Date of creation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, i) => (
            <CategoryRow
              key={i}
              serial={i}
              id={item._id}
              name={item.name}
              description={item.description}
              image={item.image}
              created={item.created}
              setCategoryId={setCategoryId}
              setEditCategoryModalIsOpen={setEditCategoryModalIsOpen}
            />
          ))}
        </tbody>
      </table>

      {/*new category modal*/}
      <>
        <Modal
          size="lg"
          className="category-modal"
          centered
          show={newCategoryModalIsOpen}
          onHide={() => {
            setNewCategoryModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <Modal.Header style={{ border: "none" }} closeButton>
            <h5>Add New Category</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <form onSubmit={handleNewCatSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-label">Category Name</label>
                  <input
                    {...registerNew("name")}
                    className="form-control"
                    name="name"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category Description</label>
                  <input
                    {...registerNew("desc")}
                    className="form-control"
                    name="desc"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image</label>
                  <input
                    {...registerNew("image")}
                    className="form-control"
                    type="file"
                    name="image"
                  />
                </div>
                <button
                  className="btn btn-sm btn-heading btn-block hover-up"
                  type="submit"
                >
                  Add Category
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
      {/*edit category modal*/}
      <>
        <Modal
          size="lg"
          className="category-modal"
          centered
          show={editCategoryModalIsOpen}
          onHide={() => {
            setEditCategoryModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <Modal.Header style={{ border: "none" }} closeButton>
            <h5>Edit Category</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <form onSubmit={handleEditCatSubmit(onEditSubmit)}>
                <div className="form-group">
                  <label className="form-label">Category Name</label>
                  <input
                    {...registerEdit("name")}
                    className="form-control"
                    name="name"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category Description</label>
                  <input
                    {...registerEdit("desc")}
                    className="form-control"
                    name="desc"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image</label>
                  <input
                    {...registerEdit("image")}
                    className="form-control"
                    type="file"
                    name="image"
                  />
                </div>
                <button
                  className="btn btn-sm btn-heading btn-block hover-up"
                  type="submit"
                >
                  Update Category
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default Categories;
