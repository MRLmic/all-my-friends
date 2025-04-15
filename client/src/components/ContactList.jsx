import React from "react";
import { Offcanvas } from "react-bootstrap";

import ListEntry from "./ListEntry";

const ContactList = ({contacts, selectContact}) => {
  return (
    <div className="contact-list">
      <Offcanvas show={true} placement="start" backdrop={false} scroll={true}>
        <Offcanvas.Header>
          <Offcanvas.Title>Contact List</Offcanvas.Title>
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
