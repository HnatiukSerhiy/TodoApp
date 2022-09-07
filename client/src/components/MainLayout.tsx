import {Layout, Menu, Space} from 'antd';
import React from 'react';
import {ItemType} from "antd/es/menu/hooks/useItems";
import {Link, useLocation} from "react-router-dom";
import {Path} from "../utils/path";
import './Layout.css';
import AppRouter from "./AppRouter";

export const items: ItemType[] = [
    {
        key: Path.Todos,
        label: (
            <div>
                {
                    <Link style={{color: "white"}} to={Path.Todos}>
                        <Space>Todos</Space>
                    </Link>
                }
            </div>
        )
    },
    {
        key: Path.Categories,
        label: (
            <div>
                {
                    <Link style={{color: "white"}} to={Path.Categories}>
                        <Space>Categories</Space>
                    </Link>
                }
            </div>
        )
    }
];

export const MainLayout = (): JSX.Element => {
    const { Header, Content } = Layout;
    const location = useLocation();

    return (
        <Layout className="layout">
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[location.pathname === '/todos' ?
                        Path.Todos :
                        location.pathname]
                    }
                    items={items}
                />
            </Header>
            <Content>
                <div className="site-layout-content">
                    <AppRouter />
                </div>
            </Content>
        </Layout>
    );
}

export default MainLayout;