<template>
  <view class="content">

    <form @submit="formSubmit" @reset="formReset">

      <view class="uni-list">

<!--        <view class="uni-list-cell">
          <view class="uni-title">优惠活动名称</view>
          <input class="uni-input" v-model="formData.activity_name" name="activity_name" placeholder="请输入" />
        </view> -->

        <view class="uni-list-cell">
          <view class="uni-title">满减类型</view><!-- type是1是打折，0是满减 -->
          <radio-group @change="radioChange" class="disFlex">
            <label v-for="(item, index) in items" :key="item.value">
              <view>
                <radio :value="item.value" :checked="index === current" />
                {{item.name}}
              </view>

            </label>
          </radio-group>
        </view>

        <view class="uni-list-cell">
          <view class="uni-title">满</view>
          <input class="uni-input" type="number" v-model="formData.activity_conditions" name="activity_conditions" placeholder="请输入" />
        </view>

        <view v-if="current==1">
          <view class="uni-list-cell">
            <view class="uni-title">打</view>
            <input class="uni-input" v-model="formData.preferential"  type="number" name="preferential" placeholder="请输入" />折
          </view>
        </view>
        <view v-if="current==0">
          <view class="uni-list-cell">
            <view class="uni-title">减</view>
            <input class="uni-input" v-model="formData.preferential"  type="number" name="preferential" placeholder="请输入" />
          </view>
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
        isFlag: true,

        formData: {
          activity_conditions: '',
          preferential: '',
          activity_name: '',
          activity_type: '1'
        },
        items: [{
            value: '1',
            name: '满减'
          },
          {
            value: '0',
            name: '折扣'
          },
        ],
        current: 1
      }
    },
    onLoad() {

    },
    methods: {

      radioChange: function(evt) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].value === evt.target.value) {
            this.current = i;
            break;
          }
        }
        console.log('current', this.current)

        this.formData.activity_type = this.current
      },
      formSubmit: function(e) {
        var _this = this
        //将下列代码加入到对应的检查位置
        //定义表单规则
        var rule = [/* {
            name: "activity_name",
            checkType: "notnull",
            errorMsg: "优惠活动不能空"
          }, */
          {
            name: "activity_conditions",
            checkType: "notnull",
            checkRule: "",
            errorMsg: "优惠条件不能空"
          },
          {
            name: "preferential",
            checkType: "notnull",
            checkRule: "",
            errorMsg: "优惠力度不能空"
          },
        ];
        //进行表单检查
        var formData = e.detail.value;
        var checkRes = graceChecker.check(formData, rule);
        if (checkRes) {
          console.log("返回数据状态res:", this.formData);
          // return
          this.$util.ajax_uni({
            url: 'merchants/Activity/insertActivity',
            data: {
              preferential:this.formData.activity_type==1? this.formData.preferential/10:this.formData.preferential,
              activity_conditions: this.formData.activity_conditions,
              activity_type: this.formData.activity_type
            },
            success: function(res) {
              console.log("返回数据状态res:", res);
              if (res.data.status == 1) {

                uni.navigateBack()

                console.log("listdata:");
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
  .disFlex {
    display: flex;
    width: auto;
  }
</style>
