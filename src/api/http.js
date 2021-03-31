import axios from "axios";
import { getToken, getRefreshToken, getExpireTime } from '@/utils/auth';

const baseURL = 'http://39.106.109.80:8000'
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
                'bearer ' + getToken();
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// http响应拦截器
instance.interceptors.response.use(
    data => {
        return data;
    },
    error => {
        return Promise.reject(error);
    }
);
export default instance;
