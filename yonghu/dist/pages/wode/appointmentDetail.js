// pages/wode/appointmentDetail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        D: {},
        tabs: ['待支付', '已支付待到店', '已到店待服务', '服务中', '服务完成', '系统取消', '用户取消'],
    },
    pay(e) {
        const t = this;
        app.globalData.outTradeNo = e.currentTarget.dataset.outtradeno;
        app.orderDetail().then((res) => {
            app.globalData.orderDetail = res;
            wx.navigateTo({
                url: '../index/pay',
            })
        })
    },
    removeOrder(e) {
        const t = this;
        app.globalData.outTradeNo = e.currentTarget.dataset.outtradeno;
        app.removeOrder().then((res) => {
            app.orderInfo(opt.id).then((res)=>{
                t.setData({
                    D: res
                })
            })
        })
    },
    showMore: function showMore(e) {
        var t = this;
        var _showMore = t.data.D.orderItems[e.currentTarget.dataset.index].showMore;
        t.data.D.orderItems[e.currentTarget.dataset.index].showMore = _showMore ? false : true;
        t.setData({
            D: t.data.D
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
        const t = this;
        app.orderInfo(opt.id).then((res)=>{
            t.setData({
                D: res
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})