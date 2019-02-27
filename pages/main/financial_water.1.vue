<template>
    <view class="content" style="padding: 0 30upx;">
        <view class="uni-list">

            <view class="uni-card" v-for="(item,index) in list_data" :key="index">
                <view class="uni-card-header">
                    <text>支付昵称：小白</text>
                    <button v-if="item.iss" class="uni_btn_txt" type="primary" plain="true" @tap="reFn(index)">退款</button>
                    <button v-if="!item.iss" class="uni_btn_txt" plain="true">已退款</button>

                </view>
                <view class="uni-card-content">
                    <view class="uni-card-content-inner">
                        订单号：<!-- {{item.order_number}} -->

                        <view>支付类型：{{item.pay_type}} <text style="margin-left: 40upx;"></text> </view>
                        <view>总金额：￥{{item.money}} <text style="margin-left: 40upx;">优惠金额：￥{{item.money - item.actual_money}}</text> </view>

                    </view>
                    <view class="uni_cart_content_right">￥{{item.actual_money}}</view>
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
                list_data:[],
                
                flag: true,
                data: [],
                loadMoreText: "加载中...",
                showLoadMore: false,
                max: 0,
                pageN:0,
            }
        },
        onLoad() {
            this.initData();
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
            if (this.max > 30) {
                this.loadMoreText = "没有更多数据了!"
                return;
            }
            this.showLoadMore = true;
            setTimeout(() => {
                // this.setDate();
                this.setDate1()
                
            }, 1000);
        },
        onPullDownRefresh() {
            console.log('onPullDownRefresh');
            this.initData();
            this.getData()
        },
        methods: {
            initData() {
                setTimeout(() => {
                    this.max = 0;
                    this.pageN = 0
                    
                    this.data = [];
                    let data = [];
                    this.max += 10;
                    this.pageN += 1
                    
                    console.log('this.max--initData=====--',this.max,'pageN',this.pageN)
            
                    for (var i = this.max - 9; i < this.max + 1; i++) {
                        data.push({
                            itt: i,
                            iss: true
                        })
                    }
                    this.data = this.data.concat(data);
                    uni.stopPullDownRefresh();
                }, 300);
            },
            getData() {
                var _this = this
                this.pageN = 0
                
                this.list_data = [];
                
                this.pageN += 1
                
                this.$util.ajax_uni({
                    url: 'merchants/Order/orderList',
                    data: {
                        ff_openid: uni.getStorageSync('user_id'),
                        page:this.pageN,
                        page_size:4
                    },
                    success: function(res) {
                        console.log("返回数据状态res:", res);
                        if (res.data.status == 1) {
                            _this.list_data = _this.list_data.concat(res.data.data.data);
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
            reFn(iss) {
                let _this = this
                uni.showModal({
                    content: "确定操作退款？",
                    confirmText: "确定",
                    cancelText: "取消",
                    success(res) {
                        if (res.confirm) {
                            // console.log(iss)
                            _this.data[iss].iss = false
                        }
                    }
                })
            },
            
            setDate() {
                let data = [];
                this.max += 10;
                
                console.log('this.max',this.max)
                
                for (var i = this.max - 9; i < this.max + 1; i++) {
                    data.push(i)
                }
                this.data = this.data.concat(data);
            },
            setDate1() {
                var _this = this
                this.pageN += 1
                console.log('pageN',this.pageN)
                // return
                this.$util.ajax_uni({
                    url: 'merchants/Order/orderList',
                    data: {
                        ff_openid: uni.getStorageSync('user_id'),
                        page:this.pageN,
                        page_size:2
                    },
                    success: function(res) {
                        console.log("返回数据状态res:", res);
                        if (res.data.status == 1) {
                            
                            _this.list_data = _this.list_data.concat(res.data.data.data);
                           
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
        /* font-size: 14px; */
        display: flex;
        justify-content: space-between;
    }

    .uni_cart_content_right {
        align-content: center;
        padding-right: 50upx;
        display: flex;
        align-items: center;
        font-size: 40upx;
    }
</style>
