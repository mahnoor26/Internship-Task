import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

function CategoriesCreation() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const data = useNavigate();

  const header = localStorage.getItem("accessToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked Submit Button");

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/category`,
        {
          category_image: image,
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${header}`,
            "Content-Type": "multipart/form-data", // Important for sending files
          },
        }
      )
      .then((res) => {
        console.log(res);
        data("/user-dashboard/categories");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container p-3">
        <Form className="px-5 py-2">
          <h2 className="mb-3">Create New Category</h2>

          <Form.FloatingLabel className="mb-3">
            <Form.Control
              id="name"
              type="name"
              placeholder="Category Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Categroy Name</label>
          </Form.FloatingLabel>
          <FloatingLabel controlId="description" label="Category Description">
            <Form.Control
              as="textarea"
              placeholder="Category Description"
              className="mb-3"
              style={{ height: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
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
          {/* <Link to="/user-dashboard/Categorys">
            <Button type="submit" className="btn btn-primary">
              Show Data
            </Button>
          </Link> */}
        </Form>
      </div>
    </>
  );
}

export default CategoriesCreation;
