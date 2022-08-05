<template>
    <!--    主页-->
    <!--    用的element
            Layout 布局
            Card 卡片
    -->
    <el-row :gutter="20" style="margin-right: 0; margin-left: 10px;min-width: 1226px;">
        <el-col :span="8" style="margin-top: 20px">
            <!--用户管理区域-->
            <el-card class="box-card" style="height:260px">
                <div slot="header" class="clearfix">
                    <img :src="userImg">
                    <div class="userName">
                        <p>Admin</p>
                        <p>用户管理员</p>
                    </div>
                </div>
                <div class="text item">
                    <p>上次登陆时间：<span>2022年7月26日</span></p>
                    <p>上次登陆地点：<span>安阳</span></p>
                </div>
            </el-card>
            <!--列表区域 -->
            <el-card class="box-card" style="margin-top:30px;height: 340px">
                <!--表格组件-->
                <commonTable :tableDate="tableData" :tableLabel="tabData" :isOperate="false" :isSorter="false"/>
                <!--                <el-table :data="tableData" style="width: 100%">-->
                <!--                    <el-table-column-->
                <!--                        v-for="(value, index) in tabData"-->
                <!--                        :key="index"-->
                <!--                        :prop='index'-->
                <!--                        :label="value">-->
                <!--                    </el-table-column>-->
                <!--                </el-table>-->
            </el-card>
        </el-col>
        <el-col :span="16"
                style="float:right;"
        >
            <!--订单区域-->
            <div style="display:flex;flex-wrap: wrap;margin-top: 20px;justify-content:space-between;">
                <el-card
                    v-for="item in countData"
                    :key="item.name"
                    :body-style="{ padding: '0', display: 'flex',}"
                    style="width:30%;margin-bottom:10px;">
                    <i :class="`el-icon-${item.icon} icon`" :style="`background-color:${item.color}`"></i>
                    <div class="rightCard">
                        <p>￥{{ item.value }}</p>
                        <p>{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height:240px;width:100%;margin-top:10px;">
                <!--折线图组件-->
                <lineEcharts :HeightDate=220 :IncomingData='IncomingData1'/>
            </el-card>
            <div style="display:flex;width: 100%;margin-top:10px;justify-content:space-between;">
                <el-card style="height:205px;width:47%">
                    <!--柱状图组件-->
                    <barEcharts :HeightDate=200 :IncomingData='IncomingData2'/>
                </el-card>
                <el-card style="height:205px;width:47%">
                     <!--饼状图组件-->
                    <pieEcharts :HeightDate=200 :IncomingData='IncomingData3'/>
                </el-card>
            </div>
        </el-col>

    </el-row>
</template>

<script>
//数据接口
import {getData} from '../../api/data'
//引入 折线图 柱状图 饼状图组件
import lineEcharts from '../components/lineEcharts'
import barEcharts from '../components/barEcharts'
import pieEcharts from '../components/pieEcharts'
import commonTable from '../components/commonTable'

export default {
    name: 'UserList',
    components: {
        lineEcharts, barEcharts, pieEcharts,
        commonTable
    },
    data() {
        return {
            //用户头像图片
            userImg: require("../assets/user.jpg"),
            //列表数据
            tableData: [],
            //列表信息
            // tabData: {
            //     brand: '品牌',
            //     today: '今日购买',
            //     month: '当月购买',
            //     purchase: '总购买'
            //
            // },
            tabData: [
                {
                    label: '品牌',
                    prop: 'brand',
                    width: 80
                },
                {
                    label: '今日购买',
                    prop: 'today',
                    width: 95
                },
                {
                    label: '当月购买',
                    prop: 'month',
                    width: 95
                },
                {
                    label: '总购买',
                    prop: 'purchase',
                    width: 95
                }
            ],
            //订单数据
            countData: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: "success",
                    color: '#2ec7c9'
                },
                {
                    name: '今日收藏订单',
                    value: 210,
                    icon: "star-on",
                    color: '#2ec7c9'
                },
                {
                    name: '今日未支付订单',
                    value: 1234,
                    icon: "s-goods",
                    color: '#2ec7c9'
                },
                {
                    name: '本月支付订单',
                    value: 1234,
                    icon: "success",
                    color: '#ffb980'
                },
                {
                    name: '本月收藏订单',
                    value: 1234,
                    icon: "star-on",
                    color: '#ffb980'
                },
                {
                    name: '本月未支付订单',
                    value: 210,
                    icon: "s-goods",
                    color: '#ffb980'
                }
            ],
            //折线图 柱状图 饼状图数据
            IncomingData1: {},
            IncomingData2: {},
            IncomingData3: {},
        }
    },
    mounted() {
        //通过接口返回数据
        getData().then(res => {
            // 解构赋值 code data
            const {code, data} = res.data
            if (code === 20000) {
                this.tableData = data.tableData

                const order = data.orderData
                const XDate = order.date
                const keyArray = Object.keys(order.data[0])
                const series = []
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type: 'line'
                    })
                })
                // vue声明在data中的属性都是响应式的，也就是，我们在修改data中的属性时，
                // 一般页面都能实时更新。受现代 JavaScript 的限制 (以及废弃 Object.observe)，
                // Vue 不能检测到对象属性的添加或删除。
                // 由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，
                // 所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的
                //利用Vue.set(object,key,val)
                //利用this.$set(this.obj,key,val)，这是Vue.set()的全局实例
                //利用Object.assign({}，this.obj)创建新对象

                /*this.$set(this.IncomingData1,'XDate',XDate)
                this.$set(this.IncomingData1,'keyArray',keyArray)
                this.$set(this.IncomingData1,'series',series)*/

                this.IncomingData1 = Object.assign(
                    {},
                    this.IncomingData1,
                    {
                        XDate: XDate,
                        keyArray: keyArray,
                        series: series
                    }
                )

                this.IncomingData2 = Object.assign(
                    {},
                    this.IncomingData2,
                    {
                        XDate: data.userData.map(item => item.date),
                        series: [
                            {
                                name: '新增用户',
                                type: 'bar',
                                data: data.userData.map(item => item.new),
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)'
                                },
                                color: 'pink'
                            },
                            {
                                name: '活跃用户',
                                type: 'bar',
                                data: data.userData.map(item => item.active),
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)'
                                },
                                color: 'yellowgreen'
                            }
                        ]
                    }
                )

                this.$set(this.IncomingData3, 'Date', data.videoData)

                // const options = {
                //     xAxis: {
                //         data: XDate
                //     },
                //     yAxis: {},
                //     legend: {
                //         data: keyArray
                //     },
                //     series
                // }
                // const E = echarts.init(this.$refs.echarts)
                // E.setOption(options)

                // const userEcharts = {
                //     xAxis: {
                //         type: 'category',
                //         data: data.userData.map(item => item.date)
                //     },
                //     yAxis: {
                //         type: 'value'
                //     },
                //     grid: {
                //         top: "10%",
                //         left: "10%",
                //         right: "5%",
                //         bottom: "30%"
                //     },
                //     series: [
                //         {
                //             data: data.userData.map(item => item.new),
                //             type: 'bar',
                //             showBackground: true,
                //             backgroundStyle: {
                //                 color: 'rgba(180, 180, 180, 0.2)'
                //             },
                //             color: 'pink'
                //         },
                //         {
                //             data: data.userData.map(item => item.active),
                //             type: 'bar',
                //             showBackground: true,
                //             backgroundStyle: {
                //                 color: 'rgba(180, 180, 180, 0.2)'
                //             },
                //             color: 'yellowgreen'
                //         }
                //     ]
                // }
                // const U = echarts.init(this.$refs.userEcharts)
                // U.setOption(userEcharts)

                // const videoEcharts = {
                //     series: [
                //         {
                //             name: 'Access From',
                //             type: 'pie',
                //             radius: '60%',
                //             center: ['50%', '43%'],
                //             data: data.videoData,
                //             emphasis: {
                //                 itemStyle: {
                //                     shadowBlur: 10,
                //                     shadowOffsetX: 0,
                //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                //                 }
                //             }
                //         }
                //     ]
                // }
                // const V = echarts.init(this.$refs.videoEcharts)
                // V.setOption(videoEcharts)
            }
            // console.log(res);
        })
    }
}
</script>

<style lang="less" scoped>
.box-card {
    img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        vertical-align: bottom;
    }

    .userName {
        display: inline-block;
        margin-left: 60px;
    }

    .text {
        margin-left: 20px;
        font-size: 14px;
        color: rgb(68, 68, 68);

        span {
            margin-left: 60px;
        }
    }
}

.icon {
    font-size: 50px;
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    color: #fff;
}

.rightCard {
    float: right;
    margin: 0;

    p {
        margin: 7px 0 0 20px;
        font-size: 14px;

        &:first-child {
            margin-top: 10px;
            font-size: 20px;
        }
    }
}
</style>
