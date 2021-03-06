'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// "appid": "wxda6daedcf2e1a549",
exports.default = App({
    globalData: {
        u: 'https://pc.zugouqingsong.com/userApi/v1/',
        u_s: 'https://pc.zugouqingsong.com/',
        // u: 'https://zzh.hzysofti.com/userApi/v1/',
        // u_s: 'https://zzh.hzysofti.com/',
        userInfo: {},
        itemClassList: [],
        memberLevelName: ['普通会员', '一星会员', '二星会员', '三星会员'],
        barList: [{
            "selectedIconPath": "/static/images/5.png",
            "iconPath": "/static/images/6.png",
            "pagePath": "/pages/index/index",
            "text": "首页"
        },
        {
            "selectedIconPath": "/static/images/9.png",
            "iconPath": "/static/images/10.png",
            "pagePath": "/pages/wode/index",
            "text": "我的"
        }
        ],
        chooseProject: [], // 当前选中的项目
        chooseStore: {}, // 当前选中的门店
        chooseGoods: [], // 当前选中的商品
        wxObj: {}, // 微信支付参数对象
        nowOrder: {}, // 当前正在进行中的订单,
        orderDetail: {}, // 订单详情
        chooseCoupon: {},
        stores: [],
        friendUserId: ''
    },
    //  / userApi / v1 / getRechargeExplain
    // 获得充值说明 grant_type: 赠送类别（0金额1积分2优惠卷）
    getRechargeExplain() {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('getRechargeExplain', {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // / userApi / v1 / getSysItemDetail
    getSysItemDetail(){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('getSysItemDetail', {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // / userApi / v1 / getPic
    // 读取配置项中分享好友图片
    getPic() {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('getPic', {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    //     / userApi / v1 / itemEvaluateList
    // 获取项目评价
    itemEvaluateList(params){
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('itemEvaluateList', params).then((res) => {
                
                resolve(res);
            })
        })
        return p;
    },
    cancelCoupon() {
        const t = this;
        let params = {
            orderId: t.globalData.orderDetail.id,
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('checkPrice?' + t.jsonToParameters(params), {}).then((res) => {
                t.globalData.orderDetail = res;
                resolve(res);
            })
        })
        return p;
    },
    // / userApi / v1 / checkPrice
    // 选择完优惠券 更新价格接口
    checkPrice() {
        const t = this;
        let params = {
            orderId: t.globalData.orderDetail.id,
            couponRecordId: t.globalData.chooseCoupon.recordId
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('checkPrice?' + t.jsonToParameters(params), {}).then((res) => {
                t.globalData.orderDetail = res;
                resolve(res);
            })
        })
        return p;
    },
    //     / userApi / v1 / memberLevel / list
    // 会员权益列表查询
    memberLevel(params) {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('memberLevel/list', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // / userApi / v1 / qrCode
    // 获取小程序二维码
    qrCode(params) {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('qrCode', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 我的预约订单详情
    orderInfo(orderId) {
        const t = this;
        let params = {
            orderId: orderId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('orderInfo', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 是否接受短信提醒
    isSms(id) {
        const t = this;
        let params = {
            orderId: id,
            isSms: 0
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('isSms?' + t.jsonToParameters(params), params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 用户取消预约订单
    removeOrder() {
        const t = this;
        let params = {
            orderId: t.globalData.outTradeNo,
            userId: t.globalData.userInfo.userId
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('removeOrder?' + t.jsonToParameters(params), params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 续时订单生成  continuation
    continuation(time, orderItemsId) {
        const t = this;
        let params = {
            orderItemsId: orderItemsId,
            time: time
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('continuation?' + t.jsonToParameters(params), params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 商品列表查询
    goods() {
        const t = this;
        let params = {
            storeId: t.globalData.nowOrder.storeId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('goods/' + t.globalData.nowOrder.storeId, params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 根据技师ID加载技师信息
    employee(employeeId) {
        const t = this;
        let params = {
            employeeId: employeeId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('employee', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 评价
    evaluation(params) {
        const t = this;
        // let params = {
        //     userId: t.globalData.userInfo.userId,
        //     orderId: t.globalData.currOrder.id,
        //     employeeIds: [],
        //     evaluateScore: [],
        //     evaluateLabel: '',
        //     content: ''
        // }
        params = Object.assign(params, {
            userId: t.globalData.userInfo.userId,






        })
        let p = new Promise((resolve, reject) => {
            t.postRequest('evaluation?' + t.jsonToParameters(params), {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 加载客户对用户评价管理表
    evaluations() {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('evaluations', {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 加载用户邀请奖励列表
    invitationReward() {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('invitationReward', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 我的订单状态记录
    orderStatus() {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId,
            page: 1,
            size: 100
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('orderStatus', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 会员充值微信支付接口
    vipRechargePost(price) {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId,
            price: price
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('vipRecharge?' + t.jsonToParameters(params), {}).then((res) => {
                t.globalData.wxObj = res
                resolve(res);
            })
        })
        return p;
    },
    // 会员充值记录
    vipRechargeRecord() {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId,
            page: 1,
            size: 100
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('vipRechargeRecord', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 会员充值活动信息
    vipRecharge() {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('vipRecharge', {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 加载用户优惠卷列表
    userCoupon() {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId
        };
        let p = new Promise((resolve, reject) => {
            t.getRequest('userCoupon', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 用户端首页当前订单
    nowOrder() {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId
        };
        let p = new Promise((resolve, reject) => {
            t.getRequest('nowOrder', params, true).then((res) => {
                if (res.nowOrder) {
                    t.globalData.nowOrder = res.nowOrder;
                }
                resolve(res);
            })
        })
        return p;
    },
    // 加载订单项目使用的优惠卷，及最优优惠卷
    optimalCoupon() {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId,
            orderId: t.globalData.orderDetail.id,
            storeId: t.globalData.orderDetail.storeId
        };
        let p = new Promise((resolve, reject) => {
            t.getRequest('optimalCoupon', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },

    // 我的预约列表
    reservations(status, page, size) {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId,
            status: status,
            page: page,
            size: size
        };
        let p = new Promise((resolve, reject) => {
            t.getRequest('reservations', params).then((res) => {
                let nowDate = new Date();
                let year = nowDate.getFullYear();
                for (const v of res.records) {
                    v.imgs = v.imgs.split(',')[0];
                    let min = parseInt(v.createTime.split(":")[1]) + 5;
                    let tsArr = v.createTime.split(":");
                    tsArr[1] = min;
                    v.orderStartTime2 = year + "-" + tsArr.join(":") + ":00";
                    v.orderStartTime2 = v.orderStartTime2.replace(/-/g, "/");
                    v.showJxzf = true;
                    console.log(v.createTime);
                    console.log(v.orderStartTime2); 
                }
                resolve(res);
            })
        })
        return p;
    },

    // 加载我的项目拼团列表
    assembleRecordByUser() {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId,
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('assembleRecordByUser', params).then((res) => {
                for (const v of res.records) {
                    v.item && v.item.imgs && (v.item.imgs = v.item.imgs.split(',')[0]);
                    v.leftPeople = v.assemblePeople - v.members.length;
                    v.leftMember = [];
                    for (let i = 0; i < v.leftPeople; i++) {
                        v.leftMember.push('')
                    }
                }
                resolve(res);
            })
        })
        return p;
    },
    // 根据项目ID加载项目拼团列表
    assembleRecord(itemId) {
        const t = this;
        let params = {
            itemId: itemId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('assembleRecord', params).then((res) => {
                for (const v of res) {
                    v.item.imgs = v.item.imgs.split(',')[0];
                    v.leftPeople = v.assemblePeople - v.members.length;
                }
                resolve(res);
            })
        })
        return p;
    },
    // 获取拼团信息
    assembleRecordInfo() {
        const t = this;
        let params = {
            assembleId: wx.getStorageSync('assembleId')
        };
        let p = new Promise((resolve, reject) => {
            t.getRequest('assembleRecordInfo', params).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 参团接口
    joinGroup() {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId,
            assembleId: wx.getStorageSync('assembleId')
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('joinGroup?' + t.jsonToParameters(params), {}).then((res) => {
                t.globalData.wxObj = res;
                resolve(res);
            })
        })
        return p;
    },

    // 开团接口
    createGroup() {
        const t = this;
        let params = {
            userId: t.globalData.userInfo.userId,
            itemId: t.globalData.chooseProject[0].id,
            number: t.globalData.chooseProject[0].number
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('createGroup?' + t.jsonToParameters(params), {}).then((res) => {
                wx.setStorageSync('assembleId', res.id)
                resolve(res);
            })
        })
        return p;
    },
    // 选择技师页面
    selectTechnician(params) {
        const t = this;
        let p = new Promise((resolve, reject) => {
            // params.dateTime = '2019-09-18 09:30:00'
            t.getRequest('selectTechnician', params).then((res) => {
                for (const v of res) {
                    v.imgs = v.imgs.split(',')[0]
                }
                resolve(res);
            })
        })
        return p;
    },
    // 获取用户专属技师
    userTechnicians(params) {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('userTechnicians', params).then((res) => {
                res.imgs && (res.imgs = res.imgs.split(','));
                resolve(res);
            })
        })
        return p;
    },
    // 根据商户订单号 获取下单结果和详情
    orderDetail() {
        const t = this;
        let params = {
            outTradeNo: t.globalData.outTradeNo
        };
        let p = new Promise((resolve, reject) => {
            t.getRequest('orderDetail', params).then((res) => {
                let payObjList = [];
                if (res.payType) {
                  let payTypeList = ['', '储值账户', '储值账户', '微信支付', '现金', '微信转账', '支付宝转账'];
                    // 虚拟账户的值累加到现金账户里
                    let hasXuni = false, xuniIndex = 0;
                    let hasXianJin  = false, xianJinIndex = 0;
                    let _i = -1
                    res.payType.split('-').forEach((v, i) => {
                        if (v) {
                            _i ++;
                            if (v == 1) {
                                hasXuni = true;
                                xuniIndex = _i;
                            }
                            if (v == 2) {
                                hasXianJin = true;
                                xianJinIndex = _i;
                            }
                            payObjList.push({
                                payType: v,
                                payTypeName: payTypeList[v],
                                payAmount: res.payAmount.split('-')[i]
                            })
                        }
                    })
                    if (hasXuni){
                        // 存在虚拟账户
                        if (hasXianJin){
                            // 已有现金账户  累加虚拟账户金额
                            payObjList[xianJinIndex].payAmount = payObjList[xianJinIndex].payAmount + payObjList[xuniIndex].payAmount
                        }else{
                            // 没有现金账户  新增现金账户
                            payObjList.push({
                                payType: 2,
                              payTypeName: '储值账户',
                                payAmount: payObjList[xuniIndex].payAmount
                            })
                        }
                    }
                    res.payObjList = payObjList;

                }

                if (res && res.orderItems) {

                    for (const v of res.orderItems) {
                        if (v.itemImags) {
                            v.itemImags = v.itemImags.split(',')[0]
                        }

                    }
                }
                resolve(res);
            })
        })
        return p;
    },
    // 订单商品下单接口
    orderGoods() {
        const t = this;
        let data = [];
        for (const v of t.globalData.chooseGoods) {
            data.push({
                articleId: v.articleId,
                count: v.num
            })
        }
        let params = {
            userId: t.globalData.userInfo.userId,
            orderId: t.globalData.nowOrder.id,
            storeId: t.globalData.nowOrder.storeId
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('orderGoods?' + t.jsonToParameters(params), data).then((res) => {
                res.imgs && (res.imgs = res.imgs.split(','));
                resolve(res);
            })
        })
        return p;
    },
    // 服务项目下单接口
    order() {
        const t = this;
        let data = [];
        for (const v of t.globalData.chooseProject) {
            data.push({
                itemId: v.id,
                orderStartTime: t.globalData.chooseStore.appointTime,
                orderTime: v.defaultDuration,
                technicianIds: v.technicianChoose.map((res) => {
                    return res.id
                })
            })
        }
        let params = {
            userId: t.globalData.userInfo.userId,
            storeId: t.globalData.chooseStore.id
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('order?' + t.jsonToParameters(params), data).then((res) => {
                res.imgs && (res.imgs = res.imgs.split(','));
                resolve(res);
            })
        })
        return p;
    },
    // 订单服务支付接口 获取支付的参数
    orderPay(type) {
        const t = this;
        let params = {
            orderId: t.globalData.orderDetail.id,
            couponRecordId: (t.globalData.chooseCoupon == null || t.globalData.chooseCoupon.recordId == undefined) ? '' : t.globalData.chooseCoupon.recordId,
            type: type
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('orderPay?' + t.jsonToParameters(params), {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 商品订单服务支付接口
    articleOrderPay(type) {
        const t = this;
        let params = {
            articleOrderId: t.globalData.orderDetail.id,
            type: type
        }
        let p = new Promise((resolve, reject) => {
            t.postRequest('articleOrderPay?' + t.jsonToParameters(params), {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    wxPay: function wxPay() {
        const t = this;
        // obj = {
        //     appId: "wx5381d6fd8a98109e",
        //     nonceStr: "1567252821067",
        //     packageValue: "prepay_id=wx31200021035821bc7fa776b71138378100",
        //     paySign: "3EF62B5457927A168A925265602E3A55",
        //     signType: "MD5",
        //     timeStamp: "1567252821"
        // }
        let p = new Promise((resolve, reject) => {
            wx.showLoading({
                title: '加载中'
            });
            let obj = t.globalData.wxObj;
            console.log(JSON.stringify({
                timeStamp: obj.timeStamp + '',
                nonceStr: obj.nonceStr + '',
                package: obj.packageValue + '',
                signType: obj.signType,
                paySign: obj.paySign + ''
            }));
            wx.requestPayment({
                //支付
                timeStamp: obj.timeStamp + '',
                nonceStr: obj.nonceStr + '',
                package: obj.packageValue + '',
                signType: obj.signType,
                paySign: obj.paySign + '',
                success: function success(res) {
                    wx.showToast({
                        title: '支付成功'
                    });
                    setTimeout(() => {
                        resolve();
                    }, 1000)
                    resolve();
                    // setTimeout(function () {
                    //     wx.hideLoading();
                    //     wx.redirectTo({
                    //         url: 'paySuccess',
                    //     })
                    // }, 1000);
                },
                fail: function fail(res) {
                    wx.hideLoading();
                    // wx.showModal({
                    //     title: '提示',
                    //     content: JSON.stringify(res)
                    // })
                },
                complete: function complete(res) {
                    wx.hideLoading();
                }
            });
        })
        return p;

    },

    // 根据项目ID获得项目详情
    getItem(itemId) {
        const t = this;
        let params = {
            itemId: itemId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('getItem', params).then((res) => {
                res.imgs = res.imgs.split(',');
                res.crowd = res.crowd.split(',');
                resolve(res);
            })
        })
        return p;
    },
    // 用户端 门店详情
    store(storeId) {
        const t = this;
        let params = {
            storeId: storeId
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('store', params).then((res) => {
                res.imgs = res.imgs.split(',')
                resolve(res);
            })
        })
        return p;
    },
    // 用户端加载所有周边门店
    stores() {
        const t = this;
        let params = {
            x: t.globalData.x,
            y: t.globalData.y
        }
        let p = new Promise((resolve, reject) => {
            t.getRequest('stores', params).then((res) => {
                for (const v of res) {
                    v.imgs = v.imgs.split(',')[0];
                    v.distance = (v.distance / 1000).toFixed(1);
                    v.x = v.x - 0.0065;
                    v.y = v.y - 0.0060;
                }
                t.globalData.stores = res;
                resolve(res);
            })
        })
        return p;
    },
    // 编辑用户信息
    user(params) {
        const t = this;
        let _params = t.jsonToParameters(params);
        let p = new Promise((resolve, reject) => {
            t.postRequest('user?' + _params, {}).then((res) => {
                resolve(res);
            })
        })
        return p;
    },
    // 上传图片
    upload(Base64) {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.postRequest('common/v1/file/upload?suffix=jpg&dir=images', Base64, 'spe').then((res) => {
                resolve(res)
            })
        })
        return p;
    },

    onLaunch: function onLaunch() {
        _system2.default.attachInfo();

    },
    onShow: function onShow() { },
    onHide: function onHide() { },
    getRequest: function getRequest(url, params, noNeedLoading) {
        var t = this;
        if (!noNeedLoading) {
            wx.showLoading({
                title: '加载中'
            });
        }
        var _url = t.globalData.u + url;
        var p = new Promise(function (resolve, reject) {
            let _do = () => {
                wx.request({
                    url: _url,
                    data: params,
                    method: 'get',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json',
                    success: function success(res) {
                        wx.hideLoading();
                        if (res.data && res.data.msg) {
                            wx.showModal({
                                content: res.data.msg
                            });
                            return
                        }
                        resolve(res.data);

                    },
                    fail: function fail(res) {
                        wx.hideLoading();
                        wx.showModal({
                            content: JSON.stringify(res)
                        });
                        reject();
                    },
                    complete: function complete() { }
                });
            }
            if (params.hasOwnProperty('userId') && url != 'userInfo') {
                t.userInfo().then(() => {
                    params.userId = t.globalData.userInfo.userId;
                    _do();
                })
            } else {
                _do();
            }

        });
        return p;
    },
    postRequest: function getRequest(url, params, type) {
        var t = this;
        wx.showLoading({
            title: '加载中'
        });
        let _url = '';
        if (type && type == 'spe') {
            _url = t.globalData.u_s + url
        } else {
            _url = t.globalData.u + url
        }
        var p = new Promise(function (resolve, reject) {
            let _do = () => {
                wx.request({
                    url: _url,
                    data: params,
                    method: 'POST',
                    header: {
                        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json',
                    success: function success(res) {
                        wx.hideLoading();
                        if (res.data && res.data.msg) {
                            wx.showModal({
                                content: res.data.msg
                            });
                            return
                        }
                        resolve(res.data)
                    },
                    fail: function fail(res) {
                        wx.hideLoading();
                        wx.showModal({
                            content: JSON.stringify(res)
                        });
                        reject(res);
                    },
                    complete: function complete() { }
                });
            }
            if (url != 'userLogin') {
                t.userInfo().then(() => {
                    _do()
                })
            } else {
                _do()
            }


        });
        return p;
    },
    userLogin() {
        const t = this;
        let params = {
            code: t.globalData.code,
            phone: t.globalData.phone,
            userInfo: t.globalData.userInfo,
            friendUserId: wx.getStorageSync('friendUserId')
        }
        console.log(JSON.stringify(params))
        t.postRequest('userLogin', params).then((res) => {
            res.userId = res.id;
            t.globalData.userInfo = Object.assign(t.globalData.userInfo, res)
            t.globalData.userInfo.account = t.globalData.userInfo.virtualAccount + t.globalData.userInfo.savingsAccount;
            wx.setStorageSync('openId', res.openId)
            wx.setStorageSync('friendUserId', '')
            wx.navigateBack({

            })
        })
    },
    // 获取用户信息
    userInfo(reload) {
        const t = this;
        var p = new Promise(function (resolve, reject) {
            let openId = wx.getStorageSync('openId');
            if (!openId) {
                wx.navigateTo({
                    url: '../index/wxdl',
                })
                return;
            }
            if (t.globalData.userInfo.userId && !reload) {
                resolve();
                return
            }
            let params = {
                openId: openId
            }
            t.geWxtUserInfo().then(() => {
                t.getRequest('userInfo', params).then((res) => {
                    if(!res){
                        wx.setStorageSync('openId', null)
                        return
                    }
                    res.userId = res.id;
                    t.globalData.userInfo = Object.assign(t.globalData.userInfo, res);
                    t.globalData.userInfo.account = t.globalData.userInfo.virtualAccount + t.globalData.userInfo.savingsAccount;
                    console.log(t.globalData.userInfo)
                    resolve();
                })
            });
        })
        return p;
    },
    // 微信自己的获取用户信息
    geWxtUserInfo() {
        var t = this;
        var p = new Promise(function (resolve, reject) {
            wx.getSetting({
                success: function success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        wx.getUserInfo({
                            success: function success(res) {
                                t.globalData.userInfo = Object.assign(t.globalData.userInfo, res.userInfo);
                                resolve();
                            }
                        });
                    }
                }
            });
        });
        return p;
    },

    getLoaction() {
        const t = this;
        let p = new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'wgs84',
                success: function success(res) {
                    console.log(res);
                    t.globalData.x = res.latitude; // 经度
                    t.globalData.y = res.longitude; // 纬度
                    t.globalData.latitude = res.latitude; // 经度
                    t.globalData.longitude = res.longitude; // 纬度
                    resolve()
                }
            });
        })
        return p;
    },
    // 获取服务分类
    itemClass() {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('itemClass', {}).then((res) => {
                t.globalData.itemClassList = res;
                resolve(res);
            })
        })
        return p;
    },
    // 获取首页数据
    index() {
        const t = this;
        let p = new Promise((resolve, reject) => {
            let params = {
                x: t.globalData.x,
                y: t.globalData.y
            }
            t.getRequest('index', params).then((res) => {
                for (const v of res.nearbyStore) {
                    v.imgs && (v.imgs = v.imgs.split(',')[0])
                    v.distance = (v.distance / 1000).toFixed(1)
                    v.x = v.x - 0.0065;
                    v.y = v.y - 0.0060;
                }
                for (const v of res.itemRecommendList) {
                    v.imgs && (v.imgs = v.imgs.split(',')[0]);
                    v.conditioningMethod = v.conditioningMethod.length > 18 ? v.conditioningMethod.substring(0, 18) + '...' : v.conditioningMethod;
                    v.pricePerMinute = (v.defaultPrice / v.defaultDuration).toFixed(2);
                }
                resolve(res);
            })
        })
        return p;
    },
    // 获取项目列表
    items(params) {
        const t = this;
        let p = new Promise((resolve, reject) => {
            t.getRequest('items', params).then((res) => {
                for (const v of res.records) {
                    v.pricePerMinute = (v.defaultPrice / v.defaultDuration).toFixed(2);
                }
                resolve(res);
            })
        })
        return p;
    },
    jsonToParameters(parmas) {
        let _parmas = Object.keys(parmas).map(function (key) {
            // body...
            return encodeURIComponent(key) + "=" + encodeURIComponent(parmas[key]);
        }).join("&");
        return _parmas;
    },
    get_tomorrow_data() {
        //昨天的时间
        var day1 = new Date();
        day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
        var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
        //今天的时间
        var day2 = new Date();
        day2.setTime(day2.getTime());
        let M2 = day2.getMonth() + 1;
        let D2 = day2.getDate();
        if (M2 < 10) { M2 = '0' + M2 };
        if (D2 < 10) { D2 = '0' + D2 };
        var s2 = day2.getFullYear() + "-" + M2 + "-" + D2;
        //明天的时间
        var day3 = new Date();
        day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
        let M3 = day3.getMonth() + 1;
        let D3 = day3.getDate();
        if (M3 < 10) { M3 = '0' + M3 };
        if (D3 < 10) { D3 = '0' + D3 };
        var s3 = day3.getFullYear() + "-" + M3 + "-" + D3;
        return [s2, s3]
    },
    formatDate(timestamp){
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    },
});