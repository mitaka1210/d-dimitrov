'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from "@/store/createAccount/createAccountSlice";
import {validateInput} from '../validSignUpFormInput/validSignUpFormInput';
import {useTranslation} from "react-i18next";
import {validLoginInput} from "@/app/signInValidInput/signInValidInput";
import useWindowSize from "@/app/Helper-components/getWindowSize/windowSize";
import {resetState} from "@/store/likesSlice/likesSlice";
import {useRouter} from "next/navigation";

const SignUpFormHTML = ({sendDataToLogin}) => {
    const {t} = useTranslation();
    const router = useRouter();
    const size = useWindowSize();
    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    //! ERROR input default state
    const { errorCreate } = useSelector((state) => state.createAccount);
    const dispatch = useDispatch();
    const role = 'user';

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const validationErrors = validateInput(username, password, first_name, lastName, email, confirmPassword)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        }else {
            try {
                await dispatch(createAccount({ username, first_name, lastName, email, role, password })).unwrap();
                window.location.reload();
                // const signInButton = document.getElementById('idCreateAccount');
                // const containerLogin = document.getElementById('login');
                // signInButton.addEventListener('click', () => {
                //     containerLogin.classList.remove('right-panel-active');
                // });
                sendDataToLogin(true);
            } catch (error) {
                console.log('❌ ГРЕШКА ПРИ СЪЗДАВАНЕ НА АКАУНТ:', error);
            }
        }
    };
    // Функция за връщане назад
    const goBack = () => {
       window.location.reload()
    };
    return (
        <>
        <form action="#" onSubmit={handleCreateAccount}>
            <h4 className="color-white ">{t('createAccount')}</h4>
            <div>
                <label className="color-white login-input margin-top-15">{t('username')}</label>
                <input type="text" value={username} name="username1" onChange={(e) => setUsername(e.target.value)} />
                {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
            </div>

            <div className="input-width-100 margin-5">
                <label className="color-white">{t('firstName')}</label>
                <input className="border-radius-10" type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                {errors.first_name && <span style={{ color: 'red' }}>{errors.first_name}</span>}
            </div>

            <div className="input-width-100 margin-5">
                <label className="color-white">{t('lastName')}</label>
                <input className="border-radius-10" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}

            </div>

            <div className="flex-vertical-container input-width-100 margin-5">
                <label className="color-white">{t('email')}</label>
                <input className="border-radius-10" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

            </div>

            <div className="input-width-100 margin-5">
                <label className="color-white">{t('password')}</label>
                <input className="border-radius-10" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

            </div>

            <div className="margin-10 input-width-100 margin-5">
                <label className="color-white">{t('confirmPassword')}</label>
                <input className="border-radius-10" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}

            </div>

            {errorCreate && (
                <p className="remove-padding-bottom" style={{ color: 'red' }}>
                    {errorCreate.message}
                </p>
            )}
            {size.width < 500 ?
                <div>
                    <button className="btn-login-page input-width-100" id="idCreateAccount">
                        {t("createAccount")}
                    </button>
                    <button className="btn-login-page margin-top-10 input-width-100" onClick={goBack}>
                        {t("back")}
                    </button>
                </div> :
                <button className="btn-login-page" id="idCreateAccount">
                    {t("createAccount")}
                </button> }
        </form>
        </>
    );
};

export default SignUpFormHTML;
