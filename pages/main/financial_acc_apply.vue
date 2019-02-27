<template>
    <view class="content">

        <form @submit="formSubmit" @reset="formReset">

            <view class="uni-list">

                <view class="uni-list-cell">
                    <view class="uni-title">提现金额</view>
                    <input style="text-align: right;" class="uni-input" v-model="moneyy" type="number" name="money" placeholder="请输入" />
                </view>
                <view class="uni-list-cell">
                    <view class="uni-title">卡号</view>
                    {{form_data.Bank_card}}
                </view>
                <view class="" style="text-align: center;background-color: #fff;padding: 10upx 0;">
                    当前可提现余额 <text style="font-weight: bold;padding-left: 10upx;">{{money}}</text>
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
    var graceChecker = require("../../common/graceChecker.js");
    export default {
        data() {
            return {
                moneyy: '',
                array: ['4563511100118511888', '6222511100118511888'],
                index: 0,
                form_data:{},
                money:''
            }
        },
        onLoad(e) {
            this.getData()
            console.log('shanglaican',e,)
            this.money=e.data
        },
        methods: {
            getData() {
                var _this = this

                this.$util.ajax_uni({
                    url: 'merchants/Withdrawal/selAccount',
                    data: {
                        ff_openid: uni.getStorageSync('user_id')
                    },
                    success: function(res) {
                        
                        if (res.data.status == 1) {
                            if(res.data.data.Bank_card==undefined){
                                uni.showToast({
                                	icon: 'none',
                                	title: '暂无结算信息，请先编辑结算信息,即将自动跳转',
                                    duration:1000
                                });
                                setTimeout(_=>{
                                    uni.navigateTo({url:'./shop_settlement'})
                                },1000)
                                
                                
                            }else{
                                _this.form_data = res.data.data;
                            }
                            
                            console.log("返回数据状态--res:", );
                            
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
            bindPickerChange: function(e) {
                console.log('picker发送选择改变，携带值为', e.target.value)
                this.index = e.target.value
            },
            formSubmit: function(e) {
              var _this = this  
                //将下列代码加入到对应的检查位置
                //定义表单规则
                var rule = [{
                        name: "money",
                        checkType: "notnull",
                        errorMsg: "提现金额不能空"
                    },
                    // {name:"Bank_name", checkType : "notnull", checkRule:"",  errorMsg:"银行名称不能空"},
                ];
                //进行表单检查
                var formData = e.detail.value;
                var checkRes = graceChecker.check(formData, rule);
                if (checkRes) {
                            
                  this.$util.ajax_uni({
                      url: 'merchants/Withdrawal/withdrawal',
                      data: {
                          money: this.moneyy
                      },
                      success: function(res) {
                          console.log("返回数据状态--res:", res);
                          if (res.data.status == 1) {
                              uni.showToast({
                              	icon: 'none',
                              	title: res.data.msg
                              });
                              // uni.redirectTo({})
                              uni.navigateBack({url:'./financial_account'})
                              
                              
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
                  
                    
                } else {
                    uni.showToast({
                        title: graceChecker.error,
                        icon: "none"
                    });
                }
            }

        }
    }
</script>

<style scoped="scoped">

</style>
