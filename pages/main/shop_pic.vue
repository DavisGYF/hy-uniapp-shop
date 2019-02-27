<template>


  <view class="index">

    <view>
      <view class="uni-page-head">
        <view class="uni-page-head-hd" @tap="goBack()">
          <uni-icon type="arrowleft"></uni-icon>
        </view>
        <view class="uni-page-head-title">店铺相册</view>

        <view class="uni-page-head-ft" style="margin-top: 20upx;" @tap="showFn">
          <uni-icon type="plusempty" style="color:red"></uni-icon>
        </view>
      </view>

    </view>


    <view class="row">
      <view class="card card-list2" v-for="(item,key) in form_data" @tap="goDetail(item)" @longpress="longTapFn(item)"
        :key="key">
        <image v-if="item.img_list.length!=0" class="card-img card-list2-img" mode="aspectFill" :src="item.img_url"></image>
        <image v-if="item.img_list.length==0" class="card-img card-list2-img" src="../../static/noPic.jpg"></image>
        <text class="card-num-view card-list2-num-view">{{item.img_list.length}}P</text>
        <view class="card-bottm row">
          <view class="car-title-view row">
            <text class="card-title card-list2-title">{{item.img_cat}}</text>
          </view>
          <!-- <view @click.stop="share(item)" class="card-share-view"></view> -->
        </view>
      </view>
    </view>

    <!-- <view class="uni-btn-v">
			<button class="btn-submit" @tap="toFn" type="primary">新增相册</button>
		</view> -->
    <!-- 新增弹窗 -->
    <uni-popup :show="pop_show" type="middle" @hidePopup="hideFn">
      <view>
        <form>
          <view class="cell_top">新增店铺相册</view>
          <view class="uni-list" style="background-color: none;">
            <view class="uni-list-cell">
              <label>相册姓名</label>
              <view class="">
                <input class="uni-input" v-model="img_cat" placeholder="请输入" />
              </view>
            </view>
          </view>


          <view style="display: flex;">
            <view class="btn btn1" @tap="formSubmit">提交</view>
            <view class="btn" @tap="hideFn">取消</view>
            <!-- <button style="" formType="submit" type="primary">提交</button>
                		<button style="" formType="reset" type="default" >取消</button> -->
          </view>

        </form>

      </view>
    </uni-popup>



    <!-- 长按弹窗 -->
    <uni-popup :show="showPopupMiddle" type="bottom" v-on:hidePopup="hidePopupFn" class="pop">
      <!-- <view class="" > -->
      <button style="border-radius: 0;" type="warn" @tap="deleteFn">删除当前相册</button>

    </uni-popup>
  </view>

</template>
<script>
  
  import uniPopup from "@/components/uni-popup.vue"


  export default {
    components: {
      uniPopup
    },

    data() {
      return {
        select_index: '',
        showPopupMiddle: false,

        img_cat: '',
        pop_show: false,

        form_data: {},





      }
    },
    onShow() {

      // uni.showLoading()
      this.getData()
    },


    methods: {
      getData() {
        var _this = this

        this.$util.ajax_uni({
          url: 'merchants/adimg/selImg',
          data: {
            img_id: _this.form_data
          },
          success: function(res) {
            console.log("返回相册-----态res:", JSON.stringify(res));
            if (res.data.status == 1) {
              _this.form_data = res.data.data;


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

      //统一的关闭popup方法
      hidePopupFn: function() {
        console.log('关闭')
        // uni.showToast({title: "duration 3000",duration: 1000})
        this.showPopupMiddle = false;
      },
      longTapFn(item) {
        console.log('-xuanzhong----111', item.id)
        this.select_index = item.id
        this.showPopupMiddle = true
      },
      deleteFn() {
        var _this = this
        console.log(1, _this.select_index)
        // return
        this.$util.ajax_uni({
          url: 'merchants/adimg/delImg',
          data: {
            img_id: _this.select_index
          },
          success: function(res) {
            console.log("返回--删除---态res:", res);
            if (res.data.status == 1) {
              

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



        this.showPopupMiddle = false
      },

      hideFn() {
        this.pop_show = false
      },
      showFn() {
        this.pop_show = true
      },
      goBack() {
        // uni.switchTab({url:'./user'});
        uni.navigateBack({
          url: './user'
        });
      },


      goDetail(e) {
        uni.navigateTo({
          url: "./shop_pic_detail?data=" + encodeURIComponent(JSON.stringify(e))
        })
      },

      formSubmit: function (e) {
        var _this=this
      	
      	console.log('shangchuanzuishuju--------------', _this.img_cat)
        
      	if(this.img_cat==""){
      		uni.showToast({title:"相册名称必填!",icon:'none'});
      		return false
      	}
      	
      	this.$util.ajax_uni({
      	  url: 'merchants/adimg/addImg',
      	  data: {
      	    img_cat:_this.img_cat
      	  },
      	  success: function(res) {
      	    console.log("返回数据状态res:", res);
      	    if (res.data.status == 1) {
      	
      	      uni.navigateBack({url:'./shop_pic'})
      	
      	      
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
      	
      	
      },
      
      
    }
  }
</script>

<style scoped="scoped">
  .index {
    flex: 1;
    width: 750upx;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #efeff4;
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    flex-direction: column;
  }

  .card {
    position: relative;
    width: 710upx;
    margin: 20upx 20upx 20upx 20upx;
    border-radius: 10upx;
    overflow: hidden;
    flex-direction: column;
    background-color: #FFFFFF;
  }

  .card-img {
    width: 710upx;
    height: 1065upx;
  }

  .card-num {
    color: #FFFFFF;
    font-size: 13px;
    text-align: center;
  }

  .card-num-view {
    background-color: #FF80AB;
    line-height: 1;
    display: inline-block;
    padding: 3px 6px;
    color: #FFFFFF;
    font-size: 12px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    position: absolute;
    top: 20upx;
    right: 20upx;
  }

  .card-bottm {
    justify-content: center;
    align-items: center;
  }

  .card-share-view {
    justify-content: center;
    align-items: center;
    padding: 14upx 0;
    color: #FF80AB;
    margin: 20upx 20upx 20upx;
    font-size: 30upx;
    font-family: texticons;
  }

  .card-share-view:before {
    content: '\e62d';
  }

  .car-title-view {
    flex: 1;
    padding: 14upx 0upx 14upx 20upx;
  }

  .card-title {
    flex: 1;
    font-size: 30upx;
    text-align: left;
    color: #555555;
    text-overflow: ellipsis;
    lines: 2;
    display: -webkit-box;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  /*双列表*/

  .card-list2 {
    width: 345upx;
    margin: 20upx 0 20upx 20upx;
  }

  .card-list2-img {
    width: 345upx;
    height: 517upx;
  }

  .card-list2-num-view {
    transform: scale(0.8);
    transform-origin: right;
  }

  .card-list2-num {
    font-size: 22upx;
  }

  .card-list2-title {
    font-size: 26upx;
  }


  .loadMore {
    font-size: 30upx;
    color: #555;
    margin-bottom: 20upx;
  }

  .uni-btn-v {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 92%;
    background-color: #fff;
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
