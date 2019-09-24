'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
exports.default = Page({
    data: {
        leve: 1,
        name: '',
        names: ['一星技师', '二星技师', '三星技师'],
        tags: ['', '', '', ''],
        color: '',
        userInfo:{},
        employeeIndex:{},
        nowSign:'',
        nowSignText:"",
        nowSigns:['请假','正常','未打卡','休假','迟到','早退','迟到早退']//考勤状态（ 0.请假 1.正常  2.未打卡  3.休假   4.迟到  5.早退  6.迟到早退 ）
    },
    setting: function setting() {
        var t = this;
        console.log(t.data.employeeIndex.nowSign);
        t.setData({
            leve: app.globalData.grade,
            nowSignText:t.data.nowSigns[t.data.employeeIndex.nowSign],
            name: t.data.names[app.globalData.leve - 1],
            color: app.globalData.color
        });
        console.log(t.data.nowSignText);
    },

    userInfo(){
        const t = this;
        app.userInfo()
    },
    onShow() {
        var t = this;
        
        console.log(app.globalData.userInfo);
        app.userInfo().then(()=>{
            t.setData({
                userInfo: app.globalData.userInfo
            })
            
            // console.log(app.globalData.userInfo);
        })
        t.setting();
    },
    addTag(){
        wx.navigateTo({
            url: 'tag',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const t = this;
        //获取首页技师收益等统计
        app.employeeIndex().then((res) => {
            console.log(res);
            t.setData({
                employeeIndex: res
             })
             console.log(t.data);
             t.setting();
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
});