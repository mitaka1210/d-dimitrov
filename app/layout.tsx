import Providers from "./Provider";
import { Inter } from "next/font/google";
import "../i18n";
import "./globals.css";
import './typography.scss';
import './variables.scss';
import './reusable-styles.scss';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "My App",
    icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
