import axios from "axios";

axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

axios.interceptors.request.use((config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');

    // 如果token存在，则将其添加到请求头中
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // 返回修改后的请求配置
    return config;
}, (error) => {
    // 请求错误处理
    return Promise.reject(error);
});
