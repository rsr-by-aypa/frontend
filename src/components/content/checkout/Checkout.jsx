import React, { useState } from "react";
import "./Checkout.css";
import { useLocation } from 'react-router-dom';
import keycloak from '../keycloak';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const Checkout = () => {

    const location = useLocation();
    const { shoppingCart, total, shippingCost } = location.state || { shoppingCart: null, total: 0, shippingCost: 0 };
    console.log(`Went to Checkout with ${shoppingCart}`);

    const [email, setEmail] = useState("");
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [country, setCountry] = useState("");
    const [stadt, setStadt] = useState("");
    const [postleitzahl, setPostleitzahl] = useState("");
    const [adresse, setAdresse] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("paypal"); // Default-Zahlungsmethode

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

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const orderRequest = {
            userId: shoppingCart.userId,
            firstName: vorname,
            lastName: nachname,
            email: email,
            address: `${adresse}, ${postleitzahl} ${stadt}, ${country}`,
            paymentInfo: paymentMethod,
            boughtItems: shoppingCart.items.map(item => ({
                productId: item.productId,
                quantity: item.amount
            }))
        };

        const orderData = await createOrder(orderRequest); // Übergebe orderRequest an createOrder()

        if (paymentMethod === "paypal") {
            payWithPayPal(orderData.id);
        }
        console.log("Form submitted with data:", { email, vorname, nachname, country, stadt, postleitzahl, adresse, paymentMethod });
    };

    async function payWithPayPal(orderId) {
        try {
            await keycloak.init({ onLoad: 'login-required' });
        } catch (error) {
            console.log("Keycloak Instance has already been initialized");
        }

        const token = keycloak.token;
        console.log(orderId)

        const url = new URL('http://localhost:80/api/payment/paypal/create'); // Die URL deines POST-Endpunkts
        const params = {
            cancelUrl: 'http://localhost:80/checkout',
            successUrl: 'http://localhost:80',
            orderId: orderId
        };

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include'
            });

            if (!response.ok) {
                if (response.status === 401) {
                    keycloak.login(
                        {
                            redirectUri: `/checkout`,
                        }
                    );
                    return;
                }
                throw new Error('Network response was not ok' + response.statusText);
            }

            if (response.ok || response.redirect) {
                const responseData = await response.text();
                console.log(responseData);
                if (responseData) {
                    window.location.href = responseData;
                } else {
                    console.error('PayPal URL not found in response');
                }
            } else {
                console.error('Fehler bei der Anfrage:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    }

    const createOrder = async (orderRequest) => { // orderRequest als Parameter hinzufügen
        try {
            await keycloak.init({ onLoad: 'login-required' });
        } catch (error) {
            console.log("Keycloak Instance has already been initialized");
        }

        const token = keycloak.token;

        try {
            const response = await fetch("/api/orders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(orderRequest)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    keycloak.login(
                        {
                            redirectUri: `/checkout`,
                        }
                    );
                    return;
                }
                throw new Error('Network response was not ok' + response.statusText);
            }

            const data = await response.json();


            Toastify({
                text: "Bestellung wurde in Auftrag gegeben!",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#70A86C",
            }).showToast();
            console.log(`Order wurde created`);
            return data;
        } catch (error) {
            Toastify({
                text: "Bestellung konnte nicht beauftragt werden!",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#70A86C",
            }).showToast();
            console.error('Error:', error);
        }
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
                    <select id="paymentMethod" name="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
                        <option value="paypal">PayPal</option>
                        {/* Weitere Zahlungsmethoden hier hinzufügen */}
                    </select>
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