// pages/wode/information.js
const app = getApp();
Page({
    chooseImg(){
        const t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFilePaths[0],
                    encoding: "base64",
                    success: function (res) {
                        console.log(res)//返回base64编码结果，但是图片的话没有data:image/png
                        app.upload('data:image/png;base64,' + res.data).then(res=>{
                            t.setData({
                                photo: res.netUrl
                            })
                        })
                    }
                })
            }
        })
    },
    /**
     * 页面的初始数据
     */
    formSubmit: function (e) {
        const t = this;
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        let params = e.detail.value;
        params.userId = app.globalData.userInfo.id;
        params.photo = t.data.photo;
        app.user(params).then((res)=>{
            app.userInfo(true);
            wx.showToast({
                icon: 'none',
                title: '修改信息成功'
            })
        })
    },
    data: {
        sexs: ['女', '男'],
        date: ''
    },
    bindPickerChange: function (e) {
        const t = this;
        t.setData({
            sex: e.detail.value
        })
    },
    bindDateChange: function (e) {
        const t = this;
        t.setData({
            birthday: e.detail.value
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
        let U = app.globalData.userInfo;
        t.setData({
            U: U,
            sex: U.sex,
            birthday: U.birthday,
            photo: U.photo || U.avatarUrl
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