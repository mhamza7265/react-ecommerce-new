import NavbarMobileContent from "./NavbarMobileContent";
import NavbarHeaderTop from "./NavbarHeaderTop";
import NavbarHeaderMid from "./NavbarHeaderMid";
import NavbarHeaderBottom from "./NavbarHeaderBottom";
import { useState } from "react";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <header className="header-area header-style-1 header-height-2">
        <div className="mobile-promotion">
          <span>
            Grand opening, <strong>up to 15%</strong> off all items. Only{" "}
            <strong>3 days</strong> left
          </span>
        </div>
        <NavbarHeaderTop />
        <NavbarHeaderMid />
        <NavbarHeaderBottom setactive={setIsActive} isactive={isActive} />
      </header>
      <NavbarMobileContent setactive={setIsActive} isactive={isActive} />
    </>
  );
}

export default Navbar;
