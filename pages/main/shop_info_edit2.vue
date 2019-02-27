<template>

  <view class="content" style="background-color: #fff;">
    <view style="margin-bottom: 80upx;" v-if="text_info.status!=1">
      <van-steps :steps="steps" :active="active" />
      
      <view  class="iconWrap" @tap="choseLocation" style="">
        <uni-icon type="search" size="30"></uni-icon>搜索
      </view>
      
    </view>
    <view  v-if="text_info.status==1">
      <van-steps :steps="steps" :active="active" />
    </view>

    <form @submit="formSubmit" @reset="formReset">

      <view class="mapWrap" >
        <!-- <button class="btn-submit" style="margin-top: -80upx;align-items: center;"  type="default" @tap="choseLocation"><uni-icon type="search" size="30"></uni-icon>搜所地址</button> -->
        <!-- <view v-if="text_info.status!=1" class="iconWrap" @tap="choseLocation" style="">
          <uni-icon type="search" size="30"></uni-icon>搜索
        </view> -->
        <map id="myMap"  :latitude="text_info.latitude" :longitude="text_info.longitude"
          :markers="covers_markers" scale='14' show-location
          @tap="mapTapFn"
          @markertap="markertapFn"
          :hidden="!show_flag"
          >
        </map>
        <view style="height: 600upx;width:100%;background-color: #FFFFFF;" :hidden="show_flag"></view>
        <!-- <button class="btn-submit"   type="default" @tap="choseLocation"><uni-icon type="search" size="30"></uni-icon>搜所地址</button> -->
        

        <view class="infoWarp">
          <view class="uni-title" style="margin-top: 80upx;" v-if="text_info.status==1">店铺地址</view>
          <view  v-if="text_info.status!=1">店铺地址</view>
          <view style="display: flex;justify-content: space-between;" v-if="text_info.status!=1">
            省/市/区
            <view @click="selectcity">
              <view>{{text_info.province_name}} {{text_info.city_name}} {{text_info.district_name}}</view>
            </view>
            <!-- <view  v-if="text_info.status==1">
                <view>{{text_info.province_name}} {{text_info.city_name}} {{text_info.district_name}}</view>
              </view> -->
          </view>
          <view class="" v-if="text_info.status!=1">
            详细地址
            <view class="">
              <textarea name="address" maxlength="200" v-model="text_info.address" style="height: 120upx" />

              </view>
            </view>
            <view class=""  v-if="text_info.status==1" >
              {{text_info.province_name}}{{text_info.city_name}}{{text_info.district_name}}{{text_info.address}}
            </view>
          </view>
          
        </view>

        <!--  -->
        <view class="infoWarp">
          <view class="uni-title">店铺介绍</view>
          <textarea name="info" style="color: #555;width:auto" v-model="text_info.info" placeholder="请输入" />
        </view>
        
    </form>
			
    
    <view class="uni-btn-v">
      
      <button class="btn-submit"  type="primary" @tap="formSubmit">确定并下一步</button>
      
    </view> 
       
       
   <mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" 
    @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
        
	</view>
