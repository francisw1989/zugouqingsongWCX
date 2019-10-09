// pages/index/tag.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '标签',
        value: '',
        tabs: [],
        list: ['','','','','',''],
        inkBarStyle: {
            'width': '30%'
        },
        tagsList:[]
    },
    handleChange: function handleChange(e) {
        const t = this;
        var index = e.detail.index;
        t.setData({
            current: index
        });
    },
    //保存标签
    submitTags(){
        const t = this;
        //选中的标签以字符串提交
        let newRes = t.data.tagsList.filter((element,index) => {
            return element.checked == true;
        });
        console.log(newRes);
        let tags = [];
        newRes.forEach(element => {
            tags.push(element.tagName);
        });
        if(tags.length == 0){
            wx.showToast({
                title:'请选择标签提交',
                icon:"none",
                duration:2000
              })
        }else{
            let params = {
                userId:Number(t.data.userId),
                employeeId: app.globalData.userInfo.userId || "13",
                orderId:Number(t.data.orderId),
                orderItemId:Number(t.data.orderItemId),
                content:tags.join(",")
            }
            app.employeeTagUser(params).then(()=>{
                wx.showToast({
                    title:'标签添加成功',
                    icon:"success",
                    duration:2000
                  })
            })
        }
        
        
    },
    //initTagsData 数据初始化
    initTagsData(){
        const t = this;
        let params = {
            userId: t.data.userId
          }
        app.employeeUserTag(params).then((res)=>{
            console.log(res);
            var tagsList = [];
            //处理标签子分类
            res.forEach((item,i) => {
                let tagsListArray = item.tagList.split(",")
                tagsListArray.forEach((tag,index)=>{
                    tagsList.push({
                        tagsIndex:i,
                        tagName:tag,
                        checked:false
                    })
                })
            });
            console.log(tagsList);
            // let newRes = res.records.filter((element,index) => {
                
            //     let tagsListArray = element[index].tagList.split(",")
            // });
            t.setData({
                tabs: res,
                tagsList:tagsList
            })
        })
    },
    //选中标签
    chooseTags: function (e) {
        const t = this;
        let index = e.currentTarget.dataset.index;
        let arrs = this.data.tagsList;
        if (arrs[index].checked == false) {
          arrs[index].checked = true;
        } else {
          arrs[index].checked = false;
        }
        this.setData({
            tagsList: arrs
        })
        console.log(t.data.tagsList)
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        const t = this;
        t.setData({
            current:0,
            userId:options.userId,
            employeeId:options.employeeId,
            orderId:options.orderId,
            orderItemId:options.orderItemId
        })
        t.initTagsData();
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (options) {
       
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
       
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