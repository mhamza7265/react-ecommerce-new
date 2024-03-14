import "./user-info.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const UserInfo = ({ user, image }) => {
  return (
    <div className="user-info">
      <div className="user-info__img">
        <LazyLoadImage src={image} alt="" />
        {/* <i className="fa fa-user"></i> */}
      </div>
      <div className="user-info__name">
        <span>{user?.first_name + " " + user?.last_name}</span>
      </div>
    </div>
  );
};

export default UserInfo;
