import Skeleton from "react-loading-skeleton";
import CompareRowSkeleton from "./CompareRowSkeleton";

function CompareSkeleton() {
  return (
    <>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="row path-breadcrumb">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
      <div className="container mb-80 mt-50">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <div>
              <Skeleton style={{ height: "40px", marginBottom: "20px" }} />
              <Skeleton style={{ marginBottom: "30px" }} />
            </div>
            <div className="table-responsive">
              <table className="table text-center table-compare">
                <tbody>
                  <tr className="pr_image">
                    <td className="text-muted font-sm fw-600 font-heading mw-200">
                      "Preview"
                    </td>
                    <td className="text-muted font-sm fw-600 font-heading">
                      "Name"
                    </td>
                    <td className="text-muted font-sm fw-600 font-heading">
                      "Price"
                    </td>
                    <td className="text-muted font-sm fw-600 font-heading">
                      "Rating"
                    </td>
                    <td className="text-muted font-sm fw-600 font-heading">
                      Description
                    </td>
                    <td className="text-muted font-sm fw-600 font-heading">
                      "Stock status"
                    </td>
                    <td className="text-muted font-sm fw-600 font-heading">
                      "Weight"
                    </td>
                    <td className="text-muted font-sm fw-600 font-heading">
                      "Buy now"
                    </td>
                  </tr>
                  <CompareRowSkeleton />
                </tbody>
              </table>
            </div>
            <div className="d-flex"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompareSkeleton;
