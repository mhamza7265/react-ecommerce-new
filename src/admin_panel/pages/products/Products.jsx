import ProductsRow from "./ProductsRow";
import { useEffect, useState } from "react";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Paginate from "../../components/paginate/Paginate";

function Products() {
  const categories = useSelector((state) => state.categories.categories);
  const [productsByPage, setProductsByPage] = useState(null);
  const [paginateIsDisabled, setPaginateIsDisabled] = useState(false);
  const [newProductModalIsOpen, setNewProductModalIsOpen] = useState(false);
  const [editProductModalIsOpen, setEditProductModalIsOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const {
    register: registerNew,
    handleSubmit: handleNewProSubmit,
    reset: resetNew,
    formState: { errors: errorsNew },
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleEditProSubmit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm();

  useEffect(() => {
    sendRequest("get", "products/listing")
      .then((res) => {
        if (res.status) {
          setProductsByPage(res.products);
        } else {
          console.log("products could not be fetched");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onNewProductSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.image1[0]);
    formData.append("file", data.image1[1]);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("discount.applicable", true);
    formData.append("discount.discountType", "percent");
    formData.append("discount.discountValue", data.discountValue);
    formData.append("price", data.price);
    formData.append("cost", data.cost);
    formData.append("quantity", data.quantity);
    formData.append("sku", data.sku);
    formData.append("category", data.category);
    sendRequest("post", "product/add", formData, "formData")
      .then((res) => {
        console.log("prodAdd", res);
        if (res.status) {
          successToast("Product added successfully");
          sendRequest("get", `products/listing?page=${productsByPage?.page}`)
            .then((res) => {
              if (res.status) {
                setProductsByPage(res.products);
                setNewProductModalIsOpen(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          errorToast(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.error);
      });
  };

  const deleteProduct = (prodId) => {
    if (confirm("Do you want to remove this product?")) {
      sendRequest("delete", `product/${prodId}`)
        .then((res) => {
          if (res.status) {
            successToast("Product removed successfully!");
            sendRequest("get", `products/listing?page=${productsByPage?.page}`)
              .then((res) => {
                if (res.status) {
                  setProductsByPage(res.products);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          errorToast("Product could not be deleted");
        });
    } else {
      return;
    }
  };

  const onEditProductSubmit = (data) => {
    console.log("formData", data);
    const formData = new FormData();
    formData.append("file", data.image1[0]);
    formData.append("file", data.image1[1]);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("discount.applicable", true);
    formData.append("discount.discountType", "percent");
    formData.append("discount.discountValue", data.discountValue);
    formData.append("price", data.price);
    formData.append("cost", data.cost);
    formData.append("quantity", data.quantity);
    formData.append("sku", data.sku);
    formData.append("category", data.category);
    sendRequest("put", `product/${productId}`, formData, "formData")
      .then((res) => {
        console.log("updateProd", res);
        if (res.status) {
          successToast("Product updated successfully");
          sendRequest("get", `products/listing?page=${productsByPage.page}`)
            .then((res) => {
              if (res.status) {
                setProductsByPage(res.products);
                setEditProductModalIsOpen(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          errorToast(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.error);
      });
  };

  return (
    <div className="container">
      <h3>Products</h3>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm btn-fill-out btn-block"
          onClick={() => setNewProductModalIsOpen(true)}
        >
          Add New Products
        </button>
      </div>
      <table className="bg-white mb-0">
        <thead>
          <tr>
            <th>Serial#</th>
            <th>SKU</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Available Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Image</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsByPage?.docs?.length > 0 ? (
            productsByPage?.docs?.map((item, i) => (
              <ProductsRow
                key={i}
                serial={productsByPage?.pagingCounter - 1 + i}
                id={item._id}
                sku={item.sku}
                name={item.name}
                description={item.description}
                category={item.category.name}
                quantity={item.quantity}
                price={item.price}
                discount={item.discount.discountValue}
                images={item.images}
                deleteProduct={deleteProduct}
                setEditProductModalIsOpen={setEditProductModalIsOpen}
                setProductId={setProductId}
              />
            ))
          ) : (
            <tr>
              <td colSpan={11} className="text-center">
                No products(s) found
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={11} className="p-0">
              <Paginate
                endPoint={"products/listing"}
                state={productsByPage}
                setState={setProductsByPage}
                formType={"res.products"}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/*new product modal*/}
      <>
        <Modal
          size="lg"
          className="category-modal"
          centered
          show={newProductModalIsOpen}
          onHide={() => {
            resetNew();
            setNewProductModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <Modal.Header style={{ border: "none" }} closeButton>
            <h5>Add New Product</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <form onSubmit={handleNewProSubmit(onNewProductSubmit)}>
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input
                    {...registerNew("sku", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="sku"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsNew?.sku?.message}</p>
                <div className="form-group">
                  <label className="form-label">Name</label>
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
                  <label className="form-label">Description</label>
                  <input
                    {...registerNew("description", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="description"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsNew?.description?.message}</p>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    {...registerNew("category", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="category"
                    type="text"
                  >
                    <option value="" placeholder="Select an option">
                      Select an option
                    </option>
                    {categories &&
                      categories.map((item, i) => (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <p className="text-danger">{errorsNew?.category?.message}</p>
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    {...registerNew("quantity", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="quantity"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsNew?.quantity?.message}</p>
                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input
                    {...registerNew("price", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="price"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsNew?.price?.message}</p>
                <div className="form-group">
                  <label className="form-label">Cost</label>
                  <input
                    {...registerNew("cost", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="cost"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsNew?.cost?.message}</p>
                {/* <div className="form-group">
                  <label className="form-label">Discount Applicable</label>
                  <input
                    {...registerNew("applicable")}
                    className="form-control"
                    name="applicable"
                    type="checkbox"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Discount Type</label>
                  <select
                    {...registerNew("discountType")}
                    className="form-control"
                    name="discountType"
                    type="text"
                  >
                    <option value="%">%</option>
                  </select>
                </div> */}
                <div className="form-group">
                  <label className="form-label">Discount</label>
                  <input
                    {...registerNew("discountValue", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    name="discountValue"
                    type="text"
                  />
                </div>
                <p className="text-danger">
                  {errorsNew?.discountValue?.message}
                </p>
                <div className="form-group">
                  <label className="form-label">Image</label>
                  <input
                    {...registerNew("image1", {
                      required: "This field is required",
                    })}
                    className="form-control"
                    type="file"
                    name="image1"
                    multiple
                  />
                </div>
                <p className="text-danger">{errorsNew?.image1?.message}</p>
                <button
                  className="btn btn-sm btn-heading btn-block hover-up"
                  type="submit"
                >
                  Add Product
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>

      {/*edit product modal*/}
      <>
        <Modal
          size="lg"
          className="category-modal"
          centered
          show={editProductModalIsOpen}
          onHide={() => {
            resetEdit();
            setEditProductModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <Modal.Header style={{ border: "none" }} closeButton>
            <h5>Edit Product</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <form onSubmit={handleEditProSubmit(onEditProductSubmit)}>
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input
                    {...registerEdit("sku")}
                    className="form-control"
                    name="sku"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsEdit?.sku?.message}</p>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    {...registerEdit("name")}
                    className="form-control"
                    name="name"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsEdit?.name?.message}</p>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input
                    {...registerEdit("description")}
                    className="form-control"
                    name="description"
                    type="text"
                  />
                </div>
                <p className="text-danger">
                  {errorsEdit?.description?.message}
                </p>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    {...registerEdit("category")}
                    className="form-control"
                    name="category"
                    type="text"
                  >
                    <option value="" placeholder="Select an option">
                      Select an option
                    </option>
                    {categories &&
                      categories.map((item, i) => (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <p className="text-danger">{errorsEdit?.category?.message}</p>
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    {...registerEdit("quantity")}
                    className="form-control"
                    name="quantity"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsEdit?.quantity?.message}</p>
                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input
                    {...registerEdit("price")}
                    className="form-control"
                    name="price"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsEdit?.price?.message}</p>
                <div className="form-group">
                  <label className="form-label">Cost</label>
                  <input
                    {...registerEdit("cost")}
                    className="form-control"
                    name="cost"
                    type="text"
                  />
                </div>
                <p className="text-danger">{errorsEdit?.cost?.message}</p>
                {/* <div className="form-group">
                  <label className="form-label">Discount Applicable</label>
                  <input
                    {...registerEdit("applicable")}
                    className="form-control"
                    name="applicable"
                    type="checkbox"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Discount Type</label>
                  <select
                    {...registerEdit("discountType")}
                    className="form-control"
                    name="discountType"
                    type="text"
                  >
                    <option value="%">%</option>
                  </select>
                </div> */}
                <div className="form-group">
                  <label className="form-label">Discount</label>
                  <input
                    {...registerEdit("discountValue")}
                    className="form-control"
                    name="discountValue"
                    type="text"
                  />
                </div>
                <p className="text-danger">
                  {errorsEdit?.discountValue?.message}
                </p>
                <div className="form-group">
                  <label className="form-label">Image</label>
                  <input
                    {...registerEdit("image1")}
                    className="form-control"
                    type="file"
                    name="image1"
                  />
                </div>
                <p className="text-danger">{errorsEdit?.image1?.message}</p>
                <button
                  className="btn btn-sm btn-heading btn-block hover-up"
                  type="submit"
                >
                  Edit Product
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default Products;
