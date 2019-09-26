const app = getApp();
// pages/index/pj.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:1,
        size:100,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const t = this;
        let params = {
            employeeId: app.globalData.userInfo.userId || "13",
            minScore:0,
            page:t.data.page,
            size:t.data.size
        }
        //获取评价列表
        app.employeeTodyPraise(params).then((res) => {
            console.log(res);
            t.setData({
                praise: res
             })
             console.log(t.data);
        });
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