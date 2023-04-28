import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import CustomInput from '../components/CustomInput';

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const AddProduct = () => {
    const [desc, setDesc] = useState('');
    const handleDesc = (e) => {
        setDesc(e);
    };
    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <div>
                <form action="">
                    <CustomInput type="text" label="Product Title" />
                    
                    <div className="mb-3">
                        <label htmlFor="" className='m-2'>Product Description</label>
                        <ReactQuill
                            theme="snow"
                            value={desc}
                            onChange={(evt) => {
                                handleDesc(evt);
                            }}
                        />
                    </div>

                    <CustomInput type="number" label="Product Price" />

                    <select name="" className="form-control py-3 mb-4" id="">
                        <option value="">Select Brand</option>
                    </select>

                    <select name="" className="form-control py-3 mb-4" id="">
                        <option value="">Select Category</option>
                    </select>

                    <select name="" className="form-control py-3 mb-4" id="">
                        <option value="">Select Color</option>
                    </select>

                    <CustomInput type="number" label="Product Quantity" />

                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading
                            company data or other banned files.
                        </p>
                    </Dragger>

                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
