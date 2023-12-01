import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

function ProductsCreation() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const data = useNavigate();

  const header = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch categories when the component mounts
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/category`, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-Type": "multipart/form-data", // Important for sending files
        },
        params: {
          limit: 6,
          page: 1,
        },
      })
      .then((res) => setCategories(res.data.results))
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked Submit Button");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/product`,
        {
          name: name,
          price: price,
          description: description,
          product_image: image,
          category: selectedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${header}`,
            "Content-Type": "multipart/form-data", // Important for sending files
          },
        }
      )
      .then(() => {
        data("/user-dashboard/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container p-3">
        <Form className="px-5 py-2">
          <h2 className="mb-3">Create New Product</h2>
          <div className="row">
            <div className="col-md">
              <Form.FloatingLabel className="mb-3">
                <Form.Control
                  id="name"
                  type="name"
                  placeholder="Product Name"
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="Price">Product Price</label>
              </Form.Floating>
            </div>
          </div>
          <FloatingLabel controlId="description" label="Product Description">
            <Form.Control
              as="textarea"
              placeholder="Product Description"
              className="mb-3"
              style={{ height: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Product Category"
            className="mb-3"
          >
            <Form.Select
              aria-label="Select Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
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
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
              }}
            />
            <br />
            {image && (
              <img
                className="mt-2"
                id="frame"
                src={URL.createObjectURL(image)}
                width="150px"
                height="150px"
                alt="Preview"
              />
            )}
          </div>
          <Button
            type="submit"
            className="btn btn-primary px-5 rounded-pill"
            onClick={handleSubmit}
          >
            Create
          </Button>
          {/* <Link to="/user-dashboard/products">
            <Button type="submit" className="btn btn-primary">
              Show Data
            </Button>
          </Link> */}
        </Form>
      </div>
    </>
  );
}

export default ProductsCreation;
