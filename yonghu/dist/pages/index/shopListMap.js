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
    onLoad: function onLoad() {
        var t = this;
        var BMap = new bmap.BMapWX({
            ak: "1kjiGRSGCWINwk4F0WzSVEibiQhOE0Eo"
        });
        t.setData({
            markers: [{
                latitude: 32.061829,
                longitude: 118.797863,
                shopName: '中央门店',
                id: '213dfd1231232',
                iconPath: "../../static/images/24.png",
                callout: {
                    content: "中央门店\n店内：23人",
                    color: '#666',
                    padding: 10,
                    bgColor: "#fff",
                    textAlign: 'center',
                    borderRadius: 15,
                    display: "ALWAYS",
                    border: "1px solid #ddd",
                    boxShadow: "2px 2px 10px #aaa"
                }
            }, {
                latitude: 32.07,
                longitude: 118.82,
                shopName: '中央门店2',
                id: '213dfd1231232',
                iconPath: "../../static/images/24.png",
                iconTapPath: "../../static/images/24.png",
                callout: {
                    content: "中央门店\n店内：23人",
                    color: '#666',
                    padding: 10,
                    bgColor: "#fff",
                    textAlign: 'center',
                    borderRadius: 15,
                    display: "ALWAYS",
                    border: "1px solid #ddd",
                    boxShadow: "2px 2px 10px #aaa"
                }
            }, {
                latitude: 32.10,
                longitude: 118.82,
                shopName: '中央门店3',
                id: '213dfd1231232',
                iconPath: "../../static/images/24.png",
                iconTapPath: "../../static/images/24.png",
                callout: {
                    content: "中央门店\n店内：23人",
                    color: '#666',
                    padding: 10,
                    bgColor: "#fff",
                    textAlign: 'center',
                    borderRadius: 15,
                    display: "ALWAYS",
                    border: "1px solid #ddd",
                    boxShadow: "2px 2px 10px #aaa"
                }
            }]
        });
        // 设置中心点
        wx.getLocation({
            type: 'wgs84',
            success: function success(res) {
                console.log(res);
                var latitude = res.latitude;
                var longitude = res.longitude;
                // var speed =res.speed
                // var accuracy = res.accuracy
                t.setData({
                    latitude: latitude,
                    longitude: longitude
                });
            }
        });
    }
});