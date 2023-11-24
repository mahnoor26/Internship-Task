import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { auth, provider } from "./config";
import { signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { UIContext } from "../../context/uiContext";

function SignupBtns({ handleClose }) {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const {isSigninBtnsModalOpen, handleSigninBtnsModal} = useContext(UIContext)

  const handleGoogleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      const userData = {
        userName: data.user.displayName,
        email: data.user.email,
        profilePicture: data.user.photoURL,
        accessToken: data.user.accessToken,
      };
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup/google`,
          userData,
          {
            headers: {},
          }
        )
        .then((res) => {
          toast.success();

          console.log("Sign successful");
          // handleClose();
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
      handleClose();
    });
  };

  const sendOtp = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone);
      setUser(confirmation); // Save the confirmation result
    } catch (e) {
      console.error(e);
    }
  };

  const verifyOtp = async () => {
    try {
      await user.confirm(otp); // Change this line to confirmation.confirm(otp);
      console.log("OTP verified");
      handleClose();
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
        <Modal.Body>
          <Form>
            <button
              type="submit"
              className="btn rounded-pill mb-3 shadow"
              onClick={handleGoogleClick}
              style={{ borderColor: "#000000" }}
            >
              <FontAwesomeIcon icon={faGoogle} style={{ color: "#e22828" }} />
              <span className="px-3">SignIn with Google</span>
            </button>
            <div className="phone-content">
              <div className="phone-input">
                <PhoneInput
                  country={"pakistan"}
                  value={phone}
                  onChange={(phone) => setPhone("+" + phone)}
                  placeholder="Enter your phone number"
                />
                <Button
                  onClick={sendOtp}
                  sx={{ marginTop: "10px" }}
                  variant="contained"
                >
                  Send OTP
                </Button>
                <FormControl
                  sx={{ marginTop: "10px", width: "300px" }}
                  onChange={(e) => setOtp(e.target.value)}
                  variant="outlined"
                  size="small"
                  label="Enter OTP"
                />
                <br />
                <Button
                  onClick={verifyOtp}
                  sx={{ marginTop: "10px" }}
                  variant="contained"
                  color="success"
                >
                  Verify OTP
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignupBtns;
