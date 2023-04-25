import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import '../../styles/HeaderStyles.css';

const Header = () => {
    return (
        <>
            <header className="header-top-strip py-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <p className="text-white mb-0" style={{ fontSize: '13px' }}>
                                Free Shipping Over $ 100 & Free Returns
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="text-end text-white mb-0" style={{ fontSize: '13px' }}>
                                Hotline:{' '}
                                <Link className="text-white" to="tel:098 9831 609">
                                    098 9831 609
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <header className="header-upper py-2">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <h2>
                                <Link className="text-white" style={{ fontSize: '28px' }}>
                                    Digitic.
                                </Link>
                            </h2>
                        </div>
                        <div className="col-5">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Product ..."
                                    aria-label="Search Product ..."
                                    aria-describedby="basic-addon2"
                                />
                                <span className="input-group-text" id="basic-addon2">
                                    <BsSearch className="fs-6" />
                                </span>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="header-upper-links d-flex align-items-center justify-content-between">
                                <div>
                                    <NavLink
                                        to="/compare-product"
                                        className="d-flex align-items-center gap-10 text-white menu-item"
                                    >
                                        <img src="images/compare.svg" alt="compare" />
                                        <p className="mb-0" style={{ fontSize: '14px' }}>
                                            Compare <br /> Products
                                        </p>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink
                                        to="/wishlist"
                                        className="d-flex align-items-center gap-10 text-white menu-item"
                                    >
                                        <img src="images/wishlist.svg" alt="wishlist" />
                                        <p className="mb-0" style={{ fontSize: '14px' }}>
                                            Favourite <br /> Wishlist
                                        </p>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink
                                        to="/login"
                                        className="d-flex align-items-center gap-10 text-white menu-item"
                                    >
                                        <img src="images/user.svg" alt="user" />
                                        <p className="mb-0" style={{ fontSize: '14px' }}>
                                            Login <br /> My Account
                                        </p>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink
                                        to="/cart"
                                        className="d-flex align-items-center gap-10 text-white "
                                    >
                                        <img src="images/cart.svg" alt="cart" />
                                        <div
                                            className="d-flex flex-column gap-10"
                                            style={{ fontSize: '14px' }}
                                        >
                                            <span className="badge bg-white text-dark">0</span>
                                            <p className="mb-0">$ 500</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <header className="header-bottom py-2">
                <div className="container-xxl">
                    <div className="col-12">
                        <div className="menu-bottom d-flex align-items-center gap-30">
                            <div className="">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle bg-transparent border-0 me-5 gap-15 d-flex align-items-center"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img src="images/menu.svg" alt="menu" className="me-2" />
                                        <span className="me-5 d-inline-block">Categories</span>
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        <li>
                                            <Link className="dropdown-item text-white" to="#">
                                                Action
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-white" to="#">
                                                Another action
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-white" to="#">
                                                Something else here
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="menu-links">
                                <div className="d-flex align-items-center gap-30">
                                    <NavLink className="menu-item" to="/">
                                        Home
                                    </NavLink>
                                    <NavLink className="menu-item" to="/store">
                                        Our Store
                                    </NavLink>
                                    <NavLink className="menu-item" to="/blogs">
                                        Blogs
                                    </NavLink>
                                    <NavLink className="menu-item" to="/contact">
                                        Contact
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
