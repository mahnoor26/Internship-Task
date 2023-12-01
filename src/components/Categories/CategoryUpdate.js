import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function CategoryUpdate() {
  const id = useParams()?.id ?? "";
  const [data, setData] = useState({
    name: "",
    description: "",
    category_image: "",
  });
  const navi = useNavigate();
  const header = localStorage.getItem("accessToken");

  const onChangeHandle = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    // Fetch existing categories data and update the state
    if (id) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/category/${id}`, {
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

    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/category/${id}`, data, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log(data.product_image);
        navi("/user-dashboard/categories");
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
          <h2 className="mb-3">Update Selected Category</h2>
          <Form.FloatingLabel className="mb-3">
            <Form.Control
              id="name"
              type="name"
              name="name"
              placeholder="Category Name"
              value={data.name}
              onChange={onChangeHandle}
            />
            <label htmlFor="name">Category Name</label>
          </Form.FloatingLabel>
          <FloatingLabel
            controlId="description"
            label="Category Description"
            name="description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Category Description"
              style={{ height: "100px" }}
              value={data.description}
              onChange={onChangeHandle}
            />
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
    </>
  );
}

export default CategoryUpdate;
