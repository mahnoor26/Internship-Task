import React, { Children, useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CDBBtn } from "cdbreact";
import SignupBtns from "../UserSignIn/SignupBtns";
import axios from "axios";
import { UIContext } from "../../context/uiContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardBtn from "../UserDashboard/DashboardBtn";
import LoginPage from "./LoginPage";

function SignupPage() {
  const { isSignupModalOpen, handleSignupModal, handleLoginModal } =
    useContext(UIContext);

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const validateInput = () => {
    const errors = {};

    // Validate the name
    if (user.userName?.length < 2) {
      errors.userName = "Username must be of atleast 2 characters";
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    const isValid = validateInput();
    if (isValid) {
      // Submit the form
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/admin/signup`, user)
        .then((response) => {
          console.log("Signup successful");
          // handleClose();
          toast.success("Successfully Signed Up!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleLoginModal(true);
          setUser({ userName: "", email: "", password: "" });
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 409) {
            toast.error("User with Email already exits", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          // console.error("Signup error:", error);
        });
    } else {
      toast.error("Fill up the Input Fields correctly", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <Modal
        show={isSignupModalOpen}
        onHide={() => handleSignupModal(false)}
        backdrop="static"
        keyboard={false}
        id="signupModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="px-5 py-4"
            // onSubmit={handleSubmit}
          >
            <Form.Floating className="mb-3">
              <Form.Control
                id="userName"
                name="userName"
                value={user.userName}
                placeholder="Your Name"
                onChange={handleChange}
                type="userName"
                required
              />
              <label htmlFor="userName">Username</label>
              {validationErrors.userName && (
                <p className="text-danger m-0 p-0">
                  {validationErrors.userName}
                </p>
              )}
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="Email"
                type="email"
                name="email"
                value={user.email}
                placeholder="Your Email"
                onChange={handleChange}
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
                type="password"
                name="password"
                value={user.password}
                placeholder="Your Password"
                onChange={handleChange}
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
                onClick={handleSignUp}
              >
                Sign Up
              </CDBBtn>
              <Form.Text className="text-muted">
                Already have an Account?
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => handleLoginModal(true)}
                >
                  Login
                </button>
              </Form.Text>
              {/* <SignupBtns/> */}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
      <LoginPage/>
    </>
  );
}

export default SignupPage;
