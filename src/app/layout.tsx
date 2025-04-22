'use client'
import {Inter} from "next/font/google";
import React from "react";
import './typography.scss';
import './reusable-styles.scss';
import Providers from "@/app/Login-page/Providers/Provider";
import '../i18n';
import {Provider} from "react-redux";
import store from "@/store/storeState/store";
import Head from "next/head";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
            <Provider store={store}>
                <Head>
                    <link rel="icon" type="image/png" href="/src/app/favicon.ico" />
                </Head>
                <html lang="en">
                <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
                </body>
                </html>
            </Provider>
    );
}
