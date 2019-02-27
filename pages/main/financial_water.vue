<template>
  <view class="content" style="padding: 0 30upx;">
    <view class="uni-list" v-if="list_data.length==0" style="text-align: center;padding-top: 100upx;">暂无记录</view>    
    <view class="uni-list" v-if="list_data.length!=0">

      <view class="uni-card" v-for="(item,index) in list_data" :key="index">
        <view class="uni-card-header">
          <text>支付昵称：{{item.nickname}}</text>
          <button v-if="item.status==1" class="uni_btn_txt" type="primary" plain="true" @tap="reFn(item)">退款</button>
          <button v-if="item.status==2" class="uni_btn_txt" plain="true">已退款</button>
          <button v-if="item.status==3" class="uni_btn_txt" plain="true">已完成</button>

        </view>
        <view class="uni-card-content">
          <view class="">订单号：{{item.order_number}} </view>
          <view class="">订单时间：{{item.create_time}} </view>
          <view class="" v-if="item.status==2">退款时间：{{item.refund_time}} </view>
          <view>总金额：￥{{item.money}} <text style="margin-left: 40upx;">优惠金额：￥{{item.activity_money}}</text>
          </view>
          <view>
            实付金额：<text style="color: red;">￥{{item.actual_money}}</text>
            <text style="margin-left: 40upx;">
              支付类型：
              <template v-if="item.pay_type==0">
                未知
              </template>
              <template v-if="item.pay_type==1">
                支付宝
              </template>
              <template v-if="item.pay_type==2">
                微信
              </template>

            </text>
          </view>



          <!-- <view class="uni_cart_content_right">￥{{item.actual_money}}</view> -->
        </view>

      </view>

      <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>

    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        list_data: [],
        list_data_total: 0,
        pageN: 0,

        flag: true,
        data: [],
        loadMoreText: "加载中...",
        showLoadMore: false,
        max: 0,

      }
    },
    onLoad() {

      this.getData()
    },
    onUnload() {
      this.max = 0,
        this.pageN = 0,
        this.data = [],
        this.loadMoreText = "加载更多",
        this.showLoadMore = false;
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
      getData() {
        var _this = this
        this.pageN = 0

        this.list_data = [];

        this.pageN += 1

        this.$util.ajax_uni({
          url: 'merchants/Order/orderList',
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
      reFn(item) {
        let _this = this
        uni.showModal({
          content: "确定操作退款？",
          confirmText: "确定",
          cancelText: "取消",
          success(res) {
            if (res.confirm) {
              console.log('id', item.id)
              // _this.data[iss].iss = false
              
              _this.$util.ajax_uni({
                url: 'merchants/Order/sellerRefund',
                data: {
                  id: item.id
                },
                success: function(res) {
                  console.log("返回数据状态res:", res);
                  if (res.data.status == 1) {
                    _this.getData()
                    
                    
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

            }
          }
        })
      },
      setDate() {
        var _this = this
        this.pageN += 1
        console.log('pageN', this.pageN)
        // return
        this.$util.ajax_uni({
          url: 'merchants/Order/orderList',
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


    }
  }
</script>

<style scoped="scoped">
  .text {
    margin: 16upx 0;
    width: 100%;
    background-color: #fff;
    height: 120upx;
    line-height: 120upx;
    text-align: center;
    color: #555;
    border-radius: 16upx;
  }

  .uni_btn_txt {
    margin-right: 0;
    border: none !important;
    line-height: 1 !important;
    font-size: 30upx;
  }

  .uni-card-content {
    padding: 20upx 0 40upx 20upx;
    /* font-size: 14px; */
    /* display: flex; */
    /* justify-content: space-between; */
  }

  .uni_cart_content_right {
    align-content: center;
    padding-right: 50upx;
    display: flex;
    align-items: center;
    font-size: 40upx;
  }
</style>
