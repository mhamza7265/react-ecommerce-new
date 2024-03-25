import { useEffect, useState } from "react";
import "./topnav.scss";
import UserInfo from "../user-info/UserInfo";
import sendRequest from "../../../utility-functions/apiManager";
import userImage from "../../assets/images/user.svg";

const TopNav = () => {
  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    sendRequest("get", "user", undefined, undefined, "admin")
      .then((res) => {
        if (res.status) {
          setUser(res.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="topnav">
      <UserInfo user={user} />
      <div className="sidebar-toggle" onClick={openSidebar}>
        <i className="bx bx-menu-alt-right"></i>
      </div>
    </div>
  );
};

export default TopNav;
