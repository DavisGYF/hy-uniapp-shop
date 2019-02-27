<template>
  <view class="content">
    <form @submit="formSubmit" @reset="formReset">

      <view class="uni-list" style="background-color: none;">

        <view class="uni-list-cell" style="padding: 30upx 34upx;">
          选择天数

        </view>
        <checkbox-group @change="checkboxChange">
          <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="index">
            <view>
              <checkbox :value="item.name" :checked="item.checked" />
            </view>
            <view>{{item.name}}</view>
          </label>
        </checkbox-group>

      </view>

      <view class="uni-list" style="margin-top: 60upx;">


        <view class="uni-list-cell">
          选择每天开店时间
          <view class="">
            <picker mode="time" :value="start_time" start="01:01" end="23:55" @change="bindStartTimeChange">
              <view class="uni-input">{{start_time==''?'请选择':start_time}}</view>
            </picker>
          </view>
        </view>

        <view class="uni-list-cell">
          选择每天关店时间
          <view class="">
            <picker mode="time" :value="end_time" start="01:01" end="23:55" @change="bindEndTimeChange">
              <view class="uni-input">{{end_time==''?'请选择':end_time}}</view>
            </picker>
          </view>
        </view>
      </view>

      <view class="uni-btn-v">
        <button class="btn-submit" formType="submit" type="primary">确认</button>
      </view>

    </form>


    <!-- 选择痰喘 -->
    <uni-popup :show="pop_show" type="middle" @hidePopup="hideFn">
      <view>
        <form>
          <view class="cell_top">请选择</view>
          <view class="uni-list" style="background-color: none;">
            <checkbox-group @change="checkboxChange">
              <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="index">
                <view>
                  <checkbox :value="item.name" :checked="item.checked" />
                </view>
                <view>{{item.name}}</view>
              </label>
            </checkbox-group>
          </view>

          <view style="display: flex;">
            <view class="btn btn1" @tap="enSureFn">确定</view>
            <view class="btn" @tap="hideFn">取消</view>
          </view>
        </form>
      </view>
    </uni-popup>



  </view>
</template>
<script>
  var graceChecker = require("../../common/graceChecker.js");
  import uniPopup from "@/components/uni-popup.vue"

  export default {
    components: {
      uniPopup
    },
    data() {

      return {
        pop_show: false,

        start_time: '',
        end_time: '',

        store_week: [],
        time: '12:01',
        array: ['中国', '美国', '巴西', '日本'],
        arr_list: ['星期一', '星期二', '星期三', '星期四'],
        items: [{
          name: '星期一'
        }, {
          name: '星期二',
          // checked: 'true'
        }, {
          name: '星期三',
          // checked: 'true'
        }, {
          name: '星期四'
        }, {
          name: '星期五'
        }, {
          name: '星期六'
        }, {
          name: '星期日'
        }]
      }
    },
    onLoad(e) {
      console.log('chancan ee===', e)
      this.getData()
    },
    methods: {

      getData() {
        var _this = this

        this.$util.ajax_uni({
          url: 'merchants/index/selTime',
          data: {},
          success: function(res) {
            console.log("返回yingyeshijia -----态res:", res);
            if (res.data.status == 1) {
              _this.start_time = res.data.data.store_time[0];
              _this.end_time = res.data.data.store_time[1];
              
               _this.store_week= res.data.data.store_week
              var items = _this.items,
                values = res.data.data.store_week;

              for (var i = 0, lenI = items.length; i < lenI; ++i) {
                items[i].checked = false;
                for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                  if (items[i].name == values[j]) {
                    items[i].checked = true;
                    break
                  }
                }
              }

            } else {
              console.log('cuwu=====', JSON.stringify(res.data))
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

      checkboxChange: function(e) {
        // console.log(1,e)
        // var items = this.items,
        // values = e.detail.value;

        //             	for (var i = 0, lenI = items.length; i < lenI; ++i) {
        //             		items[i].checked = false;
        //             		for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        //             			if (items[i].value == values[j]) {
        //             				items[i].checked = true;
        //             				break
        //             			}
        //             		}
        //             	}

        console.log(2, e.detail.value)
        this.store_week = e.detail.value
      },

      hideFn() {
        this.pop_show = false
      },
      showFn() {
        this.pop_show = true
      },
      enSureFn() {

      },


      bindStartTimeChange(e) {
        console.log('picker发送选择改变，携带值为', e.target.value)
        this.start_time = e.target.value
      },
      bindEndTimeChange(e) {
        this.end_time = e.target.value
      },
      formSubmit: function(e) {
        var _this = this
        console.log('rucna----', this.store_week, [this.start_time, this.end_time])
        // return
        if (this.store_week.length == 0) {
          uni.showToast({
            title: "至少选择一天!",
            icon: 'none'
          });
          return false
        }
        if (this.start_time == '') {
          uni.showToast({
            title: "请选择每天开店时间!",
            icon: 'none'
          });
          return false
        }
        if (this.end_time == '') {
          uni.showToast({
            title: "请选择每天关店时间!",
            icon: 'none'
          });
          return false
        }

        this.$util.ajax_uni({
          url: 'merchants/index/updateTime',
          data: {
            store_week: _this.store_week,
            store_time: [this.start_time, this.end_time],

          },
          success: function(res) {
            console.log("返回数据状态res:", res);
            if (res.data.status == 1) {
              uni.showToast({
                icon: 'none',
                title: '修改成功'
              });
              _this.getData()
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
      formReset: function(e) {
        console.log("清空数据")
        this.chosen = ''
      },

    }
  }
</script>

<style scoped="scoped">
  .content {
    padding: 0;
    /* background-color: white; */
  }

  .uni-view {
    width: inherit;
  }

  .uni-list-cell {
    padding: 11upx 32upx;
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

  /* //弹窗修饰 */
  .btn {
    /* background-color: red; */
    width: 260upx;
    text-align: center;
    padding: 20upx;
  }

  .btn1 {
    color: #007AFF;
    border-right: 1upx solid #EFEFF4;
  }

  .cell_top {
    text-align: center;
    border-bottom: 1upx solid #EFEFF4;
    padding: 20upx;
  }
</style>
