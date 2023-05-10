import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomInput from './../components/CustomInput';
import { uploadImg, deleteImg } from '../features/upload/uploadSlice';
import { createBlogs, resetState } from '../features/blogs/blogSlice';
import { getBlogCategories } from './../features/blogCategory/blogCategorySlice';

let schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
});

const AddBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBlogCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const imgState = useSelector((state) => state.upload.images);
    const blogCategoryState = useSelector((state) => state.blogCategories.categories);
    const newBlog = useSelector((state) => state.blogs);

    const { isSucess, isError, isLoading, createBlog } = newBlog;

    useEffect(() => {
        if (isSucess && createBlog) {
            toast.success('Blog added successfully!');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSucess, isError, isLoading]);

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        formik.values.images = img;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [img]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: '',
            images: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBlogs(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                dispatch(deleteImg());
                navigate('/admin/blog-list');
            }, 500);
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Blog</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Blog Title"
                        name="title"
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')}
                        val={formik.values.title}
                    />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>

                    <select
                        name="category"
                        onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')}
                        value={formik.values.category}
                        className="form-control py-3 mt-4"
                        id=""
                    >
                        <option value="select-category">Select Category</option>
                        {blogCategoryState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>

                    <div className="error">{formik.touched.category && formik.errors.category}</div>

                    <div>
                        <label htmlFor="" className="m-2">
                            Product Description
                        </label>
                        <ReactQuill
                            theme="snow"
                            name="description"
                            onChange={formik.handleChange('description')}
                            value={formik.values.description}
                        />
                    </div>

                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>

                    <div className="bg-white border-1 text-center py-3 mt-3">
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className="mb-0">
                                            Drag 'n' drop some files here, or click to select files
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="show-images d-flex flex-wrap mt-3 gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className="position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(deleteImg(i.public_id))}
                                        className="btn-close position-absolute bg-white rounded-circle"
                                        style={{ top: '10px', right: '10px' }}
                                    ></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            );
                        })}
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5">
                        Add Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
