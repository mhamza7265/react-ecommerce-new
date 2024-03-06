import "./overall-list.scss";
import { data } from "../../constants";
import { useState, useEffect } from "react";
import sendRequest from "../../../utility-functions/apiManager";

const icons = [
  <i className="bx bx-receipt"></i>,
  <i className="bx bx-user"></i>,
  <i className="bx bx-cube"></i>,
  <i className="bx bx-dollar"></i>,
];

const OverallList = () => {
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    sendRequest("post", "dashboard")
      .then((res) => {
        if (res.status) {
          setDashboardData(res.data);
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
  }, []);
  const overall = [
    {
      value: dashboardData?.orders?.ordersTotal,
      title: "Orders",
    },
    {
      value: dashboardData?.totalUsers,
      title: "Customers",
    },
    {
      value: dashboardData?.totalProducts,
      title: "Products",
    },
    {
      value: dashboardData?.sales?.salesTotal,
      title: "Revenue",
    },
  ];
  return (
    <ul className="overall-list">
      {overall.map((item, index) => (
        <li className="overall-list__item" key={`overall-${index}`}>
          <div className="overall-list__item__icon">{icons[index]}</div>
          <div className="overall-list__item__info">
            <div className="title">{item.value}</div>
            <span>{item.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OverallList;
