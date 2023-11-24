import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

function ViewProducts() {
  return (
    <div>
      <div className="container py-4 px-4">
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 col-md-6">
              <h2 className="mb-3">View Products</h2>
            </div>
            <div className="col-12 col-md-6">
              <FloatingLabel
                controlId="floatingSelectGrid"
                label=" Select Category"
                // className="mb-2"
                // onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <Form.Select
                  aria-label="Category"
                  style={{maxWidth: "50vw"}}
                  //   style={{ width: "18rem" }}
                >
                  <option>All Products</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </FloatingLabel>
            </div>
          </div>
        </div>
        <div className="container mt-4 mb-5">
          <div className="row">
            <div className="col-xs-5 col-sm-6 col-lg-3 mt-2">
              <div className="card shadow">
                <div className="container services-img mb-2">
                  <img />
                </div>
                <div className="container mb-2 ">
                  <h5>Product Name</h5>
                  <p>Price</p>
                </div>
              </div>
            </div>
            <div className="col-xs-5 col-sm-6 col-lg-3  mt-2">
              <div className="card shadow">
                <div className="container services-img mb-2">
                  {/* <img /> */}
                </div>
                <div className="container mb-2 ">
                  <h5>Product Name</h5>
                  <p>Price</p>
                </div>
              </div>
            </div>
            <div className="col-xs-5 col-sm-6 col-lg-3  mt-2">
              <div className="card shadow">
                <div className="container services-img mb-2">
                  <img />
                </div>
                <div className="container mb-2 ">
                  <h5>Product Name</h5>
                  <p>Price</p>
                </div>
              </div>
            </div>
            <div className=" col-xs-5 col-sm-6 col-lg-3 mt-2">
              <div className="card shadow">
                <div className="container services-img mb-2">
                  {/* <img /> */}
                </div>
                <div className="container mb-2 ">
                  <h5>Product Name</h5>
                  <p>Price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
