import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

function CategoriesUpdate() {
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
          <h2 className="mb-3">Update Selected Category</h2>

          <Form.FloatingLabel className="mb-3">
            <Form.Control
              id="name"
              type="name"
              placeholder="Category Name"
              //   value={name}
              //   onChange={(e) => setName(e.target.value)}
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
              //   value={description}
              //   onChange={(e) => setDescription(e.target.value)}
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
          {/* <Link to="/user-dashboard/categories">
            <Button className="btn btn-primary">Show Data</Button>
          </Link> */}
        </Form>
      </div>
    </>
  );
}

export default CategoriesUpdate;
