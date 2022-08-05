<template>
    <!--    用户列表
            element
    -->
    <div style="min-width: 1200px">
        <!--Dialog 对话框
            title	Dialog 的标题
            visible	是否显示 Dialog，支持 .sync 修饰符
            modal-append-to-body 遮罩层是否插入至 body 元素上,
            若为 false，则遮罩层会插入至 Dialog 的父元素上
            top	Dialog CSS 中的 margin-top 值
            Dialog 分为两个部分：body和footer，footer需要具名为footer的slot
        -->
        <el-dialog
            :title="hint === 'add' ? '新增用户' : '更新用户'"
            :visible.sync="dialogVisible"
            width="71%"
            :modal-append-to-body="false"
            top="100px"
        >
            <!--表单-->
            <formComponent
                :formLabel="operateFormLabel"
                :form="operateForm"
                :line="true"
                ref="form"
            />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
<!--    Layout 布局 -->
        <el-row
            type="flex"
            justify="space-between"
            style="
        height: 10%;
        min-width: 1220px;
        margin-left: 20px;
        margin-top: 20px;
      "
        >
            <el-col :span="6">
                <el-button @click="add">+新增</el-button>
            </el-col>
            <el-col :span="6">
                <!--搜索-->
                <formComponent
                    :formLabel="fromLabel"
                    :form="seekFrom"
                    :line="true"
                    ref="form"
                >
                    <el-button type="primary" @click="getSeek(seekFrom.keydown)"
                    >搜索
                    </el-button
                    >
                </formComponent>
            </el-col>
        </el-row>
<!--        表格-->
        <commonTable
            :tableDate="tableDate"
            :tableLabel="tableLabel"
            :config="config"
            @changePage="ca"
            @edit="editUser"
            @remove="removeUser"
        >
        </commonTable>
    </div>
</template>

<script>
//引入axios 公共表单 公共表格 获取用户列表数据接口
import axios from "axios";
import formComponent from "../components/formComponent.vue";
import commonTable from "../components/commonTable.vue";
import {getUser} from "../../api/data.js";

export default {
    name: "UserList",
    components: {formComponent, commonTable},
    data() {
        return {
            //是否显示dialog栏
            dialogVisible: false,
            //如果是add为新增，否则是更新
            hint: "add",
            //表单 label数据
            operateFormLabel: [
                {
                    model: "name",
                    label: "姓名",
                    type: "input",
                },
                {
                    model: "age",
                    label: "年龄",
                    type: "input",
                },
                {
                    model: "sex",
                    label: "性别",
                    type: "select",
                    opts: [
                        {
                            label: "男",
                            value: "1",
                        },
                        {
                            label: "女",
                            value: "0",
                        },
                    ],
                },
                {
                    model: "birth",
                    label: "出生日期",
                    type: "date",
                },
                {
                    model: "addr",
                    label: "地址",
                    type: "input",
                },
            ],
            //表单数据
            operateForm: {
                name: "",
                age: "",
                sex: "",
                birth: "",
                addr: "",
            },
            //搜索框 label数据
            fromLabel: [
                {
                    model: "keydown",
                    label: "",
                    type: "input",
                },
            ],
            //搜索框数据
            seekFrom: {
                keydown: "",
            },
            //表格数据
            tableDate: [],
            //表格label数据
            tableLabel: [
                {
                    prop: "name",
                    label: "姓名",
                },
                {
                    prop: "age",
                    label: "年龄",
                },
                {
                    prop: "sex",
                    label: "性别",
                },
                {
                    prop: "birth",
                    label: "出生日期",
                    width: 200,
                },
                {
                    prop: "addr",
                    label: "地址",
                    width: 300,
                },
            ],
            //分页器配置
            config: {
                total: 200,
                page: 1,
                loading:false
            },
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //新增数据
        add() {
            this.hint = "add";
            this.operateForm = {
                name: "",
                age: "",
                sex: "",
                birth: "",
                addr: "",
            };
            this.dialogVisible = true;
        },
        //提交数据
        submit() {
            if (this.hint === "add") {
                axios.post("/user/add", this.operateForm).then(() => {
                    // console.log(res);
                    this.getList();
                });
            } else {
                axios.post("/user/edit", this.operateForm).then(() => {
                    // console.log(res);
                    this.getList();
                });
            }
            this.dialogVisible = false;
        },
        getSeek(name) {
            this.getList(name);
        },
        //获取用户列表数据
        getList(name = "") {
            //是用户列表呈现加载中的状态
            this.config.loading = true;
            name ? (this.config.page = 1) : "";
            getUser({
                page: this.config.page,
                name,
            }).then(({data: res}) => {
                // console.log(res);
                this.tableDate = res.list.map((item) => {
                    item.sexLabel = item.sex === 0 ? "女" : "男";
                    item.sex = item.sexLabel;
                    return item;
                });
                // console.log(this.tableDate);
                this.config.total = res.count;
                this.config.loading = false;
            });
        },
        //编辑
        editUser(row) {
            this.hint = "edit";
            this.operateForm = row;
            this.dialogVisible = true
            console.log(row);
        },
        //删除
        //Message 消息提示
        //Element 为 Vue.prototype 添加了全局方法 $message
        removeUser(row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                    axios.post("user/del", {id: row.id}).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功",
                        });
                        this.getList();
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        //换页
        ca(page) {
            this.config.page = page;
            this.getList();
        },
    },
};
</script>

<style>
.el-dialog {
    border-radius: 8px;
}

.el-dialog__body {
    padding: 25px 0px 10px 80px;
}
</style>
