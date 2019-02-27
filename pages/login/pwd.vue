<template>
	<view class="content">
		
		
		<view class="registercontent">
			<view class="has-mglr-10">
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="11" placeholder="请输入手机号" class="is-input1 " />
				</view>
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="6" placeholder="短信验证码" class="is-input1 is-blue" />
					<view class="codeimg" @tap="getsmscode">{{smsbtn.text}}</view>
				</view>

				<view class=" has-radius has-mgtb-10">
					<input placeholder="请输入新密码" :password="true" class="is-input1" />
				</view>
				<view class=" has-radius has-mgtb-10">
					<input placeholder="请再次输入新密码" :password="true" class="is-input1" />
				</view>
				
				<view class=" registerbtn has-radius has-mgtb-20">
					<button>确认</button>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				smsbtn: {
					text: '获取验证码',
					status: false,
					codeTime: 60
				},
				timerId: null,
			};
		},
		methods: {
			getsmscode: function() {
				this.timerId = setInterval(() => {
						var codeTime = this.smsbtn.codeTime;
						codeTime--;
						this.smsbtn.codeTime = codeTime;
						this.smsbtn.text = codeTime + "S";
						if (codeTime < 1) {
							clearInterval(this.timerId);
							this.smsbtn.text = "重新获取";
							this.smsbtn.codeTime = 60;
							this.smsbtn.status = false;
						}
					},
					1000);
				return false;
			}

		}
	}
</script>

<style scoped="scoped">
	.content{
		background-color: #fff;
		padding-top: 50px;
	}
	
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.registercontent {
		width: 85%;
		margin: 0 auto;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}

	.iconfont {
		position: absolute;
		font-size: 40rpx;
		right: 12%;
		z-index: 999;
		width: 105rpx;
		text-align: center;
		color: #353535;
		margin-top: -11%;
		background: #fff;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.codeimg {
		position: absolute;
		font-size: 28rpx;
		right: 12%;
		z-index: 999;
		width: 200rpx;
		text-align: center;
		color: #353535;
		margin-top: -11%;
		background: #fff;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.registerbtn{
		margin-top: 60px;
	}
	.registerbtn button {
		margin-top: 20rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: #0faeff;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}
	
	.img_wrap {
		display: flex;
		justify-content: center;
		align-content: center;
		padding: 100px 0;
	}
	.has-mgtb-10{
		margin-bottom: 10px;
	}
	.txal_center{
		text-align: center;
	}
	.is-blue{color: blue;}
</style>
