import React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiUserPlus } from "react-icons/fi";

import ListEntry from "./ListEntry";

const ContactList = ({contacts, selectContact, setShowForm}) => {
  return (
    <div className="contact-list">
      <Offcanvas show={true} placement="start" backdrop={false} scroll={true}>
        <Offcanvas.Header>
            <div>
          <Offcanvas.Title>Contact List</Offcanvas.Title>
          <Button variant='link' className='text-black' onClick={() => setShowForm(true)}><FiUserPlus/></Button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {contacts.map((contact, index) => (
              <ListEntry key={index} contact={contact} onClick={() => selectContact(contact)}/>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ContactList;
