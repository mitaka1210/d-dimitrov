'use client'
import React from 'react';
import {SignUpFormHTML, FooterHTML, Navigation} from './componentsShare/DynamicComponentsShare';
const SignUpPage = () => {
    const handleSendDataToLogin = (success: boolean) => {
        if (success) {
            console.log("Успешна регистрация!");
            // Можеш да редиректнеш, да покажеш съобщение, да логнеш и т.н.
        }
    };
    return (
        <div className="contacts-page">
            <div className="contacts-nav flex-horizontal-container text-align-center justify-content-end align-items-center">
                <Navigation />
            </div>
            <SignUpFormHTML sendDataToLogin={handleSendDataToLogin}/>
            <FooterHTML />
        </div>
    );
};

export default SignUpPage;
