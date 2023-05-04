import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'antd/es/typography/Link';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getBlogCategory } from '../features/blogCategory/blogCategorySlice';

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

const BlogCategoryList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogCategory());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const blogCategoryState = useSelector((state) => state.blogCategories.categories);
    const data1 = [];
    for (let i = 0; i < blogCategoryState.length; i++) {
        data1.push({
            key: i + 1,
            name: blogCategoryState[i].title,
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
            <h3 className="mb-4 title">Blog Categories List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default BlogCategoryList;
