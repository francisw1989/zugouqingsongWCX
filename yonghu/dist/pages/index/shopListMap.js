"use strict";
const app = getApp();
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
        },
        item:{

        },
        dates:[],
        date: '',
        time: ''
    },
    phone: function phone() {
        wx.makePhoneCall({
            phoneNumber: '1340000' //仅为示例，并非真实的电话号码
        });
    },
    makertap: function makertap(e) {
        console.log(e);
        const t = this;
        for (const v of app.globalData.stores){
            if (v.id == e.markerId){
                t.setData({
                    item: v
                })
            }
        }
        t.setData({
            show: true,

        });
    },
    close: function close() {
        var t = this;
        t.setData({
            show: false
        });
    },
    choose: function choose(e) {
        console.log('323');
        var t = this;
        t.setData({
            cIndex: e.target.dataset.index,
            date: t.data.dates[e.target.dataset.index]
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
        const t = this;
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
            item: app.globalData.stores[2]
        })
        console.log(t.data.item)
        t.setData({
            latitude: t.data.item.x,
            longitude: t.data.item.y
        });
    },
    ljyy(){
        const t = this;
        let _do = () => {
            app.globalData.chooseStore = t.data.item;
            let msg = '';
            if (!t.data.time) {
                msg = '请选择时间'
            }
            if (!t.data.date) {
                msg = '请选择日期'
            }
            if (msg) {
                wx.showModal({
                    title: '提示',
                    content: msg,
                })
                return
            }
            app.globalData.chooseStore.appointTime = t.data.date + ' ' + t.data.time + ':00';
            if (app.globalData.appointFromProject) {
                // choose form project, no need choose projects again
                wx.redirectTo({
                    url: 'chooseProjectJishi',
                })
            } else {
                // choose form store, choose projects 
                wx.redirectTo({
                    url: 'projectsList?pageFrom=appointment',
                })
            }
        }
        _do();
        
    },
    onLoad: function onLoad() {
        var t = this;
        t.setMap();
        t.setData({
            dates: app.get_tomorrow_data()
        })
    }
});