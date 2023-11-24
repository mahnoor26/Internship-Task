import React from "react";
import { Link } from "react-router-dom";

function DashboardBtn() {
  return (
    <>
    <Link to="/user-dashboard" >
      <button
        className="btn btn-primary px-3"
        // onClick={handleDashboardClick}
        style={{ backgroundColor: "#145da0" }}

      >
        Go to Dashboard
      </button>
    </Link>
    </>
  );
}

export default DashboardBtn;
