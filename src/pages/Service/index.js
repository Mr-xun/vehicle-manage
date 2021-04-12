import React, { PureComponent as Component } from 'react'
import api from "../../api/index";
import { Card, Table, message, Spin, Divider, Button, Input, } from "antd";
import EditUser from './components/EditUser'
const { Column } = Table;

export default class User extends Component {
    constructor() {
        super()
        this.state = {
            tableData: [
                {
                    name: 'test',
                    serviceId: 1001,
                    tel: 17810204418,
                    remark: '备注',
                    address:'test地址'
                }, {
                    name: 'test2',
                    serviceId: 1002,
                    tel: 17810204418,
                    remark: '备注',
                    address:'test1地址'
                }
            ],
            loading: false,
            modalVisible: false,
        }
        this.openEditModal = this.openEditModal.bind(this);
        this.cancelEditModal = this.cancelEditModal.bind(this);
        this.search = this.search.bind(this)
    }
    //打开编辑弹层
    openEditModal(type, title) {
        this.setState({
            modalVisible: true,
            type,
            title
        });
    }
    //关闭编辑弹层
    cancelEditModal(){
        this.setState({
            modalVisible: false
        });
    }
    //查询
    search() {
        this.getTableData()
    }
    //获取table数据
    getTableData() {
        let params = {};
        this.setState({
            loading: true
        });
        api.getWaterHisTableData(params).then(res => {
            let { data, code } = res.data;
            if (code === 0) {
                data.forEach((item, index) => {
                    item.key = index;
                });
                this.setState({
                    tableData: data
                });
            } else {
                message.warning(res.data.message);
                this.setState({
                    tableData: []
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    delRecord({ curTime }) {
        let params = { cur_time: curTime };
        api.delWaterRecord(params).then(res => {
            let { code } = res.data;
            if (code === 0) {
                message.success("剔除成功");
            } else {
                message.warning(res.data.message);
            }
            this.getTableData();
        });
    }
    render() {
        let { loading, tableData, type, title,  modalVisible } = this.state;
        return (
            <div className="main-container user-container">
                <Card>
                    <div className="search-wrapper">
                        <Input placeholder="服务点名称" className='filter-item search-item' />
                        <Input placeholder="服务电话" className='filter-item search-item' />
                        <Button type="primary" onClick={this.search} className='filter-item '>
                            查询
                        </Button>
                        <Button type="primary" onClick={this.openEditModal} className='filter-item '>
                            新增
                        </Button>
                    </div>
                    <Spin spinning={loading}>
                        <Table pagination={true} dataSource={tableData}>
                            <Column
                                title="服务点ID"
                                dataIndex="serviceId"
                                key="avatar"
                                align='center'
                            />
                            <Column
                                title="服务点名称"
                                dataIndex="name"
                                key="name"
                                align='center'
                            />
                            <Column title="地址" dataIndex="address" key="address" align='center' />
                            <Column
                                title="服务电话"
                                dataIndex="tel"
                                key="tel"
                                align='center'
                            />
                            <Column
                                title="备注"
                                dataIndex="remark"
                                key="remark"
                                align='center'
                            />
                            <Column
                                title="操作"
                                key="action"
                                align='center'
                                render={(text, record) => (
                                    <span>
                                        <Button
                                            size="small"
                                            type="link"
                                            onClick={() => {
                                                this.delRecord(record);
                                            }}
                                        >
                                            删除
                                    </Button>
                                        <Divider type="vertical" />
                                        <Button
                                            size="small"
                                            type="link"
                                            onClick={() => {
                                                this.openEditModal(record);
                                            }}
                                        >
                                            编辑
                                    </Button>
                                    </span>
                                )}
                            />
                        </Table>
                    </Spin>

                </Card>
                <EditUser
                    type={type}
                    title={title}
                    visible={modalVisible}
                    onClose={this.cancelEditModal}
                />
            </div>
        )
    }
}