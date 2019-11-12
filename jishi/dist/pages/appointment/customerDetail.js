'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        tags: [],
        showSR: false,
        memberLevelTexts: ["普通会员", "1星会员", "2星会员", "3星会员"],//0普通会员  1 1星   2 2星   3 3星
        memberLevelText: "",
        nowData: app.getNowFormatDate()
    },
    //给用户打标签
    addTag(e) {
        var t = this;
        wx.navigateTo({
            url: '../index/tag?userId=' + e.currentTarget.dataset.userid + "&employeeId=" + app.globalData.userInfo.id + "&orderId=" + e.currentTarget.dataset.orderid + "&orderItemId=" + e.currentTarget.dataset.orderitemid
        })
    },
    //技师端用户历史消费
    employeeUserConsume() {
        const t = this;
        let params = {
            userId: t.data.userId
        }
        app.employeeUserConsume(params).then((res) => {
            t.setData({
                employeeUserConsume: res
            });

        })
    },
    //技师端加载用户信息及标签
    employeeUserTag() {
        const t = this;
        let params = {
            userId: t.data.userId
        }
        app.employeeUserTag(params).then((res) => {
            //处理用户标签
            let tagsArray = [];
            if (res.userTags) {
                tagsArray = res.userTags.tags.split(",");
            }
            //生日日期计算，在页面提示多少天生日，生日当天弹出提示框
            //当月生日，计算还剩几天生日
            let showSR = false;
            let showBirText = "";
            // let birthday = res.birthday;
            let birthday = "1992-02-31";
            if (birthday) {
                let birArr = birthday.split("-");
                let M = birArr[1];
                let D = birArr[2];
                let Now = new Date();
                let NowM = Now.getMonth() + 1;
                let NowD = Now.getDate();
                if (NowM == M && NowD == D) {
                    if (NowD == D) {//生日当天
                        showSR = true;
                        showBirText = "今天生日"
                    } else if (NowD > D) {//生日前夕
                        let numD = NowD - D;
                        showBirText = "还有" + numD + "天生日"
                    }
                }


            }


            //处理用户等级
            let memberLevelText = t.data.memberLevelTexts[res.memberLevel]
            t.setData({
                userDetail: res,
                tags: tagsArray,
                memberLevelText: memberLevelText,
                showSR: showSR,
                showBirText: showBirText
            });
        })
    },
    /**
      * 生命周期函数--监听页面加载
      */
    onShow(){
        const t = this;
        t.employeeUserTag();
    },
    onLoad: function (options) {
        const t = this;
        console.log(t.data.nowData)
        t.setData({
            userId: options.userId,
            orderDetail: app.globalData.orderDetail
        })
        
        t.employeeUserConsume();


    },
});