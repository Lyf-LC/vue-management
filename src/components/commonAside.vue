<template>
<!--  公共侧边栏
      element
      NavMenu 导航菜单（折叠）
      default-active 默认高亮 值为item的index值
      collapse 是否水平收起菜单
-->
  <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      background-color="#545C64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
  >
<!--    标题-->
    <h3 v-if=!isCollapse>通用后台管理系统</h3>
<!--    没有二级菜单的菜单列表
        skip方法实现路由的跳转
-->
    <el-menu-item
        @click="skip(item)"
        v-for="item in noChildren"
        :index="item.path + ''"
        :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
<!--    有二级菜单的菜单列表-->
    <el-submenu
        v-for="item in hasChildren"
        :index="item.path + ''"
        :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!--二级菜单-->
      <el-menu-item-group
          v-for="(children, i) in item.children"
          :key="children.path"
      >
        <el-menu-item
            @click="skip(children)"
            :index="i + ''"
        >
          {{ children.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>

export default {
  name:'commonAside',
  methods: {
    skip(item) {
      this.$router.push({
        name: item.name,
      })
    }
  },
  computed: {
    // 过滤掉没有子元素的菜单列表
    noChildren() {
      return this.asyncMenu.filter(item => !item.children)
    },
    // 过滤出有子元素的菜单列表
    hasChildren() {
      return this.asyncMenu.filter(item => item.children)
    },
    //通过vuex获取到isCollape属性
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    // 通过vuex获取到menu属性
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>
