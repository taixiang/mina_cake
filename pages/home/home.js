var constant = require('../../utils/constant');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cakeList: [],
    hasNext: false,
    page: 1,
    loadingTxt: "", //加载提示
    isLoading:false //防止延迟多次加载
  },

  //加载更多
  loadMore: function (e) {
    
  },

  //详情
  toDetail: function(e){
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getData(this, this.data.page, false)

    
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
    console.log(666666)
    // wx.showLoading({
    //   title: '正在刷新...',
    // })
    this.data.cakeList = [];
    this.data.page = 1;
    getData(this, 1, true)
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasNext && !this.data.isLoading) {
      this.setData({
        loadingTxt: "正在加载",
        isLoading: true
      })
      getData(this, this.data.page, false)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})



/**
   * 网络请求
   */
function getData(that, page, isrefresh) {
  wx.request({
    url: constant.cakeList + "?page=" + page,
    success: function (res) {
      console.log("====成功")
      // console.log(res)
      if (res.data != null && res.data.code == 200) {
        that.setData({
          cakeList: that.data.cakeList.concat(res.data.results),
          hasNext: res.data.next != null ? true : false,
          page: res.data.next != null ? that.data.page += 1 : that.data.page,
          loadingTxt: res.data.next != null ? "" : "已全部加载!",
        })
      }
    },
    fail: function (res) {
      console.log("====失败")
      // console.log(res)
    },
    complete:function(res){
      console.log("====完成")
      if(isrefresh){
        // wx.showLoading({
        //   title: '刷新完成',
        // })
        // setTimeout(function () {
        //   wx.hideLoading()
        // }, 500)
        wx.stopPullDownRefresh();
      }
      that.setData({
        isLoading:false
      })
    }
  })
}