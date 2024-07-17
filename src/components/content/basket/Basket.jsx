import React, { useState, useEffect } from 'react';
import './Basket.css';
import { useNavigate } from 'react-router-dom';

const Basket = () => {

    const [shoppingCart, setShoppingCart] = useState([]);

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
          console.error('Error fetching items:', error);
        }
      };

    const navigate = useNavigate();

    return (
      <div className="basket-container">
        <h2 className='warenkorbTitle'>Warenkorb</h2>
        <div className="basket-content">
          <div className="items-list">
            <h3>Artikel im Warenkorb:</h3>
            <ul>
              <p>{shoppingCart}</p>
            </ul>
          </div>
          <div className="basket-summary">
            <div className="basket-summary-item">
              <span>Gesamt:</span>
              <span id='itemsGesamtsummeBasketText'>{total}€</span>
            </div>
            <div className="basket-summary-item">
              <span>Versandkosten:</span>
              <span id='versandkostenGesamtsummeBasketText'>{shippingCost}€</span>
            </div>
            <div className="basket-summary-item">
              <span>Du zahlst:</span>
              <span id='GesamtsummeBasketText'>{total + shippingCost}€</span>
            </div>
            <button className="checkout-button" id='checkoutBasketButton' onClick={() => navigate('/productList')}>Zur Kasse</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Basket;