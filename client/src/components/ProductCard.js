import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Products/ProductCardStyles.css';

import prodcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import watch from '../images/watch.jpg';
import tab from '../images/tab.jpg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';

const ProductCard = (props) => {
    const { grid } = props;
    let location = useLocation();
    return (
        <>
            <div className={`${location.pathname === '/store' ? `gr-${grid}` : 'col-3'}`}>
                <Link to=":id" className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent'>
                            <img src={wish} alt="wishlist" />
                        </button>
                    </div>

                    <div className="product-image">
                        <img src={watch} className="img-fluid" alt="product" />
                        <img src={tab} className="img-fluid" alt="product" />
                    </div>

                    <div className="product-details">
                        <h6 className="brand">Havels</h6>
                        <h5 className="product-title">
                            Incididunt duis consequat amet minim duis fugiat.
                        </h5>
                        <ReactStars
                            count={5}
                            size={24}
                            value={3}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>
                            Qui non qui voluptate et laborum qui consectetur.Consectetur nostrud
                            ipsum aliqua labore ea.Est est quis voluptate laboris consequat esse ex
                            officia labore ullamco aliquip deserunt tempor.Aliqua magna id et
                            commodo.
                        </p>
                        <p className="price">$100</p>
                    </div>

                    <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                            <button className='border-0 bg-transparent'>
                                <img src={prodcompare} alt="compare" />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src={view} alt="view" />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src={addcart} alt="addcart" />
                            </button>
                        </div>
                    </div>
                </Link>
            </div>

            <div className={`${location.pathname === '/store' ? `gr-${grid}` : 'col-3'}`}>
                <Link className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent'>
                            <img src={wish} alt="wishlist" />
                        </button>
                    </div>

                    <div className="product-image">
                        <img src={watch} className="img-fluid" alt="product" />
                        <img src={tab} className="img-fluid" alt="product" />
                    </div>

                    <div className="product-details">
                        <h6 className="brand">Havels</h6>
                        <h5 className="product-title">
                            Incididunt duis consequat amet minim duis fugiat.
                        </h5>
                        <ReactStars
                            count={5}
                            size={24}
                            value={3}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>
                            Qui non qui voluptate et laborum qui consectetur.Consectetur nostrud
                            ipsum aliqua labore ea.Est est quis voluptate laboris consequat esse ex
                            officia labore ullamco aliquip deserunt tempor.Aliqua magna id et
                            commodo.
                        </p>
                        <p className="price">$100</p>
                    </div>

                    <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                            <button className='border-0 bg-transparent'>
                                <img src={prodcompare} alt="compare" />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src={view} alt="view" />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src={addcart} alt="addcart" />
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default ProductCard;
