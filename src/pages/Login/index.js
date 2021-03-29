import React, { PureComponent as Component } from 'react'
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            passWord: ''
        }
    }
    render() {
        return (
            <div className='login-container'>
                登陆
            </div>
        );
    }
}