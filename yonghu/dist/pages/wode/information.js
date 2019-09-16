// pages/wode/information.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        let params = e.detail.value;
        params.userId = app.globalData.userInfo.id;
        params.photo = app.globalData.userInfo.avatarUrl;
        app.user(params).then((res)=>{

        })
    },
    data: {
        sex: ['男', '女'],
        date: ''
    },
    bindPickerChange: function (e) {
        const t = this;
        t.data.U.sex = e.detail.value;
        t.setData({
            U: t.data.U
        })
    },
    bindDateChange: function (e) {
        const t = this;
        t.data.U.birthday = e.detail.value;
        t.setData({
            U: t.data.U
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        const t = this;
        t.setData({
            U: app.globalData.userInfo
        })
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