import React, { Component } from "react";
import { Modal, message, Form, Input } from "antd";
import "./index.scss";
import api from "../../../../api/index";
class EditUser extends Component {
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
        let { form, type, getTableData } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let params = {
                [type]: fieldsValue.inputVal,
                [type + "_flag"]: fieldsValue.radioType
            };
            api.updateAlarmValue(params).then(res => {
                if (res.data.message === "success") {
                    message.success("修改成功");
                    getTableData();
                } else {
                    message.warning(res.data.message);
                }
                this.handleCancel();
            });
        });
    };
    
    //取消
    handleCancel() {
        this.props.onClose();
    }
    render() {
        let { visible, title } = this.props;
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
                        <Form layout="horizontal">
                            <Form.Item label="服务点" {...formItemLayout}>
                                {getFieldDecorator("name", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入服务点!"
                                        }
                                    ]
                                })(<Input placeholder='服务点名称' />)}
                            </Form.Item>
                            <Form.Item label="服务电话" {...formItemLayout}>
                                {getFieldDecorator("tel", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入服务电话!"
                                        }
                                    ]
                                })(<Input placeholder='服务电话' />)}
                            </Form.Item>
                            <Form.Item label="服务点地址" {...formItemLayout}>
                                {getFieldDecorator("address", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入服务点地址!"
                                        }
                                    ]
                                })(<Input placeholder='服务点地址' />)}
                            </Form.Item>
                            <Form.Item label="备注" {...formItemLayout}>
                                <Input placeholder='备注' />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}
EditUser = Form.create({ name: "validate" })(EditUser);
export default EditUser;
