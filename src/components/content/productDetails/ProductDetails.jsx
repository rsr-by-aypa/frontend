import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';
import keycloak from '../keycloak';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {


      const fetchProduct = async () => {
            try {
              try {
                  await keycloak.init({ onLoad: 'login-required' });
                } catch (error) {
                  console.log("Keycloak Instance has already been initialized");
                }

              const token = keycloak.token;

              const response = await fetch(`/api/product/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (!response.ok) {
                if (response.status === 401) {
                  keycloak.login(
                    {
                      redirectUri: `/productdetails/${id}`,
                    }
                  );
                  return;
                }
                throw new Error('Network response was not ok');
              }

              const product = await response.json();
              setProduct(product);
            } catch (error) {
              console.error('Error fetching product details:', error);
            }
          };
      fetchProduct();
    }, [id]);



  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const addToCart = async () => {

    try {
      await keycloak.init({ onLoad: 'login-required' });
    } catch (error) {
      console.log("Keycloak Instance has already been initialized");
    }

    const token = keycloak.token;

    const cartItem = {
      productId: id,
      amount: quantity
    };
    console.log(JSON.stringify(cartItem));

    try {
        const response = await fetch("/api/shopping-cart/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(cartItem)
        });

        if (!response.ok) {
            if (response.status === 401) {
              keycloak.login(
                {
                  redirectUri: `/productdetails/${id}`,
                }
              );
              return;
            }
          throw new Error('Network response was not ok' + response.statusText);
        }
        Toastify({
          text: "Erfolgreich zum Warenkorb hinzugefügt!",
          duration: 2000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#70A86C",
        }).showToast();
        console.log(`Produkt '${product.name}' wurde in den Warenkorb gelegt mit Menge ${quantity}`);
        return;
      } catch (error) {
        Toastify({
                  text: "Konnte nicht zum Warenkorb hinzugefügt werden",
                  duration: 2000,
                  close: true,
                  gravity: "top",
                  position: "right",
                  backgroundColor: "#70A86C",
        }).showToast();
        console.error('Error:', error);
    }

  };

  if (!product) {
    return <div>Loading...</div>; // Hier könnte man einen Ladebildschirm einfügen
  }

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <div className="product-details-image">
          <img src={product.imageLink} alt={product.name} className='productDetailsImage' />
        </div>
        <h1 className="product-details-name">{product.name}</h1>
        <div className="product-details-description">
          {product.description}
        </div>
        <div className="product-details-price">
          {product.price}
          <br />
          <span className="product-details-vat">inkl. MwSt., Versand wird beim Checkout berechnet</span>
        </div>
        <div className="product-details-quantity">
          Menge:
          <input type="number" id="product-details-quantity" value={quantity} onChange={handleQuantityChange} min="1" />
        </div>
        <div className="product-details-actions">
          <Link to="/productList" className="product-details-back-button">Zurück zur Liste</Link>
          <button className="product-details-add-to-cart" id="product-details-add-to-cart" onClick={addToCart}>In den Warenkorb</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;




