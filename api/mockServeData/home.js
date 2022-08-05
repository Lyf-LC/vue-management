//引入morkjs
import Mock from 'mockjs'

let list = []
export default {
    getStaticalData: () => {
        for (let i = 0; i < 7; i++) {
            list.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                })
            )

        }
        return {
            code: 20000,
            data: {
                //饼状图数据
                videoData: [
                    {
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: '苹果',
                        value: 5999
                    },
                    {
                        name: 'vivo',
                        value: 1599
                    },
                    {
                        name: 'OPPO',
                        value: 1999
                    },
                    {
                        name: '魅族',
                        value: 2200
                    },
                    {
                        name: '三星',
                        value: 3999
                    },
                ],
                //柱状图数据
                userData: [
                    {
                        date: '周一',
                        new: 52,
                        active: 140
                    },
                    {
                        date: '周二',
                        new: 52,
                        active: 530
                    },
                    {
                        date: '周三',
                        new: 25,
                        active: 540
                    },
                    {
                        date: '周四',
                        new: 45,
                        active: 340
                    },
                    {
                        date: '周五',
                        new: 55,
                        active: 770
                    },
                    {
                        date: '周六',
                        new: 32,
                        active: 320
                    },
                    {
                        date: '周日',
                        new: 53,
                        active: 170
                    },
                ],
                //折线图数据
                orderData: {
                    date:['20191001','20191002','20191003','20191004','20191005','20191006','20191007'],
                    data:list
                },
                //首页列表数据
                tableData:[
                    {
                        brand: 'oppo',
                        today: 100,
                        month: 200,
                        purchase: 300
                    },
                    {
                        brand: '小米',
                        today: 300,
                        month: 400,
                        purchase: 200
                    },
                    {
                        brand: 'vivo',
                        today: 300,
                        month: 200,
                        purchase: 100
                    },
                    {
                        brand: '苹果',
                        today: 400,
                        month: 600,
                        purchase: 300
                    },
                    {
                        brand: '三星',
                        today: 400,
                        month: 500,
                        purchase: 500
                    }
                ]
            }
        }
    }
}
