import React, { useState } from "react";
import "./newsletterSignup.scss";

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        console.log("pesho",email);
        try {
            const res = await fetch('/api/newsLetter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else {
                const data = await res.json();
                setErrorMsg(data.message || 'Failed');
                setStatus('error');            }
        } catch (err) {
            setErrorMsg('Network error');
            setStatus('error');        }
    };

    return (
        <>
            <div className="newsletter-wrapper">
                <div className="icon">
                    {/* SVG икона: плик + мегафон */}
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <rect x="8" y="20" width="48" height="32" rx="4" fill="#4A90E2" />
                        <path d="M16 24L32 36L48 24" stroke="white" strokeWidth="2" />
                        <circle cx="32" cy="20" r="4" fill="#F5A623" />
                        <path d="M32 12L36 16L32 20L28 16L32 12Z" fill="#F5A623" />
                    </svg>
                </div>

                <form onSubmit={handleSubmit}>
                    <h2>📣 Абонирай се за бюлетина</h2>
                    <p>Получавай новини, съвети и ресурси директно на имейла си.</p>
                    <input
                        type="email"
                        placeholder="Въведи имейл"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Изпращане...' : 'Абонирай се'}
                    </button>
                    {status === 'success' && <p className="success">✅ Успешно се абонира!</p>}
                    {status === 'error' && <p className="error">❌ Грешка при абонамента.</p>}
                    {status === 'error' && <p className="error">❌ {errorMsg}</p>}
                </form>
            </div>
        </>
    );
};

export default NewsletterSignup;
