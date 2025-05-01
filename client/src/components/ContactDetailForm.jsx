import React from "react";
import { Card } from "react-bootstrap";

import PhoneInput from "react-phone-number-input";

const ContactDetailForm = ({ detail, handleDetailEdit }) => {
  const { phoneNumber, region, label } = detail || {};
  //PhoneInput component prepends country code to phone number automatically (E.164 format)
  
  return (
    <Card>
      <Card.Body>
        <div className="input-group py-3">
          <span className="input-group-text">Label:</span>
          <input
            type="text"
            className="form-control"
            id="label"
            name="label"
            value={label}
            onChange={(value) => handleDetailEdit({ label: value })}
          />
        </div>
        <div className="input-group py-3">
          <span className="input-group-text">Phone:</span>
          <PhoneInput
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            region={region}
            onChange={(value) => handleDetailEdit({ phoneNumber: value })}
            defaultCountry="US"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ContactDetailForm;
