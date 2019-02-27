

<template>
  <view class="content">
    <form @submit="formSubmit" @reset="formReset">
      <view class="uni-list">
        <view class="uni-list-cell">
          店铺名称
          <view class="">
            <input class="uni-input" v-model="shop_info.store_name" name="store_name" placeholder="请输入" />
          </view>
        </view>

        <view class="uni-list-cell">
          联系人
          <view class="uni-list-cell-right">
            <input class="uni-input" v-model="shop_info.id_name" name="id_name" placeholder="请输入" />
          </view>
        </view>

        <view class="uni-list-cell">
          联系电话
          <view class="uni-list-cell-right">
            <input class="uni-input" v-model="shop_info.store_tel" type="number" name="store_tel" placeholder="请输入" />
          </view>
        </view>

        <!-- <view class="uni-list-cell">
          营业范围
          <view class="">
            <input class="uni-input" v-model="shop_info.label" name="label" placeholder="请输入" />
          </view>
        </view> -->
        <!-- <view class="uni-list-cell">
          营业状态
          <view class="">
            <picker @change="storeStatusChange" :value="shop_info.store_status" :range="store_status_arr">
              <view class="uni-input">{{store_status_arr[shop_info.store_status]}}</view>
            </picker>
          </view>
        </view> -->
        <view class="uni-list-cell">
          所属行业
          <view class="">
            <picker @change="catChange" :value="cat_index" :range="storeList">
              <view class="uni-input">{{storeList[cat_index]}}</view>
            </picker>
          </view>
        </view>
        <!-- <view class="uni-list-cell">
          所属行业1
          <view class="">
            <picker  :value="cat_index" :range="storeList1">
              <view class="uni-input">{{storeList1[cat_index]}}</view>
            </picker>
          </view>
        </view> -->





        <view class="uni-list-cell" style="flex-direction: column;align-items: flex-start;">
          <view class="">
            店铺logo
          </view>

          <view class="" style="width: 400upx; display: flex;">
            <template v-if="shop_info.avatar">
              <view class="uni-uploader__file" style="width: 200upx;">
                <image class="uni-uploader__img" mode="aspectFill" :src="shop_info.avatar" :data-src="shop_info.avatar"
                  @tap="previewImage(1)"></image>
              </view>
            </template>
            <!-- <template> -->
            <view class="uni-uploader__input-box" style="width: 200upx;">
              <!-- /上传照片框框 -->
              <view class="uni-uploader__input" @tap="chooseImageFn(2)"></view>
            </view>
            <!-- </template> -->
          </view>
        </view>




      </view>
      <!-- <view id="canvaswrap" style="background-color: pink;">

      </view> -->







      <view class="uni-btn-v">
        <button class="btn-submit" formType="submit" type="primary">下一步</button>
        <!-- <button type="default" formType="reset">Reset</button> -->
      </view>

    </form>





  </view>
