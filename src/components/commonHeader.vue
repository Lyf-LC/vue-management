<template>
<!--  公共头部
      element
      Dropdown 下拉菜单
      用了flex弹性布局
-->
  <div class="min">
    <div class="left">
<!--      折叠按钮-->
      <el-button icon="el-icon-menu" plain size="mini" @click="hide"></el-button>
<!--      对应页面的标题-->
      <h4 style="color:#fff;display:inline-block;margin-left: 20px;">
        {{ label }}
      </h4>
    </div>
    <div class="right">
<!--      下拉框-->
      <el-dropdown size="mini" trigger="click">
        <span>
        <!--头像 这里写死了-->
          <img :src=userImg>
        </span>
        <!--下拉菜单-->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
        <!--组件使用事件需要加上.native修饰符-->
          <el-dropdown-item @click.native="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonHeader',
  data() {
    return {
      userImg: require("../assets/user.jpg"),//头像图片地址
      label: ''//标题
    }
  },
  methods: {
    hide() {//展开/隐藏侧边栏
      this.$store.commit('collapseMenu')//通过vuex改变isCollape的值展开/隐藏侧边栏
    },
    out(){//退出
      this.$store.commit('clearMenu')
      this.$store.commit('clearToken')
      this.$router.push('/login')
    }
  },
  watch: {
    $route: {//监听路由将
      handler(val) {
        this.label = val.meta.name//将标题赋值给label
      },
      immediate: true,//初始化
      // 深度观察监听
      deep: true
    }
  },
}
</script>

<style lang="less" scoped>
.min {
  display: flex;
  height:60px;

  .left {
    flex: 16;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .right {
    flex: 1;
    display: flex;
    align-items: center;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      float: right;
      line-height: 60px;
      cursor: pointer;
    }
  }
}
</style>
