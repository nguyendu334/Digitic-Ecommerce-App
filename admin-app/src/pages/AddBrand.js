import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createBrands } from '../features/brands/brandSlice';

let schema = Yup.object().shape({
    title: Yup.string().required('Brand name is required'),
});

const AddBrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newBrand = useSelector((state) => state.brands);

    const { isSucess, isError, isLoading, createBrand } = newBrand;

    useEffect(() => {
        if (isSucess && createBrand) {
            toast.success('Brand added successfully!');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSucess, isError, isLoading]);

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBrands(values));
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/brand-list');
            }, 500);
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Brand</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        id="brand"
                        type="text"
                        label="Brand Name"
                        name="title"
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')}
                        val={formik.values.title}
                    />

                    <div className="error">{formik.touched.title && formik.errors.title}</div>

                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                        Add Brand
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
