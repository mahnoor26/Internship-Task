import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function ViewProducts() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const header = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  
  const getData = () => {
    const _params = { page: params.page ?? 1, limit: params.limit ?? 10 };
    if(params?.category){
      _params.category = params.category;
    }
    axios
     .get(`${process.env.REACT_APP_BACKEND_URL}/product/`, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-Type": "multipart/form-data",
        },
        params: _params,
      })
     .then((res) => {
        // console.log(res.data.results);
        setData(res.data.results);
      })
     .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    console.log(selectedValue);
    getData();
    navigate({
      search: createSearchParams({
        category: e.target.value,
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      }).toString(),
    });
  };

  useEffect(() => {
    getData();
    // Include the category parameter only if a category is selected
    if (params.category) {
      setSelectedCategory(params.category);
    }
  }, [searchParams]);
  
  useEffect(() => {
    // Fetch categories when the component mounts
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/category/`, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-Type": "multipart/form-data",
        },
        params: {
          limit: 100,
          page: 1,
        },
      })
      .then((res) => {
        setCategories(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  return (
    <div className="container py-4 px-4">
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <h2 className="mb-3">View Products</h2>
          </div>
          <div className="col-12 col-md-6">
            <FloatingLabel
              controlId="floatingSelectGrid"
              label=" Select Category"
            >
              <Form.Select
                aria-label="Category"
                style={{ maxWidth: "50vw" }}
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Products</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </div>
        </div>
      </div>
      <div className="container mt-4 mb-5">
        <Row xs={1} md={4} className="g-4">
          {data.map((formData) => (
            <Col key={formData.id}>
              <div className="card shadow pt-3 px-1">
                <div className="container services-img mb-0">
                  <img
                    src={formData.image}
                    className="w-100 h-100"
                    alt={formData.name}
                  />
                </div>
                <div className="container my-3">
                  <h5>{formData.name}</h5>
                  <p className="mb-0">{formData.price}/-</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ViewProducts;
