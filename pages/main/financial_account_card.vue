<template>
	
	<view class="uni-list" >
		<view class="uni_list_cell" v-for="(list,index) in 2" :key="index">
			<view class="text" >
				 <text class="font_big">银行卡</text>借记卡
			</view>
			<view class="number" >
				**** **** 66666
			</view>
			
		</view>
	</view>
		
</template>
<script>
	

	export default {
		data() {
			return {
				form_data:{},
				lists: [
					{
						money: '',
						name: '现金可用余额',
					},
					{
						money: '',
						name: '现金冻结余额'
					}, 
				]
			}
		},
		onLoad() {
			// console.log('token',uni.getStorageSync('token'))
// 			uni.showLoading()
// 			this.getData()
		},
		
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: './financial_acc_card_add',
			})
		},
		methods: {
			
			getData() {
				var _this = this
				
				this.$util.ajax_uni({
					url:'merchants/Material/financial',
					data:{ff_openid: uni.getStorageSync('user_id')},
					success:function(res){
						console.log("返回数据状态res:", res);
						if (res.data.status == 1) {
							_this.form_data = res.data.data.data;
							_this.lists[0].money=res.data.data.data.cash_available_balance
							_this.lists[1].money=res.data.data.data.cash_unavailable_balance
							_this.lists[2].money=res.data.data.data.stock_available_balance
							_this.lists[3].money=res.data.data.data.stock_unavailable_balance
							
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

<style scoped="scoped" lang="scss">
	page{
		height: auto;
		min-height: 100%;
		
	}
	uni-view{
		
	}
	.uni-list {
		background-color: #EFEFF4;
	}
	.uni_list_cell {
		background-color: #fff;
		margin-bottom: 10upx;
		// border:1upx solid red;
		padding: 20upx 80upx;
		line-height: 1;
		height:250upx;
		box-sizing: border-box;
	}
	.uni_list_cell .number{font-size: 60upx;}
	.uni_list_cell .text .font_big{font-size: 40upx;}
</style>
