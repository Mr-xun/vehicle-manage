import React, { PureComponent as Component } from 'react'
import api from "../../api/index";
import { Card, Table, message, Divider, Button, Input, } from "antd";
import Edit from './components/Edit'
const { Column } = Table;
export default class User extends Component {
    constructor() {
        super()
        this.state = {
            tableData: [],
            editInfo: {},
            loading: false,
            modalVisible: false,
            pointName: '',
            pointPhone: '',
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
        }
        this.search = this.search.bind(this)
        this.openEditModal = this.openEditModal.bind(this);
        this.cancelEditModal = this.cancelEditModal.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }
    //打开编辑弹层
    openEditModal(type, title, editInfo = {}) {
        this.setState({
            modalVisible: true,
            type,
            title,
            editInfo
        });
    }
    //关闭编辑弹层
    cancelEditModal() {
        this.setState({
            modalVisible: false
        });
    }
    componentDidMount() {
        this.getTableData()
    }
    //更改查询条件
    searchIptChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value,
        })
    };
    //查询
    search() {
        this.getTableData()
    }
    //更改分页
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        }, () => {
            this.getTableData()

        });
    };
    //获取table数据
    getTableData() {
        let { pointName, pointPhone, pagination: { current, pageSize } } = this.state;
        let params = {
            pageNum: current,
            pageSize: pageSize,
        };
        if (pointName) params.pointName = pointName
        if (pointPhone) params.pointPhone = pointPhone
        this.setState({
            loading: true
        });
        api.getServiceList(params).then(res => {
            let { data, code, msg } = res.data;
            const pagination = { ...this.state.pagination };
            if (code === 200) {
                pagination.total = data.total
                this.setState({
                    tableData: data.list,
                    pagination
                });
            } else {
                pagination.total = 0
                message.warning(msg);
                this.setState({
                    tableData: [],
                    pagination
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    //删除
    delService({ pointId }) {
        let params = { pointId };
        api.deleteService(params).then(res => {
            let { code, msg } = res.data;
            if (code === 200) {
                message.success("删除成功");
                this.getTableData()
            } else {
                message.error(msg);
            }
        });
    }
    render() {
        let { loading, tableData, type, title, editInfo, modalVisible, pointName, pointPhone, pagination } = this.state;
        return (
            <div className="main-container user-container">
                <Card>
                    <div className="search-wrapper">
                        <Input placeholder="服务点名称" name='pointName' value={pointName}
                            onChange={this.searchIptChange} className='filter-item search-item' />
                        <Input placeholder="服务点电话" name='pointPhone' value={pointPhone}
                            onChange={this.searchIptChange} className='filter-item search-item' />
                        <Button type="primary" onClick={this.search} className='filter-item '>
                            查询
                        </Button>
                        <Button type="primary" onClick={() => { this.openEditModal('add', '新增服务点') }} className='filter-item '>
                            新增
                        </Button>
                    </div>
                    <Table loading={loading} pagination={pagination} dataSource={tableData} onChange={this.handleTableChange} rowKey={record => record.studentId}>
                        <Column title="服务点ID" dataIndex="pointId" key="pointId" align='center' />
                        <Column title="服务点名称" dataIndex="pointName" key="pointName" align='center' />
                        <Column title="服务点地址" dataIndex="pointAddress" key="pointAddress" align='center' />
                        <Column title="可停放数量" dataIndex="totalSize" key="totalSize" align='center' />
                        <Column title="已停放数量" dataIndex="currentSize" key="currentSize" align='center' />
                        <Column title="服务点电话" dataIndex="pointPhone" key="pointPhone" align='center' />
                        <Column title="备注" dataIndex="note" key="note" align='center' />
                        <Column
                            title="操作"
                            key="action"
                            align='center'
                            render={(text, editInfo) => (
                                <span>
                                    <Button
                                        size="small"
                                        type="link"
                                        onClick={() => {
                                            this.delService(editInfo);
                                        }}
                                    >
                                        删除
                                    </Button>
                                    <Divider type="vertical" />
                                    <Button
                                        size="small"
                                        type="link"
                                        onClick={() => {
                                            this.openEditModal('edit', '编辑服务点', editInfo);
                                        }}
                                    >
                                        编辑
                                    </Button>
                                </span>
                            )}
                        />
                    </Table>

                </Card>
                <Edit
                    type={type}
                    editInfo={editInfo}
                    title={title}
                    visible={modalVisible}
                    onSuccess={this.getTableData}
                    onClose={this.cancelEditModal}
                />
            </div>
        )
    }
}