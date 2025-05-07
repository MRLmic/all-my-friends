import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiUserPlus } from "react-icons/fi";
import { MdEmojiPeople } from "react-icons/md";
import { useDeviceSize } from 'react-device-sizes'


import ListEntry from "./ListEntry";

const ContactList = ({contacts, setSelectedContact, selectedContact, setShowForm, setEditContactForm, setAddDetailsForm}) => {
  const [show, setShow] = useState(true);
  const deviceSizes = useDeviceSize()

  const {
    xsDown, //(max-width: 575.98px)
    onlyXs, //(min-width: 576px) and (max-width: 767.98px)
    xsUp,   //(min-width: 576px)
    smDown, //(max-width: 767.98px)
    onlySm, //(min-width: 768px) and (max-width: 991.98px)
    smUp,   //(min-width: 768px)
    mdDown, //(max-width: 991.98px)
    onlyMd, //(min-width: 992px) and (max-width: 1199.98px)
    mdUp,   //(min-width: 992px)
    lgDown, //(max-width: 1199.98px)
    lgUp    //(min-width: 1200px)
  } = deviceSizes;

  useEffect(() => {
    if (smUp) {
      setShow(true); // Always show Offcanvas for smUp devices
    } else {
      setShow(false); // Allow toggle for smaller devices
    }
  }, [smUp]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        setShow(!smUp ? false : true);
    }

  return (
    <div className="contact-list urbanist-extra-light">
      {smDown && (<Button variant="outline-info" className="open-contacts-button" onClick={show ? handleClose : handleShow}>
        <MdEmojiPeople className="fs-2" />
        Contacts
      </Button>)}
      <Offcanvas show={show} placement="start" backdrop={false} scroll={true} onHide={handleClose} className={smUp ? "d-large-block d-md-block d-sm-block contact-list" : ""}>
        <Offcanvas.Header closeButton={smDown ? true : false}>
            <div>
          <Offcanvas.Title className="m-2">Contact List</Offcanvas.Title>
          <Button variant='link' className='open-contacts-button m-2' onClick={() => handleAddContact()}><FiUserPlus/></Button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {contacts.map((contact, index) => (
              <ListEntry key={index} contact={contact} active={selectedContact?.id === contact.id} onClick={() => handleSelectContact(contact)}/>
            ))}
        </Offcanvas.Body>
        <div className='offcanvas-footer'>
          Favicon by <a href="https://icons8.com/" target="_blank" rel="noopener noreferrer">icons8.com</a>
          </div>
      </Offcanvas>
    </div>
  );
};

export default ContactList;
