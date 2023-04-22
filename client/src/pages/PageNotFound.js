import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PageNotFoundStyles.css';

const PageNotFound = () => {
    return (
        <div className="pnf">
            <h1 className="pnf-title">404</h1>
            <h2 className="pnf-heading">Oop ! Page Not Found</h2>
            <Link to="/" className="pnf-btn">
                Go Back
            </Link>
        </div>
    );
};

export default PageNotFound;
