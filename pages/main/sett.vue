<template>
	<view class="content">
		
		<!-- 个人选项 -->
		<view class="list" v-for="(list,list_i) in severList" wx:key="list">
			<view class="li" v-for="(li,li_i) in list" @tap="toPage(list_i,li_i)" v-bind:class="{'noborder':li_i==list.length-1}"
			 hover-class="hover" wx:key="li.name"> <!-- hover-stay-time=50 --> 
				<view class="icon">
					<image :src="'../../static/HM-PersonalCenter/sever/'+li.icon"></image>
				</view>
				<view class="text">{{li.name}}</view>
				<image class="to" src="../../static/HM-PersonalCenter/to.png"></image>
			</view>
		</view>
		
		<view class="uni-btn-v">
			<button class="btn-submit" @tap="loginOut" type="warn">退出登录</button>
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				severList: [
					
					[
						// {name: '修改密码',icon: 'quan.png'},
// 						{name: '安全中心',icon: 'security.png',path:'../main/set_edit_pwd'},
// 						{name: '在线客服',icon: 'kefu.png'},
					]
				],
				userinfo: {},
				
			};
		},
		onLoad() {
			
			
		},
		methods: {
			toNav(item) {
				uni.navigateTo({url: item.path});
			},
			
			//
			loginOut() {
				// uni.removeStorageSync('storage_key');
				uni.clearStorageSync();
        uni.removeStorage({
            key: 'stoken',
            success: function (res) {
                console.log('退出成功success');
                
                // uni.navigateBack({url: '../login/login'});
                // uni.navigateTo({url: '../login/login'});
                uni.reLaunch({url: '../login/login'});

            }
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
	
	.uni-row {
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.flex-item {
		display: flex;
		flex-direction: column;
		width: calc(33.333333333% - 0.5upx);
		height: 200upx;
		justify-content: center;
		align-items: center;
		// border-left: 1px solid #D9D9D9;
		margin-bottom: 6upx;
	}
	
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
