<template>
	<view class="content">
		<!-- 开头 -->
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face">
					<image :src="userinfo.face"></image>
				</view>
				<view class="info">
					<view class="username">{{userinfo.username}}</view>
					<view class="integral">积分:{{userinfo.integral}}</view>
				</view>
			</view>
			<view class="setting">
				<image src="../../static/HM-PersonalCenter/setting.png"></image>
			</view>
		</view>
		
		<!-- 个人选项 -->
		<view class="list" v-for="(list,list_i) in severList" wx:key="list">
			<view class="li" v-for="(li,li_i) in list" @tap="toPage(list_i,li_i)" v-bind:class="{'noborder':li_i==list.length-1}"
			 hover-class="hover" hover-stay-time="50" wx:key="li.name">
				<view class="icon">
					<image :src="'../../static/HM-PersonalCenter/sever/'+li.icon"></image>
				</view>
				<view class="text">{{li.name}}</view>
				<image class="to" src="../../static/HM-PersonalCenter/to.png"></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isH5Plus: true,
				
				userinfo: {},
				img_list: [
					{
						"id": "jianzhu05",
						"title": "\u5efa\u7b51",
						"name": "jianzhu05",
						"img_num": 10,
						"img_src": "https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu05.jpg"
					}, 
					{
						"id": "jianzhu09",
						"title": "\u5efa\u7b51",
						"name": "jianzhu09",
						"img_num": 10,
						"img_src": "https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu09.jpg"
					}, 
					{
						"id": "meinv01",
						"title": "\u7f8e\u5973",
						"name": "meinv01",
						"img_num": 10,
						"img_src": "https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/meinv01.jpg"
					},
				],
				
				severList: [
					[
						{name: '店铺信息',icon: 'mingxi.png',path:'../main/shop_info1'},
						{name: '店铺相册',icon: 'choujiang.png',path:'../main/shop_pic'},
						{name: '店铺二维码',icon: 'momey.png',path:'../main/img_qr'}
					],
					[
						{name: '账户余额',icon: 'quan.png',path:'../main/financial_account'},
						{name: '银行卡',icon: 'bank.png',path:'../main/financial_account_card'},
						{name: '安全中心',icon: 'security.png'},
						{name: '在线客服',icon: 'kefu.png'},
					]
				],
			};
		},
		onLoad() {
			//加载
			this.init();
		},
		methods: {
			init() {
				//用户信息
				this.userinfo = {
					face: '../../static/HM-PersonalCenter/face.jpeg',
					username: "VIP会员10240",
					integral: "1435"
				}
			},
			//用户点击订单类型
			toOrderType(index) {
				uni.showToast({
					title: this.orderTypeLise[index].name
				});
			},
			//用户点击列表项
			toPage(list_i, li_i) {
				// console.log('url',this.severList[list_i][li_i].path)
				if(this.severList[list_i][li_i].path){
					uni.navigateTo({url:this.severList[list_i][li_i].path})
				}
				
				
// 				uni.showToast({
// 					title: this.severList[list_i][li_i].name
// 				});
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	page {
		background-color: #fff
	}

	.header {
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
			width: 90%;
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
			}
		}

		.setting {
			flex-shrink: 0;
			width: 6vw;
			height: 6vw;

			image {
				width: 100%;
				height: 100%
			}
		}
	}

	.hover {
		background-color: #eee
	}

	.orders {
		background-color: #ff6364;
		width: 92%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 20upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;

		.box {
			width: 98%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 12upx;
			box-shadow: 0upx 0upx 10upx rgba(0, 0, 0, 0.15);
			margin-bottom: 20upx;
			display: flex;
			align-items: center;
			justify-content: center;

			.label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				width: 100%;
				height: 16vw;
				color: #666666;
				font-size: 13upx;

				.icon {
					position: relative;
					width: 7vw;
					height: 7vw;
					margin: 0 1vw;

					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 10upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center
					}

					image {
						width: 7vw;
						height: 7vw
					}
				}
			}
		}
	}

	.list {
		width: 100%;
		border-bottom: solid 13upx #f1f1f1;

		.li {
			width: 92%;
			height: 50upx;
			padding: 30upx 4%;
			background-color: #fff;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx
				}
			}

			.text {
				padding-left: 10upx;
				width: 100%;
				color: #666
			}

			.to {
				flex-shrink: 0;
				width: 20upx;
				height: 20upx
			}
		}
	}
</style>
