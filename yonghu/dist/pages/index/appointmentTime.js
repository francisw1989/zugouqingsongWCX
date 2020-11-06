'use strict';
const app = getApp();
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
        MM: '',
        date: '',
        dates: [],
        oMins: []
    },
    chose: function chose(e) {
        console.log('323');
        var t = this;
        t.setData({
            cIndex: e.target.dataset.index,
            date: t.data.dates[e.target.dataset.index]
        });
        t.cal();
    },
    cal(){
        const t = this;
        t.data.hours = [];
        let now = new Date();
        let nowHour = now.getHours();
        let nowMin = now.getMinutes();
        let min;
        if(t.data.cIndex == 0){
            min = Number(t.data.I.openStartTime.split(':')[0]) > nowHour ? Number(t.data.I.openStartTime.split(':')[0]) : nowHour;
        }else{
            min = Number(t.data.I.openStartTime.split(':')[0])
            t.setData({
                mins: t.data.oMins
            })
        }
        
        let max = Number(t.data.I.openEndTime.split(':')[0]);
        if(max<min){ max = 24}
        for (let i = min; i < max + 1; i++) {
            let h = i < 10 ? '0' + i : i
            t.data.hours.push(h)
        }
        t.calMins(t.data.hours[0]);
        t.setData({
            hours: t.data.hours,
            time: t.data.hours[0] + ':' + t.data.mins[0]
        })
    },
    calMins(currHour){
        const t = this;
        let now = new Date();
        let nowMin = now.getMinutes();
        let minMins = Number(t.data.I.openStartTime.split(':')[1]) > nowMin ? Number(t.data.I.openStartTime.split(':')[1]) : nowMin;
        let maxMins = Number(t.data.I.openEndTime.split(':')[1])
        let mins = [];
        
        if (t.data.cIndex == 1){
            // 明天
            if (currHour == t.data.hours[t.data.hours.length - 1]){
                //最后一个小时
                for (let i = 0; i <= maxMins; i++) {
                    mins.push(i < 10 ? '0' + i : i)
                }
            }else{
                mins = t.data.oMins;
            }
        } else if (t.data.cIndex == 0){
            //今天
            if (currHour == t.data.hours[t.data.hours.length-1]){
                // 最后一个小时
                for (let i = 0; i <= maxMins; i++) {
                    mins.push(i < 10 ? '0' + i : i)
                }
            } else if (currHour == t.data.hours[0]){
                // 第一个小时
                for (let i = minMins + 1; i < 60; i++) {
                    mins.push(i < 10 ? '0' + i : i)
                }
            }else{
                mins = t.data.oMins;
            }
            
        }
        t.setData({
            mins: mins
        })
    },
    bindChange(e){
        const t = this;
        const val = e.detail.value;
        t.calMins(t.data.hours[val[0]]);
        t.setData({
            time: t.data.hours[val[0]] + ':' + t.data.mins[val[1]]
        })
    },
    onLoad(){
        const t = this;
        let oMins = []
        for (let i = 0; i < 60; i++){
            oMins.push(i < 10 ? '0' + i : i)
        }
        t.setData({
            I: app.globalData.chooseStore,
            dates: app.get_tomorrow_data(),
            oMins: oMins
        })
        t.setData({
            cIndex: 0,
            date: t.data.dates[0]
        })
        t.cal();
        
    },
    bindTimeChange: function bindTimeChange(e) {
        this.setData({
            time: e.detail.value
        });
    },
    ljyy(){
        const t = this;
        let _do = ()=>{
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
            app.globalData.chooseStore.appointTime = t.data.date + ' ' + t.data.time + ':00'
            // here is appointment, so set pageFrom is 'appointment'
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
        
    }
});