import React, { useState, useEffect } from "react";

import ContactList from "../components/ContactList";
import ContactDetails from "../components/ContactDetails";
import ContactForm from "../components/ContactForm";
import api from "../api/contacts.js";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [addDetailsForm, setAddDetailsForm] = useState(false);
  const [editContactForm, setEditContactForm] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await api.getContacts();
      setContacts(data);
      console.log("Fetched contacts:", data);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  const handleAddUpdateSuccess = (savedContact) => {
    setSelectedContact(savedContact);
    fetchContacts();
    setShowForm(false);
    setAddDetailsForm(false);
    setEditContactForm(false);
  }

  const handleAddDetailClick = () => {
    setShowForm(true);
    setAddDetailsForm(true);
    setEditContactForm(true);
  }

  const handleDeleteContact = async () => {
    try {
      await api.deleteContact(selectedContact.id);
      fetchContacts();
      setSelectedContact(null);
    } catch (error) {
      console.error("Failed to delete contact", error);
    }
  }

  return (
    <div className="home mt-5">
      <div className="row">
        <div className="col-md-2">
          <ContactList
            contacts={contacts}
            setSelectedContact={setSelectedContact}
            selectedContact={selectedContact}
            setShowForm={setShowForm}
            setEditContactForm={setEditContactForm}
            setAddDetailsForm={setAddDetailsForm}
          />
        </div>
        <div className="col-md-10">
          {showForm && (
            <ContactForm
              setShowForm={setShowForm}
              editContactForm={editContactForm}
              selectedContact={selectedContact}
              addDetailsForm={addDetailsForm}
              setAddDetailsForm={setAddDetailsForm}
              handleAddDetailClick={handleAddDetailClick}
              handleAddUpdateSuccess={handleAddUpdateSuccess}
            />
          )}
          {!showForm && selectedContact && (
            <ContactDetails
              selectedContact={selectedContact}
              setEditContactForm={setEditContactForm}
              setShowForm={setShowForm}
              handleAddDetailClick={handleAddDetailClick}
              handleDeleteContact={handleDeleteContact}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
