import NavbarMobileContent from "./NavbarMobileContent";
import NavbarHeaderTop from "./NavbarHeaderTop";
import NavbarHeaderMid from "./NavbarHeaderMid";
import NavbarHeaderBottom from "./NavbarHeaderBottom";
import { useState } from "react";
import { startSpinner, stopSpinner } from "../../redux/reducers/spinnerReducer";
import { addSearchProduct } from "../../redux/reducers/searchedProductsReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import sendRequest from "../../utility-functions/apiManager";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [autoComplete, setAutoComplete] = useState("");
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const autoCompleteSliced = autoComplete?.slice(0, 10);

  const handleSearchSuggestionClick = (e) => {
    const searchValue = e.target.innerHTML;
    setSearch(searchValue);
    setAutoComplete("");
    dispatch(startSpinner());
    sendRequest("post", "products/filter", { products: searchValue }).then(
      (res) => {
        dispatch(stopSpinner());
        dispatch(addSearchProduct(res.filtered));
        setSearch("");
        navigate("/searchedProducts");
      }
    );
  };

  const handleSearchClick = (e) => {
    if (search !== "") {
      setSearchError(false);
      dispatch(startSpinner());
      sendRequest("post", "products/filter", { products: search }).then(
        (res) => {
          dispatch(stopSpinner());
          dispatch(addSearchProduct(res.filtered));
          setSearch("");
          navigate("/searchedProducts");
        }
      );
      setAutoComplete("");
    } else {
      setSearchError(true);
    }
  };

  return (
    <>
      <header className="header-area header-style-1 header-height-2 position-relative">
        <div className="mobile-promotion">
          <span>
            Grand opening, <strong>up to 15%</strong> off all items. Only{" "}
            <strong>3 days</strong> left
          </span>
        </div>
        <NavbarHeaderTop />
        <NavbarHeaderMid
          setAutocomplete={setAutoComplete}
          search={search}
          setSearch={setSearch}
          searchError={searchError}
          setSearchError={setSearchError}
          handleSearchClick={handleSearchClick}
        />
        <NavbarHeaderBottom setactive={setIsActive} isactive={isActive} />
        {autoComplete && (
          <div className="search-Suggestions">
            {autoComplete &&
              autoCompleteSliced?.map((item, i) => (
                <p
                  className="search-suggestion-p"
                  onClick={handleSearchSuggestionClick}
                  key={i}
                >
                  {item}
                </p>
              ))}
          </div>
        )}
      </header>
      <NavbarMobileContent setactive={setIsActive} isactive={isActive} />
    </>
  );
}

export default Navbar;
