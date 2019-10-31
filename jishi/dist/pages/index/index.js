'use strict';
var app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Page({
    data: {
        intervalTime: 5 * 60 * 1000,
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
        app.userInfo().then(() => {
            t.setData({
                userInfo: app.globalData.userInfo
            });

          //获取首页技师收益等统计
          let params = {
            employeeId: app.globalData.userInfo.id
          }
          app.employeeIndex(params).then((res) => {
            //处理订单信息的倒计时数据
            try {
              let newRes = res.nowOrder.filter((element, index) => {
                if (element.status == 2) { //已支付待到店状态，计算出倒计时秒数
                  element.countdown = t.getDifferDate(new Date(), element.orderStartTime, 4);
                }
              });
            } catch (e) { }
            t.setData({
              employeeIndex: res
            })
            t.setting();
            t.employeeIndex();
          });
        })
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
    employeeEndServie: function(e) {
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
    getDifferScale: function(value) {
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
    getDifferDate: function(firstDate, secondDate, differ) {
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
    employeeIndex: function() {
        let t = this;
        // console.log(vm);
        t.data.interval = setInterval(function() {
            let params = {
                employeeId: app.globalData.userInfo.id
            }
            //获取首页技师收益等统计
            app.employeeIndex(params).then((res) => {
             
                //处理订单信息的倒计时数据
                let newRes = res.nowOrder.filter((element, index) => {
                    if (element.status == 2) { //已支付待到店状态，计算出倒计时秒数
                        element.countdown = t.getDifferDate(new Date(), element.orderStartTime.replace(/\-/g, '/'), 4);
                    }

                });

                t.setData({
                    employeeIndex: res
                })
                console.log(t.data);
                t.setting();
            });
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
    onLoad: function(options) {
        // let t = this;
        // let a  = t.getDifferDate("2019-10-19 20:39", "2019-10-19 20:40", 4);
        // console.log(a)
        //    const t = this;
        //     //获取首页技师收益等统计
        //     let params = {
        //         employeeId: app.globalData.userInfo.userId || "16"
        //     }
        //     app.employeeIndex(params).then((res) => {
        //     // const t = this;
        //     console.log(res);
        //     //处理订单信息的倒计时数据
        //     let newRes = res.nowOrder.filter((element,index) => {
        //         if(element.status == 2){//已支付待到店状态，计算出倒计时秒数
        //             element.countdown = t.getDifferDate(new Date(),element.orderStartTime,4);
        //         }

        //         //处理用户标签数据
        //         let tagsArray = element.userTags.tags.split(",");
        //         element.userTagList = tagsArray;

        //     });

        //     t.setData({
        //         employeeIndex: res
        //      })
        //      console.log(t.data);
        //      t.setting();
        //     //  t.employeeIndex();
        // });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
});