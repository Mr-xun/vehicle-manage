import React, { PureComponent as Component } from 'react'
import { Card, } from "antd";
export default class ContactUs extends Component {
    render() {
        return (
            <div className='contactus-container '>
                <Card>
                    <h4 className='title f28'>联系我们</h4>
                    <p className='pt-row'>高校车辆管理（GaoXiaoCheLiangGuanLi）</p>
                    <p className='pt-row'>地址：江苏省徐州市x区xx路188号xx学院</p>
                    <p className='pt-row'>传真：010-12345678</p>
                    <p className='pt-row'>邮政编码：221000</p>
                    <p className='pt-row'>办公室：B18-12345678</p>
                    <p className='pt-row'>工作时间：周一~周五 08:30~17:30</p>
                    <p className='pt-row'>公众号：CheLiangGuanLi-Han</p>
                    <p className='pt-row'>意见反馈联系：18123456789/18987654321</p>
                </Card>

            </div>
        )
    }
}