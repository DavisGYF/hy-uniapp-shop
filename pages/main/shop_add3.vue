<template>
  <view class="content">
    <form @submit="formSubmit" @reset="formReset">




      <view class="uni-list">



        <view class="uni-list-cell" style="flex-direction: column;align-items: flex-start;">
          招牌照片
          <view class="uni-list-cell-right" >
            <template v-if="image1">
              <view class="uni-uploader__file" style="width:200upx">
                <image class="uni-uploader__img" @tap="previewImageFn(image1,1)" :src="image1" mode="aspectFill" :data-src="image1" ></image>
              </view>
            </template>
            <!-- <template v-if="!image1"> -->
              <view class="uni-uploader__input-box">
                <!-- /上传照片框框 -->
                <view class="uni-uploader__input" @tap="chooseImageFn(1)"></view>
              </view>
            <!-- </template> -->
          </view>
        </view>

        <!-- <view class="uni-list list-pd"> -->
        <view class="uni-list-cell cell-pd">
          <view class="uni-uploader">
            <view class="uni-uploader-head">
              <view class="uni-uploader-title">营业执照</view>
              <!-- <view class="uni-uploader-info">{{imageList.length}}/1</view> -->
            </view>
            <view class="uni-uploader-body">
              <view class="uni-uploader__files">
                <!-- <block v-for="(image,index) in imageList" :key="index"> -->
                  <view class="uni-uploader__file" v-if="shop_info.store_img1!='' ">
                    <image class="uni-uploader__img" @tap="previewImageFn(shop_info.store_img1,1)" mode="aspectFill" :src="shop_info.store_img1" :data-src="shop_info.store_img1" ></image>
                  </view>
                <!-- </block> -->
                <view class="uni-uploader__input-box" ><!-- v-if="shop_info.store_img1==''" -->
                  <!-- /上传照片框框 -->
                  <view class="uni-uploader__input" @tap="chooseImageFn(2)"></view>
                </view>
              </view>
            </view>

          </view>
        </view>
        <!-- </view> -->
        
        <view class="uni-list-cell cell-pd">
          <view class="uni-uploader">
            <view class="uni-uploader-head">
              <view class="uni-uploader-title">身份证正反面</view>
              <view class="uni-uploader-info">{{id_image_ist.length}}/2</view>
            </view>
            <view class="uni-uploader-body">
              <view class="uni-uploader__files">

                <block v-for="(image,index) in id_image_ist" :key="index">
                  <view class="uni-uploader__file">
                    <image class="uni-uploader__img" @tap="previewImageFn(image,2)" mode="aspectFill" :src="image" :data-src="image" ></image>
                  </view>
                </block>
                <view class="uni-uploader__input-box" ><!-- v-if="id_image_ist.length<2" -->
                  <!-- /上传照片框框 -->
                  <view class="uni-uploader__input" @tap="chooseImageFn(3)"></view>
                </view>
              </view>
            </view>

          </view>
        </view>
        
        <view class="uni-list-cell">
          身份证号
          <view class="uni-list-cell-right">
            <input class="uni-input" v-model="shop_info.id_card" type="idcard" name="id_card" placeholder="请输入" />
          </view>
        </view>

      </view>




      <view class="uni-btn-v">
        <button class="btn-submit" formType="submit" type="primary">提交</button>
        <!-- <button type="default" formType="reset">Reset</button> -->
      </view>

    </form>





  </view>
