import React, { Component } from "react";
import { Modal, message, Form, Input, Radio } from "antd";
import api from "../../../../api/index";
import moment from "moment";
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
            let url = type === 'add' ? 'addBicycle' : 'updateBicycle'
            if (type === 'edit') {
                params.machineId = editInfo.machineId
            } else {
                params.entryTime = moment(new Date()).format("YYYY-MM-DD")
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
        let { visible, title, editInfo: { masterName = '', masterCellphone = '', carNumber = '', machineType = "", colorType = '', note = '', } } = this.props;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 }
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
                                {getFieldDecorator("masterName", {
                                    initialValue: masterName,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入车主姓名!"
                                        }
                                    ]
                                })(<Input placeholder='车主姓名' />)}
                            </Form.Item>
                            <Form.Item label="车主电话" {...formItemLayout}>
                                {getFieldDecorator("masterCellphone", {
                                    initialValue: masterCellphone,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入车主电话!"
                                        }
                                    ]
                                })(<Input placeholder='车主电话' />)}
                            </Form.Item>
                            <Form.Item label="车牌号" {...formItemLayout}>
                                {getFieldDecorator("carNumber", {
                                    initialValue: carNumber,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入车牌号!"
                                        }
                                    ]
                                })(<Input placeholder='车牌号' />)}
                            </Form.Item>
                            <Form.Item label="车型" {...formItemLayout}>
                                {getFieldDecorator("machineType", {
                                    initialValue: machineType,
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择车型!"
                                        }
                                    ]
                                })(<Radio.Group >
                                    <Radio value={1}>摩托车</Radio>
                                    <Radio value={2}>电动车</Radio>
                                    <Radio value={3}>自行车</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                            <Form.Item label="颜色" {...formItemLayout}>
                                {getFieldDecorator("colorType", {
                                    initialValue: colorType
                                })(<Radio.Group >
                                    <Radio value={1}>红色</Radio>
                                    <Radio value={2}>黑色</Radio>
                                    <Radio value={3}>白色</Radio>
                                    <Radio value={4}>蓝色</Radio>
                                    <Radio value={5}>绿色</Radio>

                                </Radio.Group>)}
                            </Form.Item>

                            <Form.Item label="备注" {...formItemLayout}>
                                {getFieldDecorator("note", {
                                    initialValue: note
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
