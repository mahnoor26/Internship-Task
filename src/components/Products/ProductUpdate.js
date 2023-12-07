import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, FloatingLabel, Form, ToastContainer } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductUpdate() {
  const id = useParams()?.id ?? "";
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    product_image: "",
  });
  const [categories, setCategories] = useState([]);
  const navi = useNavigate();
  const header = localStorage.getItem("accessToken");

  const onChangeHandle = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  console.log(data.category._id);

  useEffect(() => {
    // Fetch categories when the component mounts
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/category`, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-Type": "multipart/form-data",
        },
        params: {
          limit: 6,
          page: 1,
        },
      })
      .then((res) => {
        setCategories(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch existing product data and update the state
    if (id) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`, {
          headers: {
            Authorization: `Bearer ${header}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const existingProductData = res.data;
          setData(existingProductData);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, []); // Empty dependency array to run the effect only once on mount

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", data.name);
    updatedData.append("description", data.description);
    updatedData.append("price", data.price);
    updatedData.append("category", data.category._id); // Assuming _id is the category identifier
    if (typeof data.product_image === "object") {
      updatedData.append("product_image", data.product_image);
    }

    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/product/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${header}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        toast.success("Product updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navi("/user-dashboard/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, product_image: file });
      document.getElementById("frame").src = URL.createObjectURL(file);
    }
  };
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
                  name="name"
                  placeholder="Product Name"
                  value={data.name}
                  onChange={onChangeHandle}
                />
                <label htmlFor="name">Product Name</label>
              </Form.FloatingLabel>
            </div>
            <div className="col-md">
              <Form.Floating className="mb-3">
                <Form.Control
                  id="Price"
                  type="number"
                  name="price"
                  placeholder="Product Price"
                  value={data.price}
                  onChange={onChangeHandle}
                />
                <label htmlFor="Price">Product Price</label>
              </Form.Floating>
            </div>
          </div>
          <FloatingLabel
            controlId="description"
            label="Product Description"
            name="description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Product Description"
              style={{ height: "100px" }}
              value={data.description}
              onChange={onChangeHandle}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Product Category"
            className="mb-3"
            onChange={onChangeHandle}
          >
            <Form.Select
              aria-label="Select Category"
              value={data.category._id} // Set the value to the ID of the existing category
              onChange={onChangeHandle}
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
              onChange={handleImageChange}
            />
            <br />
            <img
              className="mt-2"
              id="frame"
              src={
                typeof data?.image === "object"
                  ? URL.createObjectURL(data.image)
                  : data.image
              }
              width="150px"
              alt="Preview"
            />
          </div>

          <Button
            className="btn btn-primary px-5 rounded-pill"
            onClick={handleUpdate}
          >
            Update
          </Button>
          {/* <Link to="/user-dashboard/products">
            <Button className="btn btn-primary">Show Data</Button>
          </Link> */}
        </Form>
      </div>
      <ToastContainer />
    </>
  );
}

export default ProductUpdate;
