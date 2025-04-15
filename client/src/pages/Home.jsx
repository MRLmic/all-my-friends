import React, { useState } from "react";

import ContactList from "../components/ContactList";
import ContactDetails from "../components/ContactDetails";
import ContactForm from "../components/ContactForm";

import dummyContacts from "./../DummyContactList.json";

const Home = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editContactForm, setEditContactForm] = useState(false);

  return (
    <div className="home mt-5">
      <div className="row">
        <div className="col-md-2">
          <ContactList
            contacts={dummyContacts}
            setSelectedContact={setSelectedContact}
            setShowForm={setShowForm}
            setEditContactForm={setEditContactForm}
          />
        </div>
        <div className="col-md-10">
          {showForm && (
            <ContactForm
              setShowForm={setShowForm}
              editContactForm={editContactForm}
              selectedContact={selectedContact}
            />
          )}
          {!showForm && selectedContact && (
            <ContactDetails
              selectedContact={selectedContact}
              setEditContactForm={setEditContactForm}
              setShowForm={setShowForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
