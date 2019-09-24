'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp();
exports.default = Page({
    data: {
        choosedRange: 2,
        //1历史2今天3明天
        tabs: [
            {
                id:1,
                text:"历史"
            },
            {
                id:2,
                text:"今天"
            },
            {
                id:3,
                text:"明天"
            },
            {
                id:0,
                text:"全部"
            }
        ],
        page:1,
        size:100,
        //订单状态（1.待支付 2.已支付待到店 3.已到店待服务 4.服务中 5.服务完成 6.系统取消 7.用户取消 ）
        statusList:["待到店","待到店","待到店","进行中","已完成","取消","取消"],
        inkBarStyle: {
            'width': '30%'
        },
        list: []
    },
    
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        this.setData({
            tabIndex: index
        });
    },
    //状态为中文显示
    settingStatus: function setting(statusId) {
        console.log(t.data.statusList[statusId-1]);
        return t.data.statusList[statusId]
    },
    onShow() {
        const t = this;
        
    },
    //获取数据
    initData(){
        const t = this;
        let params;
        if(t.data.choosedRange == 0){
            params = {
                employeeId: app.globalData.userInfo.userId || "13",
                page:t.data.page,
                size:t.data.size
            }
        }else{
            params = {
                employeeId: app.globalData.userInfo.userId || "13",
                range:t.data.choosedRange,//1历史2今天3明天
                page:t.data.page,
                size:t.data.size
            }
        }
        
        app.employeeOrder(params).then((res)=>{
            console.log(res);
            t.setData({
                list: res.records
            })
        })
        console.log(t.data);
    },
    //切换范围
    chooseRange(e){//1历史2今天3明天   0表示全部
        // console.log(e.currentTarget.dataset);
        const t = this;
        let choosedRange = e.currentTarget.dataset.id;
        // console.log(choosedRange);
        t.setData({
            choosedRange:choosedRange,
            page:1
        })
        t.initData();

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const t = this;
        t.initData();
    },

});