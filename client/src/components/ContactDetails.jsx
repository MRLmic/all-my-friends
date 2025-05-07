import React from "react";

import { Button } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { TbPhonePlus } from "react-icons/tb";

import ContactDetailsItem from "./ContactDetailsItem";

const ContactDetails = ({
  selectedContact,
  setEditContactForm,
  setShowForm,
  handleAddDetailClick,
  handleDeleteContact
}) => {
  const { firstName, lastName, contactDetails } = selectedContact;

  const handleEditClick = () => {
    setEditContactForm(true);
    setShowForm(true);
  };

  return (
    <div className="contact-details">
      <div className="fw-semibold my-4 h1">
        {firstName} {lastName}
      </div>
      <div className="d-inline-block mb-2">
        <Button
          className="mx-1"
          variant="outline-success"
          onClick={() => handleAddDetailClick()}
        >
          <TbPhonePlus />
        </Button>
        <Button
          className="mx-1"
          variant="outline-info"
          onClick={() => handleEditClick()}
        >
          <MdModeEdit className="edit-icon" />
        </Button>
        <Button className="mx-1" variant="outline-danger" onClick={handleDeleteContact}>
          <LuTrash className="delete-icon" />
        </Button>
      </div>
      <div>
        {contactDetails.map((contactDetail, index) => (
          <ContactDetailsItem
            key={index}
            label={contactDetail.label}
            region={contactDetail.region}
            phoneNumber={contactDetail.phoneNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;
