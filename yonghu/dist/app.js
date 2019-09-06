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
        userInfo: {}
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
            console.log(res);
            t.globalData.userInfo = Object.assign(t.globalData.userInfo, res)
            console.log(t.globalData.userInfo)
            wx.setStorageSync('openId', res.openId)
            wx.reLaunch({
                url: 'index',
            })
        })
    },
    userInfo(){
        const t = this;
        let openId;
        if (wx.getStorageSync('openId')){
            wx.reLaunch({
                url: 'index',
            })
            openId = wx.getStorageSync('openId');
            let params = {
                openId: openId
            }
            t.getRequest('userInfo', params).then((res) => {
                console.log(res)
            })
        }else{
            wx.navigateTo({
                url: 'wxdl',
            })
        }
        
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
    getFwList(){
        let fwList = [
            { name: '休闲项目', ico: '1.png' },
            { name: '养生项目', ico: '2.png' },
            { name: '保健项目', ico: '3.png' },
        ];
        return fwList;
    }
});