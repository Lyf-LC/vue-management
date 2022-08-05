<template>
<!--  公共饼状图
      echarts
-->
    <div
        :style="`height:${HeightDate}px`"
        ref="echarts"
    ></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
  name: "pieEcharts",
  data() {
    return {
      options: {//配置项
          tooltip: {
            trigger: 'item',
            padding: 3,
          },
        series: {
          name: "Access From",
          type: "pie",
          radius: "60%",
          center: ["50%", "43%"],
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      },
      echart: null,//默认为null
    };
  },
  props: {
    //通过props传入数据
    IncomingData: {
      //类型
      type: Object,
      //默认值
      default() {
        return {
          Date: [],
        };
      },
    },
    //图表的高度，默认240
    HeightDate: {
      type: Number,
      default() {
        return 240;
      },
    },
  },
  watch: {
    //监听IncomingData数据 调用go方法
    IncomingData: {
      handler: function () {
        this.go();
      },
      deep: true,
    },
  },
  methods: {
    initialize() {
      //將prop传回来的IncomingData数据赋值给options
      this.options.series.data = this.IncomingData.Date;
    },
    go() {//初始化echarts图表，设置配置项
      this.initialize();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echarts);
        this.echart.setOption(this.options);
      }
    }
  },
};
</script>
