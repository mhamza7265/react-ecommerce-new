import BASE_URL from "../../../utility-functions/config";

function ProductsRow({
  id,
  serial,
  sku,
  name,
  description,
  category,
  quantity,
  price,
  discount,
  images,
  deleteProduct,
  setEditProductModalIsOpen,
  setProductId,
}) {
  const handleDeleteClick = () => {
    deleteProduct(id);
  };

  const handleEditClick = () => {
    setProductId(id);
    setEditProductModalIsOpen(true);
  };

  return (
    <tr data={id}>
      <td>{serial + 1}</td>
      <td>{sku}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{discount}%</td>
      <td>
        <img className="category-img" src={BASE_URL + "/" + images[0]} />
      </td>
      <td>
        <img className="category-img" src={BASE_URL + "/" + images[1]} />
      </td>
      <td>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-sm btn-secondary me-1"
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

export default ProductsRow;
