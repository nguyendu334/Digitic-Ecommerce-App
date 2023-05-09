import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getCategories } from './../features/prodCategory/ProdCategorySlice';

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
        title: 'Action',
        dataIndex: 'action',
    },
];

const Categorylist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const categoryState = useSelector((state) => state.prodCategories.categories);
    const data1 = [];
    for (let i = 0; i < categoryState.length; i++) {
        data1.push({
            key: i + 1,
            name: categoryState[i].title,
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
            <h3 className="mb-4 title">Product Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default Categorylist;
