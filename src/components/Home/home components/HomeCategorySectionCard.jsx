import ScrollAnimation from "react-animate-on-scroll";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

function HomeCategorySectionCard({ img1, id, name, quantity }) {
  return (
    <ScrollAnimation
      animateIn="animate__animated animate__fadeInUp"
      className="card-2 bg-9"
      delay={Number(id)}
      animateOnce={true}
    >
      <figure className="img-hover-scale overflow-hidden">
        <a href={void 0}>
          <LazyLoadImage src={img1} alt="" />
        </a>
      </figure>
      <h6>
        <a href={void 0}>{name}</a>
      </h6>
      <span>{quantity.length} items</span>
    </ScrollAnimation>
  );
}

export default HomeCategorySectionCard;
