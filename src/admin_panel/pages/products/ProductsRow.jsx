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
}) {
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
        <button className="btn btn-sm btn-success">
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </td>
    </tr>
  );
}

export default ProductsRow;
