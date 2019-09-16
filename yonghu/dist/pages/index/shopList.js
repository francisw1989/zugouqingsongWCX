'use strict';
const app = getApp();;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {},
    onLoad() {
        const t = this;
        app.stores().then((res)=>{
            t.setData({
                list: res
            })
        })
    },
});