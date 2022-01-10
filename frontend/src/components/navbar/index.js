import React, {useState} from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import './navbar.css'
import {
    useNavigate, Outlet,
} from 'react-router-dom';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function Navbar() {
    const [collapsed, setCollapsed] = useState(false)

    const navigate = useNavigate()

    function onCollapse() {
        setCollapsed(!collapsed)
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse()}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined/>} onClick={() => {
                        navigate('/dashboard')
                    }}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>} onClick={() => {
                        navigate('/blood-pressure')
                    }}>
                        Blood Pressure
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DesktopOutlined/>} onClick={() => {
                        navigate('/ecg-analysis')
                    }}>
                        ECG Analysis
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default Navbar