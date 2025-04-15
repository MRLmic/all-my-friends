import React, { useState, useEffect } from "react";

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { VscSave } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";

const ContactForm = ({ setShowForm, editContactForm, selectedContact }) => {
  //PhoneInput component prepends country code to phone number automatically (E.164 format)
  const [phoneNumber, setPhoneNumber] = useState( editContactForm ? selectedContact.phone : "" );
  const [formData, setFormData] = useState({
    firstName: editContactForm ? selectedContact.firstName : "",
    lastName: editContactForm ? selectedContact.lastName : "",
  });

    useEffect(() => {
    if (selectedContact) {
      setFormData({
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
      });
      setPhoneNumber(selectedContact.phone);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
      });
      setPhoneNumber("");
    }}, [selectedContact]);

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
        <div>{editContactForm ? 'Edit' : 'Add New'} Contact</div>
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
            <div>
              <div className='d-inline-block'>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip-top" className='button-tooltip'>Cancel</Tooltip>}
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
              <div className='d-inline-block'>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip-top" className='button-tooltip'>Save</Tooltip>}
                >
                  <Button type="submit" variant="link" className="text-black">
                    <VscSave />
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
