import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails"
import logo from "../images/pozaadina.png"


function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }
    , []);

  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)); }
    , [contacts]);

  return (
    <div className="headerc">

      <h1>Contacts</h1>
      <div className="ui container">

        <Router>
          <Header />
          <Routes>
            <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
            <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
          </Routes>
        </Router>

      </div>
    </div>

  );
}

export default App;
