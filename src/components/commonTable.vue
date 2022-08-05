<template>
<!--    公共表格组件
        element
        Table 表格
        Loading 加载
-->
  <div class="common-table">
    <el-table
        v-loading="loading"
        :data="tableDate"
        height="605px"
        stripe
    >
        <!--
        show-overflow-tooltip	当内容过长被隐藏时显示 tooltip
        -->
      <el-table-column
          align="center"
          show-overflow-tooltip
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width ? item.width : 125">
      </el-table-column>
        <!--操作列-->
      <el-table-column
          align="center"
          label="操作"
          min-width="180">
        <!--slot-scope="scope"
        自定义列表固定写法
        row返回那一行的信息
        -->
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器
        layout	组件布局，子组件名用逗号分隔
        total	总条目数
        page-size	每页显示条目个数，支持 .sync 修饰符
        current-change	currentPage 改变时会触发 换页时
    -->
    <el-pagination
        v-if="isSorter"
        class="page"
        layout="prev, pager, next"
        :total="config.total"
        page-size.sync="config.page"
        @current-change="changePage"
        :page-sizes=[10]
        :small="true">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'commonTable',
    data() {
        return {
            // loading: this.config.loading
        }
    },
    computed:{
      loading(){
          return this.config.loading
      }
    },
  props: {
    tableDate: Array,//表格数据
    tableLabel: Array,//表格标题
    config:{//分页器配置
        type: Object,
        default(){
            return {
                loading:false
            }
        }
    },
      isOperate:{//是否操作栏
          type: Boolean,
          default(){
              return true
          }
      },
      isSorter:{//是否显示分页器
        type: Boolean,
          default(){
              return true
          }
      }

  },
  methods: {
    edit(row) {
      //  将row参数通过自定义事件传给父组件edit方法
      this.$emit('edit', row)
    },
    remove(row) {
        //  将row参数传给父组件remove方法
      this.$emit('remove', row)
    },
    changePage(page) {
        //  将row参数传给父组件changePage方法
      this.$emit('changePage', page)
    }
  },
}
</script>

<style scoped>
.common-table {
  height: calc(100% - 62px);
  position: relative;
  background-color: #fff;
}

.page {
  position: absolute;
  bottom: 0;
  right: 20px;

}
</style>
