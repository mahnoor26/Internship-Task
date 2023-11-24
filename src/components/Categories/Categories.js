import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Categories() {
  const [data, setData] = useState([]);
  const header = localStorage.getItem("accessToken");

  useEffect(() => {
    readData();
  }, []);
  
  const readData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/category`, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  

  // function handleDelete(id) {
  //   axios
  //     .delete(`${process.env.REACT_APP_BACKEND_URL}/category/${id}`)
  //     .then(() => {
  //       readData();
  //     });
  // }

  return (
    <div className="container p-5">
      <h2 className="mb-3">Categories Section</h2>
      <Link to="/user-dashboard/categories/create">
        <button type="submit" className="btn btn-primary mb-3">
          Create New
        </button>
      </Link>
      <table className="table container-fluid">
        <thead>
          <tr>
            <th scope="col">Sr</th>
            <th scope="col">Category Image</th>
            <th scope="col">Category Name</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((formData) => (
            <tr key={formData.id}>
              <th scope="row">{formData.id}</th>
              <td>{formData.category_image}</td>
              <td>{formData.name}</td>
              <td>{formData.description}</td>
              <td>
                <Link to={`/user-dashboard/categories/update/${formData.id}`}>
                  <Button variant="light">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  variant="light"
                  // onClick={() => handleDelete(formData.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