</template>
<script>
	
  import mpvueCityPicker from "@/common/mpvue-citypicker/mpvueCityPicker.vue"
	var graceChecker = require("../../common/graceChecker.js");

	export default {
		components: {mpvueCityPicker},
		data() {
      var _this =this
			return {
        show_flag:true,
        steps: [{
                text: '基本信息',
                desc: ''
            },
            {
                text: '店铺介绍',
                desc: ''
            },
            {
                text: '证件上传',
                desc: ''
            }
        ],
        active: 1,
        
        storeListAll:[],
        storeList: [],
        cat_index:0,
        
				array: ['餐饮美食', '洗浴住宿', '观影k哥', ],
				array1: ['正常营业', '休息中', '已关店', ],
				
				array_index:0,
				
				
				activeColor: '#0faeff',
				styleType: 'button',

				
				uploaddata: {},
				uploaddata_id: {},
        text_info:{},
        
        latitude: null,
        longitude: null,
        covers_markers: [
          {
                latitude: null,
                longitude: null,
                // iconPath: '../../../static/location.png'
            }
        ],
        mapCtx: null,
				
        
        id_image_ist: [],

        
//         id_image_ist: ['http://img5.imgtn.bdimg.com/it/u=4242739171,2434290170&fm=26&gp=0.jpg',
//         	'http://life.southmoney.com/tuwen/UploadFiles_6871/201804/20180423165909445.jpg'
//         ],
			}
		},
		onShow() {
     
      this.getData()
			
		},
		onLoad(e) {
      // console.log('上来餐 ee===',e)
      
      
      // this.getLocation()
		},
		
		methods: {
      markertapFn(){//点击没有反应
        console.log('markertapFn。。。。。。。markertapFn')
      },
      mapTapFn(e,a){
        var _this=this
        console.log('引动了。。。。。。。111',JSON.stringify(e),JSON.stringify(a))
        if(_this.text_info.status!=1){
          
          var mapCtx = uni.createMapContext('myMap',_this);  
          mapCtx.getCenterLocation({  
              success: function(res) {  
                  console.log('getcenter------',JSON.stringify(res));  
                  _this.covers_markers[0].latitude=res.latitude
                  _this.covers_markers[0].longitude=res.longitude
                  
                  _this.text_info.latitude=res.latitude
                  _this.text_info.longitude=res.longitude
                  
                  console.log('covers_markers------',JSON.stringify( _this.covers_markers));  
              },  
              fail: (data, code) => {  
                  console.log('fail' + JSON.stringify(data));  
              }  
          }); 
          
        }
         
        
      },
      
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
      	this.text_info.province_name =  arr[0]
      	this.text_info.city_name = arr[1]
      	this.text_info.district_name = arr[2]
        
        this.text_info.province_id = e.provinceCode
        this.text_info.city_id = e.cityCode
        this.text_info.district_id = e.districtCode
      },
      onCancel(e) {
        this.show_flag=true
        
      	console.log(e)
      },
      
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
                      _this.covers_markers[0].latitude=_this.text_info.latitude
                      _this.covers_markers[0].longitude=_this.text_info.longitude
                  } else {
                      console.log('ceeee', JSON.stringify(res.data))
                      uni.showToast({
                        icon: 'none',
                        title: res.data.msg
                      });
      
                  }
              },
              error: function(res) {
                  console.log("错误res:", res);
              }
          })
      },
      
      
      
      nextStepsFn() {//下一步
      console.log('active--',this.active,'current===',this.current )
      uni.navigateTo({url:'shop_info_edit3'})
          
      },
      preStepsFn() {//上一步
      console.log('active--',this.active,'current===',this.current )
        uni.navigateBack()
          
      },
      bindPickerChange1(e) {
      	console.log('picker发送选择改变，携带值为', e.target.value)
      	this.text_info.store_status = e.target.value
      },
			catChange(e) {
			  console.log('picker发送选择改变，携带值为', e.target.value)
			  this.cat_index=e.target.value
			  this.text_info.cat_id= this.storeListAll[e.target.value].id
        // console.log('shop------', this.storeListAll[e.target.value])
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			
			formReset: function(e) {
				console.log("清空数据")
				this.chosen = ''
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
      			_this.text_info.address = res.name
            
      			_this.text_info.longitude = res.longitude
      			_this.text_info.latitude = res.latitude
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
      
      
      		},
      		fail: (res) => {
      			console.log('res-fail', res)
      
      
      		},
      	});
      
      
      },
      
			formSubmit: function(e) {
        var _this=this
        let url_p=''
        if(this.text_info.status==1){
          url_p="merchants/index/updateRegistered"
        }else{
          url_p="merchants/index/updateReg"
        }
        console.log('入参---修改',JSON.stringify(this.text_info))
        
        // return
        this.$util.ajax_uni({
          url: url_p,
          data:this.text_info,
          success: function(res) {
            console.log("修改--返回---es:", res);
            if (res.data.status == 1) {
              uni.navigateTo({url:'./shop_info_edit3'})
        
            } else {
              console.log('ceeee', JSON.stringify(res.data))
              uni.showToast({
                icon: 'none',
                title: res.data.msg
              });
        
            }
          },
          error: function(res) {
            console.log("错误res:", res);
          }
        })
        
				

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

	
  map {
  	width: 100%;
  	height: 600upx;
  }
  
  .mapWrap {
  	/* position: relative; */
  }
  
  
  .iconWrap {
  	/* position: absolute; */
    /* width:100%; */
    height:60upx;
  	/* z-index: 999; */
  	background-color: #ffffff;
  	display: flex;
  	/* padding-left: 40%; */
    justify-content: center;
  }
  
  .test{
    margin-bottom: 80upx;
  }
</style>
