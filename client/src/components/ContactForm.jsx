import React, { useState } from "react";

import { Button, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import { VscSave } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";
import { TbPhonePlus } from "react-icons/tb";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

import ContactDetailForm from "./ContactDetailForm";
import ConfirmationModal from "./ConfirmCancelModal";
import api from "../api/contacts.js";

const ContactForm = ({
  setShowForm,
  editContactForm,
  selectedContact,
  addDetailsForm,
  setAddDetailsForm,
  handleAddUpdateSuccess,
}) => {
  const [contactDetails, setContactDetails] = useState(() => {
    const newDetail = {
      phoneNumber: "",
      region: "",
      label: "",
      contactId: selectedContact ? selectedContact.id : 0,
    };

    if (editContactForm && !addDetailsForm) {
      return selectedContact.contactDetails || [];
    } else if (!editContactForm && addDetailsForm) {
      return [newDetail];
    } else if (editContactForm && addDetailsForm) {
      return [...(selectedContact.contactDetails || []), newDetail];
    }

    return [];
  });

  const [detailsForDelete, setDetailsForDelete] = useState([]);

  const [formData, setFormData] = useState({
    firstName: editContactForm ? selectedContact.firstName : "",
    lastName: editContactForm ? selectedContact.lastName : "",
  });

  const [validated, setValidated] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showModal, setShowModal] = useState(false);



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
      {
        label: "",
        phoneNumber: "",
        region: "",
        contactId: selectedContact ? selectedContact.id : 0,
      },
    ]);
  };

  const handleDetailChange = (index, updatedFields) => {
    setContactDetails((prevDetails) =>
      prevDetails.map((detail, i) =>
        i === index ? { ...detail, ...updatedFields } : detail
      )
    );
  };

  const handleDetailDelete = (index) => {
    if (contactDetails.length === 1) {
      setShowModal(true);
      return;
    }
    if (contactDetails[index].id === null || contactDetails[index].id === undefined) {
      setContactDetails((prevDetails) =>
        prevDetails.filter((_, i) => i !== index)
      );
    } else {
      setDetailsForDelete((prevDetails) => [
        ...prevDetails,
        contactDetails[index].id,
      ]);
    }
  };

  const handleConfirmModal = () => {
    setShowModal(false);
    handleCancel(); 
  };

  const handleCancelModal = () => {
    setShowModal(false); 
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    setValidated(true);
    setShowValidation(true);
    const updatedContactDetails = contactDetails.filter(
      (detail) => !detailsForDelete.includes(detail.id)
    );

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }

    for (let detail of updatedContactDetails) {
      if (
        !detail.label ||
        !detail.phoneNumber ||
        !isValidPhoneNumber(detail.phoneNumber)
      ) {
        return;
      }
    }

    for (let detail of updatedContactDetails) {
      const phoneData = parsePhoneNumber(detail.phoneNumber || '');
      if (phoneData) {
        detail.region = phoneData.country || '';
      }
    }

    const contactData = {
      ...formData,
      contactDetails: updatedContactDetails,
    };

    const updateContactData = {
      contact: {
        ...formData,
        contactDetails: updatedContactDetails,
      },
      detailsForDelete: detailsForDelete,
    };

    editContactForm
      ? handlePutRequest(updateContactData)
      : handlePostRequest(contactData);
  };

  const handlePutRequest = (contactData) => {
    const updateContact = async () => {
      try {
        const updatedContact = await api.updateContact(
          selectedContact.id,
          contactData
        );
        handleAddUpdateSuccess(updatedContact);
      } catch (error) {
        console.error("Could not save updates to contact.", error);
      }
    };
    updateContact();
  };

  const handlePostRequest = (contactData) => {
    const createContact = async () => {
      try {
        const newContact = await api.createContact(contactData);
        handleAddUpdateSuccess(newContact);
      } catch (error) {
        console.error("Could not save new contact.", error);
      }
    };
    createContact();
  };

  const handleCancel = () => {
    setShowForm(false);
    setAddDetailsForm(false);
    setDetailsForDelete([]);
  };

  return (
    <div className="contact-form">
      <div className="row mx-auto text-center">
        <div className="fw-semibold my-4 h1">{editContactForm ? "Edit" : "Add New"} Contact</div>
      </div>
      <div className="row">
        <div className="col-md-4 mx-auto">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </Form.Group>
            <div className="d-grid gap-2 mb-3">
              <Button
                variant="outline-success"
                size="lg"
                onClick={handleAddDetailClick}
                className="button-submit"
              >
                <TbPhonePlus />
                &nbsp;Add New
              </Button>
            </div>
            <ConfirmationModal
              show={showModal}
              onConfirm={handleConfirmModal}
              onCancel={handleCancelModal}
            />
            {contactDetails.map((detail, index) => (
              <ContactDetailForm
                key={detail.id || index}
                index={index}
                detail={detail}
                hideDetail={detailsForDelete.includes(detail.id)}
                handleDetailChange={handleDetailChange}
                handleDetailDelete={() => handleDetailDelete(index)}
                isValidated={validated}
                setValidated={setValidated}
                showValidation={showValidation}
              />
            ))}
            <div>
              <div className="d-inline-block m-3">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-top" className="button-tooltip">
                      Cancel
                    </Tooltip>
                  }
                >
                  <Button
                    size="lg"
                    variant="outline-danger"
                    onClick={() => handleCancel()}
                    className="button-cancel"
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
                  <Button type="submit" variant="outline-success" size="lg" className="button-submit">
                    <VscSave />
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
