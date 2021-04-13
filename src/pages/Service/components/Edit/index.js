import React, { Component } from "react";
import { Modal, message, Form, Input, Select } from "antd";
import api from "../../../../api/index";
const { Option } = Select;
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
            let url = type === 'add' ? 'addService' : 'updateService'
            if (type === 'edit') {
                params.pointId = editInfo.pointId
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
        let { visible, title, editInfo: { pointName = '', pointAddress = '', note = '', pointPhone = '', totalSize = '', currentSize = '' } } = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
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
                            <Form.Item label="服务点名称" {...formItemLayout}>
                                {getFieldDecorator("pointName", {
                                    initialValue: pointName,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入服务点名称!"
                                        }
                                    ]
                                })(<Input placeholder='服务点名称' />)}
                            </Form.Item>
                            <Form.Item label="服务点地址" {...formItemLayout}>
                                {getFieldDecorator('pointAddress', {
                                    initialValue: pointAddress,
                                    rules: [
                                        { required: true, message: '请选择服务点地址' },
                                    ],
                                })(
                                    <Select placeholder="请选择服务点地址">
                                        <Option value="西大门">西大门</Option>
                                        <Option value="东大门">东大门</Option>
                                        <Option value="教学楼">教学楼</Option>
                                        <Option value="图书馆">图书馆</Option>
                                        <Option value="食堂">食堂</Option>
                                        <Option value="宿舍楼">宿舍楼</Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="服务点电话" {...formItemLayout}>
                                {getFieldDecorator("pointPhone", {
                                    initialValue: pointPhone,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入服务点电话!"
                                        }
                                    ]
                                })(<Input placeholder='服务点电话' />)}
                            </Form.Item>
                            <Form.Item label="备注" {...formItemLayout}>
                                {getFieldDecorator("note", {
                                    initialValue: note,
                                })(<Input placeholder='备注' />)}
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
