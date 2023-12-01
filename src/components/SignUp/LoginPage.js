import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CDBBtn } from "cdbreact";
import SignupBtns from "../UserSignIn/SignupBtns";
import axios from "axios";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import { ToastContainer, toast } from "react-toastify";
import DashboardBtn from "../UserDashboard/DashboardBtn";
import SignupPage from "./SignupPage";

function LoginPage({ show, handleClose }) {
  const { isLoginModalOpen, handleLoginModal, handleSignupModal } =
    useContext(UIContext);
    const [token, setToken] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const validateInput = () => {
    const errors = {};

    // Validate the email
    if (
      !user.email?.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      errors.email = "Email must be in proper format";
    }
    // Validate the password
    if (user.password?.length < 8) {
      errors.password = "Password must be atleast 8 characters";
    }

    setValidationErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = validateInput();
    if (isValid) {
      // Submit the form
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/login/admin`, user)
        .then((response) => {
            console.log(response.data);
            toast.success("Successfully Logged In!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            handleLoginModal(false);
           localStorage.setItem("accessToken", response.data.accessToken)
           setUser({ email: "", password: "" });
        //    console.log(token);
                // console.log(response.data.accessToken);
            
            // handleClose(); // Close the login modal
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
            toast.error("Username/Password is not valid ", {
                position: toast.POSITION.TOP_RIGHT,
              });
          console.error("Login error:", error); // Debugging log
            }
        });
    } else {
        toast.error("Fill up the Input Fields correctly", {
            position: toast.POSITION.TOP_RIGHT,
          });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <Modal
        show={isLoginModalOpen}
        onHide={() => handleLoginModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-5 py-4" onSubmit={handleLogin}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="Email"
                name="email"
                type="email"
                placeholder="name@example.com"
                onChange={handleInputChange}
                value={user.email}
                required
              />
              <label htmlFor="Email">Email address</label>
              {validationErrors.email && (
                <span className="text-danger p-0 m-0">
                  {validationErrors.email}
                </span>
              )}
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="Password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
                value={user.password}
                required
              />
              <label htmlFor="Password">Password</label>
              {validationErrors.password && (
                <p className="text-danger m-0 p-0">
                  {validationErrors.password}
                </p>
              )}
            </Form.Floating>
            <div className="d-flex flex-column align-items-center mb-3">
              <CDBBtn
                type="submit"
                color="primary"
                circle
                className="px-5 py-2"
              >
                Login
              </CDBBtn>
              <Form.Text className="text-muted">
                Don't have an Account?
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => handleSignupModal(true)}
                >
                  SignUp
                </button>
              </Form.Text>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
      </>
  );
}

export default LoginPage;
