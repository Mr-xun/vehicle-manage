/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
} from "react-router-dom";
import { connect } from 'react-redux'
import "./index.scss";
import { getRootPath } from "../utils";
import User from "../pages/User";
import Service from "../pages/Service";
import Bicycle from "../pages/Bicycle";
import Student from "../pages/Student";
import ContactUs from "../pages/ContactUs";
import NotFound from '../pages/NotFound/index'
import db from '../utils/localstorage'
import api from "../api/index";

import { Layout, Menu, Dropdown, Icon, message } from "antd";
const { Header, Sider, Content } = Layout;
const mapStateToProps = (state) => {
    return {
        user: state.userInfo.user
    }
}
class ContentWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultKeys: "/user"
        };
        this.logout = this.logout.bind(this)
    }
    componentWillMount() {
        this.setState({
            defaultKeys: getRootPath()
        });
    }
    logout() {
        api.userLogout().then(res => {
            let { code, msg } = res.data;
            if (code === 200) {
                this.props.history.push("/login")
                db.clear();
            } else {
                message.error(msg)
            }
        });
    }
    render() {
        let { defaultKeys } = this.state;
        let { username = '', roleName = '', cellphone = '' } = this.props.user
        const menu = (
            <Menu className='user-info'>
                <Menu.Item >
                    <Icon type="user" />{roleName}
                </Menu.Item>
                <Menu.Item >
                    <Icon type="phone" />{cellphone}
                </Menu.Item>
                <Menu.Item onClick={this.logout}>
                    <Icon type="logout" />
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout className="wrapper">
                <Header className='flex-between-center'>
                    <div className="head-logo"></div>
                    <h1 className="head-title">高校车辆管理</h1>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link user-name" onClick={e => e.preventDefault()}>
                            {username}<Icon type="down" />
                        </a>
                    </Dropdown>
                </Header>
                <Layout>
                    <Router>
                        <Sider>
                            <Menu
                                style={{ height: "100%" }}
                                defaultSelectedKeys={[defaultKeys]}
                                mode="inline"
                            >
                                <Menu.Item key="/user">
                                    <NavLink exact to="/user">
                                        <Icon type="user" />
                                        用户管理
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/bicycle">
                                    <NavLink exact to="/bicycle">
                                        <Icon type="car" />
                                        车辆管理
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/servcie">
                                    <NavLink exact to="/servcie">
                                        <Icon type="gold" />
                                        服务点管理
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/student">
                                    <NavLink exact to="/student">
                                        <Icon type="contacts" />
                                        车主管理
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/contact-us">
                                    <NavLink exact to="/contact-us">
                                        <Icon type="aliwangwang" />
                                        联系我们
                                    </NavLink>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content>
                            <Switch>
                                <Route
                                    exact
                                    path="/user"
                                    component={User}
                                ></Route>
                                <Route
                                    exact
                                    path="/bicycle"
                                    component={Bicycle}
                                ></Route>
                                <Route
                                    exact
                                    path="/servcie"
                                    component={Service}
                                ></Route>
                                <Route
                                    exact
                                    path="/student"
                                    component={Student}
                                ></Route>
                                 <Route
                                    exact
                                    path="/contact-us"
                                    component={ContactUs}
                                ></Route>
                                <Route component={NotFound} />
                            </Switch>
                        </Content>
                    </Router>
                </Layout>
            </Layout>
        );
    }
}
export default connect(mapStateToProps, null)(ContentWrap)
