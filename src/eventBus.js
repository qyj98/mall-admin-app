/*
 * @Author: your name
 * @Date: 2021-08-05 17:46:06
 * @LastEditTime: 2021-08-07 17:05:44
 * @LastEditors: Please set LastEditors
 * @Description: 事件总线 跨越组件实现组件之间的通信的方式
 * @FilePath: \vue\1. 入门\09-1练习\my-site\eventBus.js
 */

// 存放各个事件和对应的处理函数handler
/** listeners = {
 *      "event1": [handler1,handler2],
 *      "event2": [handler1,handler2]
 * }
 */

// 手写事件总线
// const listeners = {}
// export default {
//     // 监听一个事件
//     $on(eventName, handler) {
//         //如果listeners中没有该属性
//         if (!listeners[eventName]) {
//             /**给listeners添加属性名为“eventName”，属性值为空Set集合(没有重复项)
//              *listeners = {
//                  *      "event1": []
//                  * }
//             */
//             listeners[eventName] = new Set();
//         }
//         listeners[eventName].add(handler)
//     },
//     // 取消监听
//     $off(eventName, handler) {
//         if (!listeners[eventName]) {
//             return;
//         }
//         listeners[eventName].delete(handler)
//     },
//     // 触发事件 传递事件名称，需要的参数
//     // 循环事件对应的属性值->函数数组 运行里面的处理函数
//     $emit(eventName, ...args) {
//         if (!listeners[eventName]) {
//             return;
//         }
//         for (const handler of listeners[eventName]) {
//             handler(...args)
//         }
//     }
// }

/**
 * 事件名：mainScroll
 * 含义：主区域滚动条滚动后触发
 * 参数：滚动的dom元素
 *
 * 事件名：scrollToTop
 * 含义：点击回到顶部组件触发
 * 参数：滚动条距离窗口顶部的距离
 */
// 直接使用vue事件总线
import Vue from 'vue';
// 创建一个组件实例，包含了上面的方法
const app = new Vue({});
// 将其放入vue的prototype中作为实例对象
Vue.prototype.$bus = app;

// 导出后js指令也可以使用事件总线
export default app;
