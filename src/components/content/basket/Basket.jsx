import React, { useState, useEffect } from 'react';
import './Basket.css';
import { useNavigate } from 'react-router-dom';
import keycloak from '../keycloak';

const Basket = () => {
    const shippingCost = 0.00;
    const [shoppingCart, setShoppingCart] = useState(null);

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        try {
          try {
            await keycloak.init({ onLoad: 'login-required' });
          } catch (error) {
            console.log("Keycloak Instance has already been initialized");
          }
          const token = keycloak.token;

          const response = await fetch('/api/shopping-cart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            if (response.status === 401) {

              keycloak.login(
                {
                  redirectUri: "/basket", // Hier die gewünschte redirect_uri angeben
                }
              );
              return;
            }
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          
          setShoppingCart(data);

        } catch (error) {
          setShoppingCart("LEER")
          console.error('Error fetching items:', error);
        }
      };

    const navigate = useNavigate();

    if (!shoppingCart) {
      return <p>Lade...</p>
    }

    if (shoppingCart === "LEER") {
      const total = 0.00;
        return (
          <div className="basket-container">
            <h2 className='warenkorbTitle'>Warenkorb</h2>
            <div className="basket-content">
              <div className="items-list">
                <h3>Artikel im Warenkorb:</h3>
                <p>Leer...</p>
              </div>
              <div className="basket-summary">
                <div className="basket-summary-item">
                  <span>Gesamt:</span>
                  <span id='itemsGesamtsummeBasketText'>{Number(total).toFixed(2)}€</span>
                </div>
                <div className="basket-summary-item">
                  <span>Versandkosten:</span>
                  <span id='versandkostenGesamtsummeBasketText'>{Number(shippingCost).toFixed(2)}€</span>
                </div>
                <div className="basket-summary-item">
                  <span>Du zahlst:</span>
                  <span id='GesamtsummeBasketText'>{(Number(total) + Number(shippingCost)).toFixed(2)}€</span>
                </div>
                
              </div>
            </div>
          </div>
        );
    }

    console.log(shoppingCart);

    const total = shoppingCart.items.reduce((acc, item) => acc + item.priceInEuro * item.amount, 0);
    console.log(total);
    console.log(shoppingCart.items.map(item => item.priceInEuro));

    const handleCheckout = () => {
        navigate('/checkout', { state: { shoppingCart, total, shippingCost } });
    };

    return (
      <div className="basket-container">
        <h2 className='warenkorbTitle'>Warenkorb</h2>
        <div className="basket-content">
          <div className="items-list">
            <h3>Artikel im Warenkorb:</h3>
            <ul>
              {shoppingCart.items.map(item => (
                            <li key={item.id}>
                              <div className="item-details">
                                <img src={item.imageLink} alt={item.productName} style={{ width: '150px', height: 'auto' }} />
                                <div>
                                  <h4>{item.productName}</h4>
                                  <p>Preis: {item.priceInEuro}€</p>
                                  <p>Anzahl: {item.amount}</p>
                                </div>
                              </div>
                            </li>
                          ))}
            </ul>
          </div>
          <div className="basket-summary">
            <div className="basket-summary-item">
              <span>Gesamt:</span>
              <span id='itemsGesamtsummeBasketText'>{Number(total).toFixed(2)}€</span>
            </div>
            <div className="basket-summary-item">
              <span>Versandkosten:</span>
              <span id='versandkostenGesamtsummeBasketText'>{Number(shippingCost).toFixed(2)}€</span>
            </div>
            <div className="basket-summary-item">
              <span>Du zahlst:</span>
              <span id='GesamtsummeBasketText'>{(Number(total) + Number(shippingCost)).toFixed(2)}€</span>
            </div>
            <button className="checkout-button" id='checkoutBasketButton' onClick={handleCheckout}>Zur Kasse</button>
          </div>
        </div>
      </div>
    );
  };

  export default Basket;