</template>
<script>
  var graceChecker = require("../../common/graceChecker.js");

  export default {
    data() {
      return {
        image1: null,
        imageList: [],
        id_image_ist: [],
        uploaddata: {},

        shop_info: {
          store_img1:'',
          id_card:''
        }
      }
    },
    onShow() {
      console.log('this.$store.state.form_data3 store===', this.$store.state.form_data3)

      if(this.$store.state.form_data3.id_card){
        
        this.shop_info.id_card = this.$store.state.form_data3.id_card
      }
      if(this.$store.state.form_data3.store_img){
        console.log('you--------',this.$store.state.form_data3.store_img)
        this.image1 = this.$store.state.form_data3.store_img
      }
      
      if(this.$store.state.form_data3.store_img1){
        this.shop_info.store_img1 = this.$store.state.form_data3.store_img1
      }
      
      
      if(this.$store.state.form_data3.profile_picture2){
        this.id_image_ist = [this.$store.state.form_data3.profile_picture1, this.$store.state.form_data3.profile_picture2]
      }
      
    },
    onLoad() {
      this.getOssParam()
    },
    methods: {

      

      previewImageFn(img_url, flag) {
        
        uni.previewImage({
          urls: [img_url]
        })
      },
      
      chooseImageFn: async function(param) {
        var _this = this
        
        switch (param){//1店铺招牌 2营业执照 3身份证照
        	case 1:
            uni.chooseImage({
              count: 1, //每次上传数量
              success: (res) => {
                var files = res.tempFilePaths
                console.log("res?-=======", JSON.stringify(res));
                  let fileName = _this.uploaddata.dir + Date.parse(new Date()) + '_' + _this.randomString(6) + '.' + files[0].split(".").pop();
                  uni.uploadFile({
                    url: "https://ffomall.oss-cn-hangzhou.aliyuncs.com",
                    filePath: files[0],
                    // files:[{url: files[0]}],
                    name: 'file',
                    formData: {
                      key: fileName,
                      policy: _this.uploaddata.policy,
                      OSSAccessKeyId: _this.uploaddata.OSSAccessKeyId,
                      callback: _this.uploaddata.callback,
                      signature: _this.uploaddata.signature,
                      success_action_status:'203',
                    },
                    success: (res) => {
                      console.log('uploadImage success, res is:', res.data)
                      _this.image1='https://ffomall.oss-cn-hangzhou.aliyuncs.com/'+JSON.parse(res.data).filename
                      console.log('uploadImage ======:', JSON.stringify(_this.image1))
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
                 let fileName = _this.uploaddata.dir + Date.parse(new Date()) + '_' + _this.randomString(6) + '.' + files[0].split(".").pop();
                 uni.uploadFile({
                   url: "https://ffomall.oss-cn-hangzhou.aliyuncs.com",
                   filePath: files[0],
                   // files:[{url: files[0]}],
                   name: 'file',
                   formData: {
                     key: fileName,
                     policy: _this.uploaddata.policy,
                     OSSAccessKeyId: _this.uploaddata.OSSAccessKeyId,
                     callback: _this.uploaddata.callback,
                     signature: _this.uploaddata.signature,
                     success_action_status:'203',
                   },
                   success: (res) => {
                     console.log('uploadImage success, res is:', res.data)
                     _this.shop_info.store_img1='https://ffomall.oss-cn-hangzhou.aliyuncs.com/'+JSON.parse(res.data).filename
                     console.log('uploadImage ======:', JSON.stringify(_this.shop_info))
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
              count: 2, //每次上传数量
              success: (res) => {
                var files = res.tempFilePaths
                console.log("res?-=======", JSON.stringify(res));
                
                
                for (let i in files) {
                  let fileName = _this.uploaddata.dir + Date.parse(new Date()) + '_' + _this.randomString(6) + '.' + files[i].split(".").pop();
                  uni.uploadFile({
                    url: "https://ffomall.oss-cn-hangzhou.aliyuncs.com",
                    filePath: files[i],
                    name: 'file',
                    formData: {
                      key: fileName,
                      policy: _this.uploaddata.policy,
                      OSSAccessKeyId: _this.uploaddata.OSSAccessKeyId,
                      callback: _this.uploaddata.callback,
                      signature: _this.uploaddata.signature,
                      success_action_status:'203',
                    },
                    success: (res) => {
                      console.log('uploadImage success, res is:', res.data)
                      if(_this.id_image_ist.length<2){
                        _this.id_image_ist.push('https://ffomall.oss-cn-hangzhou.aliyuncs.com/'+JSON.parse(res.data).filename)
                        
                      }else{
                        _this.id_image_ist=[]
                        _this.id_image_ist.push('https://ffomall.oss-cn-hangzhou.aliyuncs.com/'+JSON.parse(res.data).filename)
                      }
                      
                      console.log('uploadImage ======:', JSON.stringify(_this.id_image_ist))
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
              },
            })
            break;
          
        	default:
        		break;
        }
        
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


      formReset: function(e) {
        console.log("清空数据")
        this.chosen = ''
      },

      isFullImg: function() { //qingkong
        return new Promise((res) => {
          uni.showModal({
            content: "已经有9张图片了,是否清空现有图片？",
            success: (e) => {
              if (e.confirm) {
                this.imageList = [];
                res(true);
              } else {
                res(false)
              }
            },
            fail: () => {
              res(false)
            }
          })
        })
      },

      uniChooseImg(num,name_para){
        var _this=this
        console.log('-----------',num,JSON.stringify(name_para))
        // return
        uni.chooseImage({
          // sourceType:['camera', 'album'], //album 从相册选图，camera 使用相机，默认二者都有
          // sizeType:['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
          count: num||1, //每次上传数量
          success: (res) => {
            var files = res.tempFilePaths
            console.log("res?-=======", JSON.stringify(res));
              let fileName = _this.uploaddata.dir + Date.parse(new Date()) + '_' + _this.randomString(6) + '.' + files[0].split(".").pop();
              uni.uploadFile({
                url: "https://ffomall.oss-cn-hangzhou.aliyuncs.com",
                filePath: files[0],
                // files:[{url: files[0]}],
                name: 'file',
                formData: {
                  key: fileName,
                  policy: _this.uploaddata.policy,
                  OSSAccessKeyId: _this.uploaddata.OSSAccessKeyId,
                  callback: _this.uploaddata.callback,
                  signature: _this.uploaddata.signature,
                  success_action_status:'203',
                },
                success: (res) => {
                  console.log('uploadImage success, res is:', res.data)
                  name_para='https://ffomall.oss-cn-hangzhou.aliyuncs.com/'+JSON.parse(res.data).filename
                  console.log('uploadImage ======:', JSON.stringify(_this.shop_info))
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
      },
      
      
      formSubmit: function(e) {
        var _this = this
        this.shop_info.store_img = this.image1
        
        this.shop_info.profile_picture1 = this.id_image_ist[0]
        this.shop_info.profile_picture2 = this.id_image_ist[1]
        

        console.log('信息333=shop_info==', JSON.stringify(this.shop_info),this.$store.state.form_data3.store_img)
        console.log('storexinxi===', JSON.stringify(this.$store.state.form_data3))
        
        if (this.shop_info.id_card == "" && this.$store.state.form_data3.id_card == undefined) {
          uni.showToast({
            title: "请输入身份证号!",
            icon: 'none'
          });
          return false
        }

        if (this.image1 == "" && this.$store.state.form_data3.store_img == undefined) {
          uni.showToast({
            title: "请上传店铺招牌!",
            icon: 'none'
          });
          return false
        }

        if (this.shop_info.store_img1 == '' && this.$store.state.form_data3.store_img1 == undefined) {
          uni.showToast({
            title: "请上传营业执照!",
            icon: 'none'
          });
          return false
        }

        if (this.shop_info.profile_picture2 == undefined && this.$store.state.form_data3.profile_picture2 ==
          undefined) {
          uni.showToast({
            title: "请上传身份证正反面照片!",
            icon: 'none'
          });
          return false
        }

        this.$store.commit('changeFormData3', this.shop_info)
        console.log('kankanjinqumei', this.$store.state)
        let obj1 = this.$store.state.form_data1
        let obj2 = this.$store.state.form_data2
        let obj3 = this.$store.state.form_data3

        var objj = Object.assign(obj1, obj2, obj3)
        console.log('shangchuanzuishuju--------------', objj)


        // return
        
        this.$util.ajax_uni({
          url: 'merchants/index/registered',
          data: objj,
          success: function(res) {
            console.log("dianpuxingzeng-----态res:", res);
            if (res.data.status == 1) {

              uni.showToast({
                icon: 'none',
                title: res.data.msg
              });
              uni.navigateTo({url: './user'});
              

            } else {
              console.log('请求反参数', JSON.stringify(res.data))
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

        // uni.showToast({title:"通过!",icon:'none'});

        



      },
    }
  }
</script>

<style scoped="scoped">
  /* .content{padding:0 15px;background-color: white;} */

  .uni-view {
    width: inherit;
  }


  .infoWarp {
    border-bottom: 1px solid #c8c7cc;

  }

  .infoWarp .uni-textarea-textarea {
    line-height: 0.5;
  }

  uni-label {
    width: 60px;
    border: 1px solid red
  }

  .uni-input {
    text-align: right;
  }
  
  .uni-list-cell-right{
    display: flex;
    flex-direction: row;
  }
</style>
