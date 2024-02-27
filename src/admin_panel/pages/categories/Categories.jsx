import { useSelector } from "react-redux";
import CategoryRow from "./CategoryRow";

function Categories() {
  const categories = useSelector((state) => state.categories.categories);
  return (
    <div className="container">
      <h3>Categories</h3>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-sm btn-fill-out btn-block">
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
