import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/Products/OurStore';
import Blog from './pages/Blogs/Blog';
import SingleBlog from './pages/Blogs/SingleBlog';
import PageNotFound from './pages/PageNotFound';
import CompareProduct from './pages/Products/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import PrivacyPolicy from './pages/Policy/PrivacyPolicy';
import RefundPolicy from './pages/Policy/RefundPolicy';
import ShippingPolicy from './pages/Policy/ShippingPolicy';
import TermAndContions from './pages/Policy/TermAndContions';
import SingleProduct from './pages/Products/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="product" element={<OurStore />} />
                        <Route path="product/:id" element={<SingleProduct />} />
                        <Route path="blogs" element={<Blog />} />
                        <Route path="blog/:id/" element={<SingleBlog />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="about" element={<About />} />
                        <Route path="compare-product" element={<CompareProduct />} />
                        <Route path="wishlist" element={<Wishlist />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="refund-policy" element={<RefundPolicy />} />
                        <Route path="shipping-policy" element={<ShippingPolicy />} />
                        <Route path="term-conditions" element={<TermAndContions />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
