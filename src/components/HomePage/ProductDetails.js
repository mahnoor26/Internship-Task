import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const [data, setData] = useState([]);
  const id = useParams()?.id ?? "";

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`, {})
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-center">Product Details</h1>
      <div className="row">
        <div className="col-md-4 p-4">
          <img src={data.image} alt={data.name} style={{ maxWidth: "100%" }} />
        </div>
        <div className="col-md-8 py-4 px-5">
          <h4>{data.name}</h4>
          <p>{data.description}</p>
          <p>
            <b>Price: </b>
            {data.price} pkr
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
