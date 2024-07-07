import React from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';

const products = [
  { id: 1, name: 'Amethyst 1', price: '€ 36,00 EUR', imageUrl: 'https://media.4-paws.org/a/5/c/4/a5c4c9cdfd3a8ecb58e9b1a5bd496c9dfbc3cedc/VIER%20PFOTEN_2020-10-07_00132-2890x2000-1920x1329.jpg' },
  { id: 2, name: 'Amethyst 2', price: '€ 36,00 EUR', originalPrice: '€ 45,00 EUR', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7q8-CyRMOWXEdfAJcERFsk-40-N6P9m73hQ&s' },
  { id: 3, name: 'Amethyst 3', price: '€ 36,00 EUR', imageUrl: 'https://scr.wfcdn.de/12970/Katzen-Meme-1434712235-0-0.jpg' },
  { id: 4, name: 'Amethyst 4', price: '€ 36,00 EUR', imageUrl: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/191384615/original/2c4ca5180797e138f11349406590e3d88aa18d66/send-you-random-cat-memes.jpg' },
  { id: 5, name: 'Amethyst 5', price: '€ 36,00 EUR', imageUrl: 'https://media.4-paws.org/a/5/c/4/a5c4c9cdfd3a8ecb58e9b1a5bd496c9dfbc3cedc/VIER%20PFOTEN_2020-10-07_00132-2890x2000-1920x1329.jpg' },
  { id: 6, name: 'Amethyst 6', price: '€ 36,00 EUR', originalPrice: '€ 45,00 EUR', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7q8-CyRMOWXEdfAJcERFsk-40-N6P9m73hQ&s' },
  { id: 7, name: 'Amethyst 7', price: '€ 36,00 EUR', imageUrl: 'https://scr.wfcdn.de/12970/Katzen-Meme-1434712235-0-0.jpg' },
  { id: 8, name: 'Amethyst 8', price: '€ 36,00 EUR', imageUrl: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/191384615/original/2c4ca5180797e138f11349406590e3d88aa18d66/send-you-random-cat-memes.jpg' },
];



const ProductPage = () => (
  
    <div className="products-list">
      {products.map(product => (
        <div className="product-item" key={product.id} id='productItemProductPage'>
          <Link to={`/product/${product.id}`}>    {/* `/product/${product.id}` */}
            <img src={product.imageUrl} alt={product.name} id='productItemImageProductPage'/>
            <h3 id='productItemNameProductPage'>{product.name}</h3>
            <p id='productItemPriceProductPage'>{product.price}</p>
            {product.originalPrice && <p className="original-price">{product.originalPrice}</p>}
          </Link>
        </div>
      ))}
    </div>

);

export default ProductPage;