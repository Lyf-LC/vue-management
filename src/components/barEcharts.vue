<template>
    <!--  公共柱状图
          echarts
    -->
    <div
        :style='`height:${HeightDate}px`'
        ref="echarts"
    ></div>
</template>

<script>
//引入echarts
import * as echarts from 'echarts'

export default {
    name: 'barEcharts',
    data() {
        return {
            options: {//配置项
                tooltip: {
                    trigger: 'axis',
                    padding: 3,
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {},
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '15%',
                    containLabel: true
                },
                series: []
            },
            echart: null,//默认为null
        }
    },
    props: {
        //通过props传入数据
        IncomingData: {
            //类型
            type: Object,
            //默认值
            default() {
                return {
                    XDate: [],
                    series: []
                }
            }
        },
        //图表的高度，默认240
        HeightDate: {
            type: Number,
            default() {
                return 240
            }
        }
    },
    watch: {
        //监听IncomingData数据 调用go方法
        IncomingData: {
            handler: function () {
                this.go()
            },
            deep: true
        },
    },
    methods: {
        initialize() {
            //將prop传回来的IncomingData数据赋值给options
            this.options.xAxis.data = this.IncomingData.XDate
            this.options.series = this.IncomingData.series
        },
        go() {//初始化echarts图表，设置配置项
            this.initialize()
            if (this.echart) {
                this.echart.setOption(this.options)
            } else {
                this.echart = echarts.init(this.$refs.echarts)
                this.echart.setOption(this.options)
            }
        }
    }
}
</script>
