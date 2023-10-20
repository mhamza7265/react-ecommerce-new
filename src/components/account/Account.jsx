import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import sendRequest, { errorToast } from "../../utility-functions/apiManager";
import { useNavigate } from "react-router-dom";
import OrderList from "./account-component/OrderList";
import AccountSkeleton from "./skeleton-components/AccountSkeleton";

function Account() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  const storedData = localStorage.getItem("current_user");
  const storedToken = JSON.parse(storedData)?.token;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    sendRequest("get", "user/me")
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((err) => console.log(err));
  }, [storedToken]);

  useEffect(() => {
    sendRequest("get", "order")
      .then((res) => {
        setOrders(res.orders);
      })
      .catch((err) => {
        errorToast(err);
      });
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("current_user");
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      {currentUser ? (
        <>
          <div className="page-header breadcrumb-wrap">
            <div className="container">
              {loading ? (
                <div className="row path-breadcrumb">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : (
                <div className="breadcrumb">
                  <a rel="nofollow">
                    <i className="fi-rs-home mr-5"></i>Home
                  </a>
                  <span></span> Pages <span></span> My Account
                </div>
              )}
            </div>
          </div>
          <div className="page-content pt-150 pb-150">
            <div className="container">
              <div className="row">
                <Tabs className="col-lg-10 m-auto">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="dashboard-menu">
                        <TabList className="nav flex-column" role="tablist">
                          <Tab className="nav-item">
                            {loading ? (
                              <Skeleton
                                style={{ height: "50px", width: "100%" }}
                              />
                            ) : (
                              <a
                                className="nav-link active"
                                id="dashboard-tab"
                                aria-controls="dashboard"
                                aria-selected="false"
                              >
                                <i className="fi-rs-settings-sliders mr-10"></i>
                                Dashboard
                              </a>
                            )}
                          </Tab>
                          <Tab className="nav-item">
                            {loading ? (
                              <Skeleton
                                style={{ height: "50px", width: "100%" }}
                              />
                            ) : (
                              <a
                                className="nav-link"
                                id="orders-tab"
                                aria-controls="orders"
                                aria-selected="false"
                              >
                                <i className="fi-rs-shopping-bag mr-10"></i>
                                Orders
                              </a>
                            )}
                          </Tab>
                          <Tab className="nav-item">
                            {loading ? (
                              <Skeleton
                                style={{ height: "50px", width: "100%" }}
                              />
                            ) : (
                              <a
                                className="nav-link"
                                id="track-orders-tab"
                                aria-controls="track-orders"
                                aria-selected="false"
                              >
                                <i className="fi-rs-shopping-cart-check mr-10"></i>
                                Track Your Order
                              </a>
                            )}
                          </Tab>
                          <Tab className="nav-item">
                            {loading ? (
                              <Skeleton
                                style={{ height: "50px", width: "100%" }}
                              />
                            ) : (
                              <a
                                className="nav-link"
                                id="address-tab"
                                aria-controls="address"
                                aria-selected="true"
                              >
                                <i className="fi-rs-marker mr-10"></i>My Address
                              </a>
                            )}
                          </Tab>
                          <Tab className="nav-item">
                            {loading ? (
                              <Skeleton
                                style={{ height: "50px", width: "100%" }}
                              />
                            ) : (
                              <a
                                className="nav-link"
                                id="account-detail-tab"
                                aria-controls="account-detail"
                                aria-selected="true"
                              >
                                <i className="fi-rs-user mr-10"></i>Account
                                details
                              </a>
                            )}
                          </Tab>

                          {loading ? (
                            <Skeleton
                              style={{ height: "50px", width: "100%" }}
                            />
                          ) : (
                            <li className="nav-item">
                              <a
                                href=""
                                onClick={handleLogoutClick}
                                className="nav-link"
                              >
                                <i className="fi-rs-sign-out mr-10"></i>Logout
                              </a>
                            </li>
                          )}
                        </TabList>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="tab-content account dashboard-content pl-50">
                        {loading ? (
                          <div>
                            <Skeleton
                              style={{ height: "50px", width: "100%" }}
                            />
                            <Skeleton
                              style={{ height: "20px", width: "100%" }}
                            />
                          </div>
                        ) : (
                          <>
                            <TabPanel
                              className=""
                              id="dashboard"
                              role="tabpanel"
                              aria-labelledby="dashboard-tab"
                            >
                              <div className="card">
                                <div className="card-header">
                                  <h3 className="mb-0">
                                    {currentUser.firstName?.concat(
                                      " " + currentUser.lastName
                                    )}
                                  </h3>
                                </div>
                                <div className="card-body">
                                  <p>
                                    From your account dashboard. you can easily
                                    check &amp; view your{" "}
                                    <a href={void 0}>recent orders</a>,
                                    <br />
                                    manage your{" "}
                                    <a href={void 0}>
                                      shipping and billing addresses
                                    </a>{" "}
                                    and{" "}
                                    <a href={void 0}>
                                      edit your password and account details.
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel
                              className=""
                              id="orders"
                              role="tabpanel"
                              aria-labelledby="orders-tab"
                            >
                              <div className="card">
                                <div className="card-header">
                                  <h3 className="mb-0">Your Orders</h3>
                                </div>
                                <div className="card-body">
                                  <div className="table-responsive">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th>Order</th>
                                          <th>Date</th>
                                          <th>Status</th>
                                          <th>Total</th>
                                          <th>Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {orders
                                          ? orders.map((item, i) => (
                                              <OrderList
                                                key={i}
                                                prodId={item._id}
                                                total={item.total}
                                                date={item.created}
                                              />
                                            ))
                                          : null}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel
                              className=""
                              id="track-orders"
                              role="tabpanel"
                              aria-labelledby="track-orders-tab"
                            >
                              <div className="card">
                                <div className="card-header">
                                  <h3 className="mb-0">Orders tracking</h3>
                                </div>
                                <div className="card-body contact-from-area">
                                  <p>
                                    To track your order please enter your
                                    OrderID in the box below and press "Track"
                                    button. This was given to you on your
                                    receipt and in the confirmation email you
                                    should have received.
                                  </p>
                                  <div className="row">
                                    <div className="col-lg-8">
                                      <form
                                        className="contact-form-style mt-30 mb-50"
                                        action="#"
                                        method="post"
                                      >
                                        <div className="input-style mb-20">
                                          <label>Order ID</label>
                                          <input
                                            name="order-id"
                                            placeholder="Found in your order confirmation email"
                                            type="text"
                                          />
                                        </div>
                                        <div className="input-style mb-20">
                                          <label>Billing email</label>
                                          <input
                                            name="billing-email"
                                            placeholder="Email you used during checkout"
                                            type="email"
                                          />
                                        </div>
                                        <button
                                          className="submit submit-auto-width"
                                          type="submit"
                                        >
                                          Track
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel
                              className=""
                              id="address"
                              role="tabpanel"
                              aria-labelledby="address-tab"
                            >
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="card mb-3 mb-lg-0">
                                    <div className="card-header">
                                      <h3 className="mb-0">Billing Address</h3>
                                    </div>
                                    <div className="card-body">
                                      <address>
                                        3522 Interstate
                                        <br />
                                        75 Business Spur,
                                        <br />
                                        Sault Ste. <br />
                                        Marie, MI 49783
                                      </address>
                                      <p>New York</p>
                                      <a className="btn-small">Edit</a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="card">
                                    <div className="card-header">
                                      <h5 className="mb-0">Shipping Address</h5>
                                    </div>
                                    <div className="card-body">
                                      <address>
                                        4299 Express Lane
                                        <br />
                                        Sarasota, <br />
                                        FL 34249 USA <br />
                                        Phone: 1.941.227.4444
                                      </address>
                                      <p>Sarasota</p>
                                      <a className="btn-small">Edit</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel
                              className=""
                              id="account-detail"
                              role="tabpanel"
                              aria-labelledby="account-detail-tab"
                            >
                              <div className="card">
                                <div className="card-header">
                                  <h5>Account Details</h5>
                                </div>
                                <div className="card-body">
                                  <p>
                                    Already have an account?{" "}
                                    <a href={void 0}>Log in instead!</a>
                                  </p>
                                  <form method="post" name="enq">
                                    <div className="row">
                                      <div className="form-group col-md-6">
                                        <label>
                                          First Name{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          required=""
                                          className="form-control"
                                          name="name"
                                          type="text"
                                        />
                                      </div>
                                      <div className="form-group col-md-6">
                                        <label>
                                          Last Name{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          required=""
                                          className="form-control"
                                          name="phone"
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>
                                          Display Name{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          required=""
                                          className="form-control"
                                          name="dname"
                                          type="text"
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>
                                          Email Address{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          required=""
                                          className="form-control"
                                          name="email"
                                          type="email"
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>
                                          Current Password{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          required=""
                                          className="form-control"
                                          name="password"
                                          type="password"
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>
                                          New Password{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          required=""
                                          className="form-control"
                                          name="npassword"
                                          type="password"
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label>
                                          Confirm Password{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          required=""
                                          className="form-control"
                                          name="cpassword"
                                          type="password"
                                        />
                                      </div>
                                      <div className="col-md-12">
                                        <button
                                          type="submit"
                                          className="btn btn-fill-out submit font-weight-bold"
                                          name="submit"
                                          value="Submit"
                                        >
                                          Save Change
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </TabPanel>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </>
      ) : (
        <AccountSkeleton />
      )}
      <Footer />
    </div>
  );
}

export default Account;
