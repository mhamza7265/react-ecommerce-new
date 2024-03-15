import { Bar } from "react-chartjs-2";
import Box from "../components/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
  DashboardWrapperRight,
} from "../components/dashboard-wrapper/DashboardWrapper";
import SummaryBox from "../components/summary-box/SummaryBox";
import { colors } from "../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import OverallList from "../components/overall-list/OverallList";
import { useEffect, useState } from "react";
import sendRequest from "../../utility-functions/apiManager";
// import RevenueList from "../components/revenue-list/RevenueList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
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

  const data = {
    summary: [
      {
        title: "Sales",
        subtitle: "Total sales today",
        value: `${dashboardData?.sales?.salesToday}`,
        percent: dashboardData?.sales?.salesPercentage,
      },
      {
        title: "Orders",
        subtitle: "Total orders today",
        value: dashboardData?.orders?.ordersToday,
        percent: dashboardData?.orders?.ordersPercentage,
      },
      // {
      //     title: 'Revenue',
      //     subtitle: 'Total revenue today',
      //     value: '$678',
      //     percent: 38
      // },
      // {
      //     title: 'Visits',
      //     subtitle: 'Total visits today',
      //     value: '2345',
      //     percent: 55
      // }
    ],
    // revenueSummary: {
    //   title: "Revenue",
    //   value: "$678",
    //   chartData: {
    //     labels: ["May", "Jun", "July", "Aug", "May", "Jun", "July", "Aug"],
    //     data: [300, 300, 280, 380, 200, 300, 280, 350],
    //   },
    // },

    // revenueByChannel: [
    //   {
    //     title: "Direct",
    //     value: 70,
    //   },
    //   {
    //     title: "External search",
    //     value: 40,
    //   },
    //   {
    //     title: "Referal",
    //     value: 60,
    //   },
    //   {
    //     title: "Social",
    //     value: 30,
    //   },
    // ],
    // revenueByMonths: {
    //   labels: [
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "July",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //     "Jan",
    //   ],
    //   data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350],
    // },
  };
  return (
    <DashboardWrapper>
      <h3 className="mb-4">Dashboard</h3>
      <DashboardWrapperMain>
        <div className="row">
          <div className="col-8 col-md-12">
            <div className="row">
              {data.summary.map((item, index) => (
                <div
                  key={`summary-${index}`}
                  className="col-6 col-md-6 col-sm-12 mb-3"
                >
                  <SummaryBox item={item} />
                </div>
              ))}
            </div>
          </div>
          {/* <div className="col-4 hide-md">
            <SummaryBoxSpecial item={data.revenueSummary} />
          </div> */}
        </div>
        <div className="row">
          <div className="col-12">
            <Box>
              <RevenueByMonthsChart />
            </Box>
          </div>
        </div>
      </DashboardWrapperMain>
      <DashboardWrapperRight>
        <div className="title mb">Overall</div>
        <div className="mb">
          <OverallList />
        </div>
        {/* <div className="title mb">Revenue by channel</div>
        <div className="mb">
          <RevenueList />
        </div> */}
      </DashboardWrapperRight>
    </DashboardWrapper>
  );
};

export default Dashboard;

const RevenueByMonthsChart = () => {
  const [salesByMonth, setSalesByMonth] = useState(null);
  useEffect(() => {
    sendRequest("post", "dashboard", undefined, undefined, "admin")
      .then((res) => {
        if (res.status) {
          setSalesByMonth(res.data.salesByMonths);
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
  }, []);
  const data = {
    // revenueSummary: {
    //   title: "Revenue",
    //   value: "$678",
    //   chartData: {
    //     labels: ["May", "Jun", "July", "Aug", "May", "Jun", "July", "Aug"],
    //     data: [300, 300, 280, 380, 200, 300, 280, 350],
    //   },
    // },
    // revenueByChannel: [
    //   {
    //     title: "Direct",
    //     value: 70,
    //   },
    //   {
    //     title: "External search",
    //     value: 40,
    //   },
    //   {
    //     title: "Referal",
    //     value: 60,
    //   },
    //   {
    //     title: "Social",
    //     value: 30,
    //   },
    // ],
    revenueByMonths: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [],
    },
  };

  salesByMonth?.map((item) => {
    data.revenueByMonths.data[item.month - 1] = item.totalGrandTotal;
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: colors.orange,
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };

  const chartData = {
    labels: data.revenueByMonths.labels,
    datasets: [
      {
        label: "Revenue",
        data: data.revenueByMonths.data,
      },
    ],
  };
  return (
    <>
      <div className="title mb">
        Revenue by months :{" "}
        <span style={{ fontWeight: "bold" }}>
          {salesByMonth && salesByMonth[0]?.year}
        </span>
      </div>
      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};
