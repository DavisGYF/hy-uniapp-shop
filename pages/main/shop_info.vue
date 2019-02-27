<template>
  <view class="content" > <!-- style="margin-bottom:110upx;" -->
    <page-head title="店铺信息" right_icon="compose" right_icon_url="./shop_info_edit1" back_url="./user"></page-head>
    <form>
      <view class="uni-list" style="padding-top: 140upx;">
        <view class="uni-list-cell ">
          <view class="uni-title">基本信息</view>
        </view>
        <view class="uni-list-cell">
          店铺名称
          <view class="">
            {{shop_info.store_name}}
          </view>
        </view>
        <view class="uni-list-cell">
          联系人
          <view class="">
            {{shop_info.id_name}}
          </view>
        </view>
        <view class="uni-list-cell">
          联系电话
          <view class="">
            {{shop_info.store_tel}}
          </view>
        </view>
        <view class="uni-list-cell">
          所属行业
          <view class="">
            {{shop_info.name}}
          </view>
        </view>
        <view class="uni-list-cell">
          身份证号
          <view class="">
            {{shop_info.id_card}}
          </view>
        </view>
        <!-- <view class="uni-list-cell">
                    营业状态
                    <view v-if="shop_info.store_status==0">
                    	休息中
                    </view>
                    <view v-if="shop_info.store_status==1">
                    	正常营业
                    </view>
                    <view v-if="shop_info.store_status==2">
                    	已关店
                    </view>
                   
                </view> -->

        <!-- <view class="uni-list-cell">
                    营业范围
                    <view class="">
                        {{shop_info.label}}
                    </view>
                </view> -->


        <view class="uni-list-cell uni_title">
          <view class="uni-title">店铺简介</view>
        </view>
        <view class="infoWarp">
          {{shop_info.info}}
        </view>


        <view class="uni-list-cell uni_title">
          <view class="uni-title">图片相关</view>
        </view>
        <view class="uni-list-cell cell-pd">
          <view class="uni-uploader">
            <view class="uni-uploader-head">
              <view class="uni-uploader-title"> 店铺logo</view>
            </view>
            <view class="uni-uploader-body">
              <view class="uni-uploader__files">
                <block>
                  <view class="uni-uploader__file">
                    <image class="uni-uploader__img" mode="aspectFill" :src="shop_info.avatar" :data-src="shop_info.avatar"
                      @tap="previewImage(shop_info.avatar)"></image>
                  </view>
                </block>
              </view>
            </view>
          </view>
        </view>
        <view class="uni-list-cell cell-pd">
          <view class="uni-uploader">
            <view class="uni-uploader-head">
              <view class="uni-uploader-title">招牌照片</view>
            </view>
            <view class="uni-uploader-body">
              <view class="uni-uploader__files">
                <block>
                  <view class="uni-uploader__file" style="width: 100%;">
                    <image class="uni-uploader__img" mode="aspectFill" :src="shop_info.store_img" :data-src="shop_info.store_img"
                      @tap="previewImage(shop_info.store_img)"></image>
                  </view>
                </block>
              </view>
            </view>
          </view>
        </view>
        <view class="uni-list-cell cell-pd">
          <view class="uni-uploader">
            <view class="uni-uploader-head">
              <view class="uni-uploader-title">营业执照</view>
            </view>
            <view class="uni-uploader-body">
              <view class="uni-uploader__files">
                <!-- <block v-for="(image,index) in imageList1" :key="index"> -->
                <view class="uni-uploader__file">
                  <image class="uni-uploader__img" mode="aspectFill" :src="shop_info.store_img1" :data-src="shop_info.store_img1"
                    @tap="previewImage(shop_info.store_img1)"></image>
                </view>
                <!-- </block> -->
              </view>
            </view>
          </view>
        </view>
        <view class="uni-list-cell cell-pd">
          <view class="uni-uploader">
            <view class="uni-uploader-head">
              <view class="uni-uploader-title">身份证正反面</view>
              <!-- <view class="uni-uploader-info">{{imageList.length}}/</view> -->
            </view>
            <view class="uni-uploader-body">
              <view class="uni-uploader__files">
                <block v-for="(image,index) in id_image_ist" :key="index">
                  <view class="uni-uploader__file">
                    <image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage(1,1,index)"></image>
                  </view>
                </block>
              </view>
            </view>
          </view>
        </view>
      </view>



      <view class="uni-btn-v">
        <!-- <button class="btn-submit" formType="submit" type="primary">下一步</button> -->
        <!-- <button type="default" formType="reset">Reset</button> -->
      </view>

    </form>



    <!-- <view class="uni-btn-v">
			<button class="btn-submit" @tap="toFn" type="primary">编辑</button>
		</view> -->

  </view>
</template>
<script>
  var graceChecker = require("../../common/graceChecker.js");

  export default {
    data() {
      return {

        id_image_ist: [],

        imageList1: [
          'http://img5.imgtn.bdimg.com/it/u=4242739171,2434290170&fm=26&gp=0.jpg',
          'http://life.southmoney.com/tuwen/UploadFiles_6871/201804/20180423165909445.jpg'
        ],
        uploaddata: {},
        shop_info: {},
      }
    },
    onShow() {
      // console.log('chancan ee===',this.$store.state.img)


      this.getData()
    },
    onLoad() {


    },
    onNavigationBarButtonTap(e) {
      console.log('333', e)
      uni.navigateTo({
        url: './shop_info_edit'
      });
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

              _this.shop_info = res.data.data.data
              _this.id_image_ist = [res.data.data.data.profile_picture1, res.data.data.data.profile_picture2]
              console.log('ceeee===========', JSON.stringify(this.id_image_ist))
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
      toFn() {
        uni.navigateTo({
          url: './shop_info_edit'
        });
      },
      previewImage(img_url, flag,inx) {
        console.log('inx-----', inx,this.id_image_ist[inx])
        if (flag) {
          uni.previewImage({
            current:this.id_image_ist[inx],
            urls: this.id_image_ist
          })
        } else {
          uni.previewImage({
            urls: [img_url]
          })
        }
      },


    }
  }
</script>

<style scoped="scoped">
  /* .content{padding:0 15upx;background-color: white;} */

  .uni-view {
    width: inherit;
  }

  .uni-list-cell {
    padding: 24upx 36upx;
  }

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

  .uni-btn-v {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 92%;
    background-color: #fff;
  }

  /* .page_head_warper{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      width: 100%;
    } */
</style>
