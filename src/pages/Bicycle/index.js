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
                    id: 1,
                    type: '自行车',
                    status: '正常',
                    remark: '备注',
                    buyTime:'2020-08-12'
                }, {
                    name: 'test2',
                    id: 2,
                    type: '自行车',
                    status: '正常',
                    remark: '备注',
                    buyTime:'2020-08-12'
                }
            ],
            loading: false,
            modalVisible: false,
        }
        this.openModal = this.openModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.search = this.search.bind(this)
    }
    openModal(type, title) {
        this.setState({
            modalVisible: true,
            type,
            title
        });
    }
    cancelModal() {
        this.setState({
            modalVisible: false
        });
    }
    search() {
        this.getTableData()
    }
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
                        <Input placeholder="单车号" className='filter-item search-item' />
                        <Input placeholder="单车名称" className='filter-item search-item' />
                        <Button type="primary" onClick={this.search} className='filter-item '>
                            查询
                        </Button>
                        <Button type="primary" onClick={this.openModal} className='filter-item '>
                            新增
                        </Button>
                    </div>
                    <Spin spinning={loading}>
                        <Table pagination={true} dataSource={tableData}>
                            <Column
                                title="图片"
                                dataIndex="image"
                                key="image"
                            />
                            <Column
                                title="单车号"
                                dataIndex="id"
                                key="id"
                                align='center'
                            />
                            <Column title="单车名" dataIndex="name" key="name" align='center' />
                            <Column
                                title="单车类型"
                                dataIndex="type"
                                key="type"
                                align='center'
                            />
                            <Column
                                title="购入时间"
                                dataIndex="buyTime"
                                key="buyTime"
                                align='center'
                            />
                            <Column
                                title="目前状态"
                                dataIndex="status"
                                key="status"
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
                                                this.openModal(record);
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
                    onClose={this.cancelModal}
                />
            </div>
        )
    }
}