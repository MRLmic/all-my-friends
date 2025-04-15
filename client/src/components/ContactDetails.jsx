import React from 'react';

import { MdModeEdit } from "react-icons/md";
import { LuTrash } from "react-icons/lu";

const ContactDetails = ({selectedContact}) => {
    const {firstName, lastName, phone} = selectedContact;

    return (
        <div className="contact-details">
            Details
            <MdModeEdit className="edit-icon" />
            <LuTrash className="delete-icon" />
            <div>{firstName} {lastName}</div>
            <div>{phone}</div>
        </div>
    );
};

export default ContactDetails;