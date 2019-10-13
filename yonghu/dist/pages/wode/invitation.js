'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        invitationRewardList: [],
        downShow: false,
        w: wx.WIN_WIDTH,
        h: wx.WIN_HEIGHT,
        cW: 0,
        cH: 0,
        ewmImg: '',
        ewmImgPath: '/static/images/48.png'
    },
    onLoad(opt){
        const t = this;
        t.qrCode();
        app.invitationReward().then((res)=>{
            t.setData({
                invitationRewardList: res
            })
        })
        
    },
    downImg(){
        wx.canvasToTempFilePath({
            canvasId: 'canvas',
            success: function (res) {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                        wx.showModal({
                            title: '提示',
                            content: '已保存到本地',
                        })
                    }
                })
            }
        })
        
    },
    qrCode(){
        const t = this;
        let params = {
            page: '/pages/wode/groupSuccess',
            scene: wx.getStorageSync('assembleId')
        }
        app.qrCode(params).then((res)=>{
            t.data.ewmImg = res;
        })
    },
    drawCanvas(){
        const t = this;
        t.setData({
            downShow: true
        })
        wx.showLoading({
            title: '正在生成海报'
        });
        let bgImg = '/static/images/58.jpg';
        let _do = () => {
            wx.getImageInfo({
                src: bgImg,
                success: function (res) {
                    console.log(res)
                    let cH = t.data.h * 0.7;
                    let cW = cH * res.width / res.height;
                    t.setData({
                        cH: cH,
                        cW: cW
                    })
                    const context = wx.createCanvasContext('canvas');
                    // 背景图
                    context.drawImage(bgImg, 0, 0, t.data.cW, t.data.cH);
                    context.drawImage(t.data.ewmImgPath, 10, 770 * t.data.cH / 940, 50, 50);
                    context.draw();
                    wx.hideLoading();

                }
            })
        }

        if (!t.data.ewmImg){
            _do()
        }else{
            // 下载二维码图片
            wx.downloadFile({
                url: t.data.ewmImg,
                success: function (res) {
                    t.data.ewmImgPath = res.tempFilePath;
                    _do();
                },
                fail: function (res) {
                    wx.showModal({
                        title: '提示',
                        content: '二维码:' + t.globalData.user_info.qr_other_code_url + JSON.stringify(res),
                    })
                }
            })
        }
        
       
    },
    onShareAppMessage(e) {
        const t = this;
         //p ---pageFrom  id --- assembleId
        return {
            title: '团购分享',
            path: '/pages/wode/groupSuccess?scene=' + wx.getStorageSync('assembleId'),
            imageUrl: wx.getStorageSync('shareImg'),
            success: (res) => {
                console.log("转发成功", res);
            },
            fail: (res) => {
                console.log("转发失败", res);
            }
        }
    },

});