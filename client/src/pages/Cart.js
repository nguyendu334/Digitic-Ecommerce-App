import React, { useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import '../styles/CartPageStyles.css';
import watch from '../images/watch.jpg';
import { Link } from 'react-router-dom';
import Container from './../components/Container';
import { getUserCart } from '../features/user/userSlice';

const Cart = () => {
    const dispatch = useDispatch();

    const userCartState = useSelector((state) => state.auth?.cartProducts);

    useEffect(() => {
        dispatch(getUserCart());
    }, []);

    return (
        <>
            <Meta title={'Cart'} />
            <BreadCrumb title="Cart" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Product</h4>
                            <h4 className="cart-col-2">Price</h4>
                            <h4 className="cart-col-3">Quantity</h4>
                            <h4 className="cart-col-4">Total</h4>
                        </div>

                        {userCartState &&
                            userCartState?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                                    >
                                        <div className="cart-col-1 gap-15 d-flex align-items-center">
                                            <div className="w-25">
                                                <img
                                                    src={item?.productId.images[0]?.url}
                                                    className="img-fluid"
                                                    alt="product img"
                                                />
                                            </div>
                                            <div className="w-75">
                                                <p>{item?.productId.title}</p>
                                                <p className='d-flex gap-3'>
                                                    Color:{' '}
                                                    <ul className="colors ps-0">
                                                        <li
                                                            style={{
                                                                backgroundColor: item?.title,
                                                            }}
                                                        ></li>
                                                    </ul>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="cart-col-2">
                                            <h5 className="price">$ {item?.price}</h5>
                                        </div>
                                        <div className="cart-col-3 d-flex align-items-center gap-15">
                                            <div>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name=""
                                                    id=""
                                                    value={item?.quantity}
                                                    min={1}
                                                    max={10}
                                                />
                                            </div>
                                            <div>
                                                <AiFillDelete className="text-danger" />
                                            </div>
                                        </div>
                                        <div className="cart-col-4">
                                            <h5 className="price">$ {item?.price * item?.quantity}</h5>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to="/product" className="button">
                                Continue to Shopping
                            </Link>
                            <div className="d-flex flex-column align-items-end">
                                <h4>SubTotal: $100</h4>
                                <p>Taxes and shipping calculated at checkout</p>
                                <Link to="/checkout" className="button">
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Cart;
