import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Products() {
  // const [data, setData] = useState([]);

  // const readData = () => {
  //   axios
  //     .get("https://63498b7ba59874146b229cfd.mockapi.io/api/crud")
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //     });
  // };

  // function handleDelete(id) {
  //   axios
  //     .delete(`https://63498b7ba59874146b229cfd.mockapi.io/api/crud/${id}`)
  //     .then(() => {
  //       readData();
  //     });
  // }

  return (
    <>
      <div className="container p-5">
        <h2 className="mb-3">Products Section</h2>
        <Link to="/user-dashboard/products/create">
          <button type="submit" className="btn btn-primary mb-3">
            Create New
          </button>
        </Link>
        {/* <Link to="/create">
          <Button type="submit" variant="primary">
            Create New
          </Button>
        </Link> */}
        <table class="table container-fluid">
          <thead>
            <tr>
              <th scope="col">Sr</th>
              <th scope="col">Product Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          {/* {data.map((formData) => { */}
          {/* return (
              <> */}
          <tbody>
            <tr>
              <th scope="row">{/* {formData.id} */}</th>
              <td>
                {/* {formData.image} */}
                erte
              </td>
              <td>
                {/* {formData.name} */}
                ret
              </td>
              <td>
                {/* {formData.price} */}
                efr
              </td>
              <td>
                {/* {formData.category}  */}
                effea
              </td>
              <td>
                <Link to={`/user-dashboard/products/update/0`}>
                  <Button
                    variant="light"
                    
                    // className="btn"
                    //   onClick={() => {
                    //     setLocalStorage(
                    //       formData.id,
                    //       formData.image,
                    //       formData.name,
                    //       formData.price,
                    //       formData.description
                    //     );
                    //   }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  className="btn-danger"
                  // onClick={() => handleDelete(formData.id)}
                  variant="light"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          </tbody>
          {/* </>
            );
          })} */}
        </table>
      </div>
    </>
  );
}

export default Products;
