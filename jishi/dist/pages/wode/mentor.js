'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [{
            employeeName: '1', color: '#459E8C', show: true, 
            disciples: [
                { employeeName: '1-1', ico: '-', color: '#FEC07A', show: true, disciples: [
                    { employeeName: '1-1-1', color: '#6D55F6' }, 
                    { employeeName: '1-1-2', color: '#6D55F6' }, 
                    { employeeName: '1-1-3', color: '#6D55F6' }
                    ]
                }, 
                { employeeName: '1-2', ico: '-', color: '#FEC07A', show: true, disciples: [
                    { employeeName: '1-2-1', color: '#6D55F6' }, 
                    { employeeName: '1-2-2', color: '#6D55F6' }
                    ] 
                }, 
                { naemployeeNameme: '1-3', ico: '-', color: '#FEC07A', show: true, disciples: [
                    { employeeName: '1-3-1', color: '#6D55F6' }, 
                    { employeeName: '1-3-2', color: '#6D55F6' }
                    ] 
                }
            ]
        }],
        height: 348
    },
    show1: function show1(e) {
        var t = this;
        return;
        var i = e.currentTarget.dataset.index;
        if (t.data.list[i].show) {
            t.data.list[i].show = false;
        } else {
            t.data.list[i].show = true;
        }
        t.setData({
            list: t.data.list
        });
    },
    show2: function show2(e) {
        var t = this;
        var i = e.currentTarget.dataset.index;
        if (t.data.list[0].children[i].show) {
            t.data.list[0].children[i].ico = '+';
            t.data.list[0].children[i].show = false;
        } else {
            t.data.list[0].children[i].ico = '-';
            t.data.list[0].children[i].show = true;
        }

        t.setData({
            list: t.data.list
        });
    },
    setSize: function setSize() {
        var t = this;
        var query = wx.createSelectorQuery();
        query.select('#map').boundingClientRect();
        query.exec(function (res) {
            t.setData({
                boxHeight: res[0].height
            });
        });
    },
    onLoad: function onLoad() {
        var t = this;
        setTimeout(function () {
            t.setSize();
        }, 1000);
        t.employeeMentor();
        
    },
    employeeMentor(){
        var t = this;
        app.employeeMentor().then((res)=>{
            //处理师徒层级关系
            res.employee.color = '#459E8C';//第一级
            //第二级
            let newRes = res.employee.disciples.filter((element1,index1) => {
                element1.color = '#FEC07A';
                element1.show = true;
                if(element1.disciples && element1.disciples.length>1){//第三极
                    element1.disciples.filter((element2,index2) => {
                        element2.color = '#6D55F6';
                        element2.show = true;
                    })
                }
            });
            t.setData({
                ship:res.employee,
                disciples: res.disciples
            })
            console.log(t.data)
        
        })
    }
});