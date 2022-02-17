import { createRouter, createWebHistory } from 'vue-router'
import DeviceManage from "../views/DeviceManage";
import Layout from "../Layout/Layout";
import Login from "../views/Login";
import {ElMessage} from "element-plus";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    beforeEnter: (to, from, next)=>{
      // 逻辑操作，如果超时了会触发request.js中的方法删除本地token，这样token为空不论跳到哪里都会返回登录界面
      if (localStorage.getItem("userToken")){
        //console.log(localStorage.getItem("userToken"));
        next();
      }else {
        ElMessage.warning("您还没有登录过,请先登录");
        next('/login');
      }
    },
    children:[
      {
        path: '/home',
        name: 'Home',
        component: () => import("../views/Home"),
      },
      {
        path: '/deviceManage',
        name: 'DeviceManage',
        component: DeviceManage,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
