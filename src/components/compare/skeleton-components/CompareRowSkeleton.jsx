import Skeleton from "react-loading-skeleton";

function CompareRowSkeleton() {
  return (
    <tr className="compare-row-parent">
      <td className="row_img">
        <Skeleton style={{ height: "40px", marginBottom: "20px" }} />
      </td>
      <td className="product_name">
        <h6>
          <Skeleton />
        </h6>
      </td>
      <td className="product_price">
        <Skeleton />
      </td>
      <td>
        <div className="rating_wrap">
          <div className="product-rate d-inline-block">
            <div className="product-rating" style={{ width: "90%" }}></div>
          </div>
          <Skeleton />
        </div>
      </td>
      <td className="row_text font-xs">
        <Skeleton count={3} />
      </td>
      <td className="row_stock">
        <span className="stock-status in-stock mb-0">In Stock</span>
      </td>
      <td className="row_weight">
        <Skeleton />
      </td>
      <td className="row_btn">
        <Skeleton />
      </td>
    </tr>
  );
}

export default CompareRowSkeleton;
