<template>

    <view class="content">
      
			
				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-list">
						<view class="uni-list-cell ">
							<view class="uni-title">结算信息</view>
						</view>
						<view class="uni-list-cell">
							<view class="">开户人</view>
							<view class=""><input class="uni-input" v-model="text_info.opening_name" name="opening_name" placeholder="请输入" /></view>
						</view>
						<view class="uni-list-cell">
							<view class="">开户行</view>
							<view class="">
								<input class="uni-input" v-model="text_info.opening_bank" name="opening_bank" placeholder="请输入" />
							</view>
						</view>
						<view class="uni-list-cell">
							<view class="">银行卡号</view>
							<view class="">
								<input class="uni-input" v-model="text_info.Bank_card" name="Bank_card" placeholder="请输入" />
							</view>
						</view>
						<view class="uni-list-cell">
							<view class="">所属银行</view>
							<view class="">
								<input class="uni-input" v-model="text_info.Bank_name" name="Bank_name" placeholder="请输入" />
							</view>
						</view>
						<view class="uni-list-cell">
							<view class="">身份证号</view>
							<view class="">
								<input class="uni-input" v-model="text_info.opening_card" name="opening_card" placeholder="请输入" />
							</view>
						</view>
						<view class="uni-list-cell">
							<view class="">预留手机号</view>
							<view class="">
								<input class="uni-input" v-model="text_info.phone" name="phone" placeholder="请输入" />
							</view>
						</view>
					</view>
				</form>
			
      <view class="uni-btn-v">
        <button class="btn-submit"  type="primary" @tap="formSubmit"  >确认修改</button>
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
       
				uploaddata: {},
				text_info:{}
			}
		},
		onShow() {
			// console.log('chancan ee===',this.$store.state.img)

// 			this.imageList = this.$store.state.img_list
// 			this.image1 = this.$store.state.img
		},
		onLoad() {
      this.getData()
			// this.getOssParam()
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
              url: 'merchants/Withdrawal/selAccount',
              data: {},
              success: function(res) {
                  console.log("返回结算====res:", res);
                  if (res.data.status == 1) {
      
                      _this.text_info = res.data.data
      
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
			formSubmit: function(e) {

				
				
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [

					{
						name: "opening_name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "开户人不能空"
					},
					{
						name: "Bank_name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "所属银行不能空"
					},
					{
						name: "opening_card",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "身份证号不能空"
					}
				];
				//进行表单检查
// 				var formData = e.detail.value;
// 				var checkRes = graceChecker.check(formData, rule);
				// if (checkRes) {
				if (true) {
					// uni.showToast({title:"验证通过!", icon:"none"});
          console.log(this.text_info)
					// return
          
          this.$util.ajax_uni({
              url: 'merchants/Withdrawal/updateSellerAccount',
              data: this.text_info,
              success: function(res) {
                  console.log("修改====res:", res);
                  if (res.data.status == 1) {
                
                      uni.navigateBack({url: './sales'});
                
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
</style>
