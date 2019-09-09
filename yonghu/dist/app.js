'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
    globalData: {
        u: 'https://zzh.hzysofti.com/userApi/v1/',
        userInfo: {},
        itemList: [],
        memberLevelName: ['普通会员', '一星会员', '二星会员', '三星会员']
    },
    onLaunch: function onLaunch() {
        _system2.default.attachInfo();
        
    },
    onShow: function onShow() { },
    onHide: function onHide() { },
    getRequest: function getRequest(url, params, type) {
        var t = this;
        wx.showLoading({
            title: '加载中'
        });
        var _url = t.globalData.u + url;
        var p = new Promise(function (resolve, reject) {
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
                    if (!res.data || res.data.code){
                        wx.showModal({
                            content: '系统错误'
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
        });
        return p;
    },
    
    postRequest: function getRequest(url, params, type) {
        var t = this;
        wx.showLoading({
            title: '加载中'
        });
        let _url = t.globalData.u + url;
        var p = new Promise(function (resolve, reject) {
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
        });
        return p;
    },
    userLogin(){
        const t = this;
        let params = {
            code: t.globalData.code,
            phone: t.globalData.phone,
            userInfo: t.globalData.userInfo
        }
        t.postRequest('userLogin', params).then((res)=>{
            t.globalData.userInfo = Object.assign(t.globalData.userInfo, res)
            wx.setStorageSync('openId', res.openId)
            wx.reLaunch({
                url: 'index',
            })
        })
    },
    userInfo(){
        const t = this;
        var p = new Promise(function (resolve, reject) {
            let openId = wx.getStorageSync('openId');
            let params = {
                openId: openId
            }
            t.getUserInfo().then(()=>{
                t.getRequest('userInfo', params).then((res) => {
                    
                    t.globalData.userInfo = Object.assign(t.globalData.userInfo, res);
                    console.log(t.globalData.userInfo)
                    resolve();
                })
            });
            
        })
        return p;
    },
    // 微信自己的获取用户信息
    getUserInfo: function getUserInfo() {
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
    getLoaction(){
        const t = this;
        let p = new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'wgs84',
                success: function success(res) {
                    console.log(res);
                    t.globalData.x = res.latitude; // 经度
                    t.globalData.y = res.longitude; // 纬度
                    resolve()
                }
            });
        })
        return p;
    },
    // 获取服务分类
    itemClass(){
        const t = this;
        let p = new Promise((resolve, reject)=>{
            t.getRequest('itemClass', {}).then((res) => {
                t.globalData.itemList = res;
                resolve(res);
            })
        })
        return p;
    },
    // 获取首页数据
    index(){
        const t = this;
        let p = new Promise((resolve, reject) => {
            let params = {
                x: t.globalData.x,
                y: t.globalData.y
            }
            t.getRequest('index', params).then((res) => {
                t.globalData.itemList = res;
                resolve(res);
            })
        })
        return p;
    }
});