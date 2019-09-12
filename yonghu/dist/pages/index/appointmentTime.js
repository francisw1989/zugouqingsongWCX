'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        time: '',
        cIndex: '-1',
        hours: [],
        mins: [],
        HH: '',
        MM: ''
    },
    chose: function chose(e) {
        console.log('323');
        var t = this;
        t.setData({
            cIndex: e.target.dataset.index
        });
    },
    cal(){
        const t = this;
        for (let i = 1; i < 13; i++) {
            let h = i<10?'0'+i:i
            t.data.hours.push(h)
        }
        t.data.mins = ['00' ,'10', '20', '30', '40' , '50']
        t.setData({
            hours: t.data.hours,
            mins: t.data.mins
        })
    },
    bindChange(e){
        const t = this;
        const val = e.detail.value
        t.setData({
            time: t.data.hours[val[0]] + ':' + t.data.mins[val[1]]
        })
    },
    onLoad(){
        const t = this;
        t.cal()
    },
    bindTimeChange: function bindTimeChange(e) {
        this.setData({
            time: e.detail.value
        });
    }
});