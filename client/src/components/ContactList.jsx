import React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiUserPlus } from "react-icons/fi";

import ListEntry from "./ListEntry";

const ContactList = ({contacts, setSelectedContact, selectedContact, setShowForm, setEditContactForm, setAddDetailsForm}) => {

    const handleAddContact = () => {
        setShowForm(true);
        setSelectedContact(null);
        setEditContactForm(false);
        setAddDetailsForm(true);
    }

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        setShowForm(false);
        setEditContactForm(false);
    }

  return (
    <div className="contact-list urbanist-extra-light">
      <Offcanvas show={true} placement="start" backdrop={false} scroll={true}>
        <Offcanvas.Header>
            <div>
          <Offcanvas.Title>Contact List</Offcanvas.Title>
          <Button variant='link' className='text-black' onClick={() => handleAddContact()}><FiUserPlus/></Button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {contacts.map((contact, index) => (
              <ListEntry key={index} contact={contact} active={selectedContact?.id === contact.id} onClick={() => handleSelectContact(contact)}/>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ContactList;
