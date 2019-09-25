// pages/index/fwrc.js
const app = getApp();
var wxCharts = require('../../static/utils/wxcharts.js');
var ringChart1 = null;
var ringChart2 = null;
var ringChart3 = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leve: 1,
        width: wx.WIN_WIDTH,
        perW: wx.WIN_WIDTH/3,
        useemployeeTodyServicerInfo:{}
    },
    //initData 数据初始化
    initData(){
        const t = this;
        app.employeeTodyService().then((res)=>{
            console.log(res);
            t.setData({
                useemployeeTodyServicerInfo: res
            })
        })
    },
    initChart1(){
        const t = this;
        ringChart1 = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas1',
            type: 'ring',
            extra: {
                ringWidth: 5,
                pie: {
                    offsetAngle: -45
                }
            },
            title: {
                
            },
            subtitle: {
                
            },
            series: [{
                name: '男性',
                data: t.data.useemployeeTodyServicerInfo.serviceMan,
                stroke: false,
                color: '#7E65FF'
            }, {
                name: '女性',
                data: t.data.useemployeeTodyServicerInfo.serviceGirl,
                stroke: false,
                color: '#fff'
            }],
            disablePieStroke: true,
            width: this.data.perW,
            height: this.data.perW,
            dataLabel: false,
            legend: false,
            background: '#f5f5f5',
            padding: 0
        });
    },
    initChart2() {
        ringChart2 = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas2',
            type: 'ring',
            extra: {
                ringWidth: 5,
                pie: {
                    offsetAngle: -45
                }
            },
            title: {

            },
            subtitle: {

            },
            series: [{
                name: '普通会员',
                data: 100,
                stroke: false,
                color: '#FEC07A'
            }, {
                name: '三星会员',
                data: 10,
                stroke: false,
                color: '#fff'
            }],
            disablePieStroke: true,
            width: this.data.perW,
            height: this.data.perW,
            dataLabel: false,
            legend: false,
            background: '#f5f5f5',
            padding: 0
        });
    },
    initChart3() {

        ringChart3 = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas3',
            type: 'ring',
            extra: {
                ringWidth: 5,
                pie: {
                    offsetAngle: -45
                }
            },
            title: {

            },
            subtitle: {

            },
            series: [{
                name: '男性',
                data: 100,
                stroke: false,
                color: '#469F8D'
            }, {
                name: '女性',
                data: 55,
                stroke: false,
                color: '#fff'
            }],
            disablePieStroke: true,
            width: this.data.perW,
            height: this.data.perW,
            dataLabel: false,
            legend: false,
            background: '#f5f5f5',
            padding: 0
        });
    },
    setting: function setting() {
        var t = this;
        t.setData({
            leve: app.globalData.leve
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const t = this;
        t.setting();
        t.initData();
        t.initChart1();
        t.initChart2();
        t.initChart3();
        console.log(wx.WIN_WIDTH)
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