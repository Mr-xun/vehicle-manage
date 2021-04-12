import React, { Component } from "react";
import { Modal, message, Form, Input, Radio } from "antd";
import "./index.scss";
import api from "../../../../api/index";
class Edit extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        };
        this.handleCancel = this.handleCancel.bind(this);
    }    
    //提交
    handleSubmit = e => {
        let { form, type, onSuccess, editInfo } = this.props;
        form.validateFields((err, values) => {
            if (err) return;
            let params = {
                ...values
            };
            let url = type === 'add' ? 'addUser' : 'updateUser'
            if (type === 'edit') {
                params.userId = editInfo.userId
            }
            api[url](params).then(res => {
                let { code, msg } = res.data
                if (code === 200) {
                    onSuccess();
                    this.handleCancel();
                    message.success(msg);
                    form.resetFields()
                } else {
                    message.warning(msg);
                }
            });
        });
    };
    isDisable() {
        let { type } = this.props;
        return type === 'edit' ? true : false
    }    
    //取消
    handleCancel() {
        let { form } = this.props;
        this.props.onClose();
        form.resetFields()
    }
    render() {
        let { visible, type, title, editInfo: { account = '', username = '', password = '', cellphone = '', roleId = "" } } = this.props;
        if (type === 'edit') {
            password = '******'
        }
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="edit-content">
                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <Form layout="horizontal" >
                            <Form.Item label="账号" {...formItemLayout}>
                                {getFieldDecorator("account", {
                                    initialValue: account,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入账号!"
                                        }
                                    ]
                                })(<Input placeholder='账号' disabled={this.isDisable()} />)}
                            </Form.Item>
                            <Form.Item label="用户名" {...formItemLayout}>
                                {getFieldDecorator("username", {
                                    initialValue: username,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入用户名!"
                                        }
                                    ]
                                })(<Input placeholder='用户名' />)}
                            </Form.Item>
                            <Form.Item label="密码" {...formItemLayout}>
                                {getFieldDecorator("password", {
                                    initialValue: password,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入密码!"
                                        }
                                    ]
                                })(<Input type='password' placeholder='密码' disabled={this.isDisable()} />)}
                            </Form.Item>
                            <Form.Item label="电话" {...formItemLayout}>
                                {getFieldDecorator("cellphone", {
                                    initialValue: cellphone,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入电话!"
                                        }
                                    ]
                                })(<Input placeholder='电话' />)}
                            </Form.Item>
                            <Form.Item label="角色" {...formItemLayout}>
                                {getFieldDecorator("roleId", {
                                    initialValue: roleId,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择角色!"
                                        }
                                    ]
                                })(<Radio.Group >
                                    <Radio value={1}>管理员</Radio>
                                    <Radio value={2}>普通用户</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}
Edit = Form.create({ name: "validate" })(Edit);
export default Edit;
