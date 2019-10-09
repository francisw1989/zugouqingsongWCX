'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        menuShow: false,
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
        // statusList:["待到店","待到店","待到店","进行中","已完成","取消","取消"],
        statusList:["待支付","已支付待到店","已到店待服务","进行中","已完成","系统取消","用户取消"],
        inkBarStyle: {
            'width': '30%'
        },
        list: []
    },
    choose(e){
        const t = this;
        console.log(e.target.dataset.index)
        t.setData({
            menuShow: false
        })
    },
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        this.setData({
            tabIndex: index
        });
    },
    //状态为中文显示
    settingStatus: function setting(statusId) {
        const t = this;
        return t.data.statusList[statusId-1]
    },
    onShow() {
        const t = this;
        
    },
    //获取数据
    initData(){
        const t = this;
        let params = {
                employeeId: app.globalData.userInfo.userId || "13",
                range:t.data.choosedRange,//1历史2今天3明天
                page:t.data.page,
                size:t.data.size,
                status:0//状态 0全部 2 未到店 3已到店 4进行中 5已完成
        }
        
        app.employeeOrder(params).then((res)=>{
            console.log(res);
            //处理数据状态中文显示
            let newRes = res.records.filter((element,index) => {
                element.statusText = t.settingStatus(element.status);
                
            });
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
        if (choosedRange==0){
            choosedRange = 4
            t.setData({
                menuShow: true
            })
            return
        }
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
        t.setData({
            userInfo: app.globalData.userInfo
        })
        t.initData();
    },

});