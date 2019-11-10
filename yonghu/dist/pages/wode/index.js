'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
import QRCode from '../../static/utils/weapp-qrcode.js'
exports.default = Page({
    data: {
        userInfo: {},
        memberLevelName: app.globalData.memberLevelName,
        ewmShow: false
    },
    handleShowMask1() {
        const t = this;
        t.setData({
            ewmShow: false
        })
    },
    showEwm() {
        const t = this;
        wx.showLoading({
            title: '加载中'
        });
        t.setData({
            ewmShow: true
        })
        new QRCode('myQrcode', {
            text: t.data.userInfo.memberNum,
            width: 200,
            height: 200,
            padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
            correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
            callback: (res) => {
                console.log(res.path)
                // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
                wx.hideLoading();
                
            }
        })
    },
    userInfo(){
        app.userInfo();
    },
    onShow() {
        const t = this;
        let len = app.globalData.barList.length;
        t.setData({
            isTuan: app.globalData.isTuan
        })
        if (wx.getStorageSync('openId')){
            app.userInfo(true).then(() => {
                t.setData({
                    userInfo: app.globalData.userInfo
                })
            })
        }
       
        this.getTabBar().setData({
            selected: len==3?2:1,
            list: app.globalData.barList
        })
    }
});