<template>
<!--    登录界面-->
<!--  model 表单数据对象
      status-icon 是否在输入框中显示校验结果反馈图标
      rules 表单验证规则
-->
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="userName"
      class="username"
    >
      <el-input
          type="input"
          v-model="form.userName"
          autocomplete="off"
          placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
        class="password"
    >
      <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item
      class="submit"
    >
      <el-button
        type="primary"
        @click="login"
        class="submit"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import  mock from 'mockjs'
import {getMenu} from "../../api/data";

export default {
  name: "logIn",
  data() {
    return {
      form:{

      },
      rules:{
        userName:[
          {require:true,message: "用户名必须输入",trigger:'blur'},//require 必填，trigger 触发方式
          {min:'3',message: "用户名长度不能小于3位",trigger:'blur'}
        ],
        password:[
          {require:true,message: "密码必须输入",trigger:'blur'}
        ]
      }

    }
  },
  methods:{
    login(){
      getMenu(this.form).then(({data:res})=>{
        if(res.code===20000){
          // console.log(res)
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu',res.data.menu)
          this.$store.commit('setToken',res.data.menu)
          this.$store.commit('addMenu',this.$router)
          this.$router.push({name:'Home'})
        }else{
          this.$message.warning('密码或用户名错误');
        }
      })
      // const token = mock.Random.guid()
      // this.$store.commit('setToken',token)
      // this.$router.push({name:'home'})

    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    border-radius:8px;
    background-clip:padding-box; //背景被裁剪到内边距框
    position:fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 350px;
    padding:35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow:0 0 25px #cac6c6;
    h3{
      margin-top: 5px;
    }
  }
  .submit{
    margin-top: 10px;
    margin-left: 10%;
  }
</style>
