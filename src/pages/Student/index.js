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
                    studentId: 1,
                    sex:'男',
                    idCard:12222,
                    mail:'123@163.com',
                    dep:'信息科学与工程学院',
                    major:'软件工程',
                    tel: 17810204418,
                    remark: '备注'
                }, {
                    name: 'test2',
                    studentId: 2,
                    sex:'男',
                    idCard:13333,
                    mail:'456@163.com',
                    dep:'信息科学与工程学院',
                    major:'软件工程',
                    tel: 17810204418,
                    remark: '备注'
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
        let { loading, tableData, type, title, modalVisible } = this.state;
        return (
            <div className="main-container user-container">
                <Card>
                    <div className="search-wrapper">
                        <Input placeholder="姓名" className='filter-item search-item' />
                        <Input placeholder="电话" className='filter-item search-item' />
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
                                title="头像"
                                dataIndex="avatar"
                                key="avatar"
                            />
                            <Column
                                title="学生号"
                                dataIndex="studentId"
                                key="studentId"
                                align='center'
                            />
                            <Column title="学生名" dataIndex="name" key="name" align='center' />
                            <Column
                                title="性别"
                                dataIndex="sex"
                                key="sex"
                                align='center'
                            />
                            <Column
                                title="身份证"
                                dataIndex="idCard"
                                key="idCard"
                                align='center'
                            /> <Column
                                title="邮箱"
                                dataIndex="mail"
                                key="mail"
                                align='center'
                            />
                            <Column
                                title="电话"
                                dataIndex="tel"
                                key="tel"
                                align='center'
                            />
                            <Column
                                title="院系"
                                dataIndex="dep"
                                key="dep"
                                align='center'
                            />
                            <Column
                                title="专业"
                                dataIndex="major"
                                key="major"
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