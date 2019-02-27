<template>
	<view class="index" @longpress="longTapFn()" >
		
		<!-- <image :src="img_src" :data-src="img_src" :style="{height:screenHeight,width:screenwidth}" ></image> -->
		<image :src="img_src" id="imgg" :data-src="img_src" ></image>
    
    
    <!-- 长按弹窗 -->
    <uni-popup :show="showPopupMiddle" type="bottom" v-on:hidePopup="hidePopupFn" class="pop">
      <!-- <view class="" > -->
      <button class="pop_button" type="primary" @tap="downloadFn">下载当前照片</button>
    
    </uni-popup>
      
	</view>
</template>

<script>
	// import {ajax} from '../../common/request1.js' 
  import uniPopup from "@/components/uni-popup.vue"
  
	export default {
    components: {uniPopup},
		data() {
			return {
        
        showPopupMiddle:false,
        
        
        
				img_src:this.base_url+'merchants/index/qrCode?ff_openid='+uni.getStorageSync('user_id')+"&token="+uni.getStorageSync('token'),
				
				screenHeight: 0,
				user_id: "",
				token: ""
			}
		},
		onLoad(e) {
			console.log('barsurl=====',this.base_url)
      console.log('img_src====img_src--------=',this.img_src)
      
			console.log('-----ceshi',uni.createSelectorQuery().select('#imgg').complete)
			 uni.createSelectorQuery().select('#imgg').onload=function(){
				 console.log(123)
			 }
			return
			console.log(uni.getStorageSync('user_id'))
			console.log('登陆信息',uni.getStorageInfoSync())
			
			
			
			this.screenHeight = uni.getSystemInfoSync().windowHeight+"px";
			this.screenwidth = uni.getSystemInfoSync().windowWidth+"px";
		
			
			
		},
		onReady(){
			
// 			setTimeout(function(){
// 				console.log('----onready--')
// 				uni.hideLoading()
// 			},2000)
		},
		// computed: mapState(['forcedLogin']),
		watch:{
			img_src(newV,oldV){
				console.log(newV,'------',oldV)
			}
		},
		methods: {
      
      downloadFn() {
        uni.downloadFile({
          url: this.img_src,
          success: (e) => {
            this.showPopupMiddle = false
      
            uni.saveImageToPhotosAlbum({
              filePath: e.tempFilePath,
              success: () => {
                uni.showToast({
                  icon: "none",
                  title: "已保存到手机相册"
                })
              },
              fail: () => {
                uni.showToast({
                  icon: "none",
                  title: "保存到手机相册失败"
                })
              }
            });
          },
          fail: (e) => {
            uni.showModal({
              content: "下载失败，" + e.errMsg,
              showCancel: false
            })
          }
        })
      },
       //统一的关闭popup方法
      hidePopupFn: function() {
        console.log('关闭')
        // uni.showToast({title: "duration 3000",duration: 1000})
        this.showPopupMiddle = false;
      },
      longTapFn() {
        
        // this.select_index = item.id
        this.showPopupMiddle = true
      },
			
			getData() {
				var _this = this
				console.log('-xuanzhong----111')
        
				ajax({
					url:'merchants/index/qrCode',
					responseType: 'arraybuffer',
					data:{
            ff_openid: uni.getStorageSync('user_id')
            },
					success:function(res){
						console.log("返回数据状态res:", JSON.stringify(res));
						
						_this.img_src='data:image/png;base64,' + btoa(
						new Uint8Array(res.data)
							.reduce((data, byte) => data + String.fromCharCode(byte), '')
						)
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
	.index{
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	.index image {
		width: 40vh;
		height: 40vh;
		
	}
	
	
	
	
	
	
</style>
