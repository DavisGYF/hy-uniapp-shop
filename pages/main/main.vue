<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<view class="title">
				您好 {{userName}}，您已成功登录。
			</view>
			<view class="ul">
				<view>这是 uni-app 带登录模板的示例App首页。</view>
				<view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
			</view>
		</view>
		<view v-if="!hasLogin" class="hello">
			<swiper indicator-dots=true autoplay=true circular=true class="uni_swiper">
				<swiper-item v-for="item in itemList" :key="item">
					<image :src="item" mode="" style="width:100%"></image>
				</swiper-item>
			</swiper>

			<view class="uni-flex uni-row">
				<view class="flex-item uni-bg-white " v-for="(item,index) in iconType" :key="index" @tap="toNav(item)">
					<uni-icon :type="item.icon" size="26" />
					<text>{{item.name}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'


	export default {

		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),

		data() {
			return {
				itemList: [
					'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
					'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
					'http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg'
				],
				iconType: []
			}
		},
		onLoad() {
			this.iconType = [
				
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
					icon: 'star',
					name: '优惠活动',
					path: './sales'
				},
				{
					icon: 'info',
					name: '店铺新增',
					path: './shop_add1'
				},
			]

		},
		methods: {

			toNav(item) {
				// console.log(item)
				uni.navigateTo({
					url: item.path
				});
				// uni.navigateTo({url:'./shop_add'});
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	
	
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul {
		font-size: 30upx;
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul>view {
		line-height: 50upx;
	}


	.uni-row {
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.flex-item {
		display: flex;
		flex-direction: column;
		width: calc(25% - 2upx);
		height: 200upx;
		justify-content: center;
		align-items: center;
		// border-left: 1px solid #D9D9D9;
		margin-bottom: 2upx;
	}



	.uni_swiper {
		margin-bottom: 10upx;
		height: 400upx;
		// border: 1px solid red;
	}
</style>
