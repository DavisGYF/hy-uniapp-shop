<template>
	<view class="content">
		
		<form @submit="formSubmit" @reset="formReset">
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-title">开户人</view>
					<input class="uni-input" name="opening_name" placeholder="请输入" />
				</view>
				
				<view class="uni-list-cell">
					<view class="uni-title">开户行</view>
					<input class="uni-input" name="opening_bank" placeholder="请输入" />
				</view>
				
				<view class="uni-list-cell">
					<view class="uni-title">银行卡号</view>
					<input class="uni-input" type="number" name="Bank_card" placeholder="请输入" />
				</view>
				
				<view class="uni-list-cell">
					<view class="uni-title">所属银行</view>
					<input class="uni-input" name="Bank_name" placeholder="请输入" />
				</view>
				
				<view class="uni-list-cell">
					<view class="uni-title">身份证号</view>
					<input class="uni-input" name="opening_name" placeholder="请输入" />
				</view>
				<view class="uni-list-cell">
					<view class="uni-title">预留手机号</view>
					<input class="uni-input" name="opening_name" placeholder="请输入" />
				</view>
				
			</view>
			
			
			<view class="uni-btn-v uni-common-mt">
				<button class="btn-submit" formType="submit" type="primary">提交</button>
				
			</view>
		</form>
	</view>
	
</template>
<script>
	//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
	var  graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				title: '表单验证',
			}
		},
		methods: {
			formSubmit: function (e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [
					{name:"Bank_card", checkType : "notnull",  errorMsg:"银行卡号不能空"},
					{name:"Bank_name", checkType : "notnull", checkRule:"",  errorMsg:"银行名称不能空"},
					{name:"opening_name", checkType : "notnull", checkRule:"",  errorMsg:"开户人不能空"},
					{name:"opening_bank", checkType : "notnull", checkRule:"",  errorMsg:"开户行不能空"}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					uni.showToast({title:"验证通过!", icon:"none"});
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			}
		
		}
	}
</script>

<style scoped="scoped">
	
</style>
