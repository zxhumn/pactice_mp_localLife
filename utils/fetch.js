const BASE_URL ="https://locally.uieee.com/";
module.exports = function(url,data) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url:`${BASE_URL}${url}`,
      success:function(res){
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })

  })
}