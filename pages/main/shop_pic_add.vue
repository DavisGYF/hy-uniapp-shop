<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">




			<view class="uni-list">
				<view class="uni-list-cell">
					<label >相册姓名</label>
					<view class="uni-list-cell-right">
						<input class="uni-input" name="store_name" placeholder="请输入" />
					</view>
				</view>
			</view>


			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						
						<view class="uni-uploader-head">
							<view class="uni-uploader-title">上传相册封面照</view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
						
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file">
										<image class="uni-uploader__img"  :src="image" :data-src="image" @tap="previewImage(image,index)"></image>
									</view>
								</block>
								
								<view class="uni-uploader__input-box"><!-- /上传照片框框 -->
									<view class="uni-uploader__input" @tap="chooseImage"></view>
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
			}
		},
		onShow() {
			// console.log('chancan ee===',this.$store.state.img)
			
			this.imageList = this.$store.state.img_list
			this.image1 = this.$store.state.img
		},
		onLoad() {
			this.getOssParam()
		},
		methods: {
			
			//上传标示
			chooseImage1: async function() {
				
			},
			
			//选择店铺相册
			countChange: function(e) {
				this.countIndex = e.target.value;
			},
			chooseImage: async function(param) {
				var _this=this
				
				if(param==1){
					uni.chooseImage({
						count: 1, //每次上传数量
						success: (res) => {
							// console.log('res----',res)
							this.image1 = res.tempFilePaths[0];
							this.$store.commit('changeImg',res.tempFilePaths[0]) 
						}
					})
				}else{
					if (this.imageList.length === 9) {
						let isContinue = await this.isFullImg();
						console.log("是否继续?", isContinue);
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						// sourceType:['camera', 'album'], //album 从相册选图，camera 使用相机，默认二者都有
						// sizeType:['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
						count: 9 - this.imageList.length, //每次上传数量
						
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths);
							this.$store.commit('changeImgList',res.tempFilePaths) 
							console.log("res?-=======", res);
							// return
							
							var files=res.tempFilePaths
							for (let i = 0; i < files.length; i++) {
								let param = new FormData();
								// let fileName = _this.uploaddata.dir + String(files[i].lastModified) + '_' + _this.randomString(6) + '.' + files[i].name.split(".").pop();
								let fileName = _this.uploaddata.dir + String(files[i].lastModified) + '_' + _this.randomString(6) ;
								param.append('key', fileName);
								param.append('policy', _this.uploaddata.policy)
								param.append('OSSAccessKeyId', _this.uploaddata.OSSAccessKeyId)
								param.append('success_action_status', '203')
								param.append('callback', _this.uploaddata.callback)
								param.append('signature', _this.uploaddata.signature)
								param.append('file', files[i])
								
								uni.request({
									url: this.base_url+'//ffomall.oss-cn-hangzhou.aliyuncs.com',
									method: 'post',
									data: param,
									headers: {
										'Content-Type': 'multipart/form-data'
									},
									success: res => {
										console.log("res?-=======", res);
								
										if (res.data.status == 1) {
											
										}
									},
									fail: () => {},
									complete: () => {}
								});
								/* _this.$util.ajaxImg({
									method: 'post',
									url: '//ffomall.oss-cn-hangzhou.aliyuncs.com',
									data: param,
									headers: {
										'Content-Type': 'multipart/form-data'
									}
								}).then(function(res) {
									if (res.status == 200) {
										_this.formCustom.store_img_list.push('https://ffomall.oss-cn-hangzhou.aliyuncs.com/' + fileName);
										if (_this.formCustom.store_img == '') {
											_this.formCustom.store_img = _this.formCustom.store_img_list[0];
										}
									}
								}).catch(function(err) {
									console.log(err)
								}); */
								
							}
							
						}
					})

				}
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
			
			isFullImg: function() {//qingkong
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(img,index) {
				// console.log('ee',img,index)
				if(img==1){
					uni.navigateTo({url:'./img_detail?data='+this.image1+"&&flag=1"})
				}else{
					uni.navigateTo({url:'./img_detail?data='+img})
				}
				
			},
			formSubmit: function (e) {
				
				// uni.navigateTo({url: './shop_add2'});
				return
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [
					
					{name:"store_name", checkType : "notnull", checkRule:"",  errorMsg:"店铺名称不能空"},
					{name:"store_tel", checkType : "notnull", checkRule:"",  errorMsg:"联系电话"},
					{name:"info", checkType : "notnull", checkRule:"",  errorMsg:"店铺简介不能空"}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					// uni.showToast({title:"验证通过!", icon:"none"});
					
					if(this.image1==""){
						uni.showToast({title:"标示必填!",icon:'none'});
						return false
					}
					if(this.imageList.length==0){
						uni.showToast({title:"至少上传一张店铺相册!",icon:'none'});
						return false
					}
					
					uni.navigateTo({url: './shop_add2'});
					
					
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
