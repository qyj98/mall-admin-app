import request from './request';

// ?未在请求拦截处添加了appkey,需要这样传递请求参数
// 查询类目列表信息
// export async function getCategory(appkey = '', page = 1, size = 10) {
//   const res = await request.get('/category/all', {
//     params: {
//       appkey,
//       page,
//       size,
//     },
//   });
//   return res;
// }
// ?已经在请求拦截处添加了appkey,获取全部数据时,不加非必须数据 page,size，
export async function getCategory(params) {
  const res = await request.get('/category/all', params);
  return res;
}

// 查询产品列表
export async function getProducts(page = 1, size = 10, searchWord = '', category = '') {
  const res = await request.get('/products/all', {
    params: {
      page,
      size,
      searchWord,
      category,
    },
  });
  return res;
}
