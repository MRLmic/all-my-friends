import React, {useState} from 'react';

import ContactList from '../components/ContactList';
import ContactDetails from '../components/ContactDetails';
import ContactForm from '../components/ContactForm';

import dummyContacts from './../DummyContactList.json';

const Home = () => {
    const [selectedContact, setSelectedContact] = useState({});
    const [showForm, setShowForm] = useState(false);

    const selectContact = (contact) => {
        console.log("Selected Contact:", contact);
        setSelectedContact(contact);
    }

    return (
        <div className="home mt-5">
            <div className="row">
                <div className="col-md-2">
                    <ContactList contacts={dummyContacts} selectContact={selectContact} setShowForm={setShowForm}/>
                </div>
                <div className="col-md-10">
                    {showForm && <ContactForm />}
                    <ContactDetails selectedContact={selectedContact}/>
                </div>
            </div>
        </div>
    );
};

export default Home;
