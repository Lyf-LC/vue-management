//引入Vue
import Vue from 'vue';
//全局引入ElementUI
import ElementUI from 'element-ui';
//引入ElementUI样式
import 'element-ui/lib/theme-chalk/index.css';
// import { Button ,container,aside,header,main} from 'element-ui';
import App from './App.vue'
//路由
import router from '../router'
//vuex
import store from './store'
//模拟数据
import '../api/mock.js'

Vue.config.productionTip = false
//使用ElementUI
Vue.use(ElementUI);
// Vue.use(Button)
// Vue.use(container)
// Vue.use(aside)
// Vue.use(header)
// Vue.use(main)
//导航守卫
  router.beforeEach((to,from,next)=>{
    store.commit("getToken")
    const token=store.state.user.token
    if(!token&&to.name!=='login'){
      next({name:'login'})
    }else if(token&&to.name==='login'){
        next({name:'home'})
    }else{
      next()
    }
  })
new Vue({
  store,
  router,
  beforeCreate() {
    //全局总线
    Vue.prototype.$bus = this
  },
  created() {
    store.commit('addMenu',router)
  },
  render: h => h(App),
}).$mount('#app')
