import React, { useContext, useState } from "react";
import SignupBtns from "./SignupBtns";
import { Button, Form, Modal } from "react-bootstrap";
import { UIContext } from "../../context/uiContext";
import SignupPage from "../SignUp/SignupPage";

function SignInModal() {
  const { isSigninModalOpen, handleSignupModal, handleSigninModal, handleSigninBtnsModal} = useContext(UIContext);

  return (
    <>
      <Modal
        show={isSigninModalOpen}
        onHide={()=>{handleSigninModal(false)}}
        backdrop="static"
        keyboard={false}
        id="signupModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Button variant="primary" className="mb-3" onClick={() => handleSignupModal(true)}>
              SignIn as an Admin
            </Button>
            <Button variant="primary" className="mb-3" onClick={() => handleSigninBtnsModal(true)}>
              SignIn as an User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <SignupPage/>
      <SignupBtns/>
    </>
  );
}

export default SignInModal;
