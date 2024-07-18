import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import keycloak from '../keycloak';

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      try {
        await keycloak.init({ onLoad: 'login-required' });
      } catch (error) {
        console.log("Keycloak ist schon initialisiert")
      }
      
      const token = keycloak.token;

      const response = await fetch('/api/product/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          keycloak.login({ redirectUri: "/productList" });
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

  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  return (
    <div className="products-list">
      {filteredProducts.map(product => (
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


