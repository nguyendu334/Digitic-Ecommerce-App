import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createCoupons } from '../features/coupons/couponSlice';
import { resetState } from '../features/coupons/couponSlice';

let schema = Yup.object().shape({
    name: Yup.string().required('Coupon name is required'),
    expiry: Yup.date().required('Expiry date is required'),
    discount: Yup.number().required('Discount percentege is required'),
});

const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newCoupon = useSelector((state) => state.coupons);

    const { isSucess, isError, isLoading, createCoupon } = newCoupon;

    useEffect(() => {
        if (isSucess && createCoupon) {
            toast.success('Coupon added successfully!');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSucess, isError, isLoading]);

    const formik = useFormik({
        initialValues: {
            name: '',
            expiry: '',
            discount: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createCoupons(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                navigate('/admin/coupon-list');
            }, 500);
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Coupon</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        id="name"
                        type="text"
                        label="Coupon Name"
                        name="name"
                        onCh={formik.handleChange('name')}
                        onBl={formik.handleBlur('name')}
                        val={formik.values.name}
                    />

                    <div className="error">{formik.touched.name && formik.errors.name}</div>

                    <CustomInput
                        id="date"
                        type="date"
                        label="Expiry Date"
                        name="expiry"
                        onCh={formik.handleChange('expiry')}
                        onBl={formik.handleBlur('expiry')}
                        val={formik.values.expiry}
                    />

                    <div className="error">{formik.touched.expiry && formik.errors.expiry}</div>

                    <CustomInput
                        id="discount"
                        type="number"
                        label="Discount"
                        name="discount"
                        onCh={formik.handleChange('discount')}
                        onBl={formik.handleBlur('discount')}
                        val={formik.values.discount}
                    />

                    <div className="error">{formik.touched.discount && formik.errors.discount}</div>

                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                        Add Coupon
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCoupon;
