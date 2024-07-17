import React from 'react';
import './Basket.css';
import { useNavigate } from 'react-router-dom';

const Basket = ({ items, total, shippingCost }) => {

    const navigate = useNavigate();

    return (
      <div className="basket-container">
        <h2 className='warenkorbTitle'>Warenkorb</h2>
        <div className="basket-content">
          <div className="items-list">
            <h3>Artikel im Warenkorb:</h3>
            <ul>
              <p>Liste der Items</p>
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