import dynamic from 'next/dynamic';

export const LoginPageHTML = dynamic(
    () => import('../loginPageHTML'),
    { ssr: false }
);

export const FooterHTML = dynamic(
    () => import('../../Footer-page/page'),
    { ssr: false }
);

export const Navigation = dynamic(
    () => import('../../Navigation-component/navigation'),
    { ssr: false }
);