"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bmap = require("../../static/utils/bmap-wx.min.js");
var wxMarkerData = [];
exports.default = Page({
    data: {
        markers: [],
        latitude: "",
        longitude: ""
    },
    makertap: function makertap(e) {
        console.log(e);
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
                iconTapPath: "../../static/images/24.png"
            }, {
                latitude: 32.07,
                longitude: 118.82,
                shopName: '中央门店2',
                id: '213dfd1231232',
                iconPath: "../../static/images/24.png",
                iconTapPath: "../../static/images/24.png"
            }, {
                latitude: 32.10,
                longitude: 118.82,
                shopName: '中央门店3',
                id: '213dfd1231232',
                iconPath: "../../static/images/24.png",
                iconTapPath: "../../static/images/24.png"
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