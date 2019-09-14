// pages/index/pingjia.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tbObj1: {
            'position': 'absolute',
            'width': '14px',
            'height': '14px',
            'background-color': '#459E8C',
            'border': '0',
            'border-radius': '7px',
            'top': '7px',
            'left': '15px',
            'z-index': '2',
            'box-shadow': '0px 0px 0px'
        },
        tbdObj2: {
            'background-color': '#2ac1a2'
        },
        score: 3,
        tab1:['不会','可能','会'],
        tab1Index: 1,
        
        tab2: [
            { name: '环境好', value: '0', checked: 'true'},
            { name: '服务好', value: '1' },
            { name: '姑娘美', value: '2' },
            { name: '服务周到', value: '3' },
        ],
        tab2Index: []
    },
    tab1click(e){
        const t = this;
        let v = e.target.dataset.index;
        let score;
        if(v==0){
            score = 1;
        } else if (v == 1) {
            score = 3;
        } else if (v == 2) {
            score = 5;
        }
        t.setData({
            score: score,
            tab1Index: v
        })
    },
    sliderchange(e){
        const t = this;
        console.log(e.detail.value)
        let score = e.detail.value;
        let tab1Index;
        if (score==1) {
            tab1Index = 0;
        } else if (score == 2 || score == 3 || score == 4) {
            tab1Index = 1;
        } else if (score == 5) {
            tab1Index = 2;
        }
        t.setData({
            score: score,
            tab1Index: tab1Index
        })
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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