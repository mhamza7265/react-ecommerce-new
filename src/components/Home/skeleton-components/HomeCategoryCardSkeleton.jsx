import ScrollAnimation from "react-animate-on-scroll";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HomeCategoryCardSkeleton({ id }) {
  return (
    <ScrollAnimation
      animateIn="animate__animated animate__fadeInUp"
      className="card-2 bg-9"
      delay={Number(id)}
      animateOnce={true}
    >
      <Skeleton
        circle
        style={{ borderRadius: "50%", width: "50px", height: "50px" }}
      />
      <Skeleton
        style={{
          marginTop: "30px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <Skeleton style={{ width: "50%", margin: "auto" }} />
    </ScrollAnimation>
  );
}

export default HomeCategoryCardSkeleton;
