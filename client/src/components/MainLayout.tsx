import {Layout, Menu, Select, Space, Tooltip} from 'antd';
import React from 'react';
import {ItemType} from "antd/es/menu/hooks/useItems";
import {Link, useLocation} from "react-router-dom";
import {Path} from "../enums/path";
import './Layout.css';
import AppRouter from "./AppRouter";
import {DataProviderEnum} from "../enums/utilsEnum";
import {useActions, useAppSelector} from "../hooks";
import {selectDataProvider} from "../store/selectors/dataProviderSelectors";
import {changeDataProviderApiAction} from "../store/actions/dataProviderApiActions";

const items: ItemType[] = [
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
    const { Option } = Select;
    const {changeDataProviderApiAction} = useActions();
    const location = useLocation();

    const currentDataProvider = useAppSelector(selectDataProvider);
    const handleDataProviderSelect = (value: DataProviderEnum) => changeDataProviderApiAction(value);

    return (
        <Layout className="layout">
            <Header style={{position: 'relative'}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[location.pathname === '/todos' ?
                        Path.Todos :
                        location.pathname]
                    }
                    items={items}
                />
                <div style={{position: "absolute", top: 0 , right: 50}}>
                    <Select disabled={true} defaultValue={currentDataProvider} onChange={handleDataProviderSelect} >
                        <Option value={DataProviderEnum.SQLServer}>SQL Server</Option>
                        <Option value={DataProviderEnum.XMLStorage}>XML Storage</Option>
                    </Select>
                </div>
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