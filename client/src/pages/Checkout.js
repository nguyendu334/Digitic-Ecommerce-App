import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

import '../styles/CheckoutPageStyles.css';
import watch from '../images/watch.jpg';

const Checkout = () => {
    return (
        <>
            <div className="checkout-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-7">
                            <div className="checkout-left-data">
                                <h3 className="website-name">Digitic</h3>
                                <nav
                                    style={{ '--bs-breadcrumb-divider': '>' }}
                                    aria-label="breadcrumb"
                                >
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link className="text-dark total-price" to="/cart">
                                                Cart
                                            </Link>
                                        </li>
                                        &nbsp; {'>'}
                                        <li
                                            className="breadcrumb-item total-price active"
                                            aria-current="page"
                                        >
                                            Information
                                        </li>
                                        &nbsp; {'>'}
                                        <li className="breadcrumb-item total-price active">
                                            Shipping
                                        </li>
                                        &nbsp; {'>'}
                                        <li
                                            className="breadcrumb-item total-price active"
                                            aria-current="page"
                                        >
                                            Payment
                                        </li>
                                    </ol>
                                </nav>

                                <h4 className="title total">Contact Information</h4>
                                <p className="user-details total">
                                    haha193 (nguyendu334@gmail.com)
                                </p>
                                <h4 className="mb-3">Shipping Address</h4>
                                <form
                                    className="d-flex gap-15 flex-wrap justify-content-between"
                                    action=""
                                >
                                    <div className="w-100">
                                        <select name="" id="" className="form-control form-select">
                                            <option value="" selected disabled>
                                                Country
                                            </option>
                                        </select>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input
                                            className="form-control"
                                            placeholder="First Name"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <input
                                            className="form-control"
                                            placeholder="Last Name"
                                            type="text"
                                        />
                                    </div>
                                    <div className="w-100">
                                        <input
                                            className="form-control"
                                            placeholder="Address"
                                            type="text"
                                        />
                                    </div>
                                    <div className="w-100">
                                        <input
                                            className="form-control"
                                            placeholder="Apartment, Sui, etc"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <input
                                            className="form-control"
                                            placeholder="City"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <select name="" id="" className="form-control form-select">
                                            <option value="" selected disabled>
                                                State
                                            </option>
                                        </select>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input
                                            className="form-control"
                                            placeholder="ZipCode"
                                            type="text"
                                        />
                                    </div>
                                    <div className="w-100">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link to="/cart" className="text-dark">
                                                <IoIosArrowBack className="me-2" />
                                                Return to Cart
                                            </Link>
                                            <Link to="/cart" className="button">
                                                Continue
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="border-bottom py-4">
                                <div className="d-flex gap-10 mb-2 align-items-center">
                                    <div className="w-75 d-flex gap-10">
                                        <div className="w-25 position-relative">
                                            <span
                                                style={{ top: '-10px', right: '2px' }}
                                                className="badge bg-secondary text-white rounded-circle p-1 position-absolute"
                                            >
                                                1
                                            </span>
                                            <img className="img-fluid" src={watch} alt="product" />
                                        </div>
                                        <div>
                                            <h5 className="total-price">haha193</h5>
                                            <p className="total-price">asd</p>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="total">$100</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="total">SubTotal</p>
                                    <p className="total-price">$100</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0 total">Shipping</p>
                                    <p className="mb-0 total-price">$100</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                                <h4 className="total">Total</h4>
                                <h5 className="total-price">$100</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
