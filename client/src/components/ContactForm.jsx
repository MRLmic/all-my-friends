import React, { useState } from "react";

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { VscSave } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";
import { TbPhonePlus } from "react-icons/tb";

import ContactDetailForm from "./ContactDetailForm";
import api from "../api/contacts.js";

const ContactForm = ({
  setShowForm,
  editContactForm,
  selectedContact,
  addDetailsForm,
  setAddDetailsForm,
}) => {
  const [contactDetails, setContactDetails] = useState(() => {
    const newDetail = { id: crypto.randomUUID(), phoneNumber: "", region: "", label: "", contactId: selectedContact ? selectedContact.id : 0 };
  
    if (editContactForm && !addDetailsForm) {
      return selectedContact.contactDetails || [];
    } else if (!editContactForm && addDetailsForm) {
      return [newDetail];
    } else if (editContactForm && addDetailsForm) {
      return [...(selectedContact.contactDetails || []), newDetail];
    }
  
    return [];
  });
  
  const [formData, setFormData] = useState({
    firstName: editContactForm ? selectedContact.firstName : "",
    lastName: editContactForm ? selectedContact.lastName : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDetailClick = () => {
    setContactDetails((prevContactDetails) => [
      ...prevContactDetails,
      { label: "", phoneNumber: "", region: "", contactId: selectedContact ? selectedContact.id : 0 }
    ]);
  }

  const handleDetailChange = (index, updatedFields) => {
    console.log('index:', index, 'updatedFields:', updatedFields);
    setContactDetails((prevDetails) =>
      prevDetails.map((detail, i) =>
        i === index ? { ...detail, ...updatedFields } : detail
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactData = {
      ...formData,
      contactDetails: contactDetails,
    };

    editContactForm
      ? handlePutRequest(contactData)
      : handlePostRequest(contactData);
    console.log("Form Data:", contactData);
  };

  const handlePutRequest = (contactData) => {
    const updateContact = async () => {
      try {
        const updatedContact = await api.updateContact(
          selectedContact.id,
          contactData
        );
        console.log("Updated contact:", updatedContact);
      } catch (error) {
        console.error("Could not save updates to contact.", error);
      }
    };
    updateContact();
    console.log("PUT request with data:", contactData);
  };

  const handlePostRequest = (contactData) => {
    const createContact = async () => {
      try {
        const newContact = await api.createContact(contactData);
        console.log("Created contact:", newContact);
      } catch (error) {
        console.error("Could not save new contact.", error);
      }
    };
    createContact();
    console.log("POST request with data:", contactData);
  };

  const handleCancel = () => {
    setShowForm(false);
    setAddDetailsForm(false);
  };

  return (
    <div className="contact-form">
      <div className="row mx-auto text-center">
        <div>{editContactForm ? "Edit" : "Add New"} Contact</div>
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
            <div className="d-grid gap-2 mb-3">
              <Button
                variant="outline-success"
                size="lg"
                onClick={handleAddDetailClick}
              >
                <TbPhonePlus />
                &nbsp;Add New
              </Button>
            </div>
            {contactDetails.map((detail, index) => (
              <ContactDetailForm
                key={detail.id || index}
                index={index}
                detail={detail}
                handleDetailChange={handleDetailChange}
              />
            ))}
            {addDetailsForm && (
              <ContactDetailForm
                key={crypto.randomUUID()}
                addDetailsForm={addDetailsForm}
                handleDetailChange={handleDetailChange}
              ></ContactDetailForm>
            )}
            <div>
              <div className="d-inline-block">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-top" className="button-tooltip">
                      Cancel
                    </Tooltip>
                  }
                >
                  <Button
                    variant="link"
                    className="text-black"
                    onClick={() => handleCancel()}
                  >
                    <MdOutlineCancel />
                  </Button>
                </OverlayTrigger>
              </div>
              <div className="d-inline-block">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-top" className="button-tooltip">
                      Save
                    </Tooltip>
                  }
                >
                  <Button 
                  type="submit" 
                  variant="link" 
                  className="text-black">
                    
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
