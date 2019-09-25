// pages/index/jrsy.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        employeeTodyIncome:{}
    },
    //initData 数据初始化
    initData(){
        const t = this;
        app.employeeTodyIncome().then((res)=>{
            console.log(res);
            t.setData({
                employeeTodyIncome: res
            })
        })
        // console.log(t.data);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const t = this;
        t.initData();
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