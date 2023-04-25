import React from 'react';
import '../styles/BlogCardStyles.css';
import { Link } from 'react-router-dom';

const BlogCard = () => {
    return (
        <div className="blog-card">
            <div className="card-image">
                <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
            </div>
            <div className="blog-content">
                <p className="date">1 Dec , 2023</p>
                <h5 className="title">A Beatiful Sunday Morning Renaissance</h5>
                <p className="desc">
                    Velit duis occaecat minim mollit esse exercitation voluptate aliqua laborum in
                    ipsum esse.
                </p>
                <Link to="/blog/:id" className="button">
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
