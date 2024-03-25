import "./overall-list.scss";
import { useState, useEffect } from "react";
import sendRequest from "../../../utility-functions/apiManager";

const icons = [
  <i key={1} className="bx bx-receipt"></i>,
  <i key={2} className="bx bx-user"></i>,
  <i key={3} className="bx bx-cube"></i>,
  <i key={4} className="bx bx-dollar"></i>,
  <i key={5} className="fa fa-money"></i>,
];

const OverallList = () => {
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    sendRequest("post", "dashboard", undefined, undefined, "admin")
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
    {
      value: dashboardData?.profit,
      title: "Profit",
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
