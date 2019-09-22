"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bmap = require("../../static/utils/bmap-wx.min.js");
var wxMarkerData = [];
exports.default = Page({
    data: {
        time: '',
        day: '今天',
        cIndex: '-1',
        markers: [],
        show: true,
        latitude: "",
        longitude: "",
        maskStyle: {
            'background-color': 'transparent'
        }
    },
    phone: function phone() {
        wx.makePhoneCall({
            phoneNumber: '1340000' //仅为示例，并非真实的电话号码
        });
    },
    makertap: function makertap(e) {
        console.log(e);
        var t = this;
        t.setData({
            show: true
        });
    },
    close: function close() {
        var t = this;
        t.setData({
            show: false
        });
    },
    chose: function chose(e) {
        console.log('323');
        var t = this;
        t.setData({
            cIndex: e.target.dataset.index
        });
        if (e.target.dataset.index == 0) {
            t.setData({
                day: '今天：'
            });
        } else {
            t.setData({
                day: '明天：'
            });
        }
    },

    bindTimeChange: function bindTimeChange(e) {
        var t = this;

        t.setData({
            time: e.detail.value
        });
    },
    setMap(){
        var BMap = new bmap.BMapWX({
            ak: "1kjiGRSGCWINwk4F0WzSVEibiQhOE0Eo"
        });
        let markers = [];
        for (const v of app.globalData.stores){
            markers.push({
                latitude: v.x,
                longitude: v.y,
                id: v.id,
                iconPath: "../../static/images/24.png",
                callout: {
                    content: v.name,
                    color: '#666',
                    padding: 10,
                    bgColor: "#fff",
                    textAlign: 'center',
                    borderRadius: 15,
                    display: "ALWAYS",
                    border: "1px solid #ddd",
                    boxShadow: "2px 2px 10px #aaa"
                }
            })
        }
        t.setData({
            markers: markers
        });
        // 设置中心点
        t.setData({
            latitude: app.globalData.aklatitude,
            longitude: app.globalData.longitude
        });
    },
    onLoad: function onLoad() {
        var t = this;
        t.setMap()
    }
});