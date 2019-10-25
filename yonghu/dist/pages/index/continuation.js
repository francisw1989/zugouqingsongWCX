// pages/index/continuation.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mins: [10, 20, 30, 40],
        orderItems: [],
        cIndex: 0,
        showModal: false
    },
    bindChange(e) {
        const t = this;
        const val = e.detail.value
        t.setData({
            min: t.data.mins[val[0]]
        })
    },
    orderDetail() {
        const t = this;
        let _do = function () {
            app.orderDetail().then((res) => {
                if (!res) {
                    setTimeout(() => {
                        _do()
                    }, 1000)
                    wx.showLoading({
                        title: '加载中'
                    });
                } else {
                    wx.hideLoading();
                    app.globalData.orderDetail = res;
                    wx.navigateTo({
                        url: 'pay?pageFrom=continuation',
                    })
                }
            })
        }
        _do()
    },
    sub(){
        const t = this;
        let currObj = t.data.orderItems[t.data.cIndex];
        app.continuation(currObj.time, currObj.id).then((res)=>{
            app.globalData.outTradeNo = res.outTradeNo;
            t.orderDetail();
            // app.globalData.orderDetail = res;
            // wx.navigateTo({
            //     url: 'pay?pageFrom=continuation',
            // })
            // wx.showToast({
            //     title: '加时成功',
            // })
            // setTimeout(()=>{
            //     wx.navigateBack({

            //     })
            // }, 1000)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    sliderchange(e){
        const t = this;
        t.data.orderItems[t.data.cIndex].time = e.detail.value;
        t.setData({
            orderItems: t.data.orderItems
        })
    },
    choose(e){
        const t = this;
        let cIndex = e.target.dataset.index;
        t.setData({
            cIndex: cIndex,
            showModal: true
        })
    },
    onLoad: function (options) {
        const t = this;
        let orderItems = app.globalData.nowOrder.orderItems;
        for (const v of orderItems){
            v.orderTechniciansName = v.orderTechnicians.map((res)=>{
                return res.employeeName
            }).join(',')
            
            v.mixDuration = v.mixDuration ? v.mixDuration: 10;
            v.maxDuration = v.maxDuration ? v.maxDuration : 60;
            v.time = v.mixDuration || 0;
        }
        t.setData({
            orderItems: orderItems
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