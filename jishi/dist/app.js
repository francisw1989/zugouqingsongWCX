'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
    globalData: {
        leve: 1,
        colors: ['#409c8a', '#fdbd75', '#8f6eff'],
        color: '#459E8C',
        u: 'https://zzh.hzysofti.com/employeeApi/v1/',
        userInfo: {},
    },
    setBg: function setBg() {
        var t = this;
        var color = t.globalData.colors[t.globalData.leve - 1];
        t.color = color;
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: color
        });
    },
    onLaunch: function onLaunch() {
        _system2.default.attachInfo();
        
    },
    onShow: function onShow() {
        this.setBg();
     },
    onHide: function onHide() { },
    getRequest: function getRequest(url, params, noNeedLoading) {
        var t = this;
        if (!noNeedLoading) {
            wx.showLoading({
                title: '加载中'
            });
        }
        var _url = t.globalData.u + url;
        var p = new Promise(function (resolve, reject) {
            let _do = () => {
                wx.request({
                    url: _url,
                    data: params,
                    method: 'get',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json',
                    success: function success(res) {
                        wx.hideLoading();
                        if (res.data && res.data.msg) {
                            wx.showModal({
                                content: res.data.msg
                            });
                            return
                        }
                        resolve(res.data);

                    },
                    fail: function fail(res) {
                        wx.hideLoading();
                        wx.showModal({
                            content: JSON.stringify(res)
                        });
                        reject();
                    },
                    complete: function complete() { }
                });
            }
            if (params.hasOwnProperty('employeeId') && url != 'userInfo') {
                t.userInfo().then(() => {
                    params.employeeId = t.globalData.userInfo.userId;
                    _do();
                })
            } else {
                _do();
            }

        });
        return p;
    },
    postRequest: function getRequest(url, params, type) {
        var t = this;
        wx.showLoading({
            title: '加载中'
        });
        let _url = '';
        if (type && type == 'spe') {
            _url = t.globalData.u_s + url
        } else {
            _url = t.globalData.u + url
        }

        var p = new Promise(function (resolve, reject) {
            let _do = () => {
                wx.request({
                    url: _url,
                    data: params,
                    method: 'POST',
                    header: {
                        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json',
                    success: function success(res) {
                        wx.hideLoading();
                        if (res.data && res.data.msg) {
                            wx.showModal({
                                content: res.data.msg
                            });
                            return
                        }
                        resolve(res.data)
                    },
                    fail: function fail(res) {
                        wx.hideLoading();
                        wx.showModal({
                            content: JSON.stringify(res)
                        });
                        reject(res);
                    },
                    complete: function complete() { }
                });
            }
            if (url != 'employeeLogin') {
                t.userInfo().then(() => {
                    _do()
                })
            } else {
                _do()
            }


        });
        return p;
    },
    jsonToParameters(parmas) {
        let _parmas = Object.keys(parmas).map(function (key) {
            // body...
            return encodeURIComponent(key) + "=" + encodeURIComponent(parmas[key]);
        }).join("&");
        return _parmas;
    },
    userLogin() {
        const t = this;
        let params = {
            code: t.globalData.code,
            phone: t.globalData.phone,
            userInfo: t.globalData.userInfo
        }
        t.postRequest('employeeLogin', params).then((res) => {
            console.log(res);
            t.globalData.userInfo = Object.assign(t.globalData.userInfo, res)
            console.log(t.globalData.userInfo)
            console.log(res.openId)
            wx.setStorageSync('openId', res.openId)
            wx.reLaunch({
                url: 'index',
            })
        })
    },
    userInfo(reload) {
        const t = this;
        var p = new Promise(function (resolve, reject) {
            let openId = wx.getStorageSync('openId');

            if (!openId){
                wx.navigateTo({
                    url: '../index/wxdl',
                })
                return;
            }
            if (t.globalData.userInfo.userId && !reload){
                resolve();
                return
            }

            let params = {
                openId: openId
            }

            t.geWxtUserInfo().then(()=>{
                t.getRequest('employeeInfo', params).then((res) => {
                    // res.userId = res.id;
                    res.userId = 12;
                    t.globalData.userInfo = Object.assign(t.globalData.userInfo, res);
                    console.log(t.globalData.userInfo)
                    resolve();
                })
            });

        })
        return p;

    },
    wxPay: function wxPay(obj) {
        const t = this;
        obj = {
            appId: "wx5381d6fd8a98109e",
            nonceStr: "1567252821067",
            packageValue: "prepay_id=wx31200021035821bc7fa776b71138378100",
            paySign: "3EF62B5457927A168A925265602E3A55",
            signType: "MD5",
            timeStamp: "1567252821"
        }
        wx.showLoading({
            title: '加载中'
        });
        console.log(JSON.stringify({
            timeStamp: obj.timeStamp + '',
            nonceStr: obj.nonceStr + '',
            package: obj.packageValue + '',
            signType: obj.signType,
            paySign: obj.paySign + ''
        }));
        wx.requestPayment({
            //支付
            timeStamp: obj.timeStamp + '',
            nonceStr: obj.nonceStr + '',
            package: obj.packageValue + '',
            signType: obj.signType,
            paySign: obj.paySign + '',
            success: function success(res) {

                wx.showToast({
                    title: '支付成功'
                });
                setTimeout(function () {
                    wx.hideLoading();
                    wx.redirectTo({
                        url: 'paySuccess',
                    })
                }, 1000);
            },
            fail: function fail(res) {
                wx.hideLoading();
                // wx.showModal({
                //     title: '提示',
                //     content: JSON.stringify(res)
                // })
            },
            complete: function complete(res) {
                wx.hideLoading();
            }
        });
    },
    // 微信自己的获取用户信息
    geWxtUserInfo() {
        var t = this;
        var p = new Promise(function (resolve, reject) {
            wx.getSetting({
                success: function success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        wx.getUserInfo({
                            success: function success(res) {
                                t.globalData.userInfo = Object.assign(t.globalData.userInfo, res.userInfo);
                                resolve();
                            }
                        });
                    }
                }
            });
        });
        return p;
    },
    //首页技师信息
    employeeIndex: function employeeIndex(obj){
        const t = this;
        // let userInfo = t.globalData.userInfo;
        // let userId = userInfo.userInfo;
        // console.log(userInfo);
        // console.log(userId);
        // let params = {
        //     employeeId: t.globalData.userInfo.userId  
        // }
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeIndex', obj,false).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //今日服务人次
    employeeTodyService: function employeeTodyService(){
        const t = this;
        console.log(t.globalData.userInfo);
        let params = {
            employeeId: t.globalData.userInfo.userId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeTodyService', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //今日收益
    employeeTodyIncome:function employeeTodyIncome(){
        const t = this;
        console.log(t.globalData.userInfo);
        let params = {
            employeeId: t.globalData.userInfo.userId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeTodyIncome', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //首页-打卡
    employeePunch:function employeePunch(){
        const t = this;
        let params = {
            employeeId: t.globalData.userInfo.userId
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('employeePunch?'+t.jsonToParameters(params), {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //首页-开始服务
    employeeStartServie:function employeeStartServie(obj){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.postRequest('employeeStartServie?'+t.jsonToParameters(obj), {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //技师端加载用户信息及标签
    userTagsList:function userTagsList(){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('userTags/list').then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //技师给用户打标签
    employeeTagUser:function employeeTagUser(obj){
        const t = this;

        let p = new Promise((resolve, reject) => {
            t.postRequest('employeeTagUser?'+t.jsonToParameters(obj), {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //我的预约
    employeeOrder:function employeeOrder(obj){
        console.log(obj);
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeOrder', obj).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //我的考勤
    employeeAttendance:function employeeAttendance(obj){
        const t = this;
        let employeeId = t.globalData.userInfo.userId;
        let params = {
            monthDate:obj.monthDate
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeAttendance/'+employeeId, params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //排班信息
    employeeSchedule:function employeeSchedule(obj){
        const t = this;
        let employeeId = t.globalData.userInfo.userId;
        let params = {
            monthDate:obj.monthDate
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeSchedule/'+employeeId, params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //评价列表  
    employeeTodyPraise:function employeeTodyPraise(obj){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeTodyPraise', obj).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //预约详情  
    orderInfo:function orderInfo(obj){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('orderInfo', obj).then((res) => {
                console.log(res)
                resolve(res);
            })
        })
        return p;
    },
    //收益情况
    employeeStatistics:function employeeStatistics(obj){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeIncome', obj).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //师徒信息
    employeeMentor:function employeeMentor(obj){
        const t = this;
        let params = {
            employeeId: t.globalData.userInfo.userId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeMentor', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //结束服务
    employeeEndServie:function employeeEndServie(obj){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.postRequest('employeeEndServie?'+t.jsonToParameters(obj), {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //技师端用户历史消费
    employeeUserConsume:function employeeUserConsume(obj){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeUserConsume', obj).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //技师端加载用户信息及标签
    employeeUserTag:function employeeUserTag(obj){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('employeeUserTag', obj).then((res) => {
                resolve(res);
            })
        })
        return p;
    }
});