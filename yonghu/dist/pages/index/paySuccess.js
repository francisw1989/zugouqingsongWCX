'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Page({
	data: {
		jsChecked: true
	},
    checkboxChange: function (e) {
        const t = this;
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        t.setData({
            jsChecked: e.detail.value
        })
    },
    onLoad(){
        const t = this;
        app.orderDetail().then((res)=>{
            app.globalData.orderDetail = res;
            t.setData({
                D: res
            })
        })
    },
    finish(){
        const t = this;
        if (!t.data.jsChecked){
            app.isSms().then((res)=>{
                wx.switchTab({
                    url: '../index/index'
                })
            })
        }else{
            app.isSms().then((res) => {
                wx.switchTab({
                    url: '../index/index'
                })
            })
        }
    }
});