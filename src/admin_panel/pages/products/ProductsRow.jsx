import { useState } from "react";
import BASE_URL from "../../../utility-functions/config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
  cost,
  images,
  deleteProduct,
  setEditProductModalIsOpen,
  setProductId,
}) {
  const [open, setOpen] = useState(false);
  const handleDeleteClick = () => {
    deleteProduct(id);
  };

  const handleEditClick = () => {
    setProductId({
      id,
      sku,
      name,
      description,
      category,
      quantity,
      price,
      discount,
      cost,
      images: {
        image1: BASE_URL + "/" + images[0],
        image2: BASE_URL + "/" + images[1],
      },
    });
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
      <td>{cost}</td>
      <td>{price}</td>
      <td>{discount}%</td>
      <td>
        <LazyLoadImage
          className="category-img cursor-pointer"
          src={`${BASE_URL}/${images[0]}`}
          onClick={() => setOpen(true)}
        />

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map((image) => {
            return { src: `${BASE_URL}/${image}` };
          })}
        />
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
