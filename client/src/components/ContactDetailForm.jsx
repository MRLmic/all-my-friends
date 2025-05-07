import React from "react";
import { Card, Button, Form } from "react-bootstrap";

import { LuTrash } from "react-icons/lu";

//PhoneInput component prepends country code to phone number automatically (E.164 format)
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";


const ContactDetailForm = ({
  index,
  detail,
  handleDetailChange,
  handleDetailDelete,
  hideDetail,
  showValidation
}) => {
  const { phoneNumber, region, label } = detail;

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleDetailChange(index, { [name]: value });
  };

  const isPhoneValid = isValidPhoneNumber(phoneNumber || '');

  return (
    !hideDetail && (
      <Card className="mt-3">
        <Card.Body>
          <Form.Group className="mb-3" controlId={`label-${index}`}>
            <Form.Label>Label</Form.Label>
            <Form.Control
              required
              type="text"
              name="label"
              value={label}
              onChange={handleChange}
              placeholder="e.g. Mobile, Work"
              isInvalid={showValidation && !label}
              />
              <Form.Control.Feedback type="invalid">
                Label is required
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId={`phone-${index}`}>
            <Form.Label>Phone</Form.Label>
            <PhoneInput
              className={`form-control ${showValidation && !isPhoneValid ? "is-invalid" : ""}`}
              name="phoneNumber"
              value={phoneNumber}
              region={region}
              onChange={(value) =>
                handleDetailChange(index, { phoneNumber: value })
              }
              placeholder="Click flag to change country code"
              defaultCountry="US"
              international
            />
            {!isPhoneValid && showValidation && (
              <div className="invalid-feedback d-block">
                Enter a valid phone number
              </div>
            )}
          </Form.Group>
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
    )
  );
};

export default ContactDetailForm;
