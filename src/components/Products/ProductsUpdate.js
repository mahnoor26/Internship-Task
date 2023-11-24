import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

function ProductsUpdate() {
  const [id, setId] = useState(0);
  //   const [name, setName] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [selectedCategory, setSelectedCategory] = useState("");
  //   const [image, setImage] = useState("");

  //   useEffect(() => {
  //     setId(localStorage.getItem("id"));
  //     setName(localStorage.getItem("name"));
  //     setPrice(localStorage.getItem("price"));
  //     setDescription(localStorage.getItem("description"));
  //     setSelectedCategory(localStorage.getItem("selectedCategory"));
  //     setImage(localStorage.getItem("image"));
  //   }, []);

  //   const navi = useNavigate();

  //   const handleUpdate = (e) => {
  //     e.preventDefault();
  //     axios
  //       .put(`https://63498b7ba59874146b229cfd.mockapi.io/api/crud/${id}`, {
  //         name: name,
  //         price: price,
  //         description: description,
  //   selectedCategory: setSelectedCategory,
  //         image: image,
  //       })
  //       .then(() => {
  //         navi("/read");
  //       });
  //   };

  return (
    <>
      <div className="container p-3">
        <Form className="px-5 py-2">
          <h2 className="mb-3">Update Selected Product</h2>
          <div className="row">
            <div className="col-md">
              <Form.FloatingLabel className="mb-3">
                <Form.Control
                  id="name"
                  type="name"
                  placeholder="Product Name"
                  //   value={name}
                  //   onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Product Name</label>
              </Form.FloatingLabel>
            </div>
            <div className="col-md">
              <Form.Floating className="mb-3">
                <Form.Control
                  id="Price"
                  type="number"
                  placeholder="Product Price"
                  //   value={price}
                  //   onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="Price">Product Price</label>
              </Form.Floating>
            </div>
          </div>
          <FloatingLabel
            controlId="description"
            label="Product Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Product Description"
              style={{ height: "100px" }}
              //   value={description}
              //   onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Product Category"
            className="mb-3"
            // onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <Form.Select aria-label="Product Category">
              <option>Skin Care</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </FloatingLabel>
          <div className="mb-3">
            <label htmlFor="img">Select image:</label>
            <br />
            <input
              type="file"
              id="img"
              name="img"
              accept="image/png, image/jpg, image/jpeg"
              //   value={image}
              // onChange={preview}
            />
            <br />
            <img
              className="mt-2"
              id="frame"
              src=""
              // {setImage ? URL.createObjectURL(Image) : ""}
              width="150px"
              alt="Preview"
            />
          </div>
          <Button
            className="btn btn-primary px-5 rounded-pill"
            // onClick={handleSubmit}
          >
            Update
          </Button>
          {/* <Link to="/user-dashboard/products">
            <Button className="btn btn-primary">Show Data</Button>
          </Link> */}
        </Form>
      </div>
    </>
  );
}

export default ProductsUpdate;
