import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomInput from './../components/CustomInput';
import { login } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(login(values));
        },
    });

    const { user, isLoading, isError, isSucess, message } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!user == null || isSucess) {
            navigate('admin');
        } else {
            navigate('/');
        }
    }, [user, isLoading, isError, isSucess, message]);

    return (
        <div className="py-5" style={{ background: '#F7E1AE', minHeight: '100vh' }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
                <h3 className="text-center">Login</h3>
                <p className="text-center">Login to your account to continue.</p>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        name="email"
                        val={formik.values.email}
                        onCh={formik.handleChange('email')}
                        label="Email"
                        i_id="email"
                    />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="password"
                        name="password"
                        val={formik.values.password}
                        onCh={formik.handleChange('password')}
                        label="Password"
                        i_id="password"
                    />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="mb-3 text-end">
                        <Link to="/forgot-password" className="float-right">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        className="border-0 px-3 py-2 text-dark fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{ background: '#F7E1AE' }}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
