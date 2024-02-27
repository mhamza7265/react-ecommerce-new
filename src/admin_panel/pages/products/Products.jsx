import { useSelector } from "react-redux";
import ProductsRow from "./ProductsRow";

function Products() {
  const products = useSelector((state) => state.products.products);
  return (
    <div className="container">
      <h3>Products</h3>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-sm btn-fill-out btn-block">
          Add New Products
        </button>
      </div>
      <table className="bg-white">
        <thead>
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
        </thead>
        <tbody>
          {products &&
            products.map((item, i) => (
              <ProductsRow
                key={i}
                serial={i}
                id={item._id}
                sku={item.sku}
                name={item.name}
                description={item.description}
                category={item.category.name}
                quantity={item.quantity}
                price={item.price}
                discount={item.discount.discountValue}
                images={item.images}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
