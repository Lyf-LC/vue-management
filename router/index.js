import Vue from "vue"
import VueRouter from 'vue-router'
// import home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        // component:home
        component: () => import('../src/views/HomeItem.vue'),
        redirect: '/home',
        meta: { name: '首页' },
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     // component:home
            //     component: () => import('../src/views/HomeList.vue'),
            //     meta: { name: '首页' }
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     // component:home
            //     component: () => import('../src/views/UserList.vue'),
            //     meta: { name: '用户管理' }
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     // component:home
            //     component: () => import('../src/views/MallList.vue'),
            //     meta: { name: '商品首页' }
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     // component:home
            //     component: () => import('../src/views/page1.vue'),
            //     meta: { name: '页面一' }
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     // component:home
            //     component: () => import('../src/views/page2.vue'),
            //     meta: { name: '页面二' }
            // }
        ]
    },
    {
        path:"/login",
        name: 'login',
        component:()=>import('../src/views/login.vue')
    }

]
const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router
