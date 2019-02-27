<template>
  <view class="content">
    <page-head title="店铺相册详情" right_icon="plusempty" :right_icon_url="right_icon_url"></page-head>
    <view class="uni-product-list" style="margin-top: 140upx;">
      <view class="uni-product" v-for="(item,index) in img_lists" :key="index" @tap="preImg(index)" @longpress="longTapFn(item,index)">
        <!--  deleteFn-->
        <view class="image-view">
          <image class="uni-product-image" mode="aspectFill" :src="item.img_url"></image>
        </view>
        <view class="uni-product-title">{{item.describe}}</view>
        <!-- <view class="uni-product-price">
					<text class="uni-product-price-favour">￥{{product.originalPrice}}</text>
					<text class="uni-product-price-original">￥{{product.favourPrice}}</text>
					<text class="uni-product-tip">{{product.tip}}</text>
				</view> -->
      </view>
    </view>
    <!-- 长按弹窗 -->
    <uni-popup :show="showPopupMiddle" type="bottom" v-on:hidePopup="hidePopup" class="pop">
      <!-- <view class="" > -->
      <button class="pop_button" type="warn" @tap="deleteFn">删除当前照片</button>
      <!-- <p></p> -->
      <button class="pop_button" type="primary" @tap="downloadFn">下载当前照片</button>
      <!-- </view> -->

    </uni-popup>


    <!-- <view class="uni-btn-v">
			<button class="btn-submit" @tap="toFn" type="primary">添加照片</button>
		</view> -->

  </view>
</template>

<script>
  import uniPopup from '../../components/uni-popup.vue';

  export default {
    components: {
      uniPopup
    },
    data() {
      return {
        pre_item: {},
        img_lists: [],
        album_id: '',
        showPopupMiddle: false,

        select_index: '',
        select_item: '',
        
        

        right_icon_url: './shop_pic_detail_add'
      };
    },
    onShow() {
      console.log('onshow')
      this.getData()
    },
    onLoad(e) {
      // console.log('上来餐', e.data)
      // this.img_lists = JSON.parse(e.data).img_list
      // this.pre_item = JSON.parse(e.data)album_id
      this.album_id = JSON.parse(e.data).id
      this.right_icon_url = "./shop_pic_detail_add?data=" + JSON.parse(e.data).id

    },
    onPullDownRefresh() {
      this.loadData('refresh');
      // 实际开发中通常是网络请求，加载完数据后就停止。这里仅做演示，加延迟为了体现出效果。
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 2000);
    },
    onReachBottom() {
      // this.loadData();
    },
    onNavigationBarButtonTap(e) {
      console.log('333', e)
      uni.navigateTo({
        url: './shop_pic_detail_add'
      });
    },
    methods: {
      getData() {
        var _this = this

        this.$util.ajax_uni({
          url: 'merchants/Adimg/selPicture',
          data: {
            img_id:this.album_id
          },
          success: function(res) {
            console.log("返回相pian-----s:",  JSON.stringify(res));
            if (res.data.status == 1) {
              _this.img_lists = res.data.data;


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
      

      toFn() {
        uni.navigateTo({
          url: './shop_pic_detail_add'
        });
      },
      //统一的关闭popup方法
      hidePopup: function() {
        console.log('关闭')
        // uni.showToast({title: "duration 3000",duration: 1000})
        this.showPopupMiddle = false;
      },
      deleteFn() {
        var _this = this
        console.log('shanchu ----id', _this.select_item)
        // return
        this.$util.ajax_uni({
          url: 'merchants/Adimg/delPicture',
          data: {
            id: _this.select_item.id
          },
          success: function(res) {
            console.log("返回-----态res:", res);
            if (res.data.status == 1) {
              // _this.form_data = res.data.data.data;
              _this.getData()

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



        this.showPopupMiddle = false
      },
      longTapFn(item, inx) {
        console.log('item id----', item.id)
        this.select_index = inx
        this.select_item = item
        this.showPopupMiddle = true
      },
      downloadFn() {
        let _this=this
        console.log('this.img_listsid----', this.img_lists,this.select_index)

        uni.downloadFile({
          url: _this.img_lists[_this.select_index].img_url,
          success: (e) => {
            this.showPopupMiddle = false

            uni.saveImageToPhotosAlbum({
              filePath: e.tempFilePath,
              success: () => {
                uni.showToast({
                  icon: "none",
                  title: "已保存到手机相册"
                })
              },
              fail: () => {
                uni.showToast({
                  icon: "none",
                  title: "保存到手机相册失败"
                })
              }
            });
          },
          fail: (e) => {
            uni.showModal({
              content: "下载失败，" + e.errMsg,
              showCancel: false
            })
          }
        })
      },
      preImg(index) {
        console.log(index, '------', this.img_lists[index].img_url, JSON.stringify(this.img_lists))


        var newA = []
        for (let item of this.img_lists) {
          newA.push(item.img_url)
        }
        // console.log('zu妆后',newA)
        // return
        if (this.imgShow) { //防止点击过快导致重复调用 
          return;
        }
        this.imgShow = true;
        setTimeout(() => {
          this.imgShow = false;
        }, 1000)
        setTimeout(() => {
          uni.previewImage({
            current: this.img_lists[index].img_url,
            urls: newA
          })
        }, 150)
      },

    },

  };
</script>

<style scoped="scoped">
  /* .uni-product {
		margin: 2upx;
	} */
  .uni-btn-v {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 92%;
    background-color: #fff;
  }

  .pop_button {
    border-radius: 0;
  }
</style>
