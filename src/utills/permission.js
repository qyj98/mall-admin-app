/**
//  * //校验动态列表，根据角色过滤将过滤后的动态列表导出
 * 校验规则 角色对应的权限名称
 */
const roleToRoute = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'Home',
    },
    {
      name: 'Index',
    },
    {
      name: 'Login',
    },
    {
      name: 'ProductEidt',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'Category',
    },
    {
      name: 'Home',
    },
    {
      name: 'Index',
    },
    {
      name: 'Login',
    },
    {
      name: 'ProductEidt',
    },
  ],
};

/**
 * 过滤掉没有权限的路由
 * @param {String} role
 * @param {Array} routes
 *
 */
export default function getMenuRoutes(role, routes) {
  // 根据角色拿到她拥有的菜单列表
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  // 递归遍历传递过来的全部菜单路由列表,保留符合条件的路由
  const getRoutes = (route) => {
    const resultRoutes = route.filter((r) => {
      const obj = r;
      if (allowRoutesName.indexOf(r.name) !== -1) {
        if (obj.children) {
          obj.children = getRoutes(obj.children);
        }
        return true;
      }
      return false;
    });
    return resultRoutes;
  };
  return getRoutes(routes);
}
// export default function getMenuRoute(role, routes) {
//   console.log(role, routes);
//   const allowRoutesName = roleToRoute[role].map((item) => item.name);
//   const resultRoutes = routes.filter((r) => {
//     const obj = r;
//     if (allowRoutesName.indexOf(r.name) !== -1) {
//       const { children } = obj;
//       obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
//       return true;
//     }
//     return false;
//   });
//   return resultRoutes;
// }
