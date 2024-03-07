import { useEffect, useState } from "react";
import "./sidebar.scss";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../constants";
import sidebarNav from "../../configs/sidebarNav";
import { successToast } from "../../../utility-functions/apiManager";
import { useDispatch } from "react-redux";
import { addCurrentUser } from "../../../redux/reducers/currentUserReducer";

const Sidebar = ({ setRegistrationModalIsOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const closeSidebar = () => {
    document.querySelector(".main__content").style.transform =
      "scale(1) translateX(0)";
    setTimeout(() => {
      document.body.classList.remove("sidebar-open");
      document.querySelector(".main__content").style = "";
    }, 500);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin");
    dispatch(addCurrentUser(null));
    successToast("Logged out!");
    setTimeout(() => {
      navigate("/admin/login");
    }, 1000);
  };

  const handleRegisterModalClick = () => {
    setRegistrationModalIsOpen(true);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={images.logo} alt="" />
        <div className="sidebar-close" onClick={closeSidebar}>
          <i className="bx bx-x"></i>
        </div>
      </div>
      <div className="sidebar__menu">
        {sidebarNav.map((nav, index) => (
          <NavLink
            to={nav.link}
            key={`nav-${index}`}
            className={`sidebar__menu__item`}
            onClick={closeSidebar}
          >
            <div className="sidebar__menu__item__icon">{nav.icon}</div>
            <div className="sidebar__menu__item__txt">{nav.text}</div>
          </NavLink>
        ))}
        <div
          className="sidebar__menu__item cursor-pointer"
          onClick={handleRegisterModalClick}
        >
          <div className="sidebar__menu__item__icon">
            <i className="fa-solid fa-user-plus"></i>
          </div>
          <div className="sidebar__menu__item__txt">Register</div>
        </div>
        <div className="sidebar__menu__item" onClick={handleLogoutClick}>
          <div className="sidebar__menu__item__icon">
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
          <div className="sidebar__menu__item__txt">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
