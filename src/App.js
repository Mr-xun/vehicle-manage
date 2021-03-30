import React from "react";
import "./App.scss";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import Layout from "./Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
const App = () => {
    return (
        <div className="App" style={{ height: "100%" }}>
            <ConfigProvider locale={zhCN}>
                <Router>
                    <Switch>
                        <Route exact path="/index" component={Index}></Route>
                        <Route exact path="/login" component={Login}></Route>

                        <Redirect exact path="/" to="/index"></Redirect>
                        <Route component={Layout} />
                    </Switch>
                </Router>
            </ConfigProvider>
        </div>
    );
};
export default App;
