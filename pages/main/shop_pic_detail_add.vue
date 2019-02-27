<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">


			<view class="uni-list list-pd">
				<view class="uni-list-cell">
					<label >照片描述</label>
					<view class="uni-list-cell-right">
						<input class="uni-input" v-model="description" name="description" placeholder="请输入" />
					</view>
				</view>
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title">上传照片</view>
							<!-- <view class="uni-uploader-info">{{imageList.length}}/9</view> -->
						</view>
						
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								
								<!-- <block v-for="(image,index) in imageList" :key="index"> -->
									<view class="uni-uploader__file" v-if="image1">
										<image class="uni-uploader__img" @tap="previewImage()" mode="aspectFill" :src="image1" :data-src="image1" ></image>
									</view>
								<!-- </block> -->
								
								<view class="uni-uploader__input-box"><!-- /上传照片框框 -->
									<view class="uni-uploader__input" @tap="chooseImageFn()"></view>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			
			<view class="uni-btn-v">
				<button class="btn-submit" formType="submit" type="primary">提交</button>
				<!-- <button type="default" formType="reset">Reset</button> -->
			</view>
			
		</form>
		
		
	
		
		
	</view>
</template>
<script>
	var  graceChecker = require("../../common/graceChecker.js");
	
	export default {
		data() {
			return {
				image1:'',
				imageList: [],
				uploaddata: {},
        album_id:'',
        description:''
			}
		},
		onShow() {
			// console.log('chancan ee===',this.$store.state.img)
			
		},
		onLoad(e) {
      console.log('上来--------------',JSON.parse(e.data))
      this.album_id=JSON.parse(e.data)
			this.getOssParam()
		},
		methods: {
			
			//上传标示
			chooseImageFn: async function() {
        var _this=this
				uni.chooseImage({
				  // sourceType:['camera', 'album'], //album 从相册选图，camera 使用相机，默认二者都有
				  // sizeType:['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
				  count: 1, //每次上传数量
				  success: (res) => {
				    var files = res.tempFilePaths
				    console.log("res?-=======", JSON.stringify(res));
				      let fileName = _this.uploaddata.dir + Date.parse(new Date()) + '_' + _this.randomString(6) + '.' + files[0].split(".").pop();
				      uni.uploadFile({
				        url: "https://ffomall.oss-cn-hangzhou.aliyuncs.com",
				        filePath: files[0],
				        name: 'file',
				        formData: {
				          key: fileName,
				          policy: _this.uploaddata.policy,
				          OSSAccessKeyId: _this.uploaddata.OSSAccessKeyId,
				          callback: _this.uploaddata.callback,
				          signature: _this.uploaddata.signature,
				          success_action_status:'203',
				        },
				        success: (res) => {
				          console.log('uploadImage success, res is:', res.data)
				          _this.image1='https://ffomall.oss-cn-hangzhou.aliyuncs.com/'+JSON.parse(res.data).filename
				          // console.log('uploadImage ======:', JSON.stringify(_this.shop_info.avatar))
				        },
				        fail: (err) => {
				          console.log('uploadImage fail', JSON.stringify(err));
				          
				          uni.showModal({
				            content: err.errMsg,
				            showCancel: false
				          });
				          uni.hideLoading();
				        },
				        complete: () => {
				          console.log("complate")
				        }
				      })
				
				  }
				})
			},
			randomString(len, charSet) {
				charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				var randomString = '';
				for (var i = 0; i < len; i++) {
					var randomPoz = Math.floor(Math.random() * charSet.length);
					randomString += charSet.substring(randomPoz, randomPoz + 1);
				}
				return randomString;
			},
			getOssParam() {
				let _this = this;
				uni.request({
					url: this.base_url+'notify/alioss/getsign',
					method: 'post',
					data: {sign: '3521257fc593c5d202474f6ac0c245ae'},
					success: res => {
						console.log("res?-", res);

						if (res.data.status == 1) {
							_this.uploaddata = res.data.data;
						}
					},
					fail: () => {},
					complete: () => {}
				});
				
				return
				this.$util.ajax({
					method: 'post',
					url: 'notify/alioss/getsign',
					data: {
						sign: '3521257fc593c5d202474f6ac0c245ae'
					}
				}).then(function(res) {
					if (res.data.status == 1) {
						_this.uploaddata = res.data.data;
					}
				})
			},
			
			
			formReset: function (e) {
				console.log("清空数据")
				this.chosen = ''
			},
			
			
			previewImage: function(img,index) {
        uni.previewImage({
        	urls:[this.image1]
        })
			},
			formSubmit: function (e) {
        var _this=this
				
				console.log('shangchuanzuishuju--------------', _this.image1)
				// return
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [
					
					{name:"description", checkType : "notnull", checkRule:"",  errorMsg:"照片描述必填"}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					// uni.showToast({title:"验证通过!", icon:"none"});
					
					if(this.image1==""){
						uni.showToast({title:"照片必填!",icon:'none'});
						return false
					}
					
          this.$util.ajax_uni({
            url: 'merchants/Adimg/insertPicture',
            data: {
              img_id:_this.album_id,
              img_url:_this.image1,
              describe:_this.description
            },
            success: function(res) {
              console.log("返回数据状态res:", res);
              if (res.data.status == 1) {
          
                uni.navigateBack({url:'./shop_pic_detail'})
          
                
              } else {
                console.log('ceeee', JSON.stringify(res.data))
                uni.showToast({
                  icon: "loading",
                  title: res.data.msg
                });
          
              }
            },
            error: function(res) {
              console.log("错误res:", res);
            }
          })
          
					
					
					
				}else{
					// console.log('对脆',this.image1,this)
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
				
				
				
			},
		}
	}
</script>

<style scoped="scoped">
	
	/* .content{padding:0 15px;background-color: white;} */
	
	.uni-view {
		width: inherit;
	}
	
	
	.infoWarp{
		border-bottom: 1px solid #c8c7cc;
		
	}
	.infoWarp .uni-textarea-textarea{
		line-height: 0.5;
	}
	uni-label{width: 60px;border:1px solid red}
	
</style>
