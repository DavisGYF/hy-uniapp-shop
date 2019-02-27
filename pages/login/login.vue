<template>
  <view class="content">
    <!-- 自定义的导航栏 -->
    <page-head title="登录" show_left="false"></page-head>
    <view style="padding: 0 10%;margin-top: 140upx;">
      <view class="img_wrap">
        <image src="../../static/logo.png" mode="aspectFit" class="logoimg"></image>
      </view>

      <view class="">
        <view class="input-row ">

          <m-input class="m-input " type="text" clearable v-model="account" placeholder="请输入账号"></m-input>
        </view>
        <view class="input-row ">

          <m-input class="" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
        </view>
      </view>

      <view class="btn_wrap">
        <button type="primary" style="border-radius: 50px;margin: 40px 0 15px 0;" class="primary" @tap="bindLogin">登录</button>
      </view>
      <view class="action-row">
        <!-- <navigator url="./register">注册账号</navigator> -->

        <!-- <navigator url="./pwd">忘记密码</navigator> -->
      </view>
      <!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
                <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
                    <image :src="provider.image" @tap="oauth(provider.value)"></image>
                </view>
            </view> -->
    </view>
  </view>
</template>

<script>
  import service from '../../service.js';
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import mInput from '../../components/m-input.vue'

  export default {
    components: {
      mInput
    },
    data() {
      return {
        providerList: [],
        hasProvider: false,
        account: '17629376691',//17629376691（及）-审核通过-13937660018(天天)  13937660018-审核中 15838087358-未注册
        password: '',
        positionTop: 0,
        first: null
      }
    },
    computed: mapState(['forcedLogin']),
    onHide(){
      //#ifdef APP-PLUS
      // plus.key.removeEventListener("backbutton",this.watchBack);
      //#endif
    },
    onShow() {
      //#ifdef APP-PLUS
      // plus.key.addEventListener('backbutton',this.watchBack,false); 
      //#endif
      //       uni.removeStorage({
      //           key: 'test',
      //           success: function (res) {
      //               console.log('success');
      //           }
      //       });

      uni.getStorage({
        key: 'stoken',
        success: function(res) {
          console.log('getStorage----stoken---------onshow------', res)
          if (res.data) {
            console.log("还有token--", JSON.stringify(res.data))
            uni.reLaunch({
              // url: '../main/shop_info_edit2'
              url: '../main/user'
            });
          }
        }
      });

    },
    onLoad() {
      console.log('cun logni--------onload--------', uni.getStorageSync('login_name'))

      uni.setStorageSync('login_name', this.account);

      if (uni.getStorageSync('login_name')) {
        this.account = uni.getStorageSync('login_name')
      }
      
    },
    methods: {
      ...mapMutations(['login']),
      watchBack(){
        if (!this.first) {
          this.first = new Date().getTime();
          uni.showToast({
            icon: 'none',
            title: '再按一次退出应用'
          });
          setTimeout(function() {
            this.first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - this.first < 1000) {
            plus.runtime.quit();
          }
        }
        return false;
      },
      initProvider() {
        const filters = ['weixin', 'qq', 'sinaweibo'];
        uni.getProvider({
          service: 'oauth',
          success: (res) => {
            if (res.provider && res.provider.length) {
              for (let i = 0; i < res.provider.length; i++) {
                if (~filters.indexOf(res.provider[i])) {
                  this.providerList.push({
                    value: res.provider[i],
                    image: '../../static/img/' + res.provider[i] + '.png'
                  });
                }
              }
              this.hasProvider = true;
            }
          },
          fail: (err) => {
            console.error('获取服务供应商失败：' + JSON.stringify(err));
          }
        });
      },
      initPosition() {
        /**
         * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
         * 反向使用 top 进行定位，可以避免此问题。
         */
        this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
      },
      bindLogin() {
        console.log(123)
        // uni.navigateTo({url: '../main/user'});
        // uni.switchTab({url: '../main/user'});

        // return
        /**
         * 客户端对账号信息进行一些必要的校验。
         * 实际开发中，根据业务需要进行处理，这里仅做示例。
         */
        if (this.account.length < 5) {
          uni.showToast({
            icon: 'none',
            title: '账号最短为 5 个字符'
          });
          return;
        }
        if (this.password.length < 6) {
          uni.showToast({
            icon: 'none',
            title: '密码最短为 6 个字符'
          });
          return;
        }
        /**
         * 下面简单模拟下服务端的处理
         * 检测用户账号密码是否在已注册的用户列表中
         * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
         * 
         * 15838087358
         * 
         */
        var requer_data = JSON.stringify({
          phone: this.account,
          password: this.password
        })
        console.log("登陆入参:", requer_data);
        var _this = this;
        uni.request({
          url: this.base_url + 'merchants/index/login', //仅为示例，并非真实接口地址。
          method: 'POST',
          data: requer_data,
          success: (res) => {
            console.log(JSON.stringify(res));
            if (res.data.status == 1) {
              
              if (res.data.data.status == 3) {
                uni.showToast({
                  icon: 'none',
                  title: '未注册店铺，请先注册'
                });
                
                uni.setStorageSync('token', res.data.data.data.token);
                uni.setStorageSync('user_id', res.data.data.data.ff_openid);
                
                uni.setStorage({
                  key: 'stoken',
                  data: res.data.data.data.token,
                  success: function(res) {
                    console.log("111", JSON.stringify(res))
                  }
                });
                uni.navigateTo({url: '../main/shop_add1',});
                
                
              } else {
                // 推送
                if (res.data.data.status == 1) {
                  
                _this.$store.dispatch("pushInit", res.data.data.data.ff_openid)
                }
                try {
                  uni.setStorageSync('user_id', res.data.data.data.ff_openid);

                } catch (e) {
                  console.log('chucun', e)
                }

                uni.setStorageSync('shop_status', res.data.data.status);
                uni.setStorageSync('token', res.data.data.data.token);

                uni.setStorage({
                  key: 'stoken',
                  data: res.data.data.data.token,
                  success: function(res) {
                    console.log("111", JSON.stringify(res))
                  }
                });
                //               uni.setStorage({
                //                   key: 'stoken',
                //                   data: res.data.data.data.token,
                //                   success: function (res) {
                //                     console.log("111",JSON.stringify(res))
                //                   }
                //               });

                // uni.navigateTo({url: '../main/shop_info_edit2',});
                uni.reLaunch({
                  url: '../main/user',
                });
              }

              return
              switch (res.data.data.status) {
                case 0:

                  break;
                case 1:
                  // 推送
                  _this.$store.dispatch("pushInit", res.data.data.data.ff_openid)
                  try {
                    uni.setStorageSync('user_id', res.data.data.data.ff_openid);

                  } catch (e) {
                    console.log('chucun', e)
                  }

                  uni.setStorageSync('shop_status', res.data.data.status);
                  uni.setStorageSync('token', res.data.data.data.token);

                  uni.setStorage({
                    key: 'stoken',
                    data: res.data.data.data.token,
                    success: function(res) {
                      console.log("111", JSON.stringify(res))
                    }
                  });
                  //               uni.setStorage({
                  //                   key: 'stoken',
                  //                   data: res.data.data.data.token,
                  //                   success: function (res) {
                  //                     console.log("111",JSON.stringify(res))
                  //                   }
                  //               });


                  uni.reLaunch({
                    url: '../main/user',
                  });

                  break;
                case 2:
                  uni.navigateTo({
                    url: '../main/shop_add1',
                  });
                  break;
                case 3:

                  break;
                default:
                  break;
              }

            } else {
              // console.log(res.data)
              uni.showToast({
                icon: 'none',
                title: res.data.data.msg
              });
            }
          },
          fail: () => {
            uni.showToast({
              icon: 'none',
              title: '网络异常,请稍后重试'
            });
          },
        });

        /* const validUser = service.getUsers().some(function (user) {
            return data.account === user.account && data.password === user.password;
        });
        if (validUser) {
            this.toMain(this.account);
        } else {
            uni.showToast({
                icon: 'none',
                title: '用户账号或密码不正确',
            });
        } */
      },
      oauth(value) {
        uni.login({
          provider: value,
          success: (res) => {
            uni.getUserInfo({
              provider: value,
              success: (infoRes) => {
                /**
                 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                 */
                this.toMain(infoRes.userInfo.nickName);
              }
            });
          },
          fail: (err) => {
            console.error('授权登录失败：' + JSON.stringify(err));
          }
        });
      },

      toMain(userName) {
        // this.login(userName);
        uni.reLaunch({
          url: '../main/main'
        });
        /**
         * 强制登录时使用reLaunch方式跳转过来
         * 返回首页也使用reLaunch方式
         */
        if (this.forcedLogin) {
          uni.reLaunch({
            url: '../main/user',
          });
        } else {
          uni.navigateBack();
        }

      }
    },
    onLoad() {
      this.initPosition();
      this.initProvider();
    }
  }
</script>

<style scoped="scoped">
  .content {
    background-color: #fff;
  }

  /* 忘记密码排列 */
  .action-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .action-row navigator {
    color: #007aff;
    padding: 0 20upx;
  }

  /* //qq weixin 等等路 */
  .oauth-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .oauth-image {
    width: 100upx;
    height: 100upx;
    border: 1upx solid #dddddd;
    border-radius: 100upx;
    margin: 0 40upx;
    background-color: #ffffff;
  }

  .oauth-image image {
    width: 60upx;
    height: 60upx;
    margin: 20upx;
  }

  /* //shurukuang */
  .input-row {
    border: 1upx solid #C8C7CC;
    border-radius: 50upx;
    padding: 15upx 30upx;
    margin-bottom: 20upx;
    height: 60upx;
  }


  .img_wrap {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 100upx 0;
  }

  .logoimg {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
  }

  .action-row {
    justify-content: space-between;
  }
</style>
