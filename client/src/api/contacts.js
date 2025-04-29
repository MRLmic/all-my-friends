import axios from 'axios';

const getContacts = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL);
        console.log('Fetched contacts:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};
const getContactById = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching contact with id ${id}:`, error);
        throw error;
    }
};

const createContact = async (contactData) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL, contactData);
        return response.data;
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
};

const updateContact = async (id, contactData) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/${id}`, contactData);
        return response.data;
    } catch (error) {
        console.error(`Error updating contact with id ${id}:`, error);
        throw error;
    }
};

const deleteContact = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting contact with id ${id}:`, error);
        throw error;
    }
};

export default {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};
