// pages/list/list.js
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:0,
    pageSize:10,
    shopsList:[],
    id:-1,
    hasMore:true,
    isLoading:false,
    keyWord:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)    
      wx.setNavigationBarTitle({
        title: options.name
      }),
      this.data.id= options.id;
      this.getShopLists();
  },
  searchShopList(e){
// console.log(e.detail)
    this.data.keyWord = e.detail;
  },
  getShopLists(){
    if(!this.data.hasMore) return;
    if(this.data.isLoading) return;
    this.data.isLoading = true;
    this.data.pageIndex++;   
    let url = null; 
    if(this.data.keyWord){
      url = `categories/${this.data.id}/shops?_page=${this.data.pageIndex}&_limit=${this.data.pageSize}&q=${this.data.keyWord}`
    }else{
      url = `categories/${this.data.id}/shops?_page=${this.data.pageIndex}&_limit=${this.data.pageSize}`
    }
   
    fetch(url).then(res=>{
      //停止下拉刷新
      wx.stopPullDownRefresh()
      // console.log(res)
      const totalNum = res.header['X-Total-Count'];
     
      this.setData({
        shopsList:this.data.shopsList.concat(res.data),
        hasMore:this.data.shopsList.length<totalNum
      })
      this.data.isLoading = false;
    })
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
    this.data.pageIndex = 0;
    this.setData({
      shopsList:[],
      hasMore:true
    },()=>{
      this.getShopLists()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getShopLists();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})