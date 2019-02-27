<template>

  <view class="content">
    <view>
      <van-steps :steps="steps" :active="active" />

    </view>

    <view>


      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-list">
          <view class="uni-list-cell ">
            <view class="uni-title">证件上传</view>
          </view>



          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-head">
                <view class="uni-uploader-title">招牌照片</view>
              </view>
              <view class="uni-uploader-body">
                <view class="uni-uploader__files">
                  <block>
                    <view class="uni-uploader__file" style="width: 60%;">
                      <image class="uni-uploader__img" @tap="previewImagFn(text_info.store_img)" mode="aspectFit" :src="text_info.store_img"
                        :data-src="text_info.store_img"></image>
                    </view>
                  </block>
                  <view class="uni-uploader__input-box">
                    <!-- /上传照片框框 -->
                    <view class="uni-uploader__input" @tap="chooseImageFn(2)"></view>
                  </view>

                </view>
              </view>
            </view>
          </view>



          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-head">
                <view class="uni-uploader-title">营业执照</view>
                <!-- <view class="uni-uploader-info">{{imageList.length}}/1</view> -->
              </view>
              <view class="uni-uploader-body">
                <view class="uni-uploader__files">
                  <!-- <block v-for="(image,index) in imageList" :key="index"> -->
                  <view class="uni-uploader__file" v-if="text_info.store_img1!='' ">
                    <image class="uni-uploader__img" mode="aspectFill" :src="text_info.store_img1" :data-src="text_info.store_img1"
                      @tap="previewImagFn(text_info.store_img1)"></image>
                  </view>
                  <!-- </block> -->
                  <view class="uni-uploader__input-box" v-if="text_info.status!=1 ">
                    <!-- v-if="text_info.store_img1=='' " -->
                    <!-- /上传照片框框 -->
                    <view class="uni-uploader__input" @tap="chooseImageFn(3)"></view>
                  </view>
                </view>
              </view>

            </view>
          </view>

          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-head">
                <view class="uni-uploader-title">身份证正反面</view>
              </view>
              <view class="uni-uploader-body">
                <view class="uni-uploader__files">
                  <block v-for="(image,index) in id_image_ist" :key="index">
                    <view class="uni-uploader__file">
                      <image v-if="text_info.status==1" class="uni-uploader__img" @tap="previewImagFns(image,index,1)"
                        mode="aspectFill" :src="image" :data-src="image"></image>
                      <image v-if="text_info.status!=1" class="uni-uploader__img" @tap="previewImagFns(image,index)"
                        mode="aspectFill" :src="image" :data-src="image"></image>
                    </view>
                  </block>
                  <view class="uni-uploader__input-box" v-if="text_info.status!=1">
                    <!-- /上传照片框框 -->
                    <view class="uni-uploader__input" @tap="chooseImageFns(image)"></view>
                  </view>

                </view>
              </view>
            </view>
          </view>

          <view class="uni-list-cell">
            身份证号
            <view class="uni-list-cell-right">
              <input class="uni-input" :disabled="text_info.status==1" v-model="text_info.id_card" type="idcard" name="id_card"
                placeholder="请输入" />
            </view>
          </view>

        </view>

      </form>

    </view>



    <view class="uni-btn-v">

      <button class="btn-submit" type="primary" @tap="formSubmit">确认</button>
    </view>

  </view>
