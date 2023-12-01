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
          <Modal.Title>Sign In </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto">
          <Form>
            <Button variant="primary" className="my-3 shadow" onClick={() => handleSignupModal(true)}>
              Sign in as an Admin
            </Button>
            <br/>
            <Button variant="primary" className="mt-2 mb-3 shadow" onClick={() => handleSigninBtnsModal(true)}>
              Sign in as an User
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
