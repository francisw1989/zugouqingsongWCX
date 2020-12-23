'use strict';
var app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Page({
    data: {
        intervalTime: 1 * 60 * 1000,
        interval: null,
        index: 0, //预约详情
        leve: 1,
        name: '',
        names: ['一星技师', '二星技师', '三星技师'],
        tags: [],
        color: '',
        userInfo: {},
        employeeIndex: {},
        nowSign: '',
        nowSignText: "",
        nowSigns: ['请假', '正常', '未打卡', '休假', '迟到', '早退', '迟到早退'], //考勤状态（ 0.请假 1.正常  2.未打卡  3.休假   4.迟到  5.早退  6.迟到早退 
    },
    setting: function setting() {
        var t = this;
        t.setData({
            leve: app.globalData.grade,
            nowSignText: t.data.nowSigns[t.data.employeeIndex.nowSign],
            name: t.data.names[app.globalData.leve - 1],
            color: app.globalData.color
        });
    },
    onShow() {
        var t = this;
        if (wx.getStorageSync('openId')) {
            app.userInfo().then(() => {
                t.setData({
                    userInfo: app.globalData.userInfo
                })
                t.employeeIndex();
            })
        }



    },
    //开始服务
    employeeStartServie(e) {
        const t = this;
        let orderItemId = e.currentTarget.dataset.orderitemid;
        console.log(orderItemId);
        let params = {
            employeeId: app.globalData.userInfo.id,
            orderItemId: orderItemId
        }
        app.employeeStartServie(params).then(() => {
            wx.showToast({
                title: '服务已开始',
                icon: "success",
                duration: 2000
            })
            setTimeout(() => {
                t.onShow();
            }, 1000)
        })
    },
    //结束服务
    employeeEndServie: function (e) {
        const t = this;
        let orderItemId = e.currentTarget.dataset.orderitemid;
        console.log(orderItemId);
        let params = {
            employeeId: app.globalData.userInfo.id,
            orderItemId: orderItemId
        }
        app.employeeEndServie(params).then((res) => {
            wx.showToast({
                title: '已完成服务',
                icon: "success",
                duration: 2000
            })
            setTimeout(() => {
                t.onShow();
            }, 1000)

        })
    },
    //打卡
    employeePunch(e) {
        const t = this;
        let _do = () => {
            let params = {
                employeeId: app.globalData.userInfo.id
            }
            app.employeePunch(params).then(() => {
                wx.showToast({
                    title: '已打卡',
                    icon: "success",
                    duration: 2000
                })
                setTimeout(() => {
                    t.onShow();
                }, 1000)

            })
        }

        if (!t.data.userInfo.id || !t.data.userInfo) {
            wx.showModal({
                title: '提示',
                content: '请先登录',
            });
            return;
        }

        wx.startWifi({
            success(res) {
                wx.getConnectedWifi({
                    success: function (e) {
                        // wx.showModal({
                        //     title: '提示',
                        //     content: JSON.stringify(e.wifi),
                        // })

                        if (t.data.userInfo.stores.wifiSsid != '' && t.data.userInfo.stores.wifiSsid == e.wifi.SSID) {
                            _do();
                        } else if (t.data.userInfo.stores.wifiSsid != '') {
                            wx.showModal({
                                title: '提示',
                                content: '请连接所属门店WiFi',
                            })
                        }
                    },
                    fail: function (e) {
                        wx.showModal({
                            title: '提示',
                            content: '请先打开wifi连接',
                        })
                    }
                })
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: JSON.stringify(res),
                })
            }
        })



    },
    //切换预约，显示不同详情
    showAppointDetail(e) {
        const t = this;
        let index = e.currentTarget.dataset.index;
        t.setData({
            index: index
        })
    },
    //给用户打标签，去往标签页面
    addTag(e) {
        var t = this;
        console.log(e.currentTarget.dataset.userid);
        wx.navigateTo({
            url: 'tag?userId=' + e.currentTarget.dataset.userid + "&employeeId=" + app.globalData.userInfo.id + "&orderId=" + e.currentTarget.dataset.orderid + "&orderItemId=" + e.currentTarget.dataset.orderitemid
        })
    },
    //获取与毫秒数的转化比例（相差天数：1，相差小时数：2，相差分钟数：3，相差秒数：4）
    getDifferScale: function (value) {
        var format;
        //获取转化比（天数跟毫秒数的比例）
        if (value == 1) {
            format = parseFloat(24 * 60 * 60 * 1000);
        }
        //获取转化比（小时数跟毫秒数的比例）
        else if (value == 2) {
            format = parseFloat(60 * 60 * 1000);
        }
        //获取转化比（分钟数跟毫秒数的比例）
        else if (value == 3) {
            format = parseFloat(60 * 1000);
        }
        //获取转化比（秒数跟毫秒数的比例）
        else if (value == 4) {
            format = parseFloat(1000);
        }
        return format;
    },
    //获取两个日期的相差日期数(differ 相差天数：1、相差小时数：2、相差分钟数：3、相差秒数：4)
    getDifferDate: function (firstDate, secondDate, differ) {
        // firstDate = firstDate.replace(/-/g, "/");
        secondDate = secondDate.replace(/-/g, "/");
        const t = this;
        //1)将两个日期字符串转化为日期对象
        var startDate = new Date(firstDate).getTime();
        console.log(startDate);
        var endDate = new Date(secondDate).getTime();
        console.log(endDate);
        //2)计算两个日期相差的毫秒数
        var msecNum = endDate - startDate;
        //3)计算两个日期相差的天数
        var dayNum = Math.abs(Math.floor(msecNum / t.getDifferScale(differ)));
        return dayNum;
    },
    employeeIndex: function () {
        let t = this;
        if (!app.globalData.userInfo.id){
            return;
        }
        let _do = ()=>{
            let params = {
                employeeId: app.globalData.userInfo.id
            }
            //获取首页技师收益等统计
            app.employeeIndex(params).then((res) => {
                t.data.userInfo.stores = res.employee.stores;
                //处理订单信息的倒计时数据
                try {
                    let newRes = res.nowOrder.filter((element, index) => {
                        if (element.status == 2) { //已支付待到店状态，计算出倒计时秒数
                            element.countdown = t.getDifferDate(new Date(), element.orderStartTime.replace(/\-/g, '/'), 4);
                        }
                    });
                } catch (e) { }
                t.setData({
                    employeeIndex: res
                })
                console.log(t.data);
                t.setting();
            });
        }
        _do()
        if (t.data.interval) {
            clearInterval(t.data.interval);
        }
        t.data.interval = setInterval(function () {
            _do()
        }, t.data.intervalTime);

    },
    onHide: function onHide() {
        let t = this;
        console.log(t.data.interval);
        if (t.data.interval) {
            clearInterval(t.data.interval);
        }
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
});