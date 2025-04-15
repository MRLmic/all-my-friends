import React from "react";

import { Button } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { LuTrash } from "react-icons/lu";

const ContactDetails = ({ selectedContact, setEditContactForm, setShowForm }) => {
  const { firstName, lastName, phone } = selectedContact;

  const handleEditClick = () => {
    setEditContactForm(true);
    setShowForm(true);
  }

  return (
    <div className="contact-details">
      <div>Details</div>
      <div className="d-inline-block">
        <Button variant="outline-info" onClick={() => handleEditClick()}>
          <MdModeEdit className="edit-icon" />
        </Button>
        <Button variant="outline-danger">
          <LuTrash className="delete-icon" />
        </Button>
      </div>
      <div>
        {firstName} {lastName}
      </div>
      <div>{phone}</div>
    </div>
  );
};

export default ContactDetails;
