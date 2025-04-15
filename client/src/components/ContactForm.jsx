import React, { useState } from "react";

import { Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

const ContactForm = () => {
  //PhoneInput component prepends country code to phone number automatically (E.164 format)
  const [phoneNumber, setPhoneNumber] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
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
              />
            </div>
            <div className="input-group py-3">
              <span className="input-group-text">Last Name:</span>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
              />
            </div>
            <div className="input-group py-3">
              <span className="input-group-text">Phone:</span>
              <PhoneInput
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="US"
              />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
