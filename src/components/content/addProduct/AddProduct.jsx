import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        priceInEuro: '',
        amount: '',
        imageLink: '',
        weightInGram: '',
        color: '',
        diameterInCm: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Product to be added:', product);
        // Dummy function to show the product details
        alert('Product added successfully!\n' + JSON.stringify(product, null, 2));
    };

    return (
        <div className="add-product">
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={product.description} onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="priceInEuro">Price (in Euro):</label>
                    <input type="number" step="0.01" id="priceInEuro" name="priceInEuro" value={product.priceInEuro} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" value={product.amount} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="imageLink">Image Link:</label>
                    <input type="text" id="imageLink" name="imageLink" value={product.imageLink} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="weightInGram">Weight (in grams):</label>
                    <input type="number" step="0.01" id="weightInGram" name="weightInGram" value={product.weightInGram} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input type="text" id="color" name="color" value={product.color} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="diameterInCm">Diameter (in cm):</label>
                    <input type="number" step="0.01" id="diameterInCm" name="diameterInCm" value={product.diameterInCm} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;


