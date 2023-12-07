// HomePageRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import ProductDetails from "../components/HomePage/ProductDetails";

function HomePageRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default HomePageRoutes;

// export const homePageRoutes = createBrowserRouter(
//     createRoutesFromElements(
//         <Route>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/about" element={<AboutPage />} />
//         </Route>
//     ))
