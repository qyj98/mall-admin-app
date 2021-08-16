import request from './request';
// eslint下一个导出数据用默认导出
async function login(params) {
  const res = await request.post('/passport/login', params);
  return res;
}

export default login;
