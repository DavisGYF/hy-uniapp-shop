<template>

  <view>
    
    <view>
      <van-steps :steps="steps" :active="active" />
    </view>

    <!-- 页面不显示作为工作盒子 -->
    <view class="uni-padding-wrap uni-common-mt" style="opacity: 0;height: 1upx;">
      <uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
        :activeColor="activeColor">
      </uni-segmented-control>
    </view>



    <view class="content">
      <view v-show="current === 0">
        <map :latitude="latitude" :longitude="longitude" :markers="covers_markers" scale='14' show-location></map>
        <form @submit="formSubmit" @reset="formReset">
          <view class="uni-list">
            <view class="uni-list-cell ">
              <view class="uni-title">基本信息</view>
            </view>

            <view class="uni-list-cell">
              联 系 人
              <!-- <view class=""> -->
              <input class="uni-input" v-model="text_info.id_name" name="name" placeholder="请输入" />

              <!-- </view> -->
            </view>
            <view class="uni-list-cell">
              店铺名称

              <!-- <view class=""> -->
              <input class="uni-input" v-model="text_info.store_name" name="store_name" placeholder="请输入" />
              <!-- </view> -->
            </view>

            <view class="uni-list-cell">
              联系电话
              <input class="uni-input" v-model="text_info.store_tel" name="store_tel" placeholder="请输入" />
              <!-- <view class="">
								15638883888
							</view> -->
            </view>

            <view class="uni-list-cell">
              营业状态
              <view class="">
                <picker @change="bindPickerChange1" :value="array_index1" :range="array1">
                  <view class="uni-input">{{array1[array_index1]}}</view>
                </picker>
              </view>
            </view>
            <view class="uni-list-cell">
              营业范围
              <view class="uni-list-cell-right">
                <input class="uni-input" v-model="text_info.label" name="store_name" placeholder="请输入" />
              </view>
            </view>
            <view class="uni-list-cell">
              所属行业
              <view class="">
                <picker @change="bindPickerChange" :value="array_index" :range="array">
                  <view class="uni-input">{{array[array_index]}}</view>
                </picker>
              </view>
            </view>

            <view class="uni-list-cell cell-pd">
              <view class="uni-uploader">
                <view class="uni-uploader-head">
                  <view class="uni-uploader-title"> 标示</view>
                </view>

                <view class="uni-uploader-body">
                  <view class="uni-uploader__files">
                    <block>
                      <view class="uni-uploader__file">
                        <image class="uni-uploader__img" :src="image2" :data-src="image2" @tap="previewImage(image,index)"></image>
                      </view>
                    </block>
                    <view class="uni-uploader__input-box">
                      <!-- /上传照片框框 -->
                      <view class="uni-uploader__input" @tap="chooseImage"></view>
                    </view>

                  </view>
                </view>
              </view>
            </view>

            <!-- <view class="uni-list-cell uni_title">
              <view class="uni-title">店铺简介</view>
            </view>
            <view class="infoWarp">
            <textarea name="info" style="color: #555;" v-model="text_info.info" placeholder="请输入" />
            </view> -->

          </view>





        </form>
      </view>


      <view v-show="current === 1">
        <form @submit="formSubmit" @reset="formReset">
          <view class="uni-list">

            <view class="uni-list-cell ">
              <view class="uni-title">店铺介绍</view>
            </view>
            
            <view class="infoWarp">
              <textarea name="info" style="color: #555;" v-model="text_info.info" placeholder="请输入" />
            </view>
            
            <view class="mapWrap">
            	<!-- <view>ask 风</view> -->
            	<view class="iconWrap" @tap="choseLocation">
            		<uni-icon type="search" size="30"></uni-icon>
            		<input class="uni-input" name="store_name" disabled placeholder="搜索" />
            	</view>
            	<map id="myMap" :latitude="latitude" :longitude="longitude" :markers="covers_markers" scale='14' show-location>
            	</map>
            </view>
						
					</view>
				</form>
			</view>
			
			
			<view v-show="current === 2">
				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-list">
						<view class="uni-list-cell ">
							<view class="uni-title">证件上传</view>
						</view>
						
						
						
						<view class="uni-list-cell cell-pd">
							<view class="uni-uploader">
								<view class="uni-uploader-head">
									<view class="uni-uploader-title">招牌照片</view>
								</view>
								<view class="uni-uploader-body">
									<view class="uni-uploader__files">
										<block>
											<view class="uni-uploader__file" style="width: 100%;">
												<image class="uni-uploader__img" :src="image3" :data-src="image3" @tap="previewImage(image,index)"></image>
											</view>
										</block>
									</view>
								</view>
							</view>
						</view>
						
						<view class="uni-list-cell cell-pd">
							<view class="uni-uploader">
								<view class="uni-uploader-head">
									<view class="uni-uploader-title">营业执照</view>
								</view>
								<view class="uni-uploader-body">
									<view class="uni-uploader__files">
										<block v-for="(image,index) in imageList1" :key="index">
											<view class="uni-uploader__file">
												<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage(image,index)"></image>
											</view>
										</block>
										<view class="uni-uploader__input-box"><!-- /上传照片框框 -->
											<view class="uni-uploader__input" @tap="chooseImage"></view>
										</view>
										
									</view>
								</view>
							</view>
						</view>
						
						<view class="uni-list-cell cell-pd">
							<view class="uni-uploader">
								<view class="uni-uploader-head">
									<view class="uni-uploader-title">身份证正反面</view>
								</view>
								<view class="uni-uploader-body">
									<view class="uni-uploader__files">
										<block v-for="(image,index) in imageList1" :key="index">
											<view class="uni-uploader__file">
												<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage(image,index)"></image>
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
					
				</form>
			
			</view>

		</view>
    
    <view class="uni-btn-v">
      <!-- <van-button type="primary" @tap="changeStepsFn">下一步</van-button> -->
      
      <button class="btn-submit"  type="primary" @tap="formSubmit"  v-if="active==2">确认修改</button>
      <button class="btn-submit"  type="primary" @tap="nextStepsFn"  v-if="active!=2">下一步</button>
      <button type="default" @tap="preStepsFn" v-if="active!=0">上一步</button>
    </view>    
        
	</view>
