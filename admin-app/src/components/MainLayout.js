import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineBgColors,
    AiOutlineOrderedList,
    AiOutlinePicLeft,
    AiOutlinePicRight,
    AiOutlinePullRequest,
} from 'react-icons/ai';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategory } from 'react-icons/bi';
import { FaClipboardList, FaBloggerB } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im';
import { IoIosNotifications } from 'react-icons/io';

import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className="text-dark fs-5 text-center py-3 mb-0">
                        <span className="sm-logo">Dig</span>
                        <span className="lg-logo">Digitic</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === 'signout') {
                            navigate('/login');
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className="fs-4" />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className="fs-4" />,
                            label: 'Customers',
                        },
                        {
                            key: 'catalog',
                            icon: <AiOutlineShoppingCart className="fs-4" />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: 'product',
                                    icon: <AiOutlineShoppingCart className="fs-4" />,
                                    label: 'Add Product',
                                },
                                {
                                    key: 'product-list',
                                    icon: <AiOutlineShoppingCart className="fs-4" />,
                                    label: 'Product List',
                                },
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder className="fs-4" />,
                                    label: 'Brand',
                                },
                                {
                                    key: 'brand-list',
                                    icon: <SiBrandfolder className="fs-4" />,
                                    label: 'List Brand',
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategory className="fs-4" />,
                                    label: 'Category',
                                },
                                {
                                    key: 'list-category',
                                    icon: <BiCategory className="fs-4" />,
                                    label: 'List Category',
                                },
                                {
                                    key: 'color',
                                    icon: <AiOutlineBgColors className="fs-4" />,
                                    label: 'Color',
                                },
                                {
                                    key: 'color-list',
                                    icon: <AiOutlineBgColors className="fs-4" />,
                                    label: 'List Color',
                                },
                            ],
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboardList className="fs-4" />,
                            label: 'Orders',
                        },
                        {
                            key: 'blogs',
                            icon: <FaBloggerB className="fs-4" />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'blog',
                                    icon: <ImBlog className="fs-4" />,
                                    label: 'Add Blog',
                                },
                                {
                                    key: 'blog-list',
                                    icon: <FaClipboardList className="fs-4" />,
                                    label: 'Blog List',
                                },
                                {
                                    key: 'blog-category',
                                    icon: <ImBlog className="fs-4" />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <AiOutlineOrderedList className="fs-4" />,
                                    label: 'Blog Category List',
                                },
                            ],
                        },
                        {
                            key: 'enquiries',
                            icon: <AiOutlinePullRequest className="fs-4" />,
                            label: 'Enquiries',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className="d-flex justify-content-between ps-1 pe-5"
                    style={{ padding: 0, background: colorBgContainer }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '24px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="d-flex gap-4 align-items-center">
                        <div className="position-relative">
                            <IoIosNotifications className="fs-4" />
                            <span
                                style={{ width: '18px' }}
                                className="badge bg-danger rounded-circle p-1 position-absolute"
                            >
                                3
                            </span>
                        </div>
                        <div className="d-flex gap-3 align-items-center">
                            <div>
                                <img
                                    width={40}
                                    src="https://cdn4.buysellads.net/uu/1/50174/1564282856-carbon.png"
                                    alt=""
                                />
                            </div>
                            <div>
                                <h5 className="mb-0">Navdeep</h5>
                                <p className="mb-0">nguyendu334@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
