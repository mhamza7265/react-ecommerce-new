import product21 from "../../assets/imgs/shop/product-2-1.webp";
import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";
import { useState, useEffect } from "react";
import CartItems from "./CartItems";
import sendRequest, {
  errorToast,
  successToast,
} from "../../utility-functions/apiManager";
import { Link, useNavigate } from "react-router-dom";
import CartSkeleton from "./skeleton-components/CartSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { startSpinner, stopSpinner } from "../../redux/reducers/spinnerReducer";
import { updateCart } from "../../redux/reducers/cartReducer";
import { updateCartQuantity } from "../../redux/reducers/cartQuantityReducer";

function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [skeletontime, setSkeletontime] = useState(false);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCart = useSelector((state) => state.cart.cart);
  const cartQuantity = useSelector((state) => state.cartQuantity.quantity);

  console.log("cartItems", cartItems);

  useEffect(() => {
    sendRequest("get", "cart")
      .then((res) => {
        if (res.status) {
          setCartItems(res?.cart[0]?.cartItems[0]);
          dispatch(updateCart(res?.cart[0]));
          const calculation = {
            subTotal: res?.cart[0]?.subTotal,
            discount: res?.cart[0]?.discount,
            grandTotal: res?.cart[0]?.grandTotal,
          };
          setTotal(calculation);
          setTimeout(() => {
            setSkeletontime(true);
          }, 10000);
        } else {
          errorToast(res.error);
          if (res.type == "updatePassword") {
            setTimeout(() => {
              navigate("/updatePw");
            }, 2000);
          } else if (res.type == "loginToContinue") {
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleDeleteClick = (e, quantity) => {
    const id = e.target.closest(".cart-item").getAttribute("data");
    dispatch(startSpinner());
    sendRequest("delete", `cart`, { product: id, quantity })
      .then((res) => {
        if (res.status) {
          dispatch(stopSpinner());
          successToast("Product removed from cart!");
          sendRequest("get", "cart")
            .then((res) => {
              if (res.status) {
                dispatch(updateCart(res.cart[0]));
                setCartItems(res.cart[0].cartItems[0]);
                const calculation = {
                  subTotal: res.cart[0].subTotal,
                  discount: res.cart[0].discount,
                  grandTotal: res.cart[0].grandTotal,
                };
                setTotal(calculation);
                sendRequest("get", "cart/qty")
                  .then((res) => {
                    console.log(res);
                    dispatch(updateCartQuantity(res.quantity));
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                errorToast(res.error);
                if (res.type == "updatePassword") {
                  setTimeout(() => {
                    navigate("/updatePw");
                  }, 2000);
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        dispatch(stopSpinner());
        console.log(err);
      });
  };

  // const handleClearClick = () => {
  //   const cartId = localStorage.getItem("cartId");
  //   dispatch(startSpinner());
  //   sendRequest("delete", `cart/delete/${cartId}`)
  //     .then(() => {
  //       dispatch(stopSpinner());
  //       successToast("Cart has been cleared!");
  //       localStorage.removeItem("cartId");
  //       localStorage.removeItem("cartItem");
  //       setCartItems(null);
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 3000);
  //     })
  //     .catch((err) => {
  //       dispatch(stopSpinner());
  //       errorToast(err);
  //     });
  // };

  // const handleTotalSum = (data) => {};

  // const handleTotalDiff = (data, value) => {};

  return (
    <div>
      <Navbar />
      {cartItems || skeletontime ? (
        <>
          <div className="page-header breadcrumb-wrap">
            <div className="container">
              <div className="breadcrumb">
                <Link to={"/"} rel="nofollow">
                  <i className="fi-rs-home mr-5"></i>Home
                </Link>
                <span></span> Shop
                <span></span> Cart
              </div>
            </div>
          </div>
          <div className="container mb-80 mt-50">
            <div className="row">
              <div className="col-lg-8 mb-40">
                <>
                  <h1 className="heading-2 mb-10">Your Cart</h1>
                  <div className="d-flex justify-content-between">
                    <h6 className="text-body">
                      There {cartQuantity > 1 ? "are" : "is"}{" "}
                      <span className="text-brand">
                        {cartQuantity ? cartQuantity : 0}
                      </span>{" "}
                      product{cartQuantity > 1 ? "s" : ""} in your cart
                    </h6>
                    <h6 className="text-body">
                      {/* <a
                        href={void 0}
                        className="text-muted"
                        onClick={handleClearClick}
                      >
                        <i className="fi-rs-trash mr-5"></i>Clear Cart
                      </a> */}
                    </h6>
                  </div>
                </>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div
                  className="table-responsive shopping-summery"
                  data={currentCart?._id}
                >
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
                        <th scope="col" colSpan="2" className="start pl-30">
                          Product
                        </th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Subtotel</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Total</th>
                        <th scope="col" className="end">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems && Object.keys(cartItems).length > 0 ? (
                        Object.values(cartItems).map((item, i) => (
                          <CartItems
                            key={i}
                            img1={product21}
                            id={item.id}
                            prodId={item.productId}
                            name={item.name}
                            image={item.images[0][0]}
                            price={item.price}
                            del={handleDeleteClick}
                            // setIncrementTotal={handleTotalSum}
                            // setDecrementTotal={handleTotalDiff}
                            cartItems={cartItems}
                            total={item.calculations.subTotal}
                            subTotal={item.calculations.total}
                            quantity={item.quantity}
                            discount={item.calculations.discount}
                            setCartItems={setCartItems}
                            refresh={setRefresh}
                            setTotal={setTotal}
                          />
                        ))
                      ) : (
                        <tr>No item in the cart.</tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="divider-2 mb-30"></div>
                <div className="cart-action d-flex justify-content-between">
                  <Link to={"/"} className="btn ">
                    <i className="fi-rs-arrow-left mr-10"></i>Continue Shopping
                  </Link>
                  {/* {loading ? (
                <Skeleton style={{ width: "180px", height: "40px" }} />
              ) : (
                <a className="btn  mr-10 mb-sm-15">
                  <i className="fi-rs-refresh mr-10"></i>Update Cart
                </a>
              )} */}
                </div>
                {/* <div className="row mt-50">
                  <div className="col-lg-7">
                    <div className="calculate-shiping p-40 border-radius-15 border">
                      <>
                        <h4 className="mb-10">Calculate Shipping</h4>
                        <p className="mb-30">
                          <span className="font-lg text-muted">Flat rate:</span>
                          <strong className="text-brand">5%</strong>
                        </p>
                        <form className="field_form shipping_calculator">
                          <div className="form-row">
                            <div className="form-group col-lg-12">
                              <div className="custom_select">
                                <select className="form-control select-active w-100">
                                  <option value="">United Kingdom</option>
                                  <option value="AX">Aland Islands</option>
                                  <option value="AF">Afghanistan</option>
                                  <option value="AL">Albania</option>
                                  <option value="DZ">Algeria</option>
                                  <option value="AD">Andorra</option>
                                  <option value="AO">Angola</option>
                                  <option value="AI">Anguilla</option>
                                  <option value="AQ">Antarctica</option>
                                  <option value="AG">
                                    Antigua and Barbuda
                                  </option>
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
                                  <option value="BA">
                                    Bosnia and Herzegovina
                                  </option>
                                  <option value="BW">Botswana</option>
                                  <option value="BV">Bouvet Island</option>
                                  <option value="BR">Brazil</option>
                                  <option value="IO">
                                    British Indian Ocean Territory
                                  </option>
                                  <option value="VG">
                                    British Virgin Islands
                                  </option>
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
                                  <option value="CG">
                                    Congo (Brazzaville)
                                  </option>
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
                                  <option value="MO">
                                    Macao S.A.R., China
                                  </option>
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
                                  <option value="AN">
                                    Netherlands Antilles
                                  </option>
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
                                  <option value="PS">
                                    Palestinian Territory
                                  </option>
                                  <option value="PA">Panama</option>
                                  <option value="PG">Papua New Guinea</option>
                                  <option value="PY">Paraguay</option>
                                  <option value="PE">Peru</option>
                                  <option value="PH">Philippines</option>
                                  <option value="PN">Pitcairn</option>
                                  <option value="PL">Poland</option>
                                  <option value="PT">Portugal</option>
                                  <option value="QA">Qatar</option>
                                  <option value="IE">
                                    Republic of Ireland
                                  </option>
                                  <option value="RE">Reunion</option>
                                  <option value="RO">Romania</option>
                                  <option value="RU">Russia</option>
                                  <option value="RW">Rwanda</option>
                                  <option value="ST">
                                    São Tomé and Príncipe
                                  </option>
                                  <option value="BL">Saint Barthélemy</option>
                                  <option value="SH">Saint Helena</option>
                                  <option value="KN">
                                    Saint Kitts and Nevis
                                  </option>
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
                                  <option value="SJ">
                                    Svalbard and Jan Mayen
                                  </option>
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
                                  <option value="TT">
                                    Trinidad and Tobago
                                  </option>
                                  <option value="TN">Tunisia</option>
                                  <option value="TR">Turkey</option>
                                  <option value="TM">Turkmenistan</option>
                                  <option value="TC">
                                    Turks and Caicos Islands
                                  </option>
                                  <option value="TV">Tuvalu</option>
                                  <option value="UG">Uganda</option>
                                  <option value="UA">Ukraine</option>
                                  <option value="AE">
                                    United Arab Emirates
                                  </option>
                                  <option value="GB">
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
                            </div>
                          </div>
                          <div className="form-row row">
                            <div className="form-group col-lg-6">
                              <input
                                required="required"
                                placeholder="State / Country"
                                name="name"
                                type="text"
                              />
                            </div>
                            <div className="form-group col-lg-6">
                              <input
                                required="required"
                                placeholder="PostCode / ZIP"
                                name="name"
                                type="text"
                              />
                            </div>
                          </div>
                        </form>
                      </>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="p-40">
                      <h4 className="mb-10">Apply Coupon</h4>
                      <p className="mb-30">
                        <span className="font-lg text-muted">
                          Using A Promo Code?
                        </span>
                      </p>
                      <form action="#">
                        <div className="d-flex justify-content-between">
                          <input
                            className="font-medium mr-15 coupon"
                            name="Coupon"
                            placeholder="Enter Your Coupon"
                          />
                          <button className="btn">
                            <i className="fi-rs-label mr-10"></i>Apply
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="col-lg-4">
                <div className="border p-md-4 cart-totals ml-30">
                  <div className="table-responsive">
                    <table className="table no-border">
                      <tbody>
                        <tr>
                          <td className="cart_total_label">
                            <h6 className="text-muted">Subtotal</h6>
                          </td>
                          <td className="cart_total_amount">
                            <h4 className="text-brand text-end">
                              ${total?.subTotal?.toFixed()}
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td scope="col" colSpan="2">
                            <div className="divider-2 mt-10 mb-10"></div>
                          </td>
                        </tr>
                        <tr>
                          <td className="cart_total_label">
                            <h6 className="text-muted">Shipping</h6>
                          </td>
                          <td className="cart_total_amount">
                            <h5 className="text-heading text-end">Free</h5>
                          </td>{" "}
                        </tr>{" "}
                        <tr>
                          <td className="cart_total_label">
                            <h6 className="text-muted">Estimate for</h6>
                          </td>
                          <td className="cart_total_amount">
                            <h5 className="text-heading text-end">
                              United Kingdom
                            </h5>
                          </td>{" "}
                        </tr>{" "}
                        <tr>
                          <td className="cart_total_label">
                            <h6 className="text-muted">Discount</h6>
                          </td>
                          <td className="cart_total_amount">
                            <h5 className="text-heading text-end">
                              {`${total.discount} %`}
                            </h5>
                          </td>{" "}
                        </tr>
                        <tr>
                          <td scope="col" colSpan="2">
                            <div className="divider-2 mt-10 mb-10"></div>
                          </td>
                        </tr>
                        <tr>
                          <td className="cart_total_label">
                            <h6 className="text-muted">Total</h6>
                          </td>
                          <td className="cart_total_amount">
                            <h4 className="text-brand text-end">
                              ${total?.grandTotal?.toFixed()}
                            </h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Link to={"/checkout"} className="btn mb-20 w-100">
                    Proceed To CheckOut
                    <i className="fi-rs-sign-out ml-15"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CartSkeleton />
      )}
      <Footer />
    </div>
  );
}

export default Cart;
