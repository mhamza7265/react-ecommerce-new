import { useSelector } from "react-redux";
import CategoryRow from "./CategoryRow";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/reducers/categoryReducer";
import Paginate from "../../components/paginate/Paginate";

function Categories() {
  const [categoriesList, setCategoriesList] = useState(null);
  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);
  const [editCategoryModalIsOpen, setEditCategoryModalIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const dispatch = useDispatch();
  const {
    register: registerNew,
    handleSubmit: handleNewCatSubmit,
    reset: resetNew,
    formState: { errors: errorsNew },
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleEditCatSubmit,
    reset: resetEdit,
    // formState: { errors: errorsEdit },
  } = useForm();

  useEffect(() => {
    sendRequest("get", "categories/listing")
      .then((res) => {
        if (res.status) {
          setCategoriesList(res.categories);
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
  }, []);

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

  const handleDeleteClick = () => {
    if (confirm("Do you want to remove this category?")) {
      sendRequest("delete", `category/${categoryId.id}`).then((res) => {
        if (res.status) {
          successToast("Category removed");
          sendRequest("get", `categories/listing?page=${categoriesList?.page}`)
            .then((res) => {
              if (res.status) {
                setCategoriesList(res.categories);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          errorToast("Category could not be removed");
        }
      });
    } else {
      return;
    }
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
          {categoriesList?.docs?.length > 0 ? (
            categoriesList?.docs?.map((item, i) => (
              <CategoryRow
                key={i}
                serial={categoriesList?.pagingCounter - 1 + i}
                id={item._id}
                name={item.name}
                description={item.description}
                image={item.image}
                created={item.created}
                setCategoryId={setCategoryId}
                setEditCategoryModalIsOpen={setEditCategoryModalIsOpen}
                deleteCategory={handleDeleteClick}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No categories found
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={6} className="p-0">
              <Paginate
                endPoint={"categories/listing"}
                state={categoriesList}
                setState={setCategoriesList}
                formType={"res.categories"}
              />
            </td>
          </tr>
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
            resetNew();
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
                    {...registerNew("name", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="name"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsNew?.name?.message}</p>
                <div className="form-group">
                  <label className="form-label">Category Description</label>
                  <input
                    {...registerNew("desc", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="desc"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsNew?.desc?.message}</p>
                <div className="form-group">
                  <label className="form-label">Image</label>
                  <input
                    {...registerNew("image", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    type="file"
                    name="image"
                  />
                </div>
                <p className="text-danger">{errorsNew?.image?.message}</p>
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
            resetEdit();
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
