// pages/cloud/cloud.js
wx.cloud.init();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  insert() {
    // db.collection('user').add({
    //   data: {
    //     name: 'jerry',
    //     age: 20
    //   },
    //   success: res => {
    //     console.log(res);
    //   },
    //   fail: err => {
    //     console.log(err);
    //   }
    // });

    db.collection('user').add({
      data: {
        name: 'jack',
        age: 22
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },
  update() {
    db.collection('user').doc('f11f525b5f01e586004d7aa02e8d800b').update({
      data: {
        age: 21
      }
    }).then(res=>{
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },
  search() {
    db.collection('user').where({
      name: 'jerry'
    }).get().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },
  delete() {
    db.collection('user').doc('f11f525b5f01e586004d7aa02e8d800b').remove()
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },
  sum() {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 2,
        b: 3
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },
  getOpenId() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },
  batchDelete() {
    wx.cloud.callFunction({
      name: 'batchDelete'
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    });
  },
  upload() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);

        // 上传到云存储，并返回 id
        wx.cloud.uploadFile({
          cloudPath: 'example.png',
          filePath: tempFilePaths[0], // 文件路径
          success: res => {
            // get resource ID
            console.log(res.fileID);

            // 上传到云数据库
            db.collection('image').add({
              data: {
                fileID: res.fileID
              }
            }).then(res => {
              console.log(res);
            }).catch(err => {
              console.error(err);
            });
          },
          fail: err => {
            console.error(err);
          }
        })
      }
    });
  },
  getFile() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('image').where({
        _openid: res.result.openid
      }).get().then(res2 => {
        console.log(res2);
        this.setData({
          images: res2.data
        });
      });
    });
  },
  downloadFile(event) {
    wx.cloud.downloadFile({
      fileID: event.currentTarget.dataset.fileid,
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) { 
            wx.showToast({
              title: '保存成功',
              icon: 'none'
            });
          }
        })
      },
      fail: err => {
        // handle error
      }
    });
  },
  onShareAppMessage() {
    return {
      title: 'test share',
      path: '/pages/index/index',
      imageUrl: '/images/suyan.jpg'
    }
  }
})