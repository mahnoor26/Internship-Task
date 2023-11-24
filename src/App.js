import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePageRoutes from "./Routes/HomePageRoutes";
import UIProvider from "./context/uiContext";
import AuthProvider from "./context/authContext";

import UserDashboardRoutes from "./Routes/UserDashboardRoutes";

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <Router>
          <Routes>
            {/* Routes for Home Page */}
            <Route path="/*" element={<HomePageRoutes />} />

            {/* Routes for User Dashboard */}
            <Route path="/user-dashboard/*" element={<UserDashboardRoutes />} />
          </Routes>
        </Router>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