</template>
<script>
  import uniSegmentedControl from '../../components/uni-segmented-control.vue';
  var graceChecker = require("../../common/graceChecker.js");

  export default {
    components: {
      uniSegmentedControl
    },
    data() {

      return {
        steps: [{
            text: '基本信息',
            desc: ''
          },
          {
            text: '店铺介绍',
            desc: ''
          },
          {
            text: '证件上传',
            desc: ''
          }
        ],
        active: 2,

        storeListAll: [],
        storeList: [],
        cat_index: 0,

        array: ['餐饮美食', '洗浴住宿', '观影k哥', ],
        array1: ['正常营业', '休息中', '已关店', ],

        array_index: 0,


        activeColor: '#0faeff',
        styleType: 'button',


        uploaddata: {},
        uploaddata_id: {},
        text_info: {},

        latitude: null,
        longitude: null,
        covers_markers: [],
        mapCtx: null,


        id_image_ist: [],


        //         id_image_ist: ['http://img5.imgtn.bdimg.com/it/u=4242739171,2434290170&fm=26&gp=0.jpg',
        //         	'http://life.southmoney.com/tuwen/UploadFiles_6871/201804/20180423165909445.jpg'
        //         ],
      }
    },
    onShow() {
      var _this = this
      console.log('---------store show===text_info', this.$store.state.shop_edit_info.length, JSON.stringify(this.$store
        .state.shop_edit_info))
      if (_this.text_info) {
        console.log('store youhuo')
        _this.text_info = this.$store.state.shop_edit_info

        if (_this.text_info.profile_picture1 == undefined && _this.text_info.profile_picture2 != undefined) {
          console.log('stroe--->', 0)
          _this.id_image_ist = [_this.text_info.profile_picture2]
        } else if (_this.text_info.profile_picture2 == undefined && _this.text_info.profile_picture1 != undefined) {
          console.log('stroe--->', 1)
          _this.id_image_ist = [_this.text_info.profile_picture1]
        } else if (_this.text_info.profile_picture1 == undefined && _this.text_info.profile_picture2 == undefined) {
          console.log('stroe--->', '00')
          _this.id_image_ist = []
        } else {
          console.log('stroe--->', 2)
          _this.id_image_ist = [_this.text_info.profile_picture1, _this.text_info.profile_picture2]
        }
      }

      //        if(this.$store.state.shop_edit_index){
      //          console.log('cong详情回来')
      //          this.current=2
      //          this.active=2
      //        }


      // 			this.imageList = this.$store.state.img_list
      // 			this.image1 = 
    },
    onLoad(e) {
      // console.log('上来餐 ee===',e)

      this.getData()

      this.getOssParam()
      this.getOssParamId()

      this.imageList = []
      // this.getLocation()
    },

    methods: {

      getData() {
        var _this = this
        this.$util.ajax_uni({
          url: 'merchants/index/show',
          data: {
            ff_openid: uni.getStorageSync('user_id')
          },
          success: function(res) {
            console.log("返回店铺信息res:", res);
            if (res.data.status == 1) {

              _this.text_info = res.data.data.data
              _this.getStore()

              //                       console.log('shop_edit_index---',_this.$store.state.shop_edit_index)
              //                       console.log('id_image_ist.length===========', JSON.stringify(_this.id_image_ist.length))
              //                       console.log('_this.text_info.profile_picture1---',_this.text_info.profile_picture1)
              //                       console.log('_this.text_info.profile_picture2---',_this.text_info.profile_picture2)
              //                       
              /* if(_this.$store.state.shop_edit_index==='0'){
                // console.log(0)
                // _this.id_image_ist = [ res.data.data.data.profile_picture2]
                
              }else if(_this.$store.state.shop_edit_index==1){
                // console.log(1)
                _this.id_image_ist = [ res.data.data.data.profile_picture1]
              }else {
                // console.log(2)
                _this.id_image_ist = [res.data.data.data.profile_picture1, res.data.data.data.profile_picture2]
              } */

              console.log('---------store onload===text_info', JSON.stringify(_this.text_info))

              if (_this.text_info.profile_picture1 == undefined) {
                console.log(0)
                _this.id_image_ist = [_this.text_info.profile_picture2]
              } else if (_this.text_info.profile_picture2 == undefined) {
                console.log(1)
                _this.id_image_ist = [_this.text_info.profile_picture1]
              } else {
                console.log(2)
                _this.id_image_ist = [_this.text_info.profile_picture1, _this.text_info.profile_picture2]
              }



              console.log('id_image_ist===========', JSON.stringify(_this.id_image_ist))
            } else {
              console.log('ceeee', JSON.stringify(res.data))
              uni.showToast({
                icon: 'none',
                title: res.data.msg
              });

            }
          },
          error: function(res) {
            console.log("错误res:", res);
          }
        })
      },


      getStore() {
        var _this = this
        this.$util.ajax_uni({
          url: 'merchants/index/cat',
          data: {},
          success: function(res) {
            // console.log("返回---fenlei====es:", res);
            if (res.data.status == 1) {


              _this.storeListAll = res.data.data
              for (let i in res.data.data) {
                res.data.data[i].value = res.data.data[i].id
                _this.storeList.push(res.data.data[i].name)
                if (res.data.data[i].id == _this.text_info.cat_id) {
                  _this.cat_index = i
                }
              }

            } else {
              console.log('ceeee', JSON.stringify(res.data))
              uni.showToast({
                icon: 'none',
                title: res.data.msg
              });

            }
          },
          error: function(res) {
            console.log("错误res:", res);
          }
        })
      },
      nextStepsFn() { //下一步
        console.log('active--', this.active, 'current===', this.current)
        if (this.active < 2) {
          this.active += 1
          this.current += 1;
        }

      },
      preStepsFn() { //上一步
        console.log('active--', this.active, 'current===', this.current)

        if (this.active > 0) {
          this.active -= 1
          this.current -= 1;
        }

      },
      bindPickerChange1(e) {
        console.log('picker发送选择改变，携带值为', e.target.value)
        this.text_info.store_status = e.target.value
      },
      catChange(e) {
        console.log('picker发送选择改变，携带值为', e.target.value)
        this.cat_index = e.target.value
        this.text_info.cat_id = this.storeListAll[e.target.value].id
        // console.log('shop------', this.storeListAll[e.target.value])
      },
      onClickItem(index) {
        if (this.current !== index) {
          this.current = index;
        }
      },


      previewImagFn(img_url, flag) {

        uni.previewImage({
          urls: [img_url]
        })
      },
      previewImagFns(param, inx, flag) {
        console.log('chooseImageFns----', param)
        if (flag == 1) {
          uni.previewImage({
            current: this.id_image_ist[inx],
            urls: this.id_image_ist
          })
        } else {
          this.$store.commit('changeShopEditInfo', this.text_info)

          uni.navigateTo({
            url: './shop_img_detail?data=' + param + "&&flag=" + inx
          })
        }

      },

      chooseImageFn: async function(param) {
        var _this = this
        switch (param) { //1店铺logo 2店铺招牌 3营业执照 4身份证照
          case 1:

            uni.chooseImage({
              count: 1, //每次上传数量
              success: (res) => {
                var files = res.tempFilePaths
                console.log("res?-=======", JSON.stringify(res));
                let fileName = _this.uploaddata.dir + Date.parse(new Date()) + '_' + _this.randomString(6) +
                  '.' + files[0].split(".").pop();
                uni.uploadFile({
                  url: "https://ffomall.oss-cn-hangzhou.aliyuncs.com",
                  filePath: files[0],
                  name: 'file',
                  formData: {
                    key: fileName,
                    policy: _this.uploaddata.policy,
                    OSSAccessKeyId: _this.uploaddata.OSSAccessKeyId,
                    callback: _this.uploaddata.callback,
                    signature: _this.uploaddata.signature,
                    success_action_status: '203',
                  },
                  success: (res) => {
                    console.log('uploadImage success, res is:', res.data)
                    _this.text_info.avatar = 'https://ffomall.oss-cn-hangzhou.aliyuncs.com/' + JSON.parse(
                      res.data).filename
                  },
                  fail: (err) => {
                    console.log('uploadImage fail', JSON.stringify(err));
                    uni.showModal({
                      content: err.errMsg,
                      showCancel: false
                    });
                    uni.hideLoading();
                  },
                  complete: () => {
                    console.log("complate")
                  }
                })

              }
            })

            break;
          case 2:

            uni.chooseImage({
              count: 1, //每次上传数量
              success: (res) => {
                var files = res.tempFilePaths
                console.log("res?-=======", JSON.stringify(res));
                let fileName = _this.uploaddata.dir + Date.parse(new Date()) + '_' + _this.randomString(6) +
                  '.' + files[0].split(".").pop();
                uni.uploadFile({
                  url: "https://ffomall.oss-cn-hangzhou.aliyuncs.com",
                  filePath: files[0],
                  name: 'file',
                  formData: {
                    key: fileName,
                    policy: _this.uploaddata.policy,
                    OSSAccessKeyId: _this.uploaddata.OSSAccessKeyId,
                    callback: _this.uploaddata.callback,
                    signature: _this.uploaddata.signature,
                    success_action_status: '203',
                  },
                  success: (res) => {
                    console.log('uploadImage success, res is:', res.data)
                    _this.text_info.store_img = 'https://ffomall.oss-cn-hangzhou.aliyuncs.com/' + JSON.parse(
                      res.data).filename
                  },
                  fail: (err) => {
                    console.log('uploadImage fail', JSON.stringify(err));
                    uni.showModal({
                      content: err.errMsg,
                      showCancel: false
                    });
                    uni.hideLoading();
                  },
                  complete: () => {
                    console.log("complate")
                  }
                })
              }
            })

            break;
          case 3:

            uni.chooseImage({
              count: 1, //每次上传数量
              success: (res) => {
                var files = res.tempFilePaths
                console.log("res?-=======", JSON.stringify(res));
                let fileName = _this.uploaddata.dir + Date.parse(new Date()) + '_' + _this.randomString(6) +
                  '.' + files[0].split(".").pop();
                uni.uploadFile({
                  url: "https://ffomall.oss-cn-hangzhou.aliyuncs.com",
                  filePath: files[0],
                  name: 'file',
                  formData: {
                    key: fileName,
                    policy: _this.uploaddata.policy,
                    OSSAccessKeyId: _this.uploaddata.OSSAccessKeyId,
                    callback: _this.uploaddata.callback,
                    signature: _this.uploaddata.signature,
                    success_action_status: '203',
                  },
                  success: (res) => {
                    console.log('uploadImage success------, res is:', res.data)
                    _this.text_info.store_img1 = 'https://ffomall.oss-cn-hangzhou.aliyuncs.com/' + JSON.parse(
                      res.data).filename
                    console.log('--修改', JSON.stringify(_this.text_info))
                  },
                  fail: (err) => {
                    console.log('uploadImage fail', JSON.stringify(err));
                    uni.showModal({
                      content: err.errMsg,
                      showCancel: false
                    });

                  },
                  complete: () => {
                    console.log("complate")
                  }
                })
              }
            })

            break;
          case 4:

            /* uni.chooseImage({
                count: 2, //每次上传数量
                success: (res) => {
                  // console.log('res----',res)
//                   
//                   
//                   if (this.text_info.profile_picture2 == undefined && this.text_info.profile_picture1 != undefined) {
//                     console.log(3)
//                     this.text_info.profile_picture2 = res.tempFilePaths[1];
//                   } 
                  
                  console.log("====shopinfo ---img", JSON.stringify(this.text_info));
                 // this.id_image_ist=[res.tempFilePaths[0],res.tempFilePaths[1]]
                 
                  
                }
              }) */




            break;
          default:
            break;
        }


      },

      chooseImageFns(param) {
        var _this = this
        console.log('chooseImage--Fns----', param)

        if (_this.id_image_ist.length == 2) {
          uni.showToast({
            title: '请先删除照片',
            icon: 'none'
          })
          return
        }

        uni.chooseImage({
          count: 2, //每次上传数量
          success: (res) => {
            var files = res.tempFilePaths
            console.log("res?-=======", JSON.stringify(res));

            // _this.id_image_ist=[]

            for (let i in files) {
              let fileName = _this.uploaddata_id.dir + Date.parse(new Date()) + '_' + _this.randomString(6) + '.' +
                files[i].split(".").pop();
              uni.uploadFile({
                url: "https://ffomallcardid.oss-cn-hangzhou.aliyuncs.com",
                filePath: files[i],
                name: 'file',
                formData: {
                  key: fileName,
                  policy: _this.uploaddata_id.policy,
                  OSSAccessKeyId: _this.uploaddata_id.OSSAccessKeyId,
                  callback: _this.uploaddata_id.callback,
                  signature: _this.uploaddata_id.signature,
                  success_action_status: '203',
                },
                success: (res) => {
                  // console.log('uploadImage success, res is:', res.data)

                  _this.id_image_ist.push('https://ffomallcardid.oss-cn-hangzhou.aliyuncs.com/' + JSON.parse(
                    res.data).filename)
                  console.log('uploadImage =====jiddddddd=:', JSON.stringify(_this.id_image_ist))





                },
                fail: (err) => {
                  console.log('uploadImage fail', JSON.stringify(err));
                  uni.showModal({
                    content: err.errMsg,
                    showCancel: false
                  });
                  uni.hideLoading();
                },
                complete: () => {
                  console.log("complate")
                }
              })
            }

            /* if (this.text_info.profile_picture1 == undefined) {
              console.log(1)
              this.text_info.profile_picture1 = res.tempFilePaths[0];
            } else {
              console.log(2)
              this.text_info.profile_picture2 = res.tempFilePaths[0];
            } */

          },
        })

      },

      randomString(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
          var randomPoz = Math.floor(Math.random() * charSet.length);
          randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
      },
      getOssParam() {
        let _this = this;
        uni.request({
          url: this.base_url + 'notify/alioss/getsign',
          method: 'post',
          data: {
            sign: '3521257fc593c5d202474f6ac0c245ae'
          },
          success: res => {
            console.log("res?-", res);

            if (res.data.status == 1) {
              _this.uploaddata = res.data.data;
            }
          },
          fail: () => {},
          complete: () => {}
        });

        return
        this.$util.ajax({
          method: 'post',
          url: 'notify/alioss/getsign',
          data: {
            sign: '3521257fc593c5d202474f6ac0c245ae'
          }
        }).then(function(res) {
          if (res.data.status == 1) {
            _this.uploaddata = res.data.data;
          }
        })
      },

      getOssParamId() {
        let _this = this;
        uni.request({
          url: this.base_url + 'merchants/index/upload',
          method: 'post',
          data: {
            token: uni.getStorageSync('token')
            // sign: '3521257fc593c5d202474f6ac0c245ae'
          },
          success: res => {
            console.log("res?========-", res);

            if (res.data.status == 1) {
              _this.uploaddata_id = res.data.data;
            }
          },
          fail: () => {},
          complete: () => {}
        });

      },


      formReset: function(e) {
        console.log("清空数据")
        this.chosen = ''
      },


      previewImageFn(img_url) {
        uni.previewImage({
          urls: [img_url]
        })

      },


      choseLocation() {
        var _this = this
        console.log('位置名称：--------');
        uni.chooseLocation({
          success: function(res) {
            console.log('位置名称：' + res.name);
            console.log('详细地址：' + res.address);
            console.log('纬度：' + res.latitude);
            console.log('经度：' + res.longitude);
            _this.longitude = res.longitude
            _this.latitude = res.latitude
            _this.covers_markers.pop()
            _this.covers_markers.push({
              latitude: res.latitude,
              longitude: res.longitude,
              label: {
                content: res.name
              }
            })
          }
        });
      },
      getLocation() {
        var _this = this

        // console.log('dd')
        uni.getLocation({
          type: 'gcj02',
          success: function(res) {
            // console.log('当前位置的经度：' + res.longitude,JSON.stringify(res));
            console.log('当前位置的纬度：' + res.latitude);
            _this.longitude = res.longitude
            _this.latitude = res.latitude
            _this.covers_markers.push({
              latitude: res.latitude,
              longitude: res.longitude,

            })


          },
          fail: (res) => {
            console.log('res-fail', res)


          },
        });


      },

      formSubmit: function(e) {
        var _this = this
        let url_p = ''
        if (this.text_info.status == 1) {
          url_p = "merchants/index/updateRegistered"
        } else {
          url_p = "merchants/index/updateReg"
        }

        this.text_info.profile_picture1 = this.id_image_ist[0]
        this.text_info.profile_picture2 = this.id_image_ist[1]
        console.log('入参---修改', JSON.stringify(this.text_info))

        // return
        this.$util.ajax_uni({
          url: url_p,
          /* data: {
            store_name:_this.text_info.store_name,
            id_name:_this.text_info.id_name,
            store_tel:_this.text_info.store_tel,
            store_status:_this.text_info.store_status,
            cat_id:_this.text_info.cat_id,
            avatar:_this.text_info.avatar,
            
            store_name:_this.text_info.store_name,
            store_name:_this.text_info.store_name,
          }, */
          data: this.text_info,
          success: function(res) {
            console.log("修改--返回---es:", res);
            if (res.data.status == 1) {
              // uni.redirectTo({url: './shop_info'})
              uni.navigateBack({delta: 3});

            } else {
              console.log('ceeee', JSON.stringify(res.data))
              uni.showToast({
                icon: 'none',
                title: res.data.msg
              });

            }
          },
          error: function(res) {
            console.log("错误res:", res);
          }
        })



      },
    }
  }
</script>

<style scoped="scoped">
  /* .content{padding:0 15upx;background-color: white;} */

  .uni-view {
    width: inherit;
  }

  /* .uni-list-cell {
		padding: 24upx 36upx;
	} */

  .uni-uploader__file {}

  .infoWarp {
    border-bottom: 1upx solid #efeff4;
    padding: 10upx 32upx;
    background-color: #fff;

  }

  .infoWarp .uni-textarea-textarea {
    line-height: 0.5;
  }

  .uni_title {
    margin-top: 20upx;
  }

  .uni-input {
    text-align: right;
  }



  .uni-list-cell-right {
    display: flex;
    flex-direction: row;
  }

  map {
    width: 100%;
    height: 600upx;
  }

  .mapWrap {
    position: relative;
  }

  .mapWrap .iconWrap {
    /* position: absolute; */
    z-index: 2;
    padding: 10upx;
    background-color: #FFFFFF;
    display: flex;
    padding-left: 40%;
  }

  .mapWrap .iconWrap .uni-icon-search {

    z-index: 3;
    /* 
  	position: absolute;
  	left: 15upx;
    top: 16upx; */
    color: red;
  }

  .mapWrap .iconWrap .uni-input {
    padding: 0;

  }
</style>
