// pages/index/tag.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '标签',
        value: '',
        tabs: ['基础特征', '消费特征' ,'时空特征', '偏好特征' ,'渠道特征'],
        list: ['','','','','',''],
        inkBarStyle: {
            'width': '30%'
        },
    },
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        this.setData({
            tabIndex: index
        });
    },
    confirm(){
        const t = this;
        
        wx.navigateBack({
            
        })
    },
    //initTagsData 数据初始化
    initTagsData(){
        const t = this;
        app.employeeUserTag().then((res)=>{
            console.log(res);
            t.setData({
                employeeUserTag: res
            })
        })
        console.log(t.data);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const t = this;
        t.initTagsData();
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