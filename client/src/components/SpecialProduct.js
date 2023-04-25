import React from 'react';
import ReactStars from 'react-rating-stars-component';
import '../styles/Products/SpecialProductStyles.css';
import { Link } from 'react-router-dom';

import watch from '../images/watch.jpg';

const SpecialProduct = () => {
    return (
        <div className="col-6 mb-3">
            <div className="special-product-card">
                <div className="d-flex justify-content-between">
                    <div>
                        <img src={watch} className="img-fluid" alt="watch" />
                    </div>

                    <div className="special-product-content">
                        <h5 className="brand">Havels</h5>
                        <h6 className="title">Cupidatat do ullamco dolor ipsum.</h6>
                        <ReactStars
                            count={5}
                            size={24}
                            value={4}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className="price">
                            <span className="red-p">$ 100</span> &nbsp; <strike>$ 200</strike>
                        </p>
                        <div className="discount-till d-flex align-items-center gap-10">
                            <p className="mb-0">
                                <b>500 </b>days
                            </p>
                            <div className="d-flex align-items-center gap-10">
                                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                                <span className="badge rounded-circle p-3 bg-danger">1</span>
                            </div>
                        </div>
                        <div className="prod-count my-3">
                            <p className="">Product: 5</p>
                            <div
                                className="progress"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div className="progress-bar" style={{ width: '25%' }} />
                            </div>
                        </div>

                        <Link className='button'>Add to cart</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialProduct;
