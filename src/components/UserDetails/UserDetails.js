import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function UserDetails() {
  const [data, setData] = React.useState([]);
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const header = localStorage.getItem("accessToken");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const _params = { page: params.page ?? 1, limit: params.limit ?? 45 };

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
        params: {
          ..._params,
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

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
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
    <>
      <div className="container p-5">
        <h2 className="mb-3">User Details</h2>
        <table className="table container-fluid">
          <thead>
            <tr>
              <th scope="col">Sr</th>
              <th scope="col">Username</th>
              <th scope="col">Email ID</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((formData, index) => (
              <tr key={formData._id}>
                <th scope="row">{index + 1}</th>
                <td>{formData.userName}</td>
                <td>{formData.email}</td>
                <td>{formData.role}</td>
                <td>
                  <Button
                    className="btn-danger"
                    onClick={() => handleDelete(formData._id)}
                    variant="light"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserDetails;
