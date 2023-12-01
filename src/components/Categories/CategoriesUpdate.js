import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

function CategoriesUpdate() {
  const [id, setId] = useState(0);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setDescription(localStorage.getItem("description"));
    setImage(localStorage.getItem("image"));
  }, []);

  const navi = useNavigate();
  const header = localStorage.getItem("accessToken");

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/category/${id}`, {
        category_image: image,
        name: name,
        description: description,
      },{
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
         console.log(image)
        navi("/user-dashboard/categories");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the file object, not the value
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
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Category Name</label>
          </Form.FloatingLabel>
          <FloatingLabel
            controlId="description"
            label="Category Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Category Description"
              style={{ height: "100px" }}
              value={description}
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
              onChange={(e) => handleImageChange(e)}
            />

            <br />
            <img
              className="mt-2"
              id="frame"
              src={image} // Use the state variable directly
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
        </Form>
      </div>
    </>
  );
}

export default CategoriesUpdate;
