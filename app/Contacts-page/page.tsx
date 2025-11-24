'use client'
import React from 'react';
import './contact.scss';
import { ContactsHtml, FooterHTML, Navigation } from './components/DynamicComponents';

const ContactsPage = () => {
  return (
    <div className="contacts-page">
      <div className="contacts-nav flex-horizontal-container text-align-center justify-content-end align-items-center">
        <Navigation />
      </div>
      <ContactsHtml />
      <FooterHTML />
    </div>
  );
};

export default ContactsPage;
