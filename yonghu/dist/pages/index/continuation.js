// pages/index/continuation.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mins: [10, 20, 30, 40]
    },
    bindChange(e) {
        const t = this;
        const val = e.detail.value
        t.setData({
            min: t.data.mins[val[0]]
        })
    },
    sub(){
        const t = this;
        if(!t.data.min){
            wx.showModal({
                title: '提示',
                content: '请选择时长',
            })
            return
        }
        app.continuation(t.data.min).then((res)=>{
            wx.showToast({
                title: '加时成功',
            })
            setTimeout(()=>{
                wx.navigateBack({

                })
            }, 1000)
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