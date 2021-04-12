import React, { Component } from "react";
import { Modal, message, Form, Input, Radio } from "antd";
import api from "../../../../api/index";
class Edit extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            value: ""
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
            let url = type === 'add' ? 'addStudent' : 'updateStudent'
            if (type === 'edit') {
                params.studentId = editInfo.studentId
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
    //取消
    handleCancel() {
        let { form } = this.props;
        this.props.onClose();
        form.resetFields()
    }
    render() {
        let { visible, title, editInfo: { studentName = '', studentCode = '', department = '', studentGrade = '', cellphone = '', gender = "" } } = this.props;
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
                            <Form.Item label="车主姓名" {...formItemLayout}>
                                {getFieldDecorator("studentName", {
                                    initialValue: studentName,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入车主姓名!"
                                        }
                                    ]
                                })(<Input placeholder='车主姓名' />)}
                            </Form.Item>
                            <Form.Item label="车主编号" {...formItemLayout}>
                                {getFieldDecorator("studentCode", {
                                    initialValue: studentCode,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入车主编号!"
                                        }
                                    ]
                                })(<Input placeholder='车主编号' />)}
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
                            <Form.Item label="性别" {...formItemLayout}>
                                {getFieldDecorator("gender", {
                                    initialValue: gender,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择性别!"
                                        }
                                    ]
                                })(<Radio.Group >
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                            <Form.Item label="院系" {...formItemLayout}>
                                {getFieldDecorator("department", {
                                    initialValue: department,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入院系!"
                                        }
                                    ]
                                })(<Input placeholder='院系' />)}
                            </Form.Item>
                            <Form.Item label="班级" {...formItemLayout}>
                                {getFieldDecorator("studentGrade", {
                                    initialValue: studentGrade,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入班级!"
                                        }
                                    ]
                                })(<Input placeholder='班级' />)}
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
