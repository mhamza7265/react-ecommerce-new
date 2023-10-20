import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function End() {
  return (
    <article className="row align-items-center hover-up">
      <figure className="col-md-4 mb-0">
        <Skeleton
          style={{ borderRadius: "50%", width: "50px", height: "50px" }}
        />
      </figure>
      <div className="col-md-8 mb-0">
        <h6>
          <Skeleton count={2} style={{ width: "50%" }} />
        </h6>
        <Skeleton style={{ width: "30%" }} />
        <Skeleton style={{ width: "40%" }} />
      </div>
    </article>
  );
}

export default End;
