import React from "react";
import { Routes, Route} from 'react-router-dom';
import './Content.css';
import Home from "./home/Home";
import ProductPage from "./productPage/ProductPage";
import ProductDetails from "./productDetails/ProductDetails";
import Basket from "./basket/Basket";
import Checkout from "./checkout/Checkout";
import AllRightsReservedPage from './../allRightsReservedPage/AllRightsReservedPage';

const Content = () => {

    /*  <Route path="/prodcutdetails/:id" element={<ProductDetails/>}/>  */
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productpage" element={<ProductPage />} />
                <Route path="/productdetails" element={<ProductDetails />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/all-rights-reserved" element={<AllRightsReservedPage/>} />
            </Routes>
    );
};

export default Content;