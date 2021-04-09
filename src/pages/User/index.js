import React, { PureComponent as Component } from 'react'
import api from "../../api/index";
import { Card, Table, message, Divider, Button, Input, } from "antd";
import EditUser from './components/EditUser'
import './index.scss'
const { Column } = Table;
export default class User extends Component {
    constructor() {
        super()
        this.state = {
            tableData: [],
            user: {},
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
        this.openModal = this.openModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }
    openModal(type, title, user = {}) {
        this.setState({
            modalVisible: true,
            type,
            title,
            user
        });
    }
    cancelModal() {
        this.setState({
            modalVisible: false
        });
    }
    componentDidMount() {
        this.getTableData()
    }
    searchIptChange = ({ target: { name,value } }) => {
        this.setState({
            [name]: value,
        })
    };
    search() {
        this.getTableData()
    }
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        }, () => {
            this.getTableData()

        });
    };
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
        api.getUserList(params).then(res => {
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
                    tableData:[],
                    pagination
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    delUser({ userId }) {
        let params = { userId };
        api.deleteUser(params).then(res => {
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
        let { loading, tableData, type, title, user, modalVisible, flUserName, flCellPhone, pagination } = this.state;
        return (
            <div className="main-container user-container">
                <Card>
                    <div className="search-wrapper">
                        <Input placeholder="姓名" name='flUserName' value={flUserName}
                            onChange={this.searchIptChange}  className='filter-item search-item' />
                        <Input placeholder="电话"  name='flCellPhone' value={flCellPhone}
                            onChange={this.searchIptChange}  className='filter-item search-item' />
                        <Button type="primary" onClick={this.search} className='filter-item '>
                            查询
                        </Button>
                        <Button type="primary" onClick={() => { this.openModal('add', '新增用户') }} className='filter-item '>
                            新增
                        </Button>
                    </div>
                    <Table loading={loading} pagination={pagination} dataSource={tableData} onChange={this.handleTableChange} rowKey={record=>record.userId}>
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
                            render={(text, user) => (
                                <span>
                                    <Button
                                        size="small"
                                        type="link"
                                        onClick={() => {
                                            this.delUser(user);
                                        }}
                                    >
                                        删除
                                    </Button>
                                    <Divider type="vertical" />
                                    <Button
                                        size="small"
                                        type="link"
                                        onClick={() => {
                                            this.openModal('edit', '编辑用户', user);
                                        }}
                                    >
                                        编辑
                                    </Button>
                                </span>
                            )}
                        />
                    </Table>

                </Card>
                <EditUser
                    type={type}
                    user={user}
                    title={title}
                    visible={modalVisible}
                    onSuccess={this.getTableData}
                    onClose={this.cancelModal}
                />
            </div>
        )
    }
}