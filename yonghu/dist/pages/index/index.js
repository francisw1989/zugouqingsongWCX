'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp()
exports.default = Page({
    data: {
        jxzShow: false,
        realShow: false,
        lcList: [{
                time: '',
                content: '预约开始时间：2019-06-11 12:00'
            },
            {
                time: '',
                content: '预约时长：50分钟'
            },
            {
                time: '',
                content: '预计结束时间：2019-06-11 12:50'
            }
        ],
        itemClassList: [],
        D: {},
        O: {},
        statusName: ['', '待支付', '已支付待到店', '已到店待服务', '服务中', '服务完成', '系统取消', '用户取消'],
        marqueePace: 1, //滚动速度
        marqueeDistance: 0, //初始滚动距离
        marqueeDistance2: 0,
        marquee2copy_status: false,
        marquee2_margin: 60,
        size: 14,
        orientation: 'left', //滚动方向
        interval: 20, // 时间间隔
        left: '',
        top: '',
        x:0,
        y:0,
        overflow: 'auto',
        w: wx.WIN_WIDTH,
        h: wx.WIN_HEIGHT,
        imgSrc1: '../../static/images/58.jpg'
    },
    doRealShow(){
        const t = this;
        t.setData({
            realShow: t.data.realShow?false:true
        })
    },
    handleShowMask1(e) {
        const t = this;
        t.setData({
            showMask1: t.data.showMask1?false: true
        })
    },
    bindtouchstart(e){
        const t = this;
        t.setData({
            overflow: 'hidden'
        })
    },
    bindtouchmove(e) {
        const t = this;
        let clientX = e.touches[0].clientX -30;
        let clientY = e.touches[0].clientY -35;
        if (clientX > t.data.w - 50) { clientX = t.data.w - 50 }
        if (clientX < 0) { clientX=0}
        if (clientY > t.data.h - 200) { clientY = t.data.h - 200 }
        if (clientY < 0) { clientY = 0 }
        t.setData({
            left: clientX,
            top: clientY
        })
    },
    bindtouchend(e){
        const t = this;
        t.setData({
            overflow: 'auto'
        })
    },
    goProjectsList(e) {
        let id = e.currentTarget.dataset.id;
        app.globalData.appointFromProject = true;
        wx.navigateTo({
            url: 'projectsList?id=' + id + '&pageFrom=index',
        })
    },
    chooseProject(e) {
        const t = this;
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        app.globalData.chooseProject = [t.data.D.itemRecommendList[index]];
        app.globalData.appointFromProject = true;
        if(e.target.dataset.isimg == 1){
            wx.navigateTo({
                url: 'projectDetail?itemId=' + id,
            })
        }else{
            wx.navigateTo({
                url: 'shopList?pageFrom=projectDetail',
            })
        }
    },
    moreStore() {
        app.globalData.appointFromProject = false;
        wx.navigateTo({
            url: 'shopList?pageFrom=index',
        })
    },
    chooseStore(e) {
        const t = this;
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        app.globalData.chooseStore = t.data.D.nearbyStore[index];
        app.globalData.appointFromProject = false;
        wx.navigateTo({
            url: 'shopDetail?id=' + id,
        })
    },

    makePhoneCall(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phonenum //仅为示例，并非真实的电话号码
        })
    },

    nowOrder() {
        const t = this;

        let _do = () => {
            app.nowOrder().then((res) => {
                setTimeout(() => {
                    if (res.nowOrder.status == 5){
                        return
                    }
                    _do()
                }, 10 * 60 * 1000);
                
                if (!res.nowOrder) {
                    t.setData({
                        jxzShow: false,
                        O: {}
                    })
                } else {
                    t.setData({
                        jxzShow: true,
                        O: res.nowOrder
                    })
                    t.initGoodsPage();
                }
            });
        }
        _do()
    },
    // 全局加载商品页面
    initGoodsPage() {
        const t = this;
        let list = t.getTabBar().data.list;
        if (list.length == 3) {
            return
        }
        list.splice(1, 0, {
            "selectedIconPath": "/static/images/7.png",
            "iconPath": "/static/images/8.png",
            "pagePath": "/pages/index/goods",
            "text": "商品"
        })
        app.globalData.barList = list;
        t.getTabBar().setData({
            list: list
        })
    },
    getIndex() {
        const t = this;
        app.getLoaction().then((res) => {
            app.index().then((res) => {
                app.globalData.nearbyStore = res.nearbyStore;
                t.setData({
                    D: res
                })
                app.globalData.isTuan = res.isTuan;
                t.marquee();
            })
        })
    },
    bannerGo(e) {
        const t = this;
        let obj = t.data.D.banners[e.target.dataset.index];
        let type = obj.type
        // 类别（1 门店, 2项目, 3技师, 4链接 5.无链接
        if (type == 1) {
            wx.navigateTo({
                url: 'shopDetail?id=' + obj.resourceId,
            })
            app.globalData.appointFromProject = false;
        }
        if (type == 2) {
            wx.navigateTo({
                url: 'projectDetail?itemId=' + obj.resourceId,
            })
            app.globalData.appointFromProject = true;
        }
        if (type == 3) {
            wx.navigateTo({
                url: 'technician?id=' + obj.resourceId,
            })
            app.globalData.appointFromProject = false;
        }
        if (type == 4) {
            wx.navigateTo({
                url: 'pageView?src=' + obj.url,
            })
            app.globalData.appointFromProject = false;
        }
        if (type == 5) {
            // wx.navigateTo({
            //     url: 'technician?id=' + obj.resourceId,
            // })
            app.globalData.appointFromProject = false;
        }
    },
  vipPicGo(e) {
    const t = this;
    let url = t.data.D.vipUrl;
    // 类别
    if (url.indexOf("http:") == 0 || url.indexOf("https:") == 0) {
      wx.navigateTo({
        url: 'pageView?src=' + url,
      })
    }else {
      wx.navigateTo({
        url: url,
      })
      app.globalData.appointFromProject = true;
    }
  },
    getItemClass() {
        const t = this;
        app.itemClass().then((res) => {
            t.setData({
                itemClassList: app.globalData.itemClassList
            })
        })
    },
    onShow() {
        const t = this;
        // this.getTabBar().setData({
        //     selected: 0,
        //     list: app.globalData.barList
        // })
        if (wx.getStorageSync('openId')) {
            t.nowOrder();
        }
    },
    marquee() {
        var vm = this;
        var length = vm.data.D.notic.length * vm.data.size; //文字长度
        var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
        vm.setData({
            length: length,
            windowWidth: windowWidth,
            marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin //当文字长度小于屏幕长度时，需要增加补白
        });
        vm.run1(); // 水平一行字滚动完了再按照原来的方向滚动
    },
    run1: function() {
        var vm = this;
        var interval = setInterval(function() {
            if (-vm.data.marqueeDistance < vm.data.length) {
                vm.setData({
                    marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
                });
            } else {
                clearInterval(interval);
                vm.setData({
                    marqueeDistance: vm.data.windowWidth
                });
                vm.run1();
            }
        }, vm.data.interval);
    },
    onLoad(opt) {
        const t = this;
        if (opt && opt.scene) {
            // 通过分享进来的页面
            let scene = decodeURIComponent(opt.scene).split(',');
            wx.setStorageSync('friendUserId', scene[0]);
        }
        wx.getSystemInfo({
            success: function(res) {
                t.setData({
                    screenHeight: res.windowHeight,
                    screenWidth: res.windowWidth,
                });
            }
        });
        t.getIndex();
        t.getItemClass();
        setTimeout(()=>{
            t.handleShowMask1()
        },2000)
    }
});