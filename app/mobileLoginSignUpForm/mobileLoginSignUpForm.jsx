import React, {useRef, useState} from "react";
import './mobileLoginSignUpForm.scss';
import SignUpFormHTML from "../SignUpForm/SignUpHTML";
import {validLoginInput} from "../signInValidInput/signInValidInput";
import {checkAuth, login} from "../../store/login/loginSlice";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";

function MobileLoginSignUpForm() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [errors, setErrors] = useState({});
    const containerRef = useRef(null);
    const router = useRouter();


    const toggleForm = () => {
        if (containerRef.current) {
            setShowSignUp(true)
            const container = document.querySelector('.container');
            if (container) container.classList.toggle('active');
        }
    };
    const handleLogin = async (e) => {
        console.log("pesho LOGIN",username, password);
        e.preventDefault();
        const validationErrors = validLoginInput(username, password);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const result = await dispatch(login({username, password, role: "user"}));
        if (result.payload.token) {
            // Повикай checkAuth след login
            dispatch(checkAuth());
             router.push('/');
        }else {
            // Може би покажи съобщение за неуспешен логин
            console.error("Login failed: ", result.error || "Unknown error");
            setIsLoggedIn(true); // това вече го имаш за да покаже error съобщение
        }
    };
    return (
        <section className="mobile-form-login-signUp">
            <div className="container flex-vertical-container">
                <div className="user signinBx">
                    <div className="formBx">
                        <form action="#" onSubmit={handleLogin}>
                            <h2>Sign In</h2>
                            <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)} />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit" name="login" value="Login" onClick={() => handleLogin}>Login</button>
                            <p className="signup">Don't have an account ?<a href="#" onClick={toggleForm}>Sign Up.</a></p>
                        </form>
                    </div>
                </div>
                {
                    showSignUp ?
                        <div className="user signupBx" ref={containerRef}>
                            <div className="formBx flex-vertical-container">
                                <SignUpFormHTML />
                            </div>
                            <div className="imgBx"><img
                                src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
                                alt=""/></div>
                        </div> : null
                }
            </div>
        </section>
    );
}

export default MobileLoginSignUpForm;