import axios from "axios";
import { getTokenType, getToken } from '../utils/auth';
import {
    message
} from 'antd';
import db from '../utils/localstorage'

const baseURL = ''
let instance = axios.create({
    baseURL,
    withCredentials: true,//携带cookie
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
        function (data) {
            // 请求参数的格式
            let newData = "";
            for (let k in data) {
                newData +=
                    encodeURIComponent(k) +
                    "=" +
                    encodeURIComponent(data[k]) +
                    "&";
            }
            return newData;
        }
    ]
});
instance.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] =
                getTokenType() + getToken();
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// http响应拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            const errorMessage =
                error.response.data === null
                    ? '系统内部异常，请联系网站管理员'
                    : error.response.data.message;
            switch (error.response.status) {
                case 404:
                    message.error('很抱歉，资源未找到');
                    break;
                case 403:
                    message.error('很抱歉，您暂无该操作权限');
                    break;
                case 401:
                    message.error('很抱歉，认证已失效，请重新登录');
                    db.clear();
                    break;
                case 500:
                    message.error('服务异常');
                    break;
                default:
                    message.error(errorMessage);
                    break;
            }
        }
        return Promise.reject(error);
    }
);
export default instance;
