import React from 'react';

const ListEntry = ({contact}) => {
    const { firstName, lastName } = contact;
    return (
        <div className="list-entry">
            <div>{firstName} {lastName}</div>
        </div>
    );
};

export default ListEntry;