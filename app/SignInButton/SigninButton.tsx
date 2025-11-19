import React from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import {useTranslation} from "react-i18next";
import './signIn.scss';
import LoaderHTML from "../loader/LoaderHTML";

const SignInButton = () => {
  const {t} = useTranslation();
  const {data: session} = useSession();
  const goToHome = () => {
    signOut({callbackUrl: '/'}).then(r => {
    })
  }
  //? when loginWithGoogle sometimes we can't update text in the page
  //   maybe need to fix but for now i don't know how to fix it


  const logIn = () => {
    signIn("google", {callbackUrl: '/'}).then(r => {})
  }
  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={goToHome} className="flex-horizontal-container-raw log-out">
          {t("signOut")}
        </button>
      </div>
    );
  } else {
    <LoaderHTML/>
  }
  return (
    <div>
      <a onClick={logIn} className="login">
        {t("signIn")}
      </a>
    </div>
  );
};

export default SignInButton;
