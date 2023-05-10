import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import BlogCategoryList from './pages/BlogCategoryList';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Categorylist from './pages/Categorylist';
import AddBlog from './pages/AddBlog';
import AddBlogCategory from './pages/AddBlogCategory';
import AddColor from './pages/AddColor';
import AddCategory from './pages/AddCategory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="enquiries" element={<Enquiries />} />
                    <Route path="blog-list" element={<Bloglist />} />
                    <Route path="blog-category-list" element={<BlogCategoryList />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="color-list" element={<Colorlist />} />
                    <Route path="brand-list" element={<Brandlist />} />
                    <Route path="product-list" element={<Productlist />} />
                    <Route path="category-list" element={<Categorylist />} />
                    <Route path="coupon-list" element={<CouponList />} />
                    <Route path="blog" element={<AddBlog />} />
                    <Route path="blog-category" element={<AddBlogCategory />} />
                    <Route path="color" element={<AddColor />} />
                    <Route path="category" element={<AddCategory />} />
                    <Route path="category/:id" element={<AddCategory />} />
                    <Route path="brand" element={<AddBrand />} />
                    <Route path="brand/:id" element={<AddBrand />} />
                    <Route path="product" element={<AddProduct />} />
                    <Route path="coupon" element={<AddCoupon />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
