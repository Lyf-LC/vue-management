<template>
    <!--    公共表单组件
            element
            Form 表单
    -->
    <el-form
        ref="form"
        :model="form"
        label-width="70px"
        :inline="line">
        <el-form-item
            v-for="item in formLabel"
            :key="item.label"
            :label="item.label">
            <el-input
                v-if="item.type === 'input'"
                :placeholder="'请输入' + item.label"
                v-model="formData[item.model]"
                autocomplete="off"
            >
            </el-input>
<!--            日期-->
            <el-date-picker
                v-if="item.type === 'date'"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="formData[item.model]">
            </el-date-picker>
<!--            下拉框-->
            <el-select
                v-if="item.type === 'select'"
                placeholder="请选择"
                v-model="formData[item.model]">
                <el-option
                    v-for="item in item.opts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
<!--        备用插槽-->
        <el-form-item>
            <slot></slot>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'formComponent',
    props: {
        formLabel: Array,
        line: Boolean,
        form: Object
    },
    data() {
        return {
            formData: this.form
        }
    },
    watch: {
        //监听form数据 更新数据 Vue不能更改props传入的数据，用formData做中转
        form: {
            handler: function () {
                this.formData = this.form
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.el-input {
    width: 200px;
}
</style>
