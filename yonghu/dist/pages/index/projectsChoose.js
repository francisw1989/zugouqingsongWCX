'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp()
exports.default = Page({
    data: {
        fwList: [],
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        list: [
            { checked: false },
            { checked: false },
            { checked: false },
        ],
        chooseList: []
    },
    onLoad(){
        const t = this;
        t.setData({
            fwList: app.getFwList()
        })
    },
    doCheck(e){
        const t = this;
        t.data.chooseList = [];
        if (t.data.list[e.currentTarget.dataset.index].checked){
            t.data.list[e.currentTarget.dataset.index].checked = false;
        }else{
            t.data.list[e.currentTarget.dataset.index].checked = true;
        }
        for (const v of t.data.list){
            if (v.checked){
                t.data.chooseList.push(v)
            }
        }
        t.setData({
            list: t.data.list,
            chooseList: t.data.chooseList
        })
    },
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        this.setData({
            current: index
        });
    },
    choosen(){
        const t = this;
        if (!t.data.chooseList.length){
            wx.showModal({
                title: '提示',
                content: '请选择项目',
            })
            return
        }
        wx.navigateTo({
            url: 'chooseProjectJishi',
        })
    }
});