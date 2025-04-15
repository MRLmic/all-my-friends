import React from "react";
import { Offcanvas } from "react-bootstrap";

import ListEntry from "./ListEntry";

const ContactList = () => {
  return (
    <div className="contact-list">
      <Offcanvas show={true} placement={"start"}>
        <Offcanvas.Header>
          <Offcanvas.Title>Contact List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ListEntry />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ContactList;
