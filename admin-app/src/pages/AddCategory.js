import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createProdCategories, resetState } from '../features/prodCategory/ProdCategorySlice';

let schema = Yup.object().shape({
    title: Yup.string().required('Product Category name is required'),
});

const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newProdCategory = useSelector((state) => state.prodCategories);

    const { isSucess, isError, isLoading, createProdCategory } = newProdCategory;

    useEffect(() => {
        if (isSucess && createProdCategory) {
            toast.success('Product Category added successfully!');
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
            dispatch(createProdCategories(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                navigate('/admin/category-list');
            }, 500);
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Category</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Category Name"
                        name="title"
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')}
                        val={formik.values.title}
                    />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>

                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
