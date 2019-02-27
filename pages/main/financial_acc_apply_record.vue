<template>
	<view class="content">
        <view class="uni-list" v-if="list_data.length==0" style="text-align: center;padding-top: 100upx;">暂无记录</view>    
		<view class="uni-list" v-if="list_data.length!=0">
			
			<view  v-for="(item,index) in list_data" :key="index">
        <view class="cell_top">
          <view class="uni-title">申请金额：¥{{item.amount}}</view>
          
          <view v-if="item.status==0">未审核</view>
          <view v-if="item.status==1">审核通过</view>
          <view v-if="item.status==2">审核拒绝</view>
          
          
        </view>
        
        
				<view class="uni-list-cell">
          <view>
            <view><text class="text_light">订单号：{{item.pay_number}}</text></view>
            <view><text class="text_light">技术服务费：{{item.record_money}}</text></view>
            <view><text class="text_light">实际到账：{{item.money}}</text></view>
            <view><text class="text_light">申请时间：{{item.create_time}}</text></view>
            <view><text class="text_light">申请卡号：{{item.Bank_name}}</text></view>
             <view><text class="text_light">申请人：{{item.opening_name}}</text></view>
          </view>
          
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
				list_data_total:0,
				pageN: 0,
        
				data: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				max: 0
			}
		},
		onLoad() {
			this.getData();
		},
		onReachBottom() {
			console.log("onReachBottom",this.list_data.length,this.list_data_total);
			if (this.list_data.length >= this.list_data_total) {
        console.log('到底了',this.loadMoreText)
			    this.loadMoreText = "没有更多数据了!"
			    return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.setDate();
			}, 1000);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.getData();
      this.loadMoreText = "加载中..."
		},
		methods: {
			getData() {
			    var _this = this
			    this.pageN = 0
			
			    this.list_data = [];
			
			    this.pageN += 1
			
			    this.$util.ajax_uni({
			        url: 'merchants/Material/detailFinancial',
			        data: {
			            ff_openid: uni.getStorageSync('user_id'),
			            page: this.pageN,
			            page_size: 5
			        },
			        success: function(res) {
			            console.log("返回数据状态res:", res);
                        uni.stopPullDownRefresh();
			            if (res.data.status == 1) {
			                _this.list_data = _this.list_data.concat(res.data.data.data);
			                _this.list_data_total=res.data.data.sum
			                
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
			
			setDate() {
			    var _this = this
			    this.pageN += 1
			    console.log('pageN', this.pageN)
			    // return
			    this.$util.ajax_uni({
			        url: 'merchants/Material/detailFinancial',
			        data: {
			            ff_openid: uni.getStorageSync('user_id'),
			            page: this.pageN,
			            page_size: 5
			        },
			        success: function(res) {
			            console.log("返回数据状态res:", res);
			            if (res.data.status == 1) {
			
			                _this.list_data = _this.list_data.concat(res.data.data.data);
			                _this.list_data_total=res.data.data.sum
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
  .cell_top{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 20upx 44upx 0 44upx;
    margin-bottom: -26upx;
  }
  .text_light{
    font-size: 13px;
    color: #888;
  }
	
</style>
