<template>
	<view class="index">
    
		<view>
		  <view class="uni-page-head">
		    <view class="uni-page-head-hd" @tap="goBack()">
		      <uni-icon type="arrowleft"></uni-icon>
		    </view>
		    <view class="uni-page-head-title">图片详情</view>
		
		    <view class="uni-page-head-ft" style="margin-top: 20upx;" @tap="deleteImg">
          删除
		      <!-- <uni-icon type="plusempty" style="color:red"></uni-icon> -->
		    </view>
		  </view>
		
		</view>
		
		
		<image :src="img_src" :data-src="img_src" ></image> <!-- mode="widthFix" -->
    <!-- <view class="detail-btn-view">
			
    	<view class="icon_wrap" @click="delete">
				<uni-icon type="trash" size="35"></uni-icon>
			</view>
    	
    </view> -->    
	</view>
</template>

<script>
	export default {
		data() {
			return {
        shop_add1_info:{},
        
				
				index: 0,
				showBtn: false,
				screenHeight: 0,
				imgLength: 0,
				providerList: [],
				data: [],
				detailDec:"",
				tt:'',
				flag:'',
        img_src:'',
        
        
			}
		},
		onLoad(e) {
			console.log(e,'e==上来擦=',JSON.stringify(e),e.data)

			/* if(e.flag==1){
        this.shop_add1_info=this.$store.state.form_data1
        // return
        this.img_src=e.data
        this.flag=e.flag
      } */
      
        // console.log('store----',JSON.stringify(this.$store.state.shop_edit_info))
        
        
        this.img_src=e.data
        this.flag=e.flag
      
			
			
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			//只要进来返回就应该是第三页
			// this.$store.commit('changeShopEdit',this.flag)
			
		},
		methods: {
      
			deleteImg() {
        /* if(this.flag==1){
          this.shop_add1_info.avatar=''
          this.$store.commit('changeFormData1',this.shop_add1_info)
          uni.navigateBack({url: './shop_add1'});
        } */
        
          console.log('store--前--',JSON.stringify(this.$store.state.shop_edit_info))
          let shop_info=this.$store.state.shop_edit_info
          
          if(this.$store.state.shop_edit_info.profile_picture1==this.img_src){
            delete shop_info.profile_picture1
          }
          if(this.$store.state.shop_edit_info.profile_picture2==this.img_src){
            delete shop_info.profile_picture2
          }
          
          
          this.$store.commit('changeShopEditInfo',shop_info)
          
          console.log('store--后--',JSON.stringify(this.$store.state.shop_edit_info))
          // return
          uni.navigateBack();
        
        
			},
			goBack() {
			  
			  uni.navigateBack();
			},
      
      
			
			
			swpierChange(e) {
				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + "/" + this.imgLength
				})
			},
			
			getData(e) {
				uni.request({
					url: this.$serverUrl + "/api/picture/detail.php?id=" + e,
					success: (res) => {
						if (res.data.code !== 0) {
							uni.showModal({
								content: "请求失败，失败原因：" + res.data.msg,
								showCancel: false
							})
							return;
						}

						this.data = this.data.concat(res.data.data);
					},
					fail: () => {
						uni.showModal({
							content: "请求失败，请重试!",
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_702773_g9f89om4v3j.ttf') format('truetype');
	}
	
	
	page {
		background-color: #000;
	}

	swiper {
		flex: 1;
		width: 750upx;
		background-color: #000;
		display: flex;
		flex-direction: column;
	}

	swiper-item {
		display: flex;
		align-items: center;
	}

	image {
		width: 750upx;
		height: 1125upx;
	}
	
	
	
	.uni-page-head{
		/* border: 1px solid red; */
	}
	.uni-page-head .uni-btn-icon{
		font-size: 18px important!;
		border: 1px solid red;
	}
	
	.detail-btn-view {
		/* width: 750upx; */
		position: fixed;
		bottom: 75upx;
		right: 20upx;
		font-size: 28upx;
	}
	
	.detail-btn-view .icon_wrap {
		opacity: 0.75;
		border-radius: 80upx;
		width: 120upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 6px;
		background: #eee;
		color: #555;
	}
	
	
</style>
