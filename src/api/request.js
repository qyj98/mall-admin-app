// !axios获取数据
import axios from 'axios';
import store from '../store';
// 创建一个axios实例 使用拦截器 拦截响应数据 并返回处理后的响应数据
const ins = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
// ?拦截请求,多个请求接口都需要appkey，因此在这里处理config(发送过来的请求数据)
// ins.interceptors.request.use((config) => config,
//   (error) => Promise.reject(error));
ins.interceptors.request.use((config) => {
  if (config.url.includes('passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.login.user.appkey,
    },
  };
}, (error) => Promise.reject(error));

// 拦截响应
ins.interceptors.response.use((response) => {
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => Promise.reject(error));
// 导出实例
export default ins;
