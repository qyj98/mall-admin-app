import Cookies from 'js-cookie';
// 获取cookies
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    email: Cookies.get('email'),
    role: Cookies.get('role'),
    appkey: Cookies.get('appkey'),
  };
}
// 设置cookies
export function setUserCookie(userInfo) {
  const arr = Object.entries(userInfo);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}
// 移除cookies
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('email');
  Cookies.remove('role');
  Cookies.remove('appkey');
}
