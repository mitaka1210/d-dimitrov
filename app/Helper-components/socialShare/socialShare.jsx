import React, {useEffect, useState} from "react";
import Image from "next/image";
import images from "../../../assets/images/image";
import './socialShare.scss';
function SocialShare({ data }) {
    const [toast, setToast] = useState({ visible: false, message: "" });
    const url = typeof window !== "undefined" ? window.location.href : ""; // Взимаме текущия URL
    const title = data || "Сподели тази статия!";
    const description = "Прочети повече на нашия сайт.";

    //? CSS за тоаст съобщението
    const toastStyle = {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: "8px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
    };
    useEffect(() => {
        if (window.FB) return; // Ако вече е заредено, спираме

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "1181098826301746", // Замени с твоя Facebook App ID
                xfbml: true,
                version: "v12.0",
            });
        };

        (function (d, s, id) {
            if (d.getElementById(id)) return;
            const js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            const fjs = d.getElementsByTagName(s)[0];
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }, []);

    const shareOnFacebook = () => {
        window.FB.ui(
            {
                method: "share",
                href: url,
                quote: `${title} - ${description}`,
            },
            function (response) {
                if (response && !response.error_message) {
                    alert("Успешно споделено!");
                } else {
                    alert("Грешка при споделянето.");
                }
            }
        );
    };

    // const copyToClipboard = () => {
    //     navigator.clipboard.writeText(url).then(() => {
    //         alert("Линкът е копиран!");
    //     }).catch((err) => {
    //         alert("Грешка при копирането.");
    //         console.error(err);
    //     });
    // };
    const showToast = (message, ms = 2500) => {
        setToast({ visible: true, message });
        setTimeout(() => setToast({ visible: false, message: "" }), ms);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            showToast("✅ Линкът е копиран!");
        }).catch((err) => {
            showToast("❌ Грешка при копирането.");
            console.error(err);
        });
    };

    return (
        <div className="social-share-article">
            <h4 className="padding-0">Сподели в:</h4>
            <div className="social-icons margin-bottom-10">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">
                    <Image src={images[20].url.src} alt="Facebook" width={40} height={40} />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">
                    <Image src={images[21].url.src} alt="Twitter" width={40} height={40} />
                </a>
            </div>
            <button onClick={copyToClipboard} className="copy-btn text-align-center justify-center">Копирай линка</button>

            {toast.visible && (
                <div style={toastStyle} role="status" aria-live="polite">
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
}

export default SocialShare;
