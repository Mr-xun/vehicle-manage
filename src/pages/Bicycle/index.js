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
            masterName: '',
            masterCellphone: '',
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
        let { masterName, masterCellphone, pagination: { current, pageSize } } = this.state;
        let params = {
            pageNum: current,
            pageSize: pageSize,
        };
        if (masterName) params.masterName = masterName
        if (masterCellphone) params.masterCellphone = masterCellphone
        this.setState({
            loading: true
        });
        api.getBicycleList(params).then(res => {
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
    delBicycle({ machineId }) {
        let params = { machineId };
        api.deleteBicycle(params).then(res => {
            let { code, msg } = res.data;
            if (code === 200) {
                message.success("删除成功");
                this.getTableData()
            } else {
                message.error(msg);
            }
        });
    }
    flMachineType(type) {
        const map = {
            1: '摩托车',
            2: '电动车',
            3: '自行车',
        }
        return <span>{map[type] || ''}</span>
    }
    flColorType(type) {
        const map = {
            1: '红色',
            2: '黑色',
            3: '白色',
            4: '蓝色',
            5: '绿色',
        }
        return <span>{map[type] || ''}</span>
    }
    render() {
        let { loading, tableData, type, title, editInfo, modalVisible, masterName, masterCellphone, pagination } = this.state;
        return (
            <div className="main-container ">
                <Card>
                    <div className="search-wrapper">
                        <Input placeholder="车主姓名" name='masterName' value={masterName}
                            onChange={this.searchIptChange} className='filter-item search-item' />
                        <Input placeholder="车主电话" name='masterCellphone' value={masterCellphone}
                            onChange={this.searchIptChange} className='filter-item search-item' />
                        <Button type="primary" onClick={this.search} className='filter-item '>
                            查询
                        </Button>
                        <Button type="primary" onClick={() => { this.openEditModal('add', '新增用户') }} className='filter-item '>
                            新增
                        </Button>
                    </div>
                    <Table loading={loading} pagination={pagination} dataSource={tableData} onChange={this.handleTableChange} rowKey={record => record.machineId}>
                        <Column
                            title="图片"
                            dataIndex="picture"
                            key="picture"
                            render={(url) => (
                                <img className='avatar' src={url} alt='' />
                            )}
                        />
                        <Column
                            title="车牌号"
                            dataIndex="carNumber"
                            key="carNumber"
                            align='center'
                        />
                        <Column title="车主姓名" dataIndex="masterName" key="masterName" align='center' />
                        <Column
                            title="车主电话"
                            dataIndex="masterCellphone"
                            key="masterCellphone"
                            align='center'
                        />
                        <Column title="车辆类型" dataIndex="machineType" key="machineType" align='center' render={(type) =>
                            this.flMachineType(type)
                        } />
                        <Column title="车辆颜色" dataIndex="colorType" key="colorType" align='center'
                            render={(type) =>
                                this.flColorType(type)
                            } />
                        <Column title="录入日期" dataIndex="entryTime" key="entryTime" align='center' />
                        <Column
                            title="操作"
                            key="action"
                            align='center'
                            render={(text, info) => (
                                <span>
                                    <Button
                                        size="small"
                                        type="link"
                                        onClick={() => {
                                            this.delBicycle(info);
                                        }}
                                    >
                                        删除
                                    </Button>
                                    <Divider type="vertical" />
                                    <Button
                                        size="small"
                                        type="link"
                                        onClick={() => {
                                            this.openEditModal('edit', '编辑用户', info);
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