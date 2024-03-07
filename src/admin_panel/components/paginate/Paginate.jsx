import { useState } from "react";
import sendRequest, { errorToast } from "../../../utility-functions/apiManager";
import { BounceLoader } from "react-spinners";
import { BarLoader } from "react-spinners";

function Paginate({ endPoint, state, setState, formType, query }) {
  const [paginateIsDisabled, setPaginateIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    position: "absolute",
    top: "100%",
    left: 0,
    margin: "0 auto",
    borderColor: "red",
    width: "100%",
    backgroundColor: "#000",
  };

  const handlePaginateArrowsClick = (e) => {
    const arrowType = e.target.getAttribute("data");
    setPaginateIsDisabled(true);
    setLoading(true);
    sendRequest(
      "get",
      `${
        arrowType == "decrease" && state?.hasPrevPage
          ? `${endPoint}?page=${state?.page - 1}&type=${query}`
          : arrowType == "increase" && state?.hasNextPage
          ? `${endPoint}?page=${state?.page + 1}&type=${query}`
          : null
      }`
    )
      .then((res) => {
        setLoading(false);
        if (res.status) {
          setPaginateIsDisabled(false);
          setState(eval(formType));
        } else {
          setPaginateIsDisabled(false);
          errorToast(`${formType.split(".")[1]} list could not be updated`);
        }
      })
      .catch((err) => {
        setLoading(false);
        setPaginateIsDisabled(false);
        console.log(err);
        errorToast("Internal server error");
      });
  };

  const handlePaginateClick = (e) => {
    const pageNumber = e.target.getAttribute("data");
    setPaginateIsDisabled(true);
    setLoading(true);
    sendRequest("get", `${endPoint}?page=${pageNumber}&type=${query}`)
      .then((res) => {
        setLoading(false);
        if (res.status) {
          setPaginateIsDisabled(false);
          setState(eval(formType));
        } else {
          setPaginateIsDisabled(false);
          errorToast(`${formType.split(".")[1]} list could not be updated`);
        }
      })
      .catch((err) => {
        setLoading(false);
        setPaginateIsDisabled(false);
        console.log(err);
        errorToast("Internal server error");
      });
  };

  return (
    <div
      className={`pagination position-relative d-flex justify-content-end p-3 bg-white ${
        paginateIsDisabled && "disabled"
      }`}
    >
      <BarLoader
        color={"#ffffff"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p
        className={`me-1 paginate cursor-pointer paginate-arrow ${
          !state?.hasPrevPage && "disable"
        }`}
        data={"decrease"}
        onClick={handlePaginateArrowsClick}
      >
        <i className="fas fa-caret-left" data={"decrease"}></i>
      </p>
      {state &&
        [...Array(state?.totalPages)].map((item, i) => (
          <p
            className={`me-1 paginate cursor-pointer ${
              state?.page == i + 1 && "active"
            } ${paginateIsDisabled && "disable"}`}
            onClick={handlePaginateClick}
            key={i}
            data={i + 1}
          >
            {i + 1}
          </p>
        ))}
      <p
        className={`me-1 paginate cursor-pointer paginate-arrow ${
          !state?.hasNextPage && "disable"
        }`}
        data={"increase"}
        onClick={handlePaginateArrowsClick}
      >
        <i className="fas fa-caret-right" data={"increase"}></i>
      </p>
    </div>
  );
}

export default Paginate;
