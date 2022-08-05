import Mock from 'mockjs'
export default {
  getMenu: config => {
    console.log(config);
    const { userName, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (userName === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'HomeList.vue',
              meta: { name: '首页' }
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'MallList.vue',
              meta: { name: '商品首页' }

            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'UserList.vue',
              meta: { name: '用户管理' }
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'page1.vue',
                  meta: { name: '页面一' }
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'page2.vue',
                  meta: { name: '页面二' }
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (userName === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'HomeList.vue'
            },
            {
              path: '/video',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'MallList.vue'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
