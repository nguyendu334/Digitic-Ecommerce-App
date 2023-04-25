import React from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import '../styles/Blogs/SingleBlogPageStyles.css';
import { Link } from 'react-router-dom';

const SingleBlog = () => {
    return (
        <>
            <Meta title={'Blogs'} />
            <BreadCrumb title="Dynamic Blog Name" />
            <div className="blog-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="single-blog-card">
                                <Link to="/blogs" className='d-flex align-items-center gap-10'>
                                    <HiOutlineArrowLeft className='fs-4'/>
                                    Go back to Blogs
                                </Link>
                                <h3 className="title">A Beatiful Sunday Morning Renaissance</h3>
                                <img
                                    src="images/blog-1.jpg"
                                    className="img-fluid ,y-4 w-100"
                                    alt="blog"
                                />
                                <p>
                                    Consectetur anim commodo aute sint mollit excepteur fugiat ad
                                    adipisicing do ipsum sunt.Eiusmod ea sint aute officia ea enim
                                    reprehenderit ad mollit laboris.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog;
