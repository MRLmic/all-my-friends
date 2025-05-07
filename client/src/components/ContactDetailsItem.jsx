import React from "react";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'

import ListGroup from "react-bootstrap/ListGroup";

const ContactDetailsItem = ({ label, region, phoneNumber }) => {
    phoneNumber = region === "US" ? formatPhoneNumber(phoneNumber) : formatPhoneNumberIntl(phoneNumber);

  return (
    <div className="col-md-6 mx-auto contact-details-list">
      <ListGroup horizontal className="py-1">
        <ListGroup.Item className="col-3 flex-grow-1 contact-details-item fw-semibold text-start" variant="primary">
          {label}
        </ListGroup.Item>
        <ListGroup.Item className="col flex-grow-0 contact-details-item">
          {region}
        </ListGroup.Item>
        <ListGroup.Item className="col-5 flex-grow-1 contact-details-item">
          <span>{phoneNumber}</span>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ContactDetailsItem;
