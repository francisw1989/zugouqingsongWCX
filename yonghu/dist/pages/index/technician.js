'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        pxList: [{}, {}, {}],
        lcList: [{}, {}, {}],
        D: {},
        dj: [],
        gradeArr: ['', '1', '11', '111'],
        stroeNames: ''
    },
    showImg(){
        wx.previewImage({
            current: this.data.D.employees.photo,
            urls: [this.data.D.employees.photo]
        })
    },
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        this.setData({
            current: index
        });
    },
    makePhoneCall(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phonenum //仅为示例，并非真实的电话号码
        })
    },
    chooseStore(e) {
        const t = this;
        return
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        app.globalData.chooseStore = t.data.D.serviceStore[index];
        app.globalData.appointFromProject = false;
        wx.navigateTo({
            url: 'shopDetail?id=' + id,
        })
    },
    onLoad(opt){
        const t = this;
        app.employee(opt.id).then((res)=>{
            res.stroeNames = res.serviceStore.map((res)=>{
                return res.name
            }).join(',')
            for (const v of res.training){
                v.courseTimeArr = v.courseTime.split('-')
            }
            for (const v of res.promotion) {
                v.courseTimeArr = v.courseTime.split('-')
            }
            
            t.setData({
                D: res
            })
        })
    }
});