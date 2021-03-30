import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
} from "react-router-dom";
import "./index.scss";
import { getRootPath } from "../utils";
import User from "../pages/User";
import Service from "../pages/Service";
import Bicycle from "../pages/Bicycle";
import Student from "../pages/Student";
import NotFound from "../pages/NotFound";

import { Layout, Menu, Icon } from "antd";
const { Header, Sider, Content } = Layout;
export default class ContentWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultKeys: "/history"
        };
    }
    componentWillMount() {
        this.setState({
            defaultKeys: getRootPath()
        });
    }
    render() {
        let { defaultKeys } = this.state;
        return (
            <Layout className="wrapper">
                <Header>
                    <div className="head-logo"></div>
                    <h1 className="head-title"></h1>
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
                                        单车管理
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
                                        学生管理
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
                                <Route component={NotFound} />
                            </Switch>
                        </Content>
                    </Router>
                </Layout>
            </Layout>
        );
    }
}
