<template>
  <view class="content">
    <!-- 自定义的导航栏 -->
    <page-head title="百业通惠商家端" show_left="false"></page-head>
    <!-- 开头 -->
    <view class="header">
      <view class="userinfo">
        <view class="face">
          <image :src="userinfo.avatar" mode="aspectFill" @tap="previewImagFn"></image>
        </view>
        <view class="info">
          <view class="username">
            {{userinfo.store_name}}
            <!-- <switch class="uni_switch" checked @change="switch1Change" /> -->
            <text class="integral1" v-if="userinfo.store_status=='1' && userinfo.status=='1'">正常营业</text>
            <text class="integral1" v-if="userinfo.store_status=='0' && userinfo.status=='1'">休息中</text>
          </view>
          <view class="integral">登陆账号：{{userinfo.admin_phone}}</view>
        </view>
      </view>
      <view class="setting" style="margin-right: 60upx;">
        <!-- <switch class="uni_switch" @change="switch1Change" /> -->
        <text class="integral1" v-if="userinfo.status=='0'">审核中</text>
        <text class="integral1" v-if="userinfo.status=='2'" style="background-color: rgba(255, 0, 255, 0.7);">审核失败</text>

        <switch v-if="userinfo.store_status=='1' && userinfo.status=='1'" class="uni_switch" checked @change="switch1Change()" />

        <switch v-if="userinfo.store_status=='0' && userinfo.status=='1' && time_flag" class="uni_switch" @change="switch1Change()" />
        <!-- 下面是没有营业时间 -->
        <switch v-if="userinfo.store_status=='0' && userinfo.status=='1' && !time_flag" @tap="swiFn" disabled class="uni_switch" />


        <!-- <image src="../../static/HM-PersonalCenter/setting.png"></image> -->
      </view>
    </view>

    <!-- 审核通过显示信息 -->
    <view class="uni-flex uni-row" v-if="userinfo.status=='1'">
      <view class="flex-item uni-bg-white " v-for="(item,index) in iconType" :key="index" @tap="toNav(item)">
        <uni-icon :type="item.icon" size="26" />
        <text>{{item.name}}</text>
      </view>
      <view v-if="is_flag" class="flex-item uni-bg-white " @tap="toSwitch()">
        <uni-icon type="mic" size="26" />
        <text>语音播报开启</text>
      </view>
      <view v-if="!is_flag" class="flex-item uni-bg-white " @tap="toSwitch()">
        <uni-icon type="micoff" size="26" />
        <text>语音播报关闭</text>
      </view>
    </view>

    <!-- 审核通过之前显示信息 -->
    <view class="uni-flex uni-row" v-if="userinfo.status!='1'">
      <view class="flex-item uni-bg-white " v-for="(item,index) in iconType1" :key="index" @tap="toNav(item)">
        <uni-icon :type="item.icon" size="26" />
        <text>{{item.name}}</text>
      </view>


    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        is_flag: true,
        iconType: [{
            name: '店铺信息',
            icon: 'info',
            path: './shop_info'
          },
          {
            name: '店铺相册',
            icon: 'image',
            path: './shop_pic'
          },
          {
            name: '店铺二维码',
            icon: 'scan',
            path: './img_qr'
          },
          {
            icon: 'paperplane',
            name: '结算信息',
            path: './shop_settlement'
          },
          {
            icon: 'flag',
            name: '营业时间',
            path: './shop_business_time'
          },
          {
            name: '账户余额',
            icon: 'spinner-cycle',
            path: './financial_account'
          },
          {
            icon: 'list',
            name: '提现记录',
            path: './financial_acc_apply_record'
          },
          {
            icon: 'compose',
            name: '交易记录',
            path: './financial_water'
          },
          {
            icon: 'gear',
            name: '设置',
            path: './sett'
          },
          {
            icon: 'star',
            name: '优惠活动',
            path: './sales'
          },
          // {name: '新增',icon: 'email',path:'./shop_add1'},
        ],
        iconType1: [{
            name: '店铺信息',
            icon: 'info',
            path: './shop_info'
          },
          {
            icon: 'gear',
            name: '设置',
            path: './sett'
          },

        ],
        userinfo: {},
        time_flag: false,
      };
    },
    onShow() {
      this.getData()
      this.getShopTime()
      console.log('营业时间哟没有======', this.time_flag)
    },
    onLoad() {

      uni.hideTabBar()
      console.log('登陆信息------------------', JSON.stringify(uni.getStorageInfoSync()))
      //加载
      this.init();

    },
    methods: {
      getShopTime() {
        var _this = this

        this.$util.ajax_uni({
          url: 'merchants/index/selTime',
          data: {},
          success: function(res) {
            console.log("返回时间 -----营业时间哟没有res:", res);
            if (res.data.status == 1) {
              if (res.data.data.store_week != false) {
                _this.time_flag = true
              } else {
                _this.time_flag = false
              }



            } else {
              console.log('cuwu=====', JSON.stringify(res.data))
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
      previewImagFn() {

        uni.previewImage({
          urls: [this.userinfo.avatar]
        })
      },
      toSwitch() {
        console.log('携带值为')
        var _this = this;
        this.$util.ajax_uni({
          url: 'merchants/index/openAudio',
          data: {
            ff_openid: uni.getStorageSync('user_id'),
            open_audio: this.is_flag ? 0 : 1 //0关闭 1打开
          },
          success: function(res) {
            console.log("返回开关--res:", res);
            if (res.data.status == 1) {
              _this.is_flag = !_this.is_flag;
              if (_this.is_flag) {
                _this.$store.dispatch("openPush")
              } else {
                _this.$store.dispatch("closePush")
              }

            } else {
              console.log('ceeee', JSON.stringify(res.data))
              uni.showToast({
                title: res.data.msg
              });

            }
          },
          error: function(res) {
            console.log("错误res:", res);
            uni.showToast({
              title: "网络错误，请稍后重试"
            })
          }
        })
      },
      swiFn() {
        console.log(1, 1)
        uni.showToast({
          icon: 'none',
          title: '还没有设置营业时间，请先设置营业时间！'
        });
      },
      switch1Change() {
        var _this = this
        // console.log('switch1 发生 change 事件，携带值为',e )

        // return

        this.$util.ajax_uni({
          url: 'merchants/index/businessStatus',
          data: {
            store_status: _this.userinfo.store_status == "0" ? 1 : 0, //0：休息中；1：正常营业；2：已关店’
          },
          success: function(res) {
            console.log("返回数据状态res:", res);

            if (res.data.status == 1) {
              uni.showToast({
                icon: 'none',
                title: res.data.msg
              });
            } else {
              console.log('status不为1', JSON.stringify(res.data))
              uni.showToast({
                icon: 'none',
                title: res.data.msg
              });

            }

            _this.getData()
          },
          error: function(res) {
            console.log("错误res:", res);
          }
        })
      },
      toNav(item) {
        uni.navigateTo({
          url: item.path
        });
      },
      init() {
        //用户信息
        this.userinfo = {
          face: '../../static/HM-PersonalCenter/face.jpeg',
          username: "蛋炒饭郑东店",
          integral: "15638883888"
        }
      },
      //
      toSet() {
        uni.navigateTo({
          url: './sett'
        });
      },
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

              _this.userinfo = res.data.data.data

            } else {
              console.log('ceeee', JSON.stringify(res.data))
              // 							uni.showToast({
              // 								icon: 'none',
              // 								title: res.data.msg
              // 							});

            }
          },
          error: function(res) {
            console.log("错误res:", res);
          }
        })
      },

      //用户点击列表项
      toPage(list_i, li_i) {
        // console.log('url',this.severList[list_i][li_i].path)
        if (this.severList[list_i][li_i].path) {
          uni.navigateTo({
            url: this.severList[list_i][li_i].path
          })
        }


        // 				uni.showToast({
        // 					title: this.severList[list_i][li_i].name
        // 				});
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .uni-row {
    // justify-content: space-between;
    flex-wrap: wrap;
  }

  .flex-item {
    display: flex;
    flex-direction: column;
    width: calc(33.333333333% - 0.5upx);
    height: 200upx;
    justify-content: center;
    align-items: center;
    border-left: 1upx solid #D9D9D9;
    margin-bottom: 6upx;
  }

  page {
    background-color: #fff
  }

  .header {
    margin-top: 135upx;

    &.status {
      padding-top: var(--status-bar-height);
    }

    background-color:rgb(15, 174, 255);
    width:92%;
    height:30vw;
    padding:0 4%;
    display:flex;
    align-items:center;

    .userinfo {
      width: 80%;
      display: flex;

      .face {
        flex-shrink: 0;
        width: 15vw;
        height: 15vw;

        image {
          width: 100%;
          height: 100%;
          border-radius: 100%
        }
      }

      .info {
        display: flex;
        flex-flow: wrap;
        padding-left: 30upx;

        .username {
          width: 100%;
          color: #fff;
          font-size: 40upx
        }

        .integral {
          display: flex;
          align-items: center;
          padding: 0 20upx;
          height: 40upx;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 10upx;
          font-size: 24upx
        }

        .integral1 {
          margin-left: 4upx;
          padding: 0 20upx;
          height: 40upx;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 10upx;
          font-size: 24upx
        }
      }
    }

    .setting {
      flex-shrink: 0;
      width: auto;
      height: 6vw;
      // padding-right: 60upx

      image {
        width: 100%;
        height: 100%
      }

      .integral1 {
        margin-left: 4upx;
        padding: 0 20upx;
        height: 40upx;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10upx;
        font-size: 24upx;

      }

    }
  }

  .uni_switch {
    transform: scale(0.6, 0.6);
    margin-left: 10upx;
  }
</style>
