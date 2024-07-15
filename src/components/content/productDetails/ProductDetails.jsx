import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';
import keycloak from '../keycloak';

const products = [
  { id: 1, name: 'Amethyst 1', price: '36,00 EUR', imageUrl: 'https://media.4-paws.org/a/5/c/4/a5c4c9cdfd3a8ecb58e9b1a5bd496c9dfbc3cedc/VIER%20PFOTEN_2020-10-07_00132-2890x2000-1920x1329.jpg', description: 'Kurze Beschreibung hier' },
  { id: 2, name: 'Amethyst 2', price: '36,00 EUR', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7q8-CyRMOWXEdfAJcERFsk-40-N6P9m73hQ&s', description: 'Kurze Beschreibung hier' },
  { id: 3, name: 'Amethyst 3', price: '36,00 EUR', imageUrl: 'https://scr.wfcdn.de/12970/Katzen-Meme-1434712235-0-0.jpg', description: 'Kurze Beschreibung hier' },
  { id: 4, name: 'Amethyst 4', price: '36,00 EUR', imageUrl: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/191384615/original/2c4ca5180797e138f11349406590e3d88aa18d66/send-you-random-cat-memes.jpg', description: 'Kurze Beschreibung hier' },
  { id: 5, name: 'Amethyst 5', price: '36,00 EUR', imageUrl: 'https://media.4-paws.org/a/5/c/4/a5c4c9cdfd3a8ecb58e9b1a5bd496c9dfbc3cedc/VIER%20PFOTEN_2020-10-07_00132-2890x2000-1920x1329.jpg', description: 'Kurze Beschreibung hier' },
  { id: 6, name: 'Amethyst 6', price: '36,00 EUR', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7q8-CyRMOWXEdfAJcERFsk-40-N6P9m73hQ&s', description: 'Kurze Beschreibung hier' },
  { id: 7, name: 'Amethyst 7', price: '36,00 EUR', imageUrl: 'https://scr.wfcdn.de/12970/Katzen-Meme-1434712235-0-0.jpg', description: 'Kurze Beschreibung hier' },
  { id: 8, name: 'Amethyst 8', price: '36,00 EUR', imageUrl: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/191384615/original/2c4ca5180797e138f11349406590e3d88aa18d66/send-you-random-cat-memes.jpg', description: 'Kurze Beschreibung hier' },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
      fetchProduct();
    }, []);

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

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const addToCart = () => {
    // Hier kannst du die Logik zum Hinzufügen zum Warenkorb implementieren
    console.log(`Produkt '${product.name}' wurde in den Warenkorb gelegt mit Menge ${quantity}`);
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
        <div className="product-details-rating">
          <span className="product-details-stars">★★★★★</span>
          <span className="product-details-reviews">10 Bewertungen</span>
        </div>
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




