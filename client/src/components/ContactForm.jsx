import React, { useState } from "react";

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { VscSave } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";

const ContactForm = ({ setShowForm }) => {
  //PhoneInput component prepends country code to phone number automatically (E.164 format)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactData = {
      ...formData,
      phone: phoneNumber,
    };
    console.log("Form Data:", contactData);
  };

  return (
    <div className="contact-form">
      <div className="row mx-auto text-center">
        <div>New Contact</div>
      </div>
      <div className="row">
        <div className="col-md-4 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="input-group py-3">
              <span className="input-group-text">First Name:</span>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group py-3">
              <span className="input-group-text">Last Name:</span>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group py-3">
              <span className="input-group-text">Phone:</span>
              <PhoneInput
                className="form-control"
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="US"
              />
            </div>
            <div style={{ display: 'inline-block', position: 'relative'}}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">Cancel</Tooltip>}
            >
              <Button
                variant="link"
                className="text-black"
                onClick={() => setShowForm(false)}
              >
                <MdOutlineCancel />
              </Button>
            </OverlayTrigger>
            </div>
            <div style={{ display: 'inline-block', position: 'relative'}}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">Save Contact</Tooltip>}
            >
              <Button type="submit" variant="link" className="text-black">
                <VscSave />
              </Button>
            </OverlayTrigger>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
