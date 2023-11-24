import React from "react";

function Copyright() {
  return (
    <div className="container text-white pb-2 px-4">
      <div className="row align-items-center">
        <div className="col">
          <h6>© 2023 Copyright</h6>
        </div>
        <div className="col">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link text-white">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white">
                FAQ's
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white">
                Terms and Conditions
              </a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Copyright;
