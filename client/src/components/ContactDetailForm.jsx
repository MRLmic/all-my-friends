import React from "react";
import { Card, Button } from "react-bootstrap";

import { LuTrash } from "react-icons/lu";

//PhoneInput component prepends country code to phone number automatically (E.164 format)
import PhoneInput from "react-phone-number-input";

const ContactDetailForm = ({ index, detail, handleDetailChange, handleDetailDelete, hideDetail }) => {
  const { phoneNumber, region, label } = detail;

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleDetailChange(index, { [name]: value });
  }

  return !hideDetail && (
    <Card className="mt-3">
      <Card.Body>
        <div className="input-group py-3">
          <span className="input-group-text">Label:</span>
          <input
            type="text"
            className="form-control"
            id="label"
            name="label"
            value={label}
            onChange={handleChange}
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
            onChange={(value) => handleDetailChange(index, { phoneNumber: value })}
            defaultCountry="US"
          />
        </div>
        <div className="d-grid gap-2 mb-3">
              <Button
                variant="outline-danger"
                size="lg"
                onClick={handleDetailDelete}
              >
                <LuTrash />
                &nbsp;Delete
              </Button>
            </div>
      </Card.Body>
    </Card>
  );
}


export default ContactDetailForm;
