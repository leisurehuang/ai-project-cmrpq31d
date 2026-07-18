/**
 * Axios HTTP Client 封装
 * 提供统一的请求/响应拦截、Token 注入和全局错误处理
 */
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const request = axios.create({
  // 使用环境变量配置 baseURL，如果为空则走 Vite Proxy 的相对路径
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器：自动携带 Token
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一错误处理
request.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message: string | string[] }>) => {
    // 统一弹出错误提示
    let errMsg = '网络错误，请稍后重试';
    if (error.response) {
      const { status, data } = error.response;
      if (data?.message) {
        errMsg = Array.isArray(data.message) ? data.message.join(';') : data.message;
      }
      // 401 未登录或登录失效处理
      if (status === 401) {
        errMsg = '登录已失效，请重新登录';
        // TODO: 跳转登录页 / 清除 Token
      }
    }
    
    // 实际项目中这里可以接入 Toast/Notification 组件
    console.error('🚨 API Error:', errMsg);
    alert(errMsg); 
    
    return Promise.reject(error);
  }
);

export default request;
