import React from 'react';

const ListEntry = ({contact, onClick}) => {
    const { firstName, lastName } = contact;
    return (
        <div className="list-entry" onClick={onClick}>
            <div>{firstName} {lastName}</div>
        </div>
    );
};

export default ListEntry;