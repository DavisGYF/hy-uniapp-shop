<template>
	
	<view class="uni-list" >
    <page-head title="账户余额"  back_url="./user"></page-head>
		<!-- <view class="uni-list-cell " v-for="(list,index) in lists" :key="index">
			<view class="" >
				{{list.name}}
			</view>
			<view class="" >
				{{list.money}}
			</view>
		</view> -->
		<view class="uni-list-cell " style="margin-top: 140upx;">
			<view class="" >现金可用余额</view>
			<view class="" >{{form_data.cash_available_balance}}</view>
		</view>
		<view class="uni-list-cell " >
			<view class="" >现金冻结余额</view>
			<view class="" >{{form_data.cash_unavailable_balance}}</view>
		</view>
		<view class="uni-list-cell " >
			<view class="" >流通股份余额</view>
			<view class="" >{{form_data.stock_available_balance}}</view>
		</view>
		<view class="uni-list-cell " >
			<view class="" >受限股份余额</view>
			<view class="" >{{form_data.stock_unavailable_balance}}</view>
		</view>
		
		<view class="uni-btn-v">
			<button class="btn-submit" @tap="toFn" type="primary">申请提现</button>
		</view>
	</view>
		
</template>
<script>
	// import {ajax} from '../../common/request1.js' 

	export default {
		data() {
			return {
				form_data:{},
				lists: [
					{
						money: '1',
						name: '',
					},
					{
						money: '2',
						name: ''
					}, 
					{
						money: '3',
						name: ''
					},
					{
						money: '4',
						name: ''
					}
				]
			}
		},
		onShow() {
			console.log('token',uni.getStorageSync('token'))
			// uni.showLoading()
			this.getData()
		},
		
		
		methods: {
			toFn(){
				uni.navigateTo({
					url: './financial_acc_apply?data='+this.form_data.cash_available_balance,
					
				});
			},
			getData() {
				var _this = this
				
				this.$util.ajax_uni({
					url:'merchants/Material/financial',
					data:{ff_openid: uni.getStorageSync('user_id')},
					success:function(res){
						console.log("返回数据状态res:", res);
						if (res.data.status == 1) {
							_this.form_data = res.data.data.data;
							/* _this.lists[0].money=res.data.data.data.cash_available_balance
							_this.lists[1].money=res.data.data.data.cash_unavailable_balance
							_this.lists[2].money=res.data.data.data.stock_available_balance
							_this.lists[3].money=res.data.data.data.stock_unavailable_balance */
							
							uni.hideLoading()
						} else {
							console.log('ceeee',JSON.stringify(res.data))
// 							uni.showToast({
// 								icon: 'none',
// 								title: res.data.msg
// 							});
							
						}
					},
					error:function(res){
						console.log("错误res:", res);
					}
				})
				
			},
			
		}
	}
</script>

<style scoped="scoped">
	page{
		height: auto;
		min-height: 100%;
	}
	
	.uni-card {
		box-shadow: none;
	}

	.uni-list {
		background-color: #EFEFF4;
	}
	.uni-list-cell {
		background-color: #fff;
		margin-bottom: upx;
		padding: 28upx 34upx;
	}
	.btn-submit{
		background-color: #0FAEFF;
	}
</style>
