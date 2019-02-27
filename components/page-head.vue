<template name="page-head">
	<view class="page_head_warper">
		<view class="uni-page-head" v-if="show_left!='false'">
			<view class="uni-page-head-hd" @tap="goBack(back_url)">
				<uni-icon type="arrowleft"></uni-icon>
			</view>
			<view class="uni-page-head-title">{{title}}</view>
			
			<view class="uni-page-head-ft" @tap="goFn(right_icon_url)" style="margin-top: 20upx;">
				<uni-icon :type="right_icon"></uni-icon>
			</view>
		</view>
		
		<view class="uni-page-head" v-if="show_left=='false'">
			<view class="uni-page-head-hd" style="opacity: 0;">
				1
			</view>
			<view class="uni-page-head-title">{{title}}</view>
			
			<view class="uni-page-head-ft" @tap="goFn(right_icon_url)">
				<uni-icon :type="right_icon" style="margin-top: 40upx;"></uni-icon>
			</view>
		</view>
	
	</view>
	
	<!-- <div class="uni-page-head" style="background-color: rgb(15, 174, 255); color: rgb(255, 255, 255);">
		<div class="uni-page-head-hd" style="visibility: visible;">
			<div><i class="uni-btn-icon" style="color: rgb(255, 255, 255); font-size: 27px;"></i></div>
		</div>
		<div class="uni-page-head-bd">
			<div class="uni-page-head__title" style="font-size: 16px; opacity: 1;">
				店铺基本信息</div>
		</div>
		<div class="uni-page-head-ft"></div>
	</div> -->
	
</template>
<script>
	export default {
		name: "page-head",
		props: {
			title: {
				type: String,
				default: ""
			},
			right_icon: {
				type: String,
				default: ""
			},
			right_icon_url: {
				type: String,
				default: ""
			},
			back_url: {
				type: String,
				default: ""
			},
			show_left: {
				type: String,
				default: ""
			},
			
		},
		methods:{
			goFn(url){
				// console.log(123,url)
				uni.navigateTo({url:url});
				
			},
			goBack(url){
				console.log(123,url)
				// return
				if(url!=''){
					console.log('有退路')
					// uni.redirectTo({url:url});
					uni.navigateBack();
				}else{
					uni.navigateBack()
				}
				
			}
		}
	}
</script>
<style scoped="scoped">
	/* page */
	.uni-page-head{
		
	}
	.uni-page-head-title {
	}
	.uni-page-body {
	}
  .page_head_warper{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
  }
</style>