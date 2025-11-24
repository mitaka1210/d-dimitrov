'use client'
import React from 'react';
import { LoginPageHTML, FooterHTML, Navigation } from './componentsShare/DynamicComponentsShare';
import MobileSkillsHtml from "../mobileSkills/mobileSkillsHTML";
import useWindowSize from "../Helper-components/getWindowSize/windowSize";
import MobileLoginSignUpForm from "../mobileLoginSignUpForm/mobileLoginSignUpForm";

const LoginPage = () => {
    const size = useWindowSize();
    return (
        <div className="login-create-account-page">
            <div className="contacts-nav flex-horizontal-container text-align-center justify-content-end align-items-center">
                <Navigation />
            </div>
            <div>
                { size.width < 500 ? <MobileLoginSignUpForm/> : <LoginPageHTML /> }
            </div>
            <FooterHTML />
        </div>
    );
};

export default LoginPage;
