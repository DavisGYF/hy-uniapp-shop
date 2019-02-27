<template>
	<view class="content">
		<view class="img_wrap">
			<image src="../../static/logo.jpg" mode="aspectFit" class="logoimg"></image>
		</view>
		
		<view class="">
			<view class="has-mglr-10 ">
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="11" v-model="login.phone" placeholder="请输入手机号" class="is-input1 " @input="BindInput" data-val="phone" />
				</view>
				<view class=" has-radius has-mgtb-10">
					<input v-model="login.password" placeholder="请输入登录密码" class="is-input1"  @input="BindInput" data-val="password"/>
				</view>

				<view class=" loginbtn has-radius has-mgtb-20">
					<button :loading="login.loading" @tap="defaultHandlerLogin"> {{ login.loading ? "登录中...":"登 录"}} </button>
				</view>
			</view>
		</view>
		<view class="is-20vh has-mgt-80 ">
			<navigator url="#" class=" has-radius is-right is-grey has-mgr-20" hover-class="">
				<text>忘记密码？</text><text class="is-blue">点击找回</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: {
					loading: false,
					phone:"",
					password:""
				},

			};
		},
		methods:{
			defaultHandlerLogin:function(){
				this.login.loading = true;
				setTimeout((e=>{
					this.login.loading = false;
				}),1500);
				console.log(JSON.stringify(this.login)); 
			},
			BindInput:function(e){
				var dataval = e.currentTarget.dataset.val;
				this.login[dataval] = e.detail.value; 
			}
		}
	}
</script>

<style scoped="scoped">
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.content {
		width: 85%;
		
	}

	.loginbtn button {
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
		background: #f35;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}
	.img_wrap{
		display: flex;
		justify-content: center;
		align-content: center;
		padding: 100px 0;
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
</style>
