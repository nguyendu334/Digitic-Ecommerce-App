import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import '../../styles/Blogs/SingleBlogPageStyles.css';
import BreadCrumb from '../../components/BreadCrumb';
import Meta from '../../components/Meta';

import blog1 from '../../images/blog-1.jpg';
import Container from './../../components/Container';

const SingleBlog = () => {
    return (
        <>
            <Meta title={'Blogs'} />
            <BreadCrumb title="Dynamic Blog Name" />
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to="/blogs" className="d-flex align-items-center gap-10 mb-3">
                                <HiOutlineArrowLeft className="fs-4" />
                                Go back to Blogs
                            </Link>
                            <h3 className="title">A Beatiful Sunday Morning Renaissance</h3>
                            <img src={blog1} className="img-fluid my-4 w-100" alt="blog" />
                            <p>
                                Consectetur anim commodo aute sint mollit excepteur fugiat ad
                                adipisicing do ipsum sunt.Eiusmod ea sint aute officia ea enim
                                reprehenderit ad mollit laboris.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SingleBlog;
