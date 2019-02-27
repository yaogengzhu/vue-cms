import Vue from 'vue';
import Router from 'vue-router';
import login from './views/login.vue';
import main from './views/index.vue';
// 欢迎页面
import welcome from './views/welcome/welcome.vue';
// 用户管理界面
import user from './views/user/user.vue';
// 权限管理
import right from './views/right/right.vue';
import role from './views/right/role.vue';
// 商品模块
import categorie from './views/good/categorie.vue';
import goodList from './views/good/goodlist.vue';
import params from './views/good/params.vue';
//订单模块
import order from './views/order/order.vue';
// 数据报表模块
import reports from './views/data/reports.vue';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'main',
      component: main,
      // 重定向到welcome页面
      redirect: 'index/welcome',
      children: [
        {
        path: 'welcome',
        component: welcome
      },
      {path:'users',component:user},
      {path:'roles',component:role},
      {path:'rights',component:right},
      {path:'categories',component:categorie},
      {path:'params',component:params},
      {path:'goods',component:goodList},
      {path:'orders',component:order},
      {path:'reports',component:reports}
    ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})