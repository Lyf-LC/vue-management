import Cookie from "js-cookie";
export default {
    mutations: {
        //折叠侧边
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //修改menu
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        //清除menu
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            // console.log(Cookie.get('menu'))
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
                //动态添加路由
                menuArray.forEach(item => {
                    router.addRoute('Home', item)
                })
            })
        }
    },
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        //路由的数据
        menu: []
    }
}
