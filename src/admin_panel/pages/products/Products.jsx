import ProductsRow from "./ProductsRow";
import { useEffect, useState } from "react";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Products() {
  const categories = useSelector((state) => state.categories.categories);
  const [productsByPage, setProductsByPage] = useState(null);
  const [paginateIsDisabled, setPaginateIsDisabled] = useState(false);
  const [newProductModalIsOpen, setNewProductModalIsOpen] = useState(false);
  const {
    register: registerNew,
    handleSubmit: handleNewProSubmit,
    formState: { errors: errorsNew },
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

  const handlePaginateClick = (e) => {
    const pageNumber = e.target.getAttribute("data");
    setPaginateIsDisabled(true);
    sendRequest("get", `products/listing?page=${pageNumber}`)
      .then((res) => {
        if (res.status) {
          setPaginateIsDisabled(false);
          setProductsByPage(res.products);
          successToast("Products list updated");
        } else {
          setPaginateIsDisabled(false);
          errorToast("Products list could not be updated");
        }
      })
      .catch((err) => {
        setPaginateIsDisabled(false);
        console.log(err);
        errorToast("Internal server error");
      });
  };

  const handlePaginateArrowsClick = (e) => {
    const arrowType = e.target.getAttribute("data");
    if (arrowType == "decrease" && productsByPage?.hasPrevPage) {
      setPaginateIsDisabled(true);
      sendRequest("get", `products/listing?page=${productsByPage?.page - 1}`)
        .then((res) => {
          if (res.status) {
            setPaginateIsDisabled(false);
            setProductsByPage(res.products);
            successToast("Products list updated");
          } else {
            setPaginateIsDisabled(false);
            errorToast("Products list could not be updated");
          }
        })
        .catch((err) => {
          setPaginateIsDisabled(false);
          console.log(err);
          errorToast("Internal server error");
        });
    } else if (arrowType == "increase" && productsByPage?.hasNextPage) {
      setPaginateIsDisabled(true);
      sendRequest("get", `products/listing?page=${productsByPage?.page + 1}`)
        .then((res) => {
          if (res.status) {
            setPaginateIsDisabled(false);
            setProductsByPage(res.products);
            successToast("Products list updated");
          } else {
            setPaginateIsDisabled(false);
            errorToast("Products list could not be updated");
          }
        })
        .catch((err) => {
          setPaginateIsDisabled(false);
          console.log(err);
          errorToast("Internal server error");
        });
    }
  };

  const onNewProductSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.image1[0]);
    formData.append("file", data.image2[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("discount.applicable", true);
    formData.append("discount.discountType", "percent");
    formData.append("discount.discountValue", data.discountValue);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("sku", data.sku);
    formData.append("category", data.category);
    sendRequest("post", "product/add", formData, "formData")
      .then((res) => {
        console.log("prodAdd", res);
        if (res.status) {
          successToast("Product added successfully");
          sendRequest("get", `products/listing?page=${productsByPage.page}`)
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
            sendRequest("get", `products/listing?page=${productsByPage.page}`)
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
          {productsByPage &&
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
              />
            ))}
        </tbody>
      </table>
      <div
        className={`pagination d-flex justify-content-end p-3 bg-white ${
          paginateIsDisabled && "disabled"
        }`}
      >
        <p
          className={`me-1 paginate cursor-pointer paginate-arrow ${
            !productsByPage?.hasPrevPage && "disable"
          }`}
          data={"decrease"}
          onClick={handlePaginateArrowsClick}
        >
          <i className="fas fa-caret-left" data={"decrease"}></i>
        </p>
        {productsByPage &&
          [...Array(productsByPage?.totalPages)].map((item, i) => (
            <p
              className={`me-1 paginate cursor-pointer ${
                productsByPage.page == i + 1 && "active"
              } ${paginateIsDisabled && "disable"}`}
              onClick={handlePaginateClick}
              key={i}
              data={i + 1}
            >
              {i + 1}
            </p>
          ))}
        <p
          className={`me-1 paginate cursor-pointer paginate-arrow ${
            !productsByPage?.hasNextPage && "disable"
          }`}
          data={"increase"}
          onClick={handlePaginateArrowsClick}
        >
          <i className="fas fa-caret-right" data={"increase"}></i>
        </p>
      </div>

      {/*new category modal*/}
      <>
        <Modal
          size="lg"
          className="category-modal"
          centered
          show={newProductModalIsOpen}
          onHide={() => {
            setNewProductModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <Modal.Header style={{ border: "none" }} closeButton>
            <h5>Add New Category</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <form onSubmit={handleNewProSubmit(onNewProductSubmit)}>
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input
                    {...registerNew("sku")}
                    className="form-control"
                    name="sku"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    {...registerNew("name")}
                    className="form-control"
                    name="name"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input
                    {...registerNew("description")}
                    className="form-control"
                    name="description"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    {...registerNew("category")}
                    className="form-control"
                    name="category"
                    type="text"
                  >
                    {categories &&
                      categories.map((item, i) => (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    {...registerNew("quantity")}
                    className="form-control"
                    name="quantity"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input
                    {...registerNew("price")}
                    className="form-control"
                    name="price"
                    type="text"
                  />
                </div>
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
                    {...registerNew("discountValue")}
                    className="form-control"
                    name="discountValue"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image</label>
                  <input
                    {...registerNew("image1")}
                    className="form-control"
                    type="file"
                    name="image1"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image</label>
                  <input
                    {...registerNew("image2")}
                    className="form-control"
                    type="file"
                    name="image2"
                  />
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
    </div>
  );
}

export default Products;
