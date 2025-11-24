// components/UserDropdown.js
import {useEffect, useState} from "react";
import TruncateText from "../Helper-components/truncateText/truncateText";
import {signOut} from "next-auth/react";

export default function UserDropdown({userLoginName}) {
    const [open, setOpen] = useState(false);
    const [userName, setUsername] = useState(userLoginName || ''); // Initialize with userLoginName prop
    useEffect(() => {
        setUsername(userLoginName)
        console.log("pesho", userLoginName);
    }, [userLoginName])
    const handleLogout = () => {
        signOut({ callbackUrl: "/" }).then((r) => {});
        localStorage.clear();
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <button
                onClick={() => setOpen((v) => !v)}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                }}
                aria-label="User menu"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#333" strokeWidth="2" />
                    <path d="M4 20c0-4 16-4 16 0" stroke="#333" strokeWidth="2" />
                </svg>
            </button>
            {open && (
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "110%",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        minWidth: "180px",
                        zIndex: 100,
                        padding: "12px",
                    }}
                >
                    <div style={{ marginBottom: "12px", fontWeight: "bold", color: "#333" }}>
                        {TruncateText(userName, 20)}
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: "100%",
                            padding: "8px",
                            background: "#f44336",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}