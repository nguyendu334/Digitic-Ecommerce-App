import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getCoupons } from './../features/coupons/couponSlice';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Expire Date',
        dataIndex: 'expiry',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const CouponList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoupons());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const couponState = useSelector((state) => state.coupons.coupons);
    const data1 = [];
    for (let i = 0; i < couponState.length; i++) {
        data1.push({
            key: i + 1,
            name: couponState[i].name,
            expiry: new Date(couponState[i].expiry).toLocaleString(),
            discount: couponState[i].discount,
            action: (
                <>
                    <Link to="/" className="fs-3 text-danger">
                        <BiEdit />
                    </Link>
                    <Link to="/" className="fs-3 ms-3 text-danger">
                        <AiFillDelete />
                    </Link>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Coupons List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default CouponList;
