import Skeleton from "react-loading-skeleton";

function WishlistRowSkeleton() {
  return (
    <tr className="wishlist-item">
      <td className="custome-checkbox pl-30"></td>
      <td className="image product-thumbnail">
        <Skeleton
          style={{ borderRadius: "15px", width: "70px", height: "70px" }}
        />
      </td>
      <td className="product-des product-name">
        <div>
          <Skeleton count={2} style={{ width: "200px" }} />
        </div>
      </td>
      <td className="price" data-title="Price">
        <Skeleton style={{ width: "50px" }} />
      </td>
      <td className="text-center detail-info" data-title="Stock">
        <Skeleton style={{ width: "50px" }} />
      </td>
      <td className="text-right" data-title="Cart">
        <Skeleton style={{ width: "90px", height: "35px" }} />
      </td>
      <td className="action text-center" data-title="Remove">
        <Skeleton style={{ width: "20px" }} />
      </td>
    </tr>
  );
}

export default WishlistRowSkeleton;
