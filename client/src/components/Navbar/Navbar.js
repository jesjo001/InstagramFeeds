import React from 'react';
import { Menu, Input, Space } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, ImportOutlined, DashboardOutlined, ProfileOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import style from "./Navbar.css"

const { SubMenu } = Menu;
const { Search } = Input;
export default class Navbarnew extends React.Component {
    state = {
        current: 'mail',
    };

    styles = {
        nav: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'grey'
        }
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    onSearch = value => console.log(value);

    render() {
        const { current } = this.state;
        return (
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Space direction="horizontal" style={{ float: "right" }}>
                    <Menu.Item key="home" icon={<AppstoreOutlined />}>
                        <Link to="/">
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="feeds" icon={<ImportOutlined />}>
                        <Link to="/feeds" >Feeds</Link>
                    </Menu.Item>
                    <Menu.Item key="upload" icon={<ProfileOutlined />}>
                        <Link to="/upload" >Upload</Link>
                    </Menu.Item>
                </Space>

                <Space direction="horizontal" style={{}}>
                    <Menu.Item key="login" icon={<MailOutlined />}>
                        <Link to="/login" >Login </Link>
                    </Menu.Item>
                    <Menu.Item key="login" icon={<MailOutlined />}>
                        <Link to="/register" >Register </Link>
                    </Menu.Item>

                    <Search placeholder="input search text" onSearch={this.onSearch} style={{ width: 200, marginTop: "5px" }} />
                </Space>

            </Menu>
        );
    }
}

