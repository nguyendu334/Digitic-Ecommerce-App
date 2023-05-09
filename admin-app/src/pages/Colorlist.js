import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getColors } from './../features/colors/colorSlice';

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
        title: 'Action',
        dataIndex: 'action',
    },
    
];

const Colorlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const colorState = useSelector((state) => state.colors.colors);
    const data1 = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            name: colorState[i].title,
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
            <h3 className="mb-4 title">Colors List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default Colorlist;
