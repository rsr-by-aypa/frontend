import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import keycloak from '../keycloak';



const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Initialisiere Keycloak
      try {
        await keycloak.init({ onLoad: 'login-required' });
      } catch (error) {
        console.log("Keycloak Instance has already been initialized");
      }
      const token = keycloak.token;

      // Führe die Datenabfrage durch
      const response = await fetch('/api/product/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        // Wenn die Antwort nicht OK ist, prüfe den Statuscode
        if (response.status === 401) {
          // Benutzer zur Keycloak-Login-Seite weiterleiten
          keycloak.login(
            {
              redirectUri: "/productList", // Hier die gewünschte redirect_uri angeben
            }
          );
          return;
        }
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="products-list">
      {products.map(product => (
        <div className="product-item" key={product.id}>
          <Link to={`/productdetails/${product.id}`} className="product-link">
            <div className="image-container">
              <img src={product.imageLink} alt={product.name} className="product-image" />
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.priceInEuro}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

