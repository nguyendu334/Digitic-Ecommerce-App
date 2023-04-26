import React, { useState } from 'react';
import { TbGitCompare } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import ReactStars from 'react-rating-stars-component';
import ReactImageZoom from 'react-image-zoom';
import BreadCrumb from '../../components/BreadCrumb';
import Meta from '../../components/Meta';
import ProductCard from '../../components/ProductCard';
import Color from '../../components/Color';
import '../../styles/Products/SingleProductPageStyles.css';
import Container from './../../components/Container';

const SingleProduct = () => {
    const props = {
        width: 400,
        height: 600,
        zoomWidth: 600,
        img: 'https://cdn.dribbble.com/users/2400293/screenshots/19766354/media/f00ba86ba0c81e959f855126e2d6a8ba.png?compress=1&resize=1000x750&vertical=top',
    };
    const [orderedProduct, setOrderedProduct] = useState(true);

    const copyToClipboard = (text) => {
        console.log('text', text);
        var textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    return (
        <>
            <Meta title={'Product Name'} />
            <BreadCrumb title="Product Name" />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            <div>
                                <img
                                    src="https://cdn.dribbble.com/users/2400293/screenshots/19766354/media/f00ba86ba0c81e959f855126e2d6a8ba.png?compress=1&resize=1000x750&vertical=top"
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://cdn.dribbble.com/users/2400293/screenshots/19766354/media/f00ba86ba0c81e959f855126e2d6a8ba.png?compress=1&resize=1000x750&vertical=top"
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://cdn.dribbble.com/users/2400293/screenshots/19766354/media/f00ba86ba0c81e959f855126e2d6a8ba.png?compress=1&resize=1000x750&vertical=top"
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://cdn.dribbble.com/users/2400293/screenshots/19766354/media/f00ba86ba0c81e959f855126e2d6a8ba.png?compress=1&resize=1000x750&vertical=top"
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title">
                                    Kids Headphone Bulk 10 Pack Multi Colored For Students
                                </h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">$100</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={3}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className="mb-0 t-review">( 2 Reviews )</p>
                                </div>
                                <a className="review-btn" href="#review">
                                    Write a Review
                                </a>
                            </div>
                            <div className="py-3">
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Type: </h3>
                                    <p className="product-data">Watch</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Brand: </h3>
                                    <p className="product-data">Havells</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Category: </h3>
                                    <p className="product-data">Watch</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Tags: </h3>
                                    <p className="product-data">Watch</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Availablity: </h3>
                                    <p className="product-data">In Stock</p>
                                </div>

                                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                    <h3 className="product-heading">Size: </h3>
                                    <div className="d-flex flex-wrap gap-15">
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            S
                                        </span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            M
                                        </span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            L
                                        </span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            XL
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                    <h3 className="product-heading">Color: </h3>
                                    <Color />
                                </div>
                                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                    <h3 className="product-heading">Quantity: </h3>
                                    <div className="">
                                        <input
                                            className="form-control"
                                            type="number"
                                            min={1}
                                            max={10}
                                            style={{
                                                width: '70px',
                                            }}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center gap-30 ms-5">
                                        <button className="button border-0" type="submit">
                                            Add to Cart
                                        </button>
                                        <button className="button buynow">Buy it Now</button>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-15">
                                    <div>
                                        <a href="">
                                            <TbGitCompare className="fs-5 me-2" />
                                            Add to Compare
                                        </a>
                                    </div>
                                    <div>
                                        <a href="">
                                            <AiOutlineHeart className="fs-5 me-2" />
                                            Add to Wishlist
                                        </a>
                                    </div>
                                </div>

                                <div className="d-flex gap-10 flex-column my-2">
                                    <h3 className="product-heading">Shipping & Returns</h3>
                                    <p className="product-data">
                                        Free shipping and returns available on all orders!
                                        <br /> We ship all us domestic orders within
                                        <b> 5-10 business days!</b>
                                    </p>
                                </div>

                                <div className="d-flex gap-10 align-items-center my-3">
                                    <h3 className="product-heading">Product Link</h3>
                                    <a
                                        href="javascript:void(0);"
                                        onClick={() => {
                                            copyToClipboard(
                                                'https://cdn.dribbble.com/users/2400293/screenshots/19766354/media/f00ba86ba0c81e959f855126e2d6a8ba.png?compress=1&resize=1000x750&vertical=top',
                                            );
                                        }}
                                    >
                                        Copy Product Link
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="bg-white p-3">
                            <p>
                                Quis dolore consequat commodo cillum exercitation nisi laborum esse
                                ipsum magna incididunt ut dolore.Eu laboris mollit laboris excepteur
                                eu ullamco do laboris culpa ad.Aute ea quis ullamco ex cillum in ex
                                dolore cupidatat.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="reviews-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id="review">Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className="mb-2">Cusstomer Reviews</h4>
                                    <div className="d-flex gap-10 align-items-center">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={3}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className="mb-0">Based on 2 Reviews</p>
                                    </div>
                                </div>

                                {orderedProduct && (
                                    <a className="text-decoration-underline" href="#">
                                        Write a review
                                    </a>
                                )}
                            </div>

                            <div className="review-form py-4">
                                <h4>Write a Review</h4>
                                <form action="" className="d-flex flex-column gap-15">
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={3}
                                            edit={true}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            type="text"
                                            placeholder="Comments"
                                            className="w-100 form-control"
                                            cols="30"
                                            rows="4"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="button border-0">Submit Review</button>
                                    </div>
                                </form>
                            </div>

                            <div className="reviews mt-4">
                                <div className="review">
                                    <div className="d-flex gap-10 align-items-center">
                                        <h6 className="mb-0">NavDeep</h6>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={3}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <p className="mt-3">
                                        Sint ullamco non et ut cillum magna laborum minim.Id
                                        deserunt Lorem consequat fugiat proident in velit
                                        Lorem.Occaecat veniam elit irure veniam incididunt cillum
                                        exercitation adipisicing fugiat cupidatat Lorem.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="popular-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                </div>
                <div className="row">
                    <ProductCard />
                </div>
            </Container>
        </>
    );
};

export default SingleProduct;
