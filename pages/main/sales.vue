<template>
  <view class="content">
    <!-- <page-head :title="title" right_icon="plusempty" right_icon_url="./sales_add" back_url="./user"></page-head> -->


<view class="uni-list" v-if="list_data.length==0" style="text-align: center;padding-top: 100upx;">暂无记录</view>

    <view class="uni-list" v-if="list_data.length!=0">
      <view class="uni-list-cell" @longpress="longTapFn(item)" v-for="(item,index) in list_data" :key="index" style="padding: 14upx 36upx;">
        <view class="uni-title" style="font-size: 32upx;">
          <view>{{item.activity_name}}</view>
          <!-- <text v-if="item.activity_type==0">
            满{{item.activity_conditions}}减{{item.preferential}}
          </text>
          <text v-if="item.activity_type==1">
            满{{item.activity_conditions}}打{{(item.preferential)*10}}折
          </text> -->
          <!-- <view class="">满100{{index}}减{{index}}</view> -->
        </view>

        <switch v-if="item.is_open=='Y'" class="uni_switch" checked @change="switch1Change(item)" />
        <switch v-if="item.is_open=='N'" class="uni_switch" @change="switch1Change(item)" />
      </view>

      <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
    </view>

    <!-- <view class="uni-btn-v">
			<button class="btn-submit" @tap="toFn" type="primary">新增</button>
		</view> -->

    <!-- 长按弹窗 -->
    <uni-popup :show="showPopupMiddle" type="bottom" @hidePopup="hideFn" class="pop">
      <!-- <view class="" > -->
      <button class="pop_button" type="warn" @tap="deleteFn">删除</button>
      <!-- </view> -->
    </uni-popup>

  </view>

</template>
<script>
  //来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
  var graceChecker = require("../../common/graceChecker.js");

  import uniPopup from '../../components/uni-popup.vue';
  // import vanSwipeCell from '../../wxcomponents/vant/dist/swipe-cell';

  export default {
    components: {
      uniPopup
      /* ,
                  vanSwipeCell */
    },
    data() {
      return {


        list_data: [],
        list_data_total: 0,
        loadMoreText: "加载中...",
        showLoadMore: false,
        pageN: 0,


        showPopupMiddle: false,
        select_index: '',

        title: '优惠活动',
        array: ['4563511100118511888', '6222511100118511888'],
        index: 0,
      }
    },
    //     created() {
    //       console.log('onload')
    //       uni.onNavigationBarButtonTap((e) => {
    //           console.log("监听到原生标题栏按钮点击事件");
    //           console.log("12312321",JSON.stringify(e));
    //       })
    // 
    //     },
    onShow() {
      console.log('onshow')
      this.getData()
    },
    onNavigationBarButtonTap(e) {
      uni.navigateTo({
        url: './sales_add'
      })
    },
    onReachBottom() {
      console.log("onReachBottom");

      if (this.list_data.length >= this.list_data_total) {
        this.loadMoreText = "没有更多数据了!"
        return;
      }
      this.showLoadMore = true;
      setTimeout(() => {

        this.setDate()

      }, 1000);
    },
    onPullDownRefresh() {
      console.log('onPullDownRefresh');

      this.getData()
      this.loadMoreText = "加载中..."
    },
    methods: {
      hideFn() {
        this.showPopupMiddle = false
      },


      getData() {
        var _this = this
        this.pageN = 0

        this.list_data = [];

        this.pageN += 1

        this.$util.ajax_uni({
          url: 'merchants/Activity/sellerActivity',
          data: {
            ff_openid: uni.getStorageSync('user_id'),
            page: this.pageN,
            page_size: 10
          },
          success: function(res) {
            console.log("返回数据状态res:", res);
            
            uni.stopPullDownRefresh();
            if (res.data.status == 1) {
              _this.list_data = _this.list_data.concat(res.data.data.data);
              _this.list_data_total = res.data.data.sum
              
              console.log("listdata:", _this.list_data);
            } else {
              console.log('ceeee', JSON.stringify(res.data.data))
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
      setDate() {
        var _this = this
        this.pageN += 1
        console.log('pageN', this.pageN)
        // return
        this.$util.ajax_uni({
          url: 'merchants/Activity/sellerActivity',
          data: {
            ff_openid: uni.getStorageSync('user_id'),
            page: this.pageN,
            page_size: 10
          },
          success: function(res) {
            console.log("返回数据状态res:", res);
            if (res.data.status == 1) {

              _this.list_data = _this.list_data.concat(res.data.data.data);
              _this.list_data_total = res.data.data.sum
              uni.stopPullDownRefresh();



              console.log("listdata:", _this.list_data);

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

      toFn() {
        uni.navigateTo({
          url: './sales_add',
        })
      },
      longTapFn(item) {
        console.log('xuanzhong==id',item.activity_id)
        this.select_index = item.activity_id
        this.showPopupMiddle = true
      },
      deleteFn() {
        
        var _this = this
        console.log('shanchu id=====', this.select_index)
        this.$util.ajax_uni({
          url: 'merchants/Activity/delActivity',
          data: {
            activity_id: this.select_index
          },
          success: function(res) {
            console.log("返回数据状态res:", res);
            
            if (res.data.status == 1) {
              _this.getData()
            } else {
              console.log('status不为1', JSON.stringify(res.data))
              uni.showToast({
                icon: 'none',
                title: res.data.msg
              });
            }
          }
        })
        this.showPopupMiddle = false
      },
      
      switch1Change: function(item) {
        var _this = this
        console.log('switch1 发生 change 事件，携带值为', item.activity_id)
        this.$util.ajax_uni({
          url: 'merchants/Activity/switchActivity',
          data: {
            activity_id: item.activity_id,
            is_open: item.is_open == "Y" ? "N" : "Y"
          },
          success: function(res) {
            console.log("返回数据状态res:", res);
            
            if (res.data.status == 1) {
              
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
      bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.target.value)
        this.index = e.target.value
      },
      
      /* onClose(event) {
          const {
              position,
              instance
          } = event.detail;
          switch (position) {
              case 'left':
              case 'cell':
                  instance.close();
                  break;
              case 'right':
                  Dialog.confirm({
                      message: '确定删除吗？'
                  }).then(() => {
                      instance.close();
                  });
                  break;
          }
      }, */


    }
  }
</script>

<style scoped="scoped">
  .uni_switch {
    transform: scale(0.7, 0.7);
  }

  .uni-btn-v {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 92%;
    background-color: #fff;
  }
</style>
