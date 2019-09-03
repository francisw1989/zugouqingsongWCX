// pages/index/projectsList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fwList: [],
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
    },
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        this.setData({
            current: index
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
        const t = this;
        t.setData({
            fwList: app.getFwList(),
            current: opt.type
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