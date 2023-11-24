import React from "react";
import { useState } from "react";
import Header from "../components/UserDashboard/Header";
import Sidebar from "../components/UserDashboard/SideBar";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../components/UserDashboard/DashboardPage";
import Products from "../components/Products/Products";
import ProductsCreation from "../components/Products/ProductsCreation";
import ProductsUpdate from "../components/Products/ProductsUpdate";
import Categories from "../components/Categories/Categories";
import CategoriesCreation from "../components/Categories/CategoriesCreation";
import CategoriesUpdate from "../components/Categories/CategoriesUpdate";

function UserDashboardRoutes() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<ProductsCreation />} />
          <Route path="/products/update/0" element={<ProductsUpdate />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/create" element={<CategoriesCreation />} />
          <Route path="/categories/update/0" element={<CategoriesUpdate />} />
        </Routes>
        {/* <Route path='/about' element={<AboutPage />} />
                <Route path='/services' element={<ServicesPage />} /> */}
      </div>
    </>
  );
}

export default UserDashboardRoutes;
