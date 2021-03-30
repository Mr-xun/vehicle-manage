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
    handleOk = e => {
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
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <Form layout="horizontal">
                            <Form.Item label="名称" {...formItemLayout}>
                                {getFieldDecorator("name", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入名称!"
                                        }
                                    ]
                                })(<Input placeholder='名称' />)}
                            </Form.Item>
                            <Form.Item label="电话" {...formItemLayout}>
                                {getFieldDecorator("tel", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入电话!"
                                        }
                                    ]
                                })(<Input placeholder='电话' />)}
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
