<template>
<!--  element
      container布局容器
      主要的页面
-->
  <el-container style="height: 100%;">
<!--    侧边栏-->
    <el-aside width="auto">
      <commonAside/>
    </el-aside>
    <el-container>
<!--      头部-->
      <el-header>
        <commonHeader/>
      </el-header>
<!--      主要内容-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import commonAside from '../components/commonAside'
import commonHeader from '../components/commonHeader'

export default {
  name: 'HomeItem',
  components: {
    commonAside, commonHeader
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: black;
}

.el-main {
  padding: 0;
  margin: 0;
}
</style>
