'use strict';
const app = getApp()
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [{}, {}, {}]
    },
    assembleRecordByUser(){
        const t = this;
        app.assembleRecordByUser().then((res)=>{
            t.setData({
                list: res
            })
        });
    },
    
    
    onShow(){
        const t = this;
        t.assembleRecordByUser();
    }
});