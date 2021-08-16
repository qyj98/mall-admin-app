// !axios获取数据
import axios from 'axios';
// 创建一个axios实例 使用拦截器 拦截响应数据 并返回处理后的响应数据
const ins = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
// 拦截请求
ins.interceptors.request.use((config) => config, (error) => Promise.reject(error));
// 拦截响应
ins.interceptors.response.use((response) => {
//   console.log(response);
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => Promise.reject(error));
// 导出实例
export default ins;
