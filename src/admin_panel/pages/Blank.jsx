import React from "react";
import { Outlet } from "react-router";

const Blank = () => {
  return (
    <div>
      This is a blank page
      <Outlet />
    </div>
  );
};

export default Blank;
