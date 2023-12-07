import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { auth, provider } from "./config";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  handleSigninBtnsModal,
} from "firebase/auth";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Button,
  Form,
  FormControl,
  Modal,
  ToastContainer,
} from "react-bootstrap";
// import { toast } from "react-toastify";
import { UIContext } from "../../context/uiContext";
import { toast } from "react-toastify";

function SignupBtns() {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const { isSigninBtnsModalOpen, handleSigninBtnsModal } =
    useContext(UIContext);

  const handleGoogleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data);
      const userData = {
        // email: data.user.email,
        // userName: data.user.displayName,
        token: data._tokenResponse.oauthAccessToken,
      };
      console.log(userData);
      // localStorage.setItem("accessToken", data.accessToken);
      // const header = localStorage.getItem("accessToken");
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/users/user/signup/google`,
          userData
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("access_token", res.data.accessToken);
          toast.success("Successfully Logged In!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.error("API Error:", error);
        });

      // handleClose();
    });
  };

  const sendOtp = async () => {
    try {
      const reCaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, reCaptcha);
      console.log(confirmation);
      setUser(confirmation); // Save the confirmation result
      handleSigninBtnsModal(false);
      toast.success("OTP sent successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("OTP sent successfully");
    } catch (e) {
      console.error(e);
    }
  };

  const verifyOtp = async () => {
    try {
      // console.log(user);
      console.log(otp);
      const data = await user.confirm(otp);
      const userData = {
        token: data.user.accessToken,
      };
      console.log(data.user);
      console.log("OTP verified successfully");

      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/users/user/signup/phone`,
          userData
        )
        .then((res) => {
          console.log(res.data);
          toast.success("OTP verified successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      // handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal
        show={isSigninBtnsModalOpen}
        onHide={() => {
          handleSigninBtnsModal(false);
        }}
        backdrop="static"
        keyboard={false}
        id="signupModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto text-center">
          {/* <Form> */}
          <button
            // type="submit"
            className="btn rounded-pill mb-3 shadow-sm"
            onClick={handleGoogleClick}
            style={{ borderColor: "#000000" }}
          >
            <FontAwesomeIcon icon={faGoogle} style={{ color: "#e22828" }} />
            <span className="px-3">SignIn with Google</span>
          </button>
          <br />
          or
          <br />
          <p className="my-3">Sign In With Phone</p>
          <div className="phone-content">
            <div className="phone-input">
              <PhoneInput
                country={"pk"}
                value={phone}
                onChange={(phone) => setPhone("+" + phone)}
                placeholder="Enter your phone number"
              />
              <Button className="mt-2" onClick={sendOtp} variant="primary">
                Send Code
              </Button>
              <div className="mt-2" id="recaptcha"></div>
              <FormControl
                className="mt-4"
                onChange={(e) => setOtp(e.target.value)}
                size="small"
                placeholder="Enter Verification Code"
              />
              <Button className="mt-2" onClick={verifyOtp} variant="primary">
                Verify Code
              </Button>
            </div>
          </div>
          {/* </Form> */}
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default SignupBtns;