</template>
<script>
	import uniSegmentedControl from '../../components/uni-segmented-control.vue';
	var graceChecker = require("../../common/graceChecker.js");

	export default {
		components: {
			uniSegmentedControl
		},
		data() {
            
			return {
        steps: [{
                text: '步骤一',
                desc: '基本信息'
            },
            {
                text: '步骤二',
                desc: '店铺介绍'
            },
            {
                text: '步骤三',
                desc: '证件上传'
            }
        ],
        active: 0,
                
				array: ['餐饮美食', '洗浴住宿', '观影k哥', ],
				array1: ['正常营业', '休息中', '已关店', ],
				array_index:0,
				array_index1:0,
				
				current: 0,
				items: [
					'步骤 1',
					'步骤 2',
					'步骤 3'
				],
				activeColor: '#0faeff',
				styleType: 'button',

				image1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548333482233&di=60b900e6a904442b001a7876b023bb9f&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F01%2F1518282998-waBQxRPASr.jpg',
				image3: 'https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu03-l.jpg',
				image2: 'http://img5.imgtn.bdimg.com/it/u=4242739171,2434290170&fm=26&gp=0.jpg',
				imageList: [],
				imageList1: ['http://img5.imgtn.bdimg.com/it/u=4242739171,2434290170&fm=26&gp=0.jpg',
					'http://life.southmoney.com/tuwen/UploadFiles_6871/201804/20180423165909445.jpg'
				],
				uploaddata: {},
        text_info:{},
        
        latitude: null,
        longitude: null,
        covers_markers: [],
        mapCtx: null,
				
			}
		},
		onShow() {
			// console.log('chancan ee===',this.$store.state.img)

			this.imageList = this.$store.state.img_list
			this.image1 = this.$store.state.img
		},
		onLoad() {
			this.getOssParam()
      // this.getData()
      this.imageList = []
      this.getLocation()
		},
		onNavigationBarButtonTap(e) {
			
			uni.navigateTo({
				url: './shop_info_edit'
			});
		},
		methods: {
      getData() {
          var _this = this
          this.$util.ajax_uni({
              url: 'merchants/index/show',
              data: {
                  ff_openid: uni.getStorageSync('user_id')
              },
              success: function(res) {
                  console.log("返回店铺信息res:", res);
                  if (res.data.status == 1) {
      
                      _this.text_info = res.data.data.data
      
                  } else {
                      console.log('ceeee', JSON.stringify(res.data))
                      // 							uni.showToast({
                      // 								icon: 'none',
                      // 								title: res.data.msg
                      // 							});
      
                  }
              },
              error: function(res) {
                  console.log("错误res:", res);
              }
          })
      },
      
      
      
      nextStepsFn() {//下一步
      console.log('active--',this.active,'current===',this.current )
      if(this.active<2){
        this.active += 1
        this.current +=1;
      }
          
      },
      preStepsFn() {//上一步
      console.log('active--',this.active,'current===',this.current )

        if(this.active>0){
          this.active -= 1
          this.current -=1;
        }
          
      },
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			//上传标示
			chooseImage1: async function() {

			},

			//选择店铺相册
			countChange: function(e) {
				this.countIndex = e.target.value;
			},
			chooseImage: async function(param) {
				var _this = this

				if (param == 1) {
					uni.chooseImage({
						count: 1, //每次上传数量
						success: (res) => {
							// console.log('res----',res)
							this.image1 = res.tempFilePaths[0];
							this.$store.commit('changeImg', res.tempFilePaths[0])
						}
					})
				} else {
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
							this.$store.commit('changeImgList', res.tempFilePaths)
							console.log("res?-=======", res);
							// return

							var files = res.tempFilePaths

							for (let i = 0; i < files.length; i++) {
								let param = new FormData();
								// let fileName = _this.uploaddata.dir + String(files[i].lastModified) + '_' + _this.randomString(6) + '.' + files[i].name.split(".").pop();
								let fileName = _this.uploaddata.dir + String(files[i].lastModified) + '_' + _this.randomString(6);
								param.append('key', fileName);
								param.append('policy', _this.uploaddata.policy)
								param.append('OSSAccessKeyId', _this.uploaddata.OSSAccessKeyId)
								param.append('success_action_status', '203')
								param.append('callback', _this.uploaddata.callback)
								param.append('signature', _this.uploaddata.signature)
								// param.append('file', files[i])

								uni.uploadFile({
									url: "https://ffomall.oss-cn-hangzhou.aliyuncs.com",
									filePath: files[i],
									name: 'file',
									formData: {
										key: fileName,
										policy: _this.uploaddata.policy,
										OSSAccessKeyId: _this.uploaddata.OSSAccessKeyId,
										callback: _this.uploaddata.callback,
										signature: _this.uploaddata.signature,

									},
									success: (res) => {
										console.log('uploadImage success, res is:', res)
										uni.showToast({
											title: '上传成功',
											icon: 'success',
											duration: 1000
										})
										// this.imageSrc = imageSrc
									},
									fail: (err) => {
										console.log('uploadImage fail', err);
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
								/* uni.request({
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
								}); */
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
					url: this.base_url + 'notify/alioss/getsign',
					method: 'post',
					data: {
						sign: '3521257fc593c5d202474f6ac0c245ae'
					},
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


			formReset: function(e) {
				console.log("清空数据")
				this.chosen = ''
			},

			isFullImg: function() { //qingkong
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
			previewImage: function(img, index) {
				console.log('ee', img, index)
				if (img == 1) {
					uni.navigateTo({
						url: './shop_img_detail?data=' + this.image2
					})
				} else {
					uni.navigateTo({
						url: './shop_img_detail?data=' + img
					})
				}

			},
      
      
      choseLocation() {
      	var _this = this
      	console.log('位置名称：--------');
      	uni.chooseLocation({
      		success: function(res) {
      			console.log('位置名称：' + res.name);
      			console.log('详细地址：' + res.address);
      			console.log('纬度：' + res.latitude);
      			console.log('经度：' + res.longitude);
      			_this.longitude = res.longitude
      			_this.latitude = res.latitude
      			_this.covers_markers.pop()
      			_this.covers_markers.push({
      				latitude: res.latitude,
      				longitude: res.longitude,
      				label: {
      					content: res.name
      				}
      			})
      		}
      	});
      },
      getLocation() {
      	var _this = this
      
      	// console.log('dd')
      	uni.getLocation({
      		type: 'gcj02',
      		success: function(res) {
      			// console.log('当前位置的经度：' + res.longitude,JSON.stringify(res));
      			console.log('当前位置的纬度：' + res.latitude);
      			_this.longitude = res.longitude
      			_this.latitude = res.latitude
      			_this.covers_markers.push({
      				latitude: res.latitude,
      				longitude: res.longitude,
      
      			})
      
      
      			// 						uni.openLocation({
      			// 							latitude: _this.latitude,
      			// 							longitude:_this.longitude,
      			// 							success: function (res) {
      			// 									console.log('success',JSON.stringify(res));
      			// 							}
      			// 						});
      
      
      		},
      		fail: (res) => {
      			console.log('res-fail', res)
      
      
      		},
      	});
      
      
      },
      bindPickerChange(e) {
      	console.log('picker发送选择改变，携带值为', e.target.value)
      	this.index = e.target.value
      },
      bindTimeChange(e) {
      	this.time = e.target.value
      },
			formSubmit: function(e) {

// 				uni.navigateTo({
// 					url: './shop_add2'
// 				});
				return
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [

					{
						name: "store_name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "店铺名称不能空"
					},
					{
						name: "store_tel",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "联系电话"
					},
					{
						name: "info",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "店铺简介不能空"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					// uni.showToast({title:"验证通过!", icon:"none"});

					if (this.image1 == "") {
						uni.showToast({
							title: "标示必填!",
							icon: 'none'
						});
						return false
					}
					if (this.imageList.length == 0) {
						uni.showToast({
							title: "至少上传一张店铺相册!",
							icon: 'none'
						});
						return false
					}

					uni.navigateTo({
						url: './shop_add2'
					});


				} else {
					// console.log('对脆',this.image1,this)
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}



			},
		}
	}
</script>

<style scoped="scoped">
	/* .content{padding:0 15upx;background-color: white;} */

	.uni-view {
		width: inherit;
	}

	/* .uni-list-cell {
		padding: 24upx 36upx;
	} */

	.uni-uploader__file {}

	.infoWarp {
		border-bottom: 1upx solid #efeff4;
		padding: 10upx 32upx;
		background-color: #fff;

	}

	.infoWarp .uni-textarea-textarea {
		line-height: 0.5;
	}

	.uni_title {
		margin-top: 20upx;
	}
	.uni-input{
		text-align: right;
	}
  
  
  
  .uni-list-cell-right {
  	display: flex;
  	flex-direction: row;
  }
  map {
  	width: 100%;
  	height: 600upx;
  }
  
  .mapWrap {
  	position: relative;
  }
  
  .mapWrap .iconWrap {
  	/* position: absolute; */
  	z-index: 2;
  	padding: 10upx;
  	background-color: #FFFFFF;
  	display: flex;
  	padding-left: 40%;
  }
  
  .mapWrap .iconWrap .uni-icon-search {
  
  	z-index: 3;
  	/* 
  	position: absolute;
  	left: 15upx;
    top: 16upx; */
  	color: red;
  }
  
  .mapWrap .iconWrap .uni-input {
  	padding: 0;
  
  }
  
  
</style>
