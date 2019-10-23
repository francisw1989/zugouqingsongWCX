'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [
            {
                "createTime": "09-19 11:54",
                "createBy": null,
                "updateTime": "2019-10-16 15:44",
                "id": 1,
                "memberLevel": 0,
                "interestsContent": "免费送一次足底按摩（30分钟）",
                "memberLevelName": "初级会员",
                "amountCondition": 500,
                "frequencyCondition": 10,
                "changebackScale": 10,
                "icon": null
            },
            {
                "createTime": "09-19 11:55",
                "createBy": null,
                "updateTime": "2019-10-16 15:44",
                "id": 2,
                "memberLevel": 1,
                "interestsContent": "免费送一次颈部放松（60分钟）",
                "memberLevelName": "一星会员",
                "amountCondition": 1000,
                "frequencyCondition": 20,
                "changebackScale": 8,
                "icon": null
            },
            {
                "createTime": "09-19 11:55",
                "createBy": null,
                "updateTime": "2019-10-16 15:44",
                "id": 3,
                "memberLevel": 2,
                "interestsContent": "免费送一次足底和spa（30分钟）",
                "memberLevelName": "二星会员",
                "amountCondition": 2000,
                "frequencyCondition": 40,
                "changebackScale": 4,
                "icon": null
            },
            {
                "createTime": "09-19 11:55",
                "createBy": null,
                "updateTime": "2019-10-16 15:44",
                "id": 4,
                "memberLevel": 3,
                "interestsContent": "免费送小食拼盘一个（10次）\n免费送小食拼盘一个（10次）",
                "memberLevelName": "三星会员",
                "amountCondition": 5100,
                "frequencyCondition": 90,
                "changebackScale": 2,
                "icon": null
            }
        ],
        inkBarStyle: {
            'width': '30%'
        },
        current: 0
    },
    onShow(){
        const t = this;
        t.setData({
            userInfo: app.globalData.userInfo
        })
    },
    tabclick(e) {
        const t = this;
        var index = e.currentTarget.dataset.index;
        this.setData({
            current: index
        });
        
    },
});