import React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiUserPlus } from "react-icons/fi";

import ListEntry from "./ListEntry";

const ContactList = ({contacts, setSelectedContact, setShowForm, setEditContactForm}) => {

    const handleAddContact = () => {
        setShowForm(true);
        setSelectedContact(null);
        setEditContactForm(false);
    }

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        setShowForm(false);
        setEditContactForm(false);
    }

  return (
    <div className="contact-list">
      <Offcanvas show={true} placement="start" backdrop={false} scroll={true}>
        <Offcanvas.Header>
            <div>
          <Offcanvas.Title>Contact List</Offcanvas.Title>
          <Button variant='link' className='text-black' onClick={() => handleAddContact()}><FiUserPlus/></Button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {contacts.map((contact, index) => (
              <ListEntry key={index} contact={contact} onClick={() => handleSelectContact(contact)}/>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ContactList;
