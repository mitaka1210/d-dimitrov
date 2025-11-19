import React, {useEffect, useState} from "react";
import './loginPage.scss';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {validLoginInput} from "../signInValidInput/signInValidInput";
import {login, checkAuth} from "../../store/login/loginSlice";
import SignUpFormHTML from '../SignUpForm/SignUpHTML';
import {useTranslation} from "react-i18next";
import Image from "next/image";
import google from '../../assets/images/google-svgrepo-com.svg';
import {signIn, signOut, useSession} from "next-auth/react";

function LoginPageHtml(props) {
    const { t } = useTranslation(); // ✅ Винаги се извиква в началото
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginForm, setHideForm] = useState(true);
    const [testForm, setTestForm] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
        useEffect(() => {
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const containerLogin = document.getElementById('login');

            const handleSignUpClick = () => {
                containerLogin.classList.add('right-panel-active');
            };

            const handleSignInClick = () => {
                containerLogin.classList.remove('right-panel-active');
            };

            signUpButton.addEventListener('click', handleSignUpClick);
            signInButton.addEventListener('click', handleSignInClick);
            return () => {
                signUpButton.removeEventListener('click', handleSignUpClick);
                signInButton.removeEventListener('click', handleSignInClick);
            };
        }, [testForm]);
    const logInWithGoogle = () => {
        signIn("google", {callbackUrl: '/'}).then(r => {})
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const validationErrors = validLoginInput(username, password);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const result = await dispatch(login({ username, password, role: 'user' }));
        if (result.payload.token) {
            // Повикай checkAuth след login
            // await dispatch(checkAuth());
            router.push('/');
        }else {
            // Може би покажи съобщение за неуспешен логин
            console.error("Login failed: ", result.error || "Unknown error");
            setIsLoggedIn(true); // това вече го имаш за да покаже error съобщение
        }
    };
    const handleClickSignUp = () => {
        setHideForm(false);
    };
    const handleClickSignIn = () => {
        setHideForm(true);
        setIsLoggedIn(true);
    };

    const handleDataFomSignUpForm = (data) => {
        console.log('Data received from child:', data);
        if(data){
            const signInButton = document.getElementById('idCreateAccount');
            const containerLogin = document.getElementById('login');
            signInButton.addEventListener('click', () => {
                containerLogin.classList.remove('right-panel-active');
            });
            setTestForm(true)
            setHideForm(true);
            setIsLoggedIn(true);        }
    }
        return (
            <div className="container-login-page">
                <div className="container-login" id="login">
                    <div className="form-container-login sign-in-container-login">
                        {loginForm ? (
                            <div>
                                <form action="#" onSubmit={handleLogin}>
                                    <h3 className="color-white">{t('loginWith')}</h3>
                                    <div className="social-container-login" onClick={logInWithGoogle}>
                                        <a href="#" className="social">
                                            <Image src={google} alt="google"/>
                                        </a>
                                    </div>
                                    <span className="color-white">{t('orUseYourAccount')}</span>
                                    <div>
                                        <label className="add-color-to-text login-input margin-top-15">{t('username')}</label>
                                        <input type="text" value={username} name="username" placeholder={t('username')} onChange={(e) => setUsername(e.target.value)} />
                                        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                                    </div>

                                    <div className="margin-top-15 margin-bottom-15" style={{ position: "relative" }}>
                                        <label className="add-color-to-text">{t('password')}</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            placeholder={t('password')}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{ paddingRight: "2.5em" }}
                                        />
                                        <button
                                            type="button"
                                            className="show-password-btn"
                                            onClick={() => setShowPassword((v) => !v)}
                                            tabIndex={-1}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>
                                        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                                    </div>
                                    {isLoggedIn && <p style={{ color: 'red' }}>{error}</p>}
                                    <button className="btn-login-page" onClick={handleClickSignIn} type="submit" disabled={loading}>
                                        {loading ? t('waitLoad') : t("loginAfterWriteAcc")}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="form-container-login sign-up-container-login">
                                <SignUpFormHTML sendDataToLogin={handleDataFomSignUpForm} />
                            </div>
                        )}
                    </div>
                    <div className="overlay-container-login">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h5>{t('welcomeBack')}</h5>
                                <p>{t('keepConnectedWithMePleaseLogin')}</p>
                                <button className="ghost btn-login-page" id="signIn" onClick={handleClickSignIn}>
                                    {t("login")}
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h6>{t("hiFriend")}</h6>
                                <span>{t("enterDetails")}</span>
                                <button className="ghost btn-login-page hello-friend-btn" id="signUp" onClick={handleClickSignUp}>
                                    {t("signUp")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default LoginPageHtml;