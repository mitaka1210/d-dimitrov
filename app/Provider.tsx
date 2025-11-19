'use client';

import { Provider } from "react-redux";
import store from "../store/storeState/store";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Providers({
                                      children,
                                      session,
                                  }: {
    children: React.ReactNode;
    session?: any;
}) {
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    );
}
