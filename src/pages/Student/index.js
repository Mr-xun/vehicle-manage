import React, { PureComponent as Component } from 'react'
import api from "../../api/index";
import { Card, Table, message, Divider, Button, Input, } from "antd";
import Edit from './components/Edit'
import './index.scss'
const { Column } = Table;
export default class User extends Component {
    constructor() {
        super()
        this.state = {
            tableData: [],
            editInfo: {},
            loading: false,
            modalVisible: false,
            flUserName: '',
            flCellPhone: '',
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
    cancelEditModal(){
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
        let { flUserName, flCellPhone, pagination: { current, pageSize } } = this.state;
        let params = {
            pageNum: current,
            pageSize: pageSize,
        };
        if (flUserName) params.username = flUserName
        if (flCellPhone) params.cellphone = flCellPhone
        this.setState({
            loading: true
        });
        api.getStudentList(params).then(res => {
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
    delStudent({ userId }) {
        let params = { userId };
        api.deleteStudent(params).then(res => {
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
        let { loading, tableData, type, title, editInfo, modalVisible, studentName, cellphone, pagination } = this.state;
        return (
            <div className="main-container user-container">
                <Card>
                    <div className="search-wrapper">
                        <Input placeholder="车主姓名" name='studentName' value={studentName}
                            onChange={this.searchIptChange} className='filter-item search-item' />
                        <Input placeholder="车主电话" name='cellphone' value={cellphone}
                            onChange={this.searchIptChange} className='filter-item search-item' />
                        <Button type="primary" onClick={this.search} className='filter-item '>
                            查询
                        </Button>
                        <Button type="primary" onClick={() => { this.openEditModal('add', '新增用户') }} className='filter-item '>
                            新增
                        </Button>
                    </div>
                    <Table loading={loading} pagination={pagination} dataSource={tableData} onChange={this.handleTableChange} rowKey={record => record.userId}>
                        <Column
                            title="头像"
                            dataIndex="headPortrait"
                            key="headPortrait"
                            render={(url) => (
                                <img className='avatar' src={url} alt='' />
                            )}
                        />
                        <Column
                            title="用户ID"
                            dataIndex="userId"
                            key="userId"
                            align='center'
                        />
                        <Column title="姓名" dataIndex="username" key="username" align='center' />
                        <Column
                            title="电话"
                            dataIndex="cellphone"
                            key="cellphone"
                            align='center'
                        />
                        <Column title="角色" dataIndex="roleName" key="roleName" align='center' />
                        <Column title="上次登录时间" dataIndex="recentLoginTime" key="recentLoginTime" align='center' />
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
                                            this.delStudent(editInfo);
                                        }}
                                    >
                                        删除
                                    </Button>
                                    <Divider type="vertical" />
                                    <Button
                                        size="small"
                                        type="link"
                                        onClick={() => {
                                            this.openEditModal('edit', '编辑用户', editInfo);
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