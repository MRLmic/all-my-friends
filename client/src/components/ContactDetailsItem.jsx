import React from 'react';

const ContactDetailsItem = ({label, phoneNumber, region}) => {

    return (
        <div>
            {label}
            {phoneNumber}
            {region}
        </div>
    );
};

export default ContactDetailsItem;