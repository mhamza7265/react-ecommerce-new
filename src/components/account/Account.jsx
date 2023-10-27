import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState, useEffect } from "react";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
import { useNavigate } from "react-router-dom";
import OrderList from "./account-component/OrderList";
import AccountSkeleton from "./skeleton-components/AccountSkeleton";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ViewOrderRow from "./account-component/viewOrderRow";
import { useForm } from "react-hook-form";
import { BounceLoader } from "react-spinners";

function Account() {
  const [currentUser, setCurrentUser] = useState("");
  const [orders, setOrders] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const shippingAddress = localStorage.getItem("shippingAddress");
  const storedData = localStorage.getItem("current_user");
  const storedToken = JSON.parse(storedData)?.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const override = {
    display: "block",
    position: "absolute",
    top: "50%",
    right: "110%",
    margin: "0 auto",
    borderColor: "red",
    width: "10px",
    height: "55px",
  };

  useEffect(() => {
    sendRequest("get", "user/me")
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((err) => console.log(err));
  }, [storedToken]);

  useEffect(() => {
    sendRequest("get", "order/me")
      .then((res) => {
        setOrders(res.orders);
      })
      .catch((err) => {
        errorToast(err);
      });
  }, [storedToken]);

  useEffect(() => {
    if (shippingAddress !== "") {
      sendRequest("get", `address/${shippingAddress}`)
        .then((res) => {
          setCurrentAddress(res.address);
        })
        .catch((err) => {
          console.log(err);
        });
    } else return;
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("cartId");
    localStorage.removeItem("cartItem");
    successToast("Logged out!");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleAddressEditClick = () => {
    setAddressModalIsOpen(true);
  };

  const onSubmit = (data) => {
    if (shippingAddress !== "") {
      setLoading(true);
      sendRequest("put", `address/${shippingAddress}`, {
        isDefault: true,
        address: data.billing_address,
        city: data.city,
      })
        .then((res) => {
          setLoading(false);
          successToast(res.message);
          setAddressModalIsOpen(false);
          //fetch current address
          sendRequest("get", `address/${shippingAddress}`)
            .then((res) => {
              setCurrentAddress(res.address);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          setLoading(false);
          errorToast(err);
        });
    } else {
      return;
    }
  };

  return (
    <div>
      <Navbar />
      {currentUser ? (
        <>
          <div className="page-header breadcrumb-wrap">
            <div className="container">
              <div className="breadcrumb">
                <Link to={"/"} rel="nofollow">
                  <i className="fi-rs-home mr-5"></i>Home
                </Link>
                <span></span> Pages <span></span> My Account
              </div>
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
                            <a
                              className="nav-link active"
                              id="dashboard-tab"
                              aria-controls="dashboard"
                              aria-selected="false"
                            >
                              <i className="fi-rs-settings-sliders mr-10"></i>
                              Dashboard
                            </a>
                          </Tab>
                          <Tab className="nav-item">
                            <a
                              className="nav-link"
                              id="orders-tab"
                              aria-controls="orders"
                              aria-selected="false"
                            >
                              <i className="fi-rs-shopping-bag mr-10"></i>
                              Orders
                            </a>
                          </Tab>
                          <Tab className="nav-item">
                            <a
                              className="nav-link"
                              id="track-orders-tab"
                              aria-controls="track-orders"
                              aria-selected="false"
                            >
                              <i className="fi-rs-shopping-cart-check mr-10"></i>
                              Track Your Order
                            </a>
                          </Tab>
                          <Tab className="nav-item">
                            <a
                              className="nav-link"
                              id="address-tab"
                              aria-controls="address"
                              aria-selected="true"
                            >
                              <i className="fi-rs-marker mr-10"></i>My Address
                            </a>
                          </Tab>
                          <Tab className="nav-item">
                            <a
                              className="nav-link"
                              id="account-detail-tab"
                              aria-controls="account-detail"
                              aria-selected="true"
                            >
                              <i className="fi-rs-user mr-10"></i>Account
                              details
                            </a>
                          </Tab>
                          <li className="nav-item">
                            <a
                              href=""
                              onClick={handleLogoutClick}
                              className="nav-link"
                            >
                              <i className="fi-rs-sign-out mr-10"></i>Logout
                            </a>
                          </li>
                        </TabList>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="tab-content account dashboard-content pl-50">
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
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {orders.length > 0 ? (
                                        orders.map((item, i) => (
                                          <OrderList
                                            key={i}
                                            prodId={item._id}
                                            total={item.total}
                                            date={item.created}
                                            setModal={setModalIsOpen}
                                            setOrders={setViewOrder}
                                          />
                                        ))
                                      ) : (
                                        <tr>No orders available</tr>
                                      )}
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
                                  To track your order please enter your OrderID
                                  in the box below and press "Track" button.
                                  This was given to you on your receipt and in
                                  the confirmation email you should have
                                  received.
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
                              <div className="col-lg-12">
                                <div className="card mb-3 mb-lg-0">
                                  <div className="card-header">
                                    <h3 className="mb-0">Address</h3>
                                  </div>
                                  <div className="card-body">
                                    <address>
                                      {currentAddress
                                        ? currentAddress?.address +
                                          "," +
                                          " " +
                                          currentAddress?.city +
                                          "," +
                                          " " +
                                          currentAddress?.state +
                                          " " +
                                          currentAddress?.zipCode
                                        : null}
                                    </address>
                                    <p>{currentAddress?.country}</p>
                                    <a
                                      href={void 0}
                                      className="btn-small"
                                      onClick={handleAddressEditClick}
                                    >
                                      Edit
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 d-none">
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
                                        defaultValue={currentUser.firstName}
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
                                        defaultValue={currentUser.lastName}
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
                                        defaultValue={
                                          currentUser.firstName +
                                          " " +
                                          currentUser.lastName
                                        }
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
                                        defaultValue={currentUser.userEmail}
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
                      </div>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
          <>
            <Modal
              className="custom-modal"
              centered
              show={modalIsOpen}
              onHide={() => setModalIsOpen(false)}
              style={{ zIndex: "9999", padding: 0 }}
            >
              <Modal.Header
                style={{ border: "none" }}
                closeButton
              ></Modal.Header>
              <Modal.Body>
                <table className="table table-wishlist">
                  <thead>
                    <tr className="main-heading">
                      {/* <th className="custome-checkbox start pl-30">
                        <>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="exampleCheckbox11"
                            value=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox11"
                          ></label>
                        </>
                      </th> */}
                      <th scope="col">Product</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewOrder ? (
                      viewOrder.map((item, i) => (
                        <ViewOrderRow
                          key={i}
                          image={item.product.imageUrl}
                          name={item.product.name}
                          price={item.product.price}
                          prodId={item.product._id}
                        />
                      ))
                    ) : (
                      <tr>No item in the cart.</tr>
                    )}
                  </tbody>
                </table>
              </Modal.Body>
            </Modal>
          </>

          {/*Edit Addess Modal*/}
          <>
            <Modal
              className="custom-modal"
              centered
              show={addressModalIsOpen}
              onHide={() => setAddressModalIsOpen(false)}
              style={{ zIndex: "9999", padding: 0 }}
            >
              <Modal.Header
                style={{ border: "none" }}
                closeButton
              ></Modal.Header>
              <Modal.Body>
                <h5 className="mb-4">Edit Address</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="form-group col-lg-6 d-none">
                      <input
                        type="text"
                        required=""
                        name="fname"
                        placeholder="First name *"
                      />
                    </div>
                    <div className="form-group col-lg-6 d-none">
                      <input
                        type="text"
                        required=""
                        name="lname"
                        placeholder="Last name *"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-6">
                      <input
                        {...register("billing_address", {
                          required: "This field is required",
                        })}
                        type="text"
                        name="billing_address"
                        placeholder="Address *"
                        defaultValue={currentAddress?.address}
                      />
                      <p className="text-danger">
                        {errors.billing_address?.message}
                      </p>
                    </div>
                    <div className="form-group col-lg-6">
                      <input
                        {...register("billing_address2")}
                        type="text"
                        name="billing_address2"
                        placeholder="Address line2"
                      />
                      <p className="text-danger">
                        {errors.billing_address2?.message}
                      </p>
                    </div>
                  </div>
                  <div className="row shipping_calculator">
                    <div className="form-group col-lg-6">
                      <input
                        {...register("city", {
                          required: "This field is required",
                        })}
                        type="text"
                        name="city"
                        placeholder="City / Town *"
                        defaultValue={currentAddress?.city}
                      />
                      <p className="text-danger">{errors.city?.message}</p>
                    </div>
                    <div className="form-group col-lg-6">
                      <input
                        {...register("state")}
                        type="text"
                        name="state"
                        placeholder="State *"
                        defaultValue={currentAddress?.state}
                        disabled
                      />
                      <p className="text-danger">{errors.state?.message}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-6">
                      <div className="custom_select">
                        <select
                          className="form-control select-active"
                          {...register("country")}
                          name="country"
                          defaultValue={currentAddress?.country}
                          disabled
                        >
                          <option value="">Select a country *</option>
                          <option value="Aland Islands">Aland Islands</option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="PW">Belau</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">Bolivia</option>
                          <option value="BQ">
                            Bonaire, Saint Eustatius and Saba
                          </option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">
                            British Indian Ocean Territory
                          </option>
                          <option value="VG">British Virgin Islands</option>
                          <option value="BN">Brunei</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo (Brazzaville)</option>
                          <option value="CD">Congo (Kinshasa)</option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CW">CuraÇao</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">Falkland Islands</option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">
                            French Southern Territories
                          </option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GT">Guatemala</option>
                          <option value="GG">Guernsey</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">
                            Heard Island and McDonald Islands
                          </option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="India">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran</option>
                          <option value="IQ">Iraq</option>
                          <option value="IM">Isle of Man</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="CI">Ivory Coast</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JE">Jersey</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">Laos</option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macao S.A.R., China</option>
                          <option value="MK">Macedonia</option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">Micronesia</option>
                          <option value="MD">Moldova</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="ME">Montenegro</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="AN">Netherlands Antilles</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="KP">North Korea</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="PS">Palestinian Territory</option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="QA">Qatar</option>
                          <option value="IE">Republic of Ireland</option>
                          <option value="RE">Reunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russia</option>
                          <option value="RW">Rwanda</option>
                          <option value="ST">São Tomé and Príncipe</option>
                          <option value="BL">Saint Barthélemy</option>
                          <option value="SH">Saint Helena</option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="SX">Saint Martin (Dutch part)</option>
                          <option value="MF">Saint Martin (French part)</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">
                            Saint Vincent and the Grenadines
                          </option>
                          <option value="SM">San Marino</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="RS">Serbia</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">
                            South Georgia/Sandwich Islands
                          </option>
                          <option value="KR">South Korea</option>
                          <option value="SS">South Sudan</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syria</option>
                          <option value="TW">Taiwan</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">Tanzania</option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="United Arab Emirates">
                            United Arab Emirates
                          </option>
                          <option value="United Kingdom">
                            United Kingdom (UK)
                          </option>
                          <option value="US">USA (US)</option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VA">Vatican</option>
                          <option value="VE">Venezuela</option>
                          <option value="VN">Vietnam</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="WS">Western Samoa</option>
                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                        </select>
                      </div>
                      <p className="text-danger">{errors.country?.message}</p>
                    </div>
                    <div className="form-group col-lg-6">
                      <input
                        {...register("zipcode")}
                        type="text"
                        name="zipcode"
                        placeholder="Postcode / ZIP *"
                        defaultValue={currentAddress?.zipCode}
                        disabled
                      />
                      <p className="text-danger">{errors.zipcode?.message}</p>
                    </div>
                  </div>

                  <div className="row d-none">
                    <div className="form-group col-lg-6">
                      <input
                        required=""
                        type="text"
                        name="cname"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <input
                        required=""
                        type="text"
                        name="email"
                        placeholder="Email address *"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-30 d-none">
                    <textarea
                      rows="5"
                      placeholder="Additional information"
                    ></textarea>
                  </div>
                  <div className="form-group d-none">
                    <div className="checkbox">
                      <div className="custome-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkbox"
                          id="createaccount"
                        />
                        <label
                          className="form-check-label label_info"
                          htmlFor="createaccount"
                        >
                          <span>Create an account?</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    id="collapsePassword"
                    className="form-group create-account collapse in"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          required=""
                          type="password"
                          placeholder="Password"
                          name="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ship_detail d-none">
                    <div className="form-group">
                      <div className="chek-form">
                        <div className="custome-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="differentaddress"
                          />
                          <label
                            className="form-check-label label_info"
                            htmlFor="differentaddress"
                          >
                            <span>Ship to a different address?</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      id="collapseAddress"
                      className="different_address collapse in"
                    >
                      <div className="row">
                        <div className="form-group col-lg-6">
                          <input
                            type="text"
                            required=""
                            name="fname"
                            placeholder="First name *"
                          />
                        </div>
                        <div className="form-group col-lg-6">
                          <input
                            type="text"
                            required=""
                            name="lname"
                            placeholder="Last name *"
                          />
                        </div>
                      </div>
                      <div className="row shipping_calculator">
                        <div className="form-group col-lg-6">
                          <input
                            required=""
                            type="text"
                            name="cname"
                            placeholder="Company Name"
                          />
                        </div>
                        <div className="form-group col-lg-6">
                          <div className="custom_select w-100">
                            <select className="form-control select-active">
                              <option value="">Select an option...</option>
                              <option value="AX">Aland Islands</option>
                              <option value="AF">Afghanistan</option>
                              <option value="AL">Albania</option>
                              <option value="DZ">Algeria</option>
                              <option value="AD">Andorra</option>
                              <option value="AO">Angola</option>
                              <option value="AI">Anguilla</option>
                              <option value="AQ">Antarctica</option>
                              <option value="AG">Antigua and Barbuda</option>
                              <option value="AR">Argentina</option>
                              <option value="AM">Armenia</option>
                              <option value="AW">Aruba</option>
                              <option value="AU">Australia</option>
                              <option value="AT">Austria</option>
                              <option value="AZ">Azerbaijan</option>
                              <option value="BS">Bahamas</option>
                              <option value="BH">Bahrain</option>
                              <option value="BD">Bangladesh</option>
                              <option value="BB">Barbados</option>
                              <option value="BY">Belarus</option>
                              <option value="PW">Belau</option>
                              <option value="BE">Belgium</option>
                              <option value="BZ">Belize</option>
                              <option value="BJ">Benin</option>
                              <option value="BM">Bermuda</option>
                              <option value="BT">Bhutan</option>
                              <option value="BO">Bolivia</option>
                              <option value="BQ">
                                Bonaire, Saint Eustatius and Saba
                              </option>
                              <option value="BA">Bosnia and Herzegovina</option>
                              <option value="BW">Botswana</option>
                              <option value="BV">Bouvet Island</option>
                              <option value="BR">Brazil</option>
                              <option value="IO">
                                British Indian Ocean Territory
                              </option>
                              <option value="VG">British Virgin Islands</option>
                              <option value="BN">Brunei</option>
                              <option value="BG">Bulgaria</option>
                              <option value="BF">Burkina Faso</option>
                              <option value="BI">Burundi</option>
                              <option value="KH">Cambodia</option>
                              <option value="CM">Cameroon</option>
                              <option value="CA">Canada</option>
                              <option value="CV">Cape Verde</option>
                              <option value="KY">Cayman Islands</option>
                              <option value="CF">
                                Central African Republic
                              </option>
                              <option value="TD">Chad</option>
                              <option value="CL">Chile</option>
                              <option value="CN">China</option>
                              <option value="CX">Christmas Island</option>
                              <option value="CC">
                                Cocos (Keeling) Islands
                              </option>
                              <option value="CO">Colombia</option>
                              <option value="KM">Comoros</option>
                              <option value="CG">Congo (Brazzaville)</option>
                              <option value="CD">Congo (Kinshasa)</option>
                              <option value="CK">Cook Islands</option>
                              <option value="CR">Costa Rica</option>
                              <option value="HR">Croatia</option>
                              <option value="CU">Cuba</option>
                              <option value="CW">CuraÇao</option>
                              <option value="CY">Cyprus</option>
                              <option value="CZ">Czech Republic</option>
                              <option value="DK">Denmark</option>
                              <option value="DJ">Djibouti</option>
                              <option value="DM">Dominica</option>
                              <option value="DO">Dominican Republic</option>
                              <option value="EC">Ecuador</option>
                              <option value="EG">Egypt</option>
                              <option value="SV">El Salvador</option>
                              <option value="GQ">Equatorial Guinea</option>
                              <option value="ER">Eritrea</option>
                              <option value="EE">Estonia</option>
                              <option value="ET">Ethiopia</option>
                              <option value="FK">Falkland Islands</option>
                              <option value="FO">Faroe Islands</option>
                              <option value="FJ">Fiji</option>
                              <option value="FI">Finland</option>
                              <option value="FR">France</option>
                              <option value="GF">French Guiana</option>
                              <option value="PF">French Polynesia</option>
                              <option value="TF">
                                French Southern Territories
                              </option>
                              <option value="GA">Gabon</option>
                              <option value="GM">Gambia</option>
                              <option value="GE">Georgia</option>
                              <option value="DE">Germany</option>
                              <option value="GH">Ghana</option>
                              <option value="GI">Gibraltar</option>
                              <option value="GR">Greece</option>
                              <option value="GL">Greenland</option>
                              <option value="GD">Grenada</option>
                              <option value="GP">Guadeloupe</option>
                              <option value="GT">Guatemala</option>
                              <option value="GG">Guernsey</option>
                              <option value="GN">Guinea</option>
                              <option value="GW">Guinea-Bissau</option>
                              <option value="GY">Guyana</option>
                              <option value="HT">Haiti</option>
                              <option value="HM">
                                Heard Island and McDonald Islands
                              </option>
                              <option value="HN">Honduras</option>
                              <option value="HK">Hong Kong</option>
                              <option value="HU">Hungary</option>
                              <option value="IS">Iceland</option>
                              <option value="IN">India</option>
                              <option value="ID">Indonesia</option>
                              <option value="IR">Iran</option>
                              <option value="IQ">Iraq</option>
                              <option value="IM">Isle of Man</option>
                              <option value="IL">Israel</option>
                              <option value="IT">Italy</option>
                              <option value="CI">Ivory Coast</option>
                              <option value="JM">Jamaica</option>
                              <option value="JP">Japan</option>
                              <option value="JE">Jersey</option>
                              <option value="JO">Jordan</option>
                              <option value="KZ">Kazakhstan</option>
                              <option value="KE">Kenya</option>
                              <option value="KI">Kiribati</option>
                              <option value="KW">Kuwait</option>
                              <option value="KG">Kyrgyzstan</option>
                              <option value="LA">Laos</option>
                              <option value="LV">Latvia</option>
                              <option value="LB">Lebanon</option>
                              <option value="LS">Lesotho</option>
                              <option value="LR">Liberia</option>
                              <option value="LY">Libya</option>
                              <option value="LI">Liechtenstein</option>
                              <option value="LT">Lithuania</option>
                              <option value="LU">Luxembourg</option>
                              <option value="MO">Macao S.A.R., China</option>
                              <option value="MK">Macedonia</option>
                              <option value="MG">Madagascar</option>
                              <option value="MW">Malawi</option>
                              <option value="MY">Malaysia</option>
                              <option value="MV">Maldives</option>
                              <option value="ML">Mali</option>
                              <option value="MT">Malta</option>
                              <option value="MH">Marshall Islands</option>
                              <option value="MQ">Martinique</option>
                              <option value="MR">Mauritania</option>
                              <option value="MU">Mauritius</option>
                              <option value="YT">Mayotte</option>
                              <option value="MX">Mexico</option>
                              <option value="FM">Micronesia</option>
                              <option value="MD">Moldova</option>
                              <option value="MC">Monaco</option>
                              <option value="MN">Mongolia</option>
                              <option value="ME">Montenegro</option>
                              <option value="MS">Montserrat</option>
                              <option value="MA">Morocco</option>
                              <option value="MZ">Mozambique</option>
                              <option value="MM">Myanmar</option>
                              <option value="NA">Namibia</option>
                              <option value="NR">Nauru</option>
                              <option value="NP">Nepal</option>
                              <option value="NL">Netherlands</option>
                              <option value="AN">Netherlands Antilles</option>
                              <option value="NC">New Caledonia</option>
                              <option value="NZ">New Zealand</option>
                              <option value="NI">Nicaragua</option>
                              <option value="NE">Niger</option>
                              <option value="NG">Nigeria</option>
                              <option value="NU">Niue</option>
                              <option value="NF">Norfolk Island</option>
                              <option value="KP">North Korea</option>
                              <option value="NO">Norway</option>
                              <option value="OM">Oman</option>
                              <option value="PK">Pakistan</option>
                              <option value="PS">Palestinian Territory</option>
                              <option value="PA">Panama</option>
                              <option value="PG">Papua New Guinea</option>
                              <option value="PY">Paraguay</option>
                              <option value="PE">Peru</option>
                              <option value="PH">Philippines</option>
                              <option value="PN">Pitcairn</option>
                              <option value="PL">Poland</option>
                              <option value="PT">Portugal</option>
                              <option value="QA">Qatar</option>
                              <option value="IE">Republic of Ireland</option>
                              <option value="RE">Reunion</option>
                              <option value="RO">Romania</option>
                              <option value="RU">Russia</option>
                              <option value="RW">Rwanda</option>
                              <option value="ST">São Tomé and Príncipe</option>
                              <option value="BL">Saint Barthélemy</option>
                              <option value="SH">Saint Helena</option>
                              <option value="KN">Saint Kitts and Nevis</option>
                              <option value="LC">Saint Lucia</option>
                              <option value="SX">
                                Saint Martin (Dutch part)
                              </option>
                              <option value="MF">
                                Saint Martin (French part)
                              </option>
                              <option value="PM">
                                Saint Pierre and Miquelon
                              </option>
                              <option value="VC">
                                Saint Vincent and the Grenadines
                              </option>
                              <option value="SM">San Marino</option>
                              <option value="SA">Saudi Arabia</option>
                              <option value="SN">Senegal</option>
                              <option value="RS">Serbia</option>
                              <option value="SC">Seychelles</option>
                              <option value="SL">Sierra Leone</option>
                              <option value="SG">Singapore</option>
                              <option value="SK">Slovakia</option>
                              <option value="SI">Slovenia</option>
                              <option value="SB">Solomon Islands</option>
                              <option value="SO">Somalia</option>
                              <option value="ZA">South Africa</option>
                              <option value="GS">
                                South Georgia/Sandwich Islands
                              </option>
                              <option value="KR">South Korea</option>
                              <option value="SS">South Sudan</option>
                              <option value="ES">Spain</option>
                              <option value="LK">Sri Lanka</option>
                              <option value="SD">Sudan</option>
                              <option value="SR">Suriname</option>
                              <option value="SJ">Svalbard and Jan Mayen</option>
                              <option value="SZ">Swaziland</option>
                              <option value="SE">Sweden</option>
                              <option value="CH">Switzerland</option>
                              <option value="SY">Syria</option>
                              <option value="TW">Taiwan</option>
                              <option value="TJ">Tajikistan</option>
                              <option value="TZ">Tanzania</option>
                              <option value="TH">Thailand</option>
                              <option value="TL">Timor-Leste</option>
                              <option value="TG">Togo</option>
                              <option value="TK">Tokelau</option>
                              <option value="TO">Tonga</option>
                              <option value="TT">Trinidad and Tobago</option>
                              <option value="TN">Tunisia</option>
                              <option value="TR">Turkey</option>
                              <option value="TM">Turkmenistan</option>
                              <option value="TC">
                                Turks and Caicos Islands
                              </option>
                              <option value="TV">Tuvalu</option>
                              <option value="UG">Uganda</option>
                              <option value="UA">Ukraine</option>
                              <option value="AE">United Arab Emirates</option>
                              <option value="GB">United Kingdom (UK)</option>
                              <option value="US">USA (US)</option>
                              <option value="UY">Uruguay</option>
                              <option value="UZ">Uzbekistan</option>
                              <option value="VU">Vanuatu</option>
                              <option value="VA">Vatican</option>
                              <option value="VE">Venezuela</option>
                              <option value="VN">Vietnam</option>
                              <option value="WF">Wallis and Futuna</option>
                              <option value="EH">Western Sahara</option>
                              <option value="WS">Western Samoa</option>
                              <option value="YE">Yemen</option>
                              <option value="ZM">Zambia</option>
                              <option value="ZW">Zimbabwe</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-lg-6">
                          <input
                            type="text"
                            name="billing_address"
                            required=""
                            placeholder="Address *"
                          />
                        </div>
                        <div className="form-group col-lg-6">
                          <input
                            type="text"
                            name="billing_address2"
                            required=""
                            placeholder="Address line2"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-lg-6">
                          <input
                            required=""
                            type="text"
                            name="state"
                            placeholder="State / County *"
                          />
                        </div>
                        <div className="form-group col-lg-6">
                          <input
                            required=""
                            type="text"
                            name="city"
                            placeholder="City / Town *"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-lg-6">
                          <input
                            required=""
                            type="text"
                            name="zipcode"
                            placeholder="Postcode / ZIP *"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ width: "max-content" }}
                    className="row ms-auto position-relative"
                  >
                    <BounceLoader
                      color={"#3bb77e"}
                      loading={loading}
                      cssOverride={override}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    <button className="btn btn-fill-out btn-block mt-30 ml-auto">
                      Update <i className="fa fa-refresh"></i>
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </>
        </>
      ) : (
        <AccountSkeleton />
      )}
      <Footer />
    </div>
  );
}

export default Account;
