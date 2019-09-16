'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        v:{}
    },
    onLoad(opt){
        const t = this;
        app.store(opt.id).then((res)=>{
            t.setData({
                v: res
            })
        })
    }
});