import React, { useState } from "react";
import "./Checkout.css";
import { useLocation } from 'react-router-dom';

const Checkout = () => {

    const location = useLocation();
    const { shoppingCart, total, shippingCost } = location.state || { shoppingCart: null, total: 0, shippingCost: 0 };
    console.log(`Went to Checkout with ${shoppingCart}`)

    const [email, setEmail] = useState("");
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [country, setCountry] = useState("");
    const [stadt, setStadt] = useState("");
    const [postleitzahl, setPostleitzahl] = useState("");
    const [adresse, setAdresse] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleVornameChange = (event) => {
        setVorname(event.target.value);
    };

    const handleNachnameChange = (event) => {
        setNachname(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleStadtChange = (event) => {
        setStadt(event.target.value);
    };

    const handlePostleitzahlChange = (event) => {
        setPostleitzahl(event.target.value);
    };

    const handleAdresseChange = (event) => {
        setAdresse(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Hier kannst du die Logik hinzufügen, die nach dem Klick auf "Jetzt Bezahlen" ausgeführt werden soll
        console.log("Form submitted with data:", { email, vorname, nachname, country, stadt, postleitzahl, adresse });
        // Hier kannst du weitere Aktionen ausführen, z.B. eine Weiterleitung oder API-Aufrufe
    };

    return (
        <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-content">
                <div className="contact-info">
                    <p className="contactTitle">Kontakt</p>
                    <input type="email" id="email" name="email" placeholder="E-Mail" value={email} onChange={handleEmailChange} required />
                    <input type="text" id="vorname" name="vorname" placeholder="Vorname" value={vorname} onChange={handleVornameChange} required />
                    <input type="text" id="nachname" name="nachname" placeholder="Nachname" value={nachname} onChange={handleNachnameChange} required />
                    <p className="lieferungTitle">Lieferung</p>
                    <input type="text" id="country" name="country" placeholder="Land" value={country} onChange={handleCountryChange} required />
                    <input type="text" id="stadt" name="stadt" placeholder="Stadt" value={stadt} onChange={handleStadtChange} required />
                    <input type="text" id="postleitzahl" name="postleitzahl" placeholder="Postleitzahl" value={postleitzahl} onChange={handlePostleitzahlChange} required />
                    <input type="text" id="adresse" name="adresse" placeholder="Adresse" value={adresse} onChange={handleAdresseChange} required />
                    <p className="paymentContentTitle">Zahlungsmethode</p>
                    <div className="checkoutButton">
                        <button type="submit" className="payNowButton" id="payNowCheckoutButton">Jetzt Bezahlen</button>
                    </div>
                </div>
                <div className="checkout-summary">
                    <div className="checkoutSummary">
                        <div className="checkout-summary-item">
                            <span>Gesamt:</span>
                            <span id='itemsGesamtsummeCheckoutText'>{Number(total).toFixed(2)}€</span>
                        </div>
                        <div className="checkout-summary-item">
                            <span>Versandkosten:</span>
                            <span id='versantkostenGesamtsummeCheckoutText'>{Number(shippingCost).toFixed(2)}€</span>
                        </div>
                        <div className="checkout-summary-item">
                            <span>Du zahlst:</span>
                            <span id='gesamtsummeCheckoutText'>{(Number(total) + Number(shippingCost)).toFixed(2)}€</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Checkout;
