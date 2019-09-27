'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        tags: [],
        //订单状态（1.待支付 2.已支付待到店 3.已到店待服务 4.服务中 5.服务完成 6.系统取消 7.用户取消 ）
        statusList:["待到店","待到店","待到店","进行中","已完成","取消","取消"],
    },
    showMore: function showMore(e) {
        var t = this;
        var _showMore = t.data.detail.orderItems[e.currentTarget.dataset.index].showMore;
        t.data.detail.orderItems[e.currentTarget.dataset.index].showMore = _showMore ? false : true;
        t.setData({
            detail: t.data.detail
        });
    },
    //状态为中文显示
    settingStatus: function setting(statusId) {
        const t = this;
        return t.data.statusList[statusId-1]
    },
    initData(){
        const t = this;
        let params = {
            orderId: t.data.orderId,
            employeeId:app.globalData.userInfo.userId
        }
        app.orderInfo(params).then((res)=>{
            //处理用户标签数据
            let tagsArray = [];
            if(res.user.userTags){
                tagsArray = res.user.userTags.tags.split(",");
            }
            //处理服务项目中是否展开
            let newRes = res.orderItems.filter((element,index) => {
                element.showMore = true;
            });
            //处理订单状态中文显示
            
            t.setData({
                detail: res,
                tags:tagsArray,
                status:t.settingStatus(res.status)
            })
        })
        // console.log(t.data);
    },
    //给用户打标签
    addTag(e){
        var t = this;
        wx.navigateTo({
            url: '../index/tag?userId=' + e.currentTarget.dataset.userid + "&employeeId="+app.globalData.userInfo.userId+"&orderId="+e.currentTarget.dataset.orderid+"&orderItemId="+e.currentTarget.dataset.orderitemid
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const t = this;
        t.setData({
            orderId:options.orderId
        })
        t.initData();
        
    },
    //结束服务
    employeeEndServie:function(e){
        const t = this;
        let params = {
            employeeId: app.globalData.userInfo.userId || "13",
            orderItemId:t.data.detail.orderItems[0].orderId
        }
        app.employeeEndServie(params).then((res)=>{
            wx.showToast({
                title:'已完成服务',
                icon:"success",
                duration:2000
              })
              wx.navigateBack({
                
            })
        })
    }
});