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
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BASE_URL from "../../../utility-functions/config";

function Products() {
  const categories = useSelector((state) => state.categories.categories);
  const [productsByPage, setProductsByPage] = useState(null);
  const [newProductModalIsOpen, setNewProductModalIsOpen] = useState(false);
  const [editProductModalIsOpen, setEditProductModalIsOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageLengthError, setImageLengthError] = useState(false);
  const [open, setOpen] = useState(false);
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
    sendRequest("get", "products/listing", undefined, undefined, "admin")
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
    if (data.image1.length < 2) return setImageLengthError(true);
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

    sendRequest("post", "product/add", formData, "formData", "admin")
      .then((res) => {
        console.log("prodAdd", res);
        if (res.status) {
          successToast("Product added successfully");
          sendRequest(
            "get",
            `products/listing?page=${productsByPage?.page}`,
            undefined,
            undefined,
            "admin"
          )
            .then((res) => {
              if (res.status) {
                setProductsByPage(res.products);
                setNewProductModalIsOpen(false);
                setImageFile(null);
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
      sendRequest("delete", `product/${prodId}`, undefined, undefined, "admin")
        .then((res) => {
          if (res.status) {
            successToast("Product removed successfully!");
            sendRequest(
              "get",
              `products/listing?page=${productsByPage?.page}`,
              undefined,
              undefined,
              "admin"
            )
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
    if (data.image1.length > 0 && data.image1.length < 2)
      return setImageLengthError(true);
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
    sendRequest("put", `product/${productId}`, formData, "formData", "admin")
      .then((res) => {
        console.log("updateProd", res);
        if (res.status) {
          successToast("Product updated successfully");
          sendRequest(
            "get",
            `products/listing?page=${productsByPage.page}`,
            undefined,
            undefined,
            "admin"
          )
            .then((res) => {
              if (res.status) {
                setProductsByPage(res.products);
                setEditProductModalIsOpen(false);
                setImageFile(null);
                setImageLengthError(false);
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

  const handleFileChange = (e) => {
    setImageFile(
      e.target.files.length > 1
        ? {
            image1: URL.createObjectURL(e.target.files[0]),
            image2: URL.createObjectURL(e.target.files[1]),
          }
        : {
            image1: URL.createObjectURL(e.target.files[0]),
          }
    );
    setProductId(
      e.target.files.length > 1
        ? {
            ...productId,
            images: {
              image1: URL.createObjectURL(e.target.files[0]),
              image2: URL.createObjectURL(e.target.files[1]),
            },
          }
        : {
            ...productId,
            images: {
              image1: URL.createObjectURL(e.target.files[0]),
              image2: null,
            },
          }
    );
    setImageLengthError(false);
  };

  return (
    <div className="container">
      <h3>Products</h3>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm btn-fill-out btn-block"
          onClick={() => setNewProductModalIsOpen(true)}
        >
          <i className="fa fa-plus"></i> Add New Products
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
            <th>Cost</th>
            <th>Price</th>
            <th>Discount</th>
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
                cost={item.cost}
                images={item.images}
                deleteProduct={deleteProduct}
                setEditProductModalIsOpen={setEditProductModalIsOpen}
                setProductId={setProductId}
              />
            ))
          ) : (
            <tr>
              <td colSpan={"100%"} className="text-center">
                No products(s) found
              </td>
            </tr>
          )}
          <Paginate
            endPoint={"products/listing"}
            state={productsByPage}
            setState={setProductsByPage}
            formType={"products"}
          />
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
            setImageFile(null);
            setImageLengthError(false);
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
                  <label className="form-label">
                    Image <span className="text-muted">(select two)</span>
                  </label>
                  <div className="d-flex align-items-end">
                    <input
                      {...registerNew("image1", {
                        required: "This field is required",
                      })}
                      className="form-control image-input"
                      type="file"
                      name="image1"
                      multiple
                      onChange={handleFileChange}
                    />
                    {imageFile && (
                      <div className="d-flex align-items-end">
                        <img
                          className="prof-pic ms-3"
                          style={{ borderRadius: "50%" }}
                          src={imageFile.image1}
                        />
                        {imageFile?.image2 && (
                          <img
                            className="prof-pic ms-3"
                            style={{ borderRadius: "50%" }}
                            src={imageFile.image2}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-danger">{errorsNew?.image1?.message}</p>
                  {imageLengthError && (
                    <p className="text-danger">Please select two images</p>
                  )}
                </div>

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
            setImageFile(null);
            setImageLengthError(false);
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
                    value={productId?.sku}
                    onChange={(e) =>
                      setProductId({ ...productId, sku: e.target.value })
                    }
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
                    value={productId?.name}
                    onChange={(e) =>
                      setProductId({ ...productId, name: e.target.value })
                    }
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
                    value={productId?.description}
                    onChange={(e) =>
                      setProductId({
                        ...productId,
                        description: e.target.value,
                      })
                    }
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
                    value={productId?.category}
                    onChange={(e) =>
                      setProductId({ ...productId, category: e.target.value })
                    }
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
                    value={productId?.quantity}
                    onChange={(e) =>
                      setProductId({ ...productId, quantity: e.target.value })
                    }
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
                    value={productId?.price}
                    onChange={(e) =>
                      setProductId({ ...productId, price: e.target.value })
                    }
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
                    value={productId?.cost}
                    onChange={(e) =>
                      setProductId({ ...productId, cost: e.target.value })
                    }
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
                    value={productId?.discount}
                    onChange={(e) =>
                      setProductId({ ...productId, discount: e.target.value })
                    }
                  />
                </div>
                <p className="text-danger">
                  {errorsEdit?.discountValue?.message}
                </p>
                <div className="form-group">
                  <label className="form-label">
                    Image <span className="text-muted">(select two)</span>
                  </label>
                  <div className="d-flex align-items-end">
                    <input
                      {...registerEdit("image1")}
                      className="form-control image-input"
                      type="file"
                      name="image1"
                      multiple
                      onChange={handleFileChange}
                    />
                    {productId?.images && (
                      <div className="d-flex align-items-end">
                        <LazyLoadImage
                          className="prof-pic ms-3 cursor-pointer"
                          style={{ borderRadius: "50%" }}
                          src={`${productId?.images?.image1}`}
                          onClick={() => setOpen(true)}
                        />

                        <Lightbox
                          open={open}
                          close={() => setOpen(false)}
                          slides={Object.values(productId?.images).map(
                            (image) => {
                              return { src: `${image}` };
                            }
                          )}
                        />
                      </div>
                    )}
                  </div>
                  {imageLengthError && (
                    <p className="text-danger">Please select two images</p>
                  )}
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
