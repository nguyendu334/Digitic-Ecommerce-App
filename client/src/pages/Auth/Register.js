import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import Meta from '../../components/Meta';
import '../../styles/Auth/AuthCardStyles.css';
import Container from './../../components/Container';
import CustomInput from '../../components/CustomInput';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <>
            <Meta title={'Register'} />
            <BreadCrumb title="Register" />

            <Container class1="login-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Register</h3>
                            <form action="" className="d-flex flex-column gap-15">
                                <CustomInput type="text" name="name" placeholder="User Name" />
                                <CustomInput type="email" name="email" placeholder="Email" />
                                <CustomInput type="tel" name="mobile" placeholder="Mobile" />
                                <CustomInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="mt-1"
                                />
                                <div>
                                    <div className="mt-3 d-flex justify-content-center gap-15 flex-column align-items-center">
                                        <button className="button border-0">Register</button>
                                        <Link to="/login">Cancel</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Register;
