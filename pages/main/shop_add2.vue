<template>
  <view class="content">
    <form @submit="formSubmit" @reset="formReset">

      <view class="uni-list">
        <view class="mapWrap">
          <!-- <view>ask 风</view> -->
          <view class="iconWrap" @tap="choseLocation">
            <uni-icon type="search" size="30"></uni-icon>
            <input class="uni-input" style="text-align: left;" disabled placeholder="搜索" />
          </view>
          <map id="myMap" :hidden="!show_flag" :latitude="shop_info.latitude" :longitude="shop_info.longitude" :markers="covers_markers"
            scale='14' show-location style="z-index: 800;">
          </map>
          <view style="height: 600upx;width:100%;background-color: #FFFFFF;" :hidden="show_flag"></view>

        </view>

        <view class="uni-list-cell" style="text-align: center;">
          (默认当前地址为店铺地址)
        </view>



        <view class="uni-list-cell">
          省/市/区
          <view @click="selectcity">
            <view v-if="shop_info.province==''">请选择</view>
            <view>{{shop_info.province}} {{shop_info.city}} {{shop_info.district}}</view>
          </view>
        </view>
        <view class="infoWarp">
          详细地址
          <view class="">
            <textarea name="address" v-model="shop_info.address" placeholder="请输入" style="height: 120upx"/>
            </view>
        </view>


        <view class="infoWarp">
          店铺简介
          <view class="">
            <textarea name="info" v-model="shop_info.info" placeholder="请输入" />
            </view>
        </view>

			
			</view>

      <mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" 
       @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
       
			<view class="uni-btn-v">
				<button class="btn-submit" formType="submit" type="primary">下一步</button>
			</view>

		</form>





	</view>
</template>
<script>
	var graceChecker = require("../../common/graceChecker.js");
  import mpvueCityPicker from "@/common/mpvue-citypicker/mpvueCityPicker.vue"

	export default {
    components: {mpvueCityPicker},
		data() {
			return {
        show_flag:true,

        shop_info:{
          province:'',
          city:'',
          district:'',
          
          province_id:'',
          city_id:'',
          district_id:'',
          
          latitude: null,
          longitude: null,
          
          info:'',
          address:''
        },
        
				store_info: "",
        store_status_arr: ['休息中', '正常营业', '已关店', ],
        
				index1: 2,
				index3: 2,
				time: '12:01',
				array: ['中国', '美国', '巴西', '日本'],
				array1: ['星期一', '星期二', '星期三', '星期四'],

				
				covers_markers: [],
				mapCtx: null,
			}
		},
		onLoad(e) {
			console.log('chancan ee===', e)
			this.imageList = []
			this.getLocation()
      
      if(this.$store.state.form_data2.province_id){
        this.shop_info = this.$store.state.form_data2
      }
			// this.mapCtx = uni.createMapContext('myMap')
		},
		methods: {
      //省市区选择
      selectcity() {
        this.show_flag=false
      	this.$refs.mpvueCityPicker.show()
      },
      onConfirm(e) {
        this.show_flag=true
      	console.log(JSON.stringify(e))
      	var arr = e.label.split('-')
      	// console.log(arr.length)
      	this.shop_info.province =  arr[0]
      	this.shop_info.city = arr[1]
      	this.shop_info.district = arr[2]
        
        this.shop_info.province_id = e.provinceCode
        this.shop_info.city_id = e.cityCode
        this.shop_info.district_id = e.districtCode
      },
      onCancel(e) {
      	console.log(e)
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
						_this.shop_info.longitude = res.longitude
						_this.shop_info.latitude = res.latitude
						_this.shop_info.address = res.address
            
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
						console.log('当前位置的经度：' + res.longitude,JSON.stringify(res));
						console.log('当前位置的纬度：' + res.latitude);
						_this.shop_info.longitude = res.longitude
						_this.shop_info.latitude = res.latitude
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
			
			bindTimeChange(e) {
				this.time = e.target.value
			},
			
			formReset: function(e) {
				console.log("清空数据")
				this.chosen = ''
			},
			//上传标示
			chooseImage1: async function() {
				uni.chooseImage({
					// sourceType:['camera', 'album'], //album 从相册选图，camera 使用相机，默认二者都有
					// sizeType:['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					count: 1, //每次上传数量
					success: (res) => {
						console.log('res----', res)
						this.image1 = res.tempFilePaths[0];
					}
				})
			},

			//选择店铺相册
			countChange: function(e) {
				this.countIndex = e.target.value;
			},
			chooseImage: async function() {
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
					}
				})
			},
			isFullImg: function() {
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
				// var current = e.target.dataset.src
				uni.navigateTo({
					url: './img_detail?data=' + img + '&&inx=' + index
				})
			},
      
      formSubmit: function(e) {
      				
//               uni.navigateTo({url: './shop_add3'});
//               console.log('信息===',JSON.stringify(this.shop_info))
//               return
              
      				//将下列代码加入到对应的检查位置
      				//定义表单规则
      				var rule = [
      					{
      						name: "info",
      						checkType: "notnull",
      						checkRule: "",
      						errorMsg: "店铺简介不能空"
      					},
                {
                	name: "address",
                	checkType: "notnull",
                	checkRule: "",
                	errorMsg: "详细地址不能空"
                }
      				];
      				//进行表单检查
      				var formData = e.detail.value;
      				var checkRes = graceChecker.check(formData, rule);
      				if (checkRes) {
      					
      
      // 					if (this.latitude ==null) {
      // 						uni.showToast({
      // 							title: "请选择店铺详细地址!",
      // 							icon: 'none'
      // 						});
      // 						return false
      // 					}
                if (this.shop_info.district_id =="") {
                	uni.showToast({
                		title: "请选择省市区!",
                		icon: 'none'
                	});
                	return false
                }
      					// console.
                // uni.showToast({title:"验证通过!", icon:"none"});
                this.$store.commit('changeFormData2',this.shop_info)
                console.log('kankanjinqumei',this.$store.state)
                
                uni.navigateTo({url: './shop_add3'});
      
      
      				} else {
      					// console.log('对脆',this.image1,this)
      					uni.showToast({
      						title: graceChecker.error,
      						icon: "none"
      					});
      				}
      
      
      
      			},
      
      
		},
    
    
    
	}
</script>

<style scoped="scoped">
	.content {
		padding: 0;
		background-color: white;
	}

	.uni-view {
		width: inherit;
	}

	.uni-list-cell {
		padding: 26upx 44upx;
	}

	.uni-list-cell-db,
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
  
  .infoWarp{
  	border-bottom: 1px solid #c8c7cc;
  	padding:0 40upx;
  	background-color: #fff;
  }
  .infoWarp .uni-textarea-textarea{
  	line-height: 0.5;
  }
	
	.uni-input{
		text-align: right;
	}
	

</style>
