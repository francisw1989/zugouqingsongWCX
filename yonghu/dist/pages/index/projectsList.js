// pages/index/projectsList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemClassList: [],
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        chooseProject: []
    },
    confirmChoosen() {
        const t = this;
        if (!t.data.chooseProject.length) {
            wx.showModal({
                title: '提示',
                content: '请选择项目',
            })
            return
        }
        app.globalData.chooseProject = t.data.chooseProject;
        wx.navigateTo({
            url: 'chooseProjectJishi',
        })
    },
    handleChange: function handleChange(e) {
        const t = this;
        var index = e.detail.index;
        t.setData({
            id: app.globalData.itemClassList[index].id,
            current: index
        });
        t.items()

    },
    items(){
        const t = this;
        let params = {
            itemClassId: t.data.id,
            pageSize: 100,
            pageNumber: 1
        }
        app.items(params).then((res)=>{
            for (const v of res.records){
                v.imgs = v.imgs.split(',')[0]
                v.checked = false;
            }
            t.setData({
                list: res.records
            })
        })
    },
    itemClick(e) {
        const t = this;
        if (t.data.pageFrom == 'store' || t.data.pageFrom == 'appointment'){
            // page from store, do check
            t.data.chooseProject = [];
            t.data.list[e.currentTarget.dataset.index].checked = t.data.list[e.currentTarget.dataset.index].checked ? false : true
            for (const v of t.data.list) {
                if (v.checked) {
                    t.data.chooseProject.push(v)
                }
            }
            t.setData({
                list: t.data.list,
                chooseProject: t.data.chooseProject
            })
        }else if(t.data.pageFrom == 'index'){
            // page from index, do navigate to projectDetail
            app.globalData.chooseProject = t.data.list[e.currentTarget.dataset.index];
            app.globalData.appointFromProject = true;
            wx.navigateTo({
                url: 'projectDetail?itemId=' + e.currentTarget.dataset.id,
            })
        }
        
    },
    setOData(opt){
        const t = this;
        console.log(app.globalData.itemClassList)
        let id = opt.id || app.globalData.itemClassList[0].id;
        let current;
        app.globalData.itemClassList.forEach((v, i) => {
            if (v.id == id) {
                current = i;
            }
        })
        t.setData({
            id: id,
            itemClassList: app.globalData.itemClassList,
            current: current,
            pageFrom: opt.pageFrom
        })
        t.items();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
        const t = this;
        t.setOData(opt);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})