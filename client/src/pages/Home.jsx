import React from 'react';

import ContactList from '../components/ContactList';
import ContactDetails from '../components/ContactDetails';


const Home = () => {
    return (
        <div className="home mt-5">
            <div className="row">
                <div className="col-md-2">
                    <ContactList />
                </div>
                <div className="col-md-10">
                    <ContactDetails />
                </div>
            </div>
        </div>
    );
};

export default Home;
