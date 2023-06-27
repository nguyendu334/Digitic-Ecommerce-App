import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import BreadCrumb from '../../components/BreadCrumb';
import Meta from '../../components/Meta';
import '../../styles/Blogs/BlogPageStyles.css';
import BlogCard from '../../components/BlogCard';
import Container from './../../components/Container';
import { getAllBlogs } from '../../features/blogs/blogSlice';

const OurStore = () => {
    const dispatch = useDispatch();

    const blogState = useSelector((state) => state?.blog?.blogs);
    useEffect(() => {
        getBlogs();
    }, []);
    const getBlogs = () => {
        dispatch(getAllBlogs());
    };

    return (
        <>
            <Meta title={'Blogs'} />
            <BreadCrumb title="Blogs" />
            <Container className="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Find By Categories</h3>
                            <div>
                                <ul className="ps-0">
                                    <li>Watch</li>
                                    <li>Tv</li>
                                    <li>Camera</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-9">
                        <div className="row">
                            {blogState && blogState?.map((item, index) => {
                                return (
                                    <div key={index} className="col-6">
                                        <BlogCard
                                            id={item?._id}
                                            title={item?.title}
                                            description={item?.description}
                                            image={item?.images[0].url}
                                            date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default OurStore;
