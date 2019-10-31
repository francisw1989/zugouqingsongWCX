// pages/wode/income.js
const app = getApp();
var wxCharts = require('../../static/utils/wxcharts.js');
var lineChart1 = null;
var lineChart2 = null;
var lineChart3 = null;
var pieChart = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        width: wx.WIN_WIDTH,
        tabs: ['本周',' 本月','本年'],//1本周2本月3本年
        tab: '本周'
    },
    handleChange: function handleChange(e) {
        const t = this;
        var index = e.detail.index;
        this.setData({
            current: index,
            tab: t.data.tabs[t.data.current]
        });
        t.employeeStatistics();
    },
    moveHandler1: function (e) {
        lineChart1.scroll(e);
    },
    touchEndHandler1: function (e) {
        lineChart1.scrollEnd(e);
        lineChart1.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },
    touchHandler1: function (e) {
        lineChart1.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
        lineChart1.scrollStart(e);
    },
    initMap1(){
        const t = this;
        console.log(t.data.incomeData)
        var disabled=false;
        var max = Math.max.apply(null, t.data.incomeData.record);
        console.log(max);
        if(max==0){
            max=0.1;
            disabled=true;
        }
        lineChart1 = new wxCharts({
            enableScroll: true,
            canvasId: 'lineCanvas1',
            type: 'line',
            // categories: ['2019-05-06', '2019-05-07', '2019-05-08', '2019-05-09', '2019-05-10', '2019-05-11', '2019-05-12', '2019-05-06', '2019-05-07', '2019-05-08', '2019-05-09', '2019-05-10', '2019-05-11', '2019-05-12', '2019-05-06', '2019-05-07', '2019-05-08', '2019-05-09', '2019-05-10', '2019-05-11', '2019-05-12',],
            categories:t.data.incomeData.date,
            animation: true,
            // background: '#f5f5f5',
            series: [{
                name: '收益',
                // data: ['20', '32', '34', '43', '30', '63', '50', '20', '32', '34', '43', '30', '63', '50', '20', '32', '34', '43', '30', '63', '50',],
                data:t.data.incomeData.record,
                format: function (val, name) {
                    return parseFloat(val).toFixed(2) + '元';
                },
                color: '#7E65FF',
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                // title: '收益金额 (元)',
                // format: function (val) {
                //     return val.toFixed(2);
                // },
                min: 0,
                max:max,
                disabled: disabled
            },
            width: t.data.width-40,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    },
    moveHandler2: function (e) {
        lineChart2.scroll(e);
    },
    touchEndHandler2: function (e) {
        lineChart2.scrollEnd(e);
        lineChart2.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },
    touchHandler2: function (e) {
        lineChart2.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
        lineChart2.scrollStart(e);
    },
    initMap2() {
        const t = this;
        var disabled=false;
        var max = Math.max.apply(null, t.data.serviceData.record);
        console.log(max);
        if(max==0){
            max=0.1;
            disabled=true;
        }
        lineChart2 = new wxCharts({
            enableScroll: true,
            canvasId: 'lineCanvas2',
            type: 'line',
            // categories: ['2019-05-06', '2019-05-07', '2019-05-08', '2019-05-09', '2019-05-10', '2019-05-11', '2019-05-12'],
            categories:t.data.serviceData.date,
            animation: true,
            // background: '#f5f5f5',
            series: [{
                name: '服务人次',
                // data: ['20', '32', '34', '43', '30', '63', '50'],
                data:t.data.serviceData.record,
                format: function (val, name) {
                    return val + '次';
                },
                color: '#FEC07A',
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                // title: '收益金额 (元)',
                // format: function (val) {
                //     return val.toFixed(2);
                // },
                min: 0,
                max:max,
                disabled: disabled
            },
            width: t.data.width - 40,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    },
    moveHandler3: function (e) {
        lineChart3.scroll(e);
    },
    touchEndHandler3: function (e) {
        lineChart3.scrollEnd(e);
        lineChart3.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },
    touchHandler3: function (e) {
        lineChart3.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
        lineChart3.scrollStart(e);
    },
    initMap3() {
        const t = this;
        var disabled=false;
        var max = Math.max.apply(null, t.data.goodsData.record);
        console.log(max);
        if(max==0){
            max=0.1;
            disabled=true;
        }
        lineChart3 = new wxCharts({
            enableScroll: true,
            canvasId: 'lineCanvas3',
            type: 'line',
            // categories: ['2019-05-06', '2019-05-07', '2019-05-08', '2019-05-09', '2019-05-10', '2019-05-11', '2019-05-12'],
            categories:t.data.goodsData.date,
            animation: true,
            // background: '#f5f5f5',
            series: [{
                name: '好评数',
                // data: ['20', '32', '34', '43', '30', '63', '50'],
                data:t.data.goodsData.record,
                format: function (val, name) {
                    return val + '次';
                },
                color: '#469F8D',
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                // title: '收益金额 (元)',
                // format: function (val) {
                //     return val.toFixed(2);
                // },
                min: 0,
                max:max,
                disabled: disabled
            },
            width: t.data.width - 40,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    },
    initPie(){
        const t = this;
        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
                name: '项目收益',
                data: Number(t.data.totalData.myIncome),
            }, {
                name: '一级徒弟贡献',
                data: Number(t.data.totalData.levelOne),
            }, {
                name: '二级徒弟贡献',
                data: Number(t.data.totalData.levelTwo),
            }],
            width: 300,
            height: 300,
            dataLabel: true,
        });
    },
    initData(){
        const t = this;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const t = this;
        t.setData({
            current: 0
        })
        t.employeeStatistics();
        
        
    },
    //处理数据
    employeeStatistics:function(){
        const t = this;
        let params = {
            employeeId: app.globalData.userInfo.id,
            type:t.data.current+1//类别（0本周1本月2本年）
        }
        //
       
        app.employeeStatistics(params).then((res)=>{
            t.setData({
                incomeData: res[0],
                serviceData: res[2],
                goodsData:res[1],
                totalData:res[3]
            })
            t.initMap1()
            t.initMap2()
            t.initMap3()
            t.initPie();
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