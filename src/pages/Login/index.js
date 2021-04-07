import React, { PureComponent as Component } from 'react'
import {
    Form, Input, message, Icon, Button, Row, Col,
} from 'antd';


import "./index.scss";
import api from "../../api/index";
import axios from 'axios';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Login extends Component {
    constructor() {
        super();
        this.state = {
            account: '',
            password: '',
            captchaImg: ''
        }
        this.getCaptchImg = this.getCaptchImg.bind(this)
    }
    componentDidMount() {
        this.getCaptchImg()
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params = {
                    ...values
                };
                api.userLogin(params).then(res => {
                    console.log(res, 888)
                });
            }
        });
    };
    getCaptchImg() {
        axios({
            method: 'GET',
            url: `http://39.106.109.80:8080/car/res/user/verify/login`,
            responseType: 'arraybuffer'
        })
            .then((res) => {
                return (
                    'data:image/png;base64,' +
                    btoa(
                        new Uint8Array(res.data).reduce(
                            (data, byte) =>
                                data + String.fromCharCode(byte),
                            ''
                        )
                    )
                );
            })
            .then((res) => {
                this.setState({
                    captchaImg: res
                })
            })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        };
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const { captchaImg } = this.state
        return (
            <div className='login-container'>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <Form.Item label="用户名" {...formItemLayout}>
                        {getFieldDecorator("account", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入用户名!"
                                }
                            ]
                        })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />)}
                    </Form.Item>
                    <Form.Item label="密码" {...formItemLayout}>
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入密码!"
                                }
                            ]
                        })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder='密码' />)}
                    </Form.Item>
                    <Form.Item label="验证码"  {...formItemLayout}>
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('verificationCode', {
                                    rules: [{ required: true, message: '请输入验证码' }],
                                })(<Input />)}
                            </Col>
                            <Col span={12}>
                                <img className='captch-img' src={captchaImg} alt='' onClick={this.getCaptchImg} />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item  {...formItemLayout}>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
Login = Form.create({ name: "validate" })(Login);
export default Login;