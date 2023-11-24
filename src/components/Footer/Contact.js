import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function Contact() {
  return (
    <>
      <div className="container text-white px-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="my-3">Get In Touch With Us </h2 >
            <div className="row align-items-start" >
              <div className="col-1 " >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
              </div >
              <div className="col" >
                <h5>Address</h5>
                <p>
                  Vintega Solutions, Inc
                </p>
              </div >
            </div >
            <div className="row align-items-start" >
              <div className="col-1 " >
                <FontAwesomeIcon icon={faPhone} size="lg" />
              </div >
              <div className="col" >
                <h5>Call Us At</h5>
                <p>
                  Telephone: 051-XXXXXXXX
                  <br />
                  WhatsApp: 0300-XXXXXXX
                </p>
              </div >
            </div >
            <div className="row align-items-start" >
              <div className="col-1 " >
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </div >
              <div className="col" >
                <h5>Email Us At</h5>
                <p>vintegaxyz@gmail.com</p>
              </div >
            </div >
          </div >
          <div className="col-md-6" >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.636909183768!2d73.05291561017857!3d33.61472419059641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94ecd77d281b%3A0xdf48ad310e1446f7!2sRaja%20Bazar%20Rawalpindi%2C%20Punjab%2046000%2C%20Pakistan!5e0!3m2!1sen!2s!4v1696760816230!5m2!1sen!2s"
              title="IntroVideo"
              width="100%"
              height="300px"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div >
        </div >
      </div >
    </>
  );
}

export default Contact;
