import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Categories() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "asc" for ascending, "desc" for descending
  const [sortField, setSortField] = useState("name"); // Default field for sorting
  const header = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const getData = () => {
    const _params = { page: params.page ?? 1, limit: params.limit ?? 10 };
    if (params?.field && params.order) {
      _params.field = params.field;
      _params.order = params.order;
    }

    const sortParams = _params.field
      ? { field: _params.field, order: _params.order }
      : null;

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/category/`, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-Type": "multipart/form-data",
        },
        params: {
          ..._params,
          sortBy: sortParams ? JSON.stringify(sortParams) : undefined,
        },
      })
      .then((res) => {
        console.log(res.data.results);
        setData(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSort = (order, field) => {
    setSortOrder(order);
    setSortField(field);

    navigate({
      search: new URLSearchParams({
        order,
        field,
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      }).toString(),
    });
  };

  useEffect(() => {
    getData(); // Fetch the first 10 products on page 1 initially
  }, [searchParams]);

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
            <th scope="col">
              <span className="px-1">Category Name</span>
              <FontAwesomeIcon
                icon={faArrowUp}
                onClick={() => handleSort("asc", "name")}
              />{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                onClick={() => handleSort("desc", "name")}
              />
            </th>
            <th scope="col">Description</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((formData, index) => (
            <tr key={formData._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={formData.image}
                  alt={formData.name}
                  style={{ maxWidth: "100px" }}
                />
              </td>
              <td>{formData.name}</td>
              <td>{formData.description}</td>
              <td>
                <Link
                  to={`/user-dashboard/categories/update/${formData._id}`}
                  // onClick={() => setEditDataInLocalStorage(formData)}
                >
                  <Button variant="light">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  variant="light"
                  onClick={() => handleDelete(formData._id)}
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
