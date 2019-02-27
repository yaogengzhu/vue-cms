import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
Vue.config.productionTip = false;

// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 将element 挂载到vue上去
Vue.use(ElementUI);

// 引入css 样式 
import './styles/index.scss';

// 路由导航守卫
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('mytoken');
//   if (token) {
//     next();
//   } else {
//     if (to.path == '/login') {
//       next();
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   }
// })

// 自定义全局按键修饰符
Vue.config.keyCodes.f2 = 113

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')