import React from "react";
import { Routes, Route} from 'react-router-dom';
import Home from "./home/Home";
import ProductList from "./productList/ProductList";
import ProductDetails from "./productDetails/ProductDetails";
import Basket from "./basket/Basket";
import Checkout from "./checkout/Checkout";

import AddProduct from "./addProduct/AddProduct";
import AllRightsReserved from "../footer/footerAllRightsReserved/AllRightsReserved";
import PrivacyPolicy from "../footer/footerPrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../footer/footerTermsAndConditions/TermsAndConditions";
import BuySuccess from "./buySucess/BuySuccess";

const Content = () => {

    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productList" element={<ProductList />} />
                <Route path="/productdetails/:id" element={<ProductDetails />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/addProduct" element={<AddProduct/>} />
                <Route path="/allRightsReserved" element={<AllRightsReserved/>} />
                <Route path="/privacyPolicy" element={<PrivacyPolicy/>} />
                <Route path="/termsAndConditions" element={<TermsAndConditions/>} />
                <Route path="/buySuccess" element={<BuySuccess/>} />
            </Routes>
    );
};

export default Content;