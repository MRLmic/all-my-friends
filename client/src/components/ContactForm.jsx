import React from "react";

import { Button } from "react-bootstrap";

const ContactForm = () => {
  return (
    <div className="contact-form ">
      <div className="row mx-auto text-center">
        <div>New Contact</div>
      </div>
      <div className="row">
        <div className="col-md-4 mx-auto">
          <form>
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
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
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
