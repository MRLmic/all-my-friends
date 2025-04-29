import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

const ListEntry = ({contact, onClick, active}) => {
    const { firstName, lastName } = contact;

    return (
        <ListGroup variant="flush" >
            <ListGroup.Item action onClick={onClick} active={active}>
                {firstName} {lastName}
            </ListGroup.Item>
        </ListGroup>
    );
};

export default ListEntry;