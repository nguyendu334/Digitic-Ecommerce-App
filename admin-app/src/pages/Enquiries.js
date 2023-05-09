import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { getEnquiries } from './../features/enquiries/enquirySlice';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Enquiries = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEnquiries());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const enquiryState = useSelector((state) => state.enquiries.enquiries);
    const data1 = [];
    for (let i = 0; i < enquiryState.length; i++) {
        data1.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            comment: enquiryState[i].comment,
            mobile: enquiryState[i].mobile,
            date: new Date(enquiryState[i].createdAt).toLocaleString(),
            status: (
                <>
                    <select name="" id="" className="form-control form-select">
                        <option value="">Set Status</option>
                    </select>
                </>
            ),
            action: (
                <>
                    <Link to="/" className="fs-3 ms-1 text-danger">
                        <AiFillDelete />
                    </Link>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default Enquiries;