</template>
<script>
  var graceChecker = require("../../common/graceChecker.js");
  import ImageClip from '@/common/img_clip.js';
  // console.log("ImageClip----------------", ImageClip)

  export default {
    data() {
      return {
        cat_index: 0,
        storeListAll: [],
        storeList: [],
        store_status_arr: ['休息中', '正常营业', '已关店', ],
        storeList1: ['餐饮美食', '洗浴住宿', '唱歌观影'],

        shop_info: {
          avatar: '',
          cat_id: 10,
          store_status: 0,
          label: '1'
        },


        imageList: [],
        uploaddata: {},
      }
    },
    onShow() {
      console.log('this.$store.state ee===', this.$store.state)

      if (this.$store.state.form_data1.store_name) {
        this.shop_info = this.$store.state.form_data1
      }

    },
    onLoad() {
      this.getStore()
      this.getOssParam()
    },
    methods: {


      getStore() {
        var _this = this
        this.$util.ajax_uni({
          url: 'merchants/index/cat',
          data: {},
          success: function(res) {
            // console.log("返回---fenlei====es:", res);
            if (res.data.status == 1) {
              _this.shop_info.cat_id = res.data.data[0].id

              _this.storeListAll = res.data.data
              for (let item of res.data.data) {
                item.value = item.id
                _this.storeList.push(item.name)
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
      catChange(e) {
        // console.log('picker发送选择改变，携带值为', e.target.value)
        this.cat_index = e.target.value
        this.shop_info.cat_id = this.storeListAll[e.target.value].id
      },
      storeStatusChange(e) {
        console.log('picker发送选择改变，携带值为', e.target.value)
        this.shop_info.store_status = e.target.value

      },



      //选择店铺相册
      countChange: function(e) {
        this.countIndex = e.target.value;
      },
      chooseImageFn: async function(param) {
        var _this = this

        if (param == 1) {
          uni.chooseImage({
            count: 1, //每次上传数量
            success: (res) => {
              console.log('res----', res)

              this.shop_info.avatar = res.tempFilePaths[0];

            }
          })
        } else {

          uni.chooseImage({
            // sourceType:['camera', 'album'], //album 从相册选图，camera 使用相机，默认二者都有
            // sizeType:['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
            count: 1, //每次上传数量
            success: (res) => {
              var files = res.tempFilePaths
              console.log("res?-=======", JSON.stringify(res));

              // console.log('res---json-',JSON.stringify(res.tempFilePaths[0].split(".").pop()))


              // return


              let fileName = _this.uploaddata.dir + Date.parse(new Date()) + '_' + _this.randomString(
                6) + '.' + files[0].split(".").pop();
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
                  success_action_status: '203',
                },
                success: (res) => {
                  console.log('uploadImage success, res is:', res.data)
                  _this.shop_info.avatar =
                    'https://ffomall.oss-cn-hangzhou.aliyuncs.com/' +
                    JSON.parse(res.data).filename


                  /* var img = new Image();
                  var options = {
                    container: "#canvaswrap",
                    img: img,
                    forceWidth: 200,
                    forceHeight: 200
                  }
                  img.src = _this.shop_info.avatar;
                  img.onload = function() {
                    console.log(window.navigator)
                    try {
                      var cropImage = new ImageClip(options);

                    } catch (e) {
                      console.log(e)
                    }
                  };

 */

                  console.log('uploadImage ======:', JSON.stringify(_this
                    .shop_info.avatar))
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
      previewImage: function(img, index) {

        uni.previewImage({
          urls: [this.shop_info.avatar]
        })

        return
        this.$store.commit('changeFormData1', this.shop_info)
        // console.log('ee',img,index)
        if (img == 1) {
          uni.navigateTo({
            url: './shop_img_detail?data=' + this.shop_info.avatar + "&&flag=1"
          })
        } else {
          uni.navigateTo({
            url: './img_detail?data=' + img
          })
        }

      },
      formSubmit: function(e) {

        console.log('ruacna----', JSON.stringify(this.shop_info))
        //         uni.navigateTo({url: './shop_add2'});
        //         return

        //将下列代码加入到对应的检查位置
        //定义表单规则
        var rule = [

          {
            name: "store_name",
            checkType: "notnull",
            checkRule: "",
            errorMsg: "店铺名称不能空"
          },
          {
            name: "id_name",
            checkType: "notnull",
            checkRule: "",
            errorMsg: "联系人不能空"
          },
          {
            name: "store_tel",
            checkType: "notnull",
            checkRule: "",
            errorMsg: "联系电话不能空"
          }
        ];
        //进行表单检查
        var formData = e.detail.value;
        var checkRes = graceChecker.check(formData, rule);
        if (checkRes) {
          // uni.showToast({title:"验证通过!", icon:"none"});

          if (this.shop_info.avatar == "") {
            uni.showToast({
              title: "店铺logo必填!",
              icon: 'none'
            });
            return false
          }
          this.$store.commit('changeFormData1', this.shop_info)
          console.log('kankanjinqumei', this.$store.state)
          // return
          uni.navigateTo({
            url: './shop_add2'
          });


        } else {
          // console.log('对脆',this.avatar,this)
          uni.showToast({
            title: graceChecker.error,
            icon: "none"
          });
        }



      },
    }
  }
</script>

<style scoped="scoped">
  @import '../../common/img_clip.css';

  /* .content{padding:0 15px;background-color: white;} */

  .uni-view {
    width: inherit;
  }


  .infoWarp {
    border-bottom: 1px solid #c8c7cc;
    padding: 0 40upx;
    background-color: #fff;
  }

  .infoWarp .uni-textarea-textarea {
    line-height: 0.5;
  }

  .uni-input {
    text-align: right;
  }
</style>
