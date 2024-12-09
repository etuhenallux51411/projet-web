import React from "react";
import "../assets/style/popup.css";

function Popup({ isVisible, onClose, children }) {
    console.log("PopupProvider");
    if (!isVisible) return null; // Si le popup n'est pas visible, ne rien afficher

    return (
        <div className="popup-overlay">
            <div className="popup-content">

                {children}

                <button className="close-button" onClick={onClose}>Cancel
                </button>
            </div>
        </div>
    );
}

export default Popup;
