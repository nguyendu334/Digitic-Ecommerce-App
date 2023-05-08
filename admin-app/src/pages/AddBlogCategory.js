import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createBlogCategories } from '../features/blogCategory/blogCategorySlice';

let schema = Yup.object().shape({
    title: Yup.string().required('Blog Category name is required'),
});

const AddBlogCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newBlogCategory = useSelector((state) => state.blogCategories);

    const { isSucess, isError, isLoading, createBlogCategory } = newBlogCategory;

    useEffect(() => {
        if (isSucess && createBlogCategory) {
            toast.success('Blog Category added successfully!');
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
            dispatch(createBlogCategories(values));
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/blog-category-list');
            }, 500);
        },
    });
    return (
        <div>
            <h3 className="mb-4 title">Add Blog Category</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Blog Category"
                        name="title"
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')}
                        val={formik.values.title}
                    />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>

                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                        Add Blog Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlogCategory;
