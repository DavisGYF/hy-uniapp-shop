<template>
    <view class="content" style="padding-bottom: 110upx;">
        <page-head title="结算信息" right_icon="compose" right_icon_url="./shop_settlement_edit" back_url="./user"></page-head>
        <form @submit="formSubmit" @reset="formReset">
            <view class="uni-list">
                
                <view class="uni-list-cell">
                    <view class="uni-title">结算信息</view>
                </view>
                <view class="uni-list-cell">
                    <view class="">开户人</view>
                    <view class="">{{shop_info.opening_name}}</view>
                </view>
                <view class="uni-list-cell">
                    <view class="">开户行</view>
                    <view class="">{{shop_info.opening_bank}}</view>
                </view>
                <view class="uni-list-cell">
                    <view class="">银行卡号</view>
                    <view class="">{{shop_info.Bank_card}}</view>
                </view>
                <view class="uni-list-cell">
                    <view class="">所属银行</view>
                    <view class="">{{shop_info.Bank_name}}</view>
                </view>
                <view class="uni-list-cell">
                    <view class="">身份证号</view>
                    <view class="">{{shop_info.opening_card}}</view>
                </view>
                <view class="uni-list-cell">
                    <view class="">预留手机号</view>
                    <view class="">{{shop_info.phone}}</view>
                </view>

                
            </view>
        </form>



        <!-- <view class="uni-btn-v">
			<button class="btn-submit" @tap="toFn" type="primary">编辑</button>
		</view> -->

    </view>
</template>
<script>
    var graceChecker = require("../../common/graceChecker.js");

    export default {
        data() {
            return {
                image1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548333482233&di=60b900e6a904442b001a7876b023bb9f&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F01%2F1518282998-waBQxRPASr.jpg',
                image3: 'https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu03-l.jpg',
                image2: 'http://img5.imgtn.bdimg.com/it/u=4242739171,2434290170&fm=26&gp=0.jpg',
                imageList: [],
                imageList1: [
                    'http://img5.imgtn.bdimg.com/it/u=4242739171,2434290170&fm=26&gp=0.jpg',
                    'http://life.southmoney.com/tuwen/UploadFiles_6871/201804/20180423165909445.jpg'
                ],
                uploaddata: {},
                shop_info:null,
            }
        },
        onShow() {
            this.getData()
            console.log('chancan ee===onShow')

            this.imageList = this.$store.state.img_list
            this.image1 = this.$store.state.img
        },
        onLoad() {
            console.log('onLoad ee===onLoad')
            // this.getOssParam()
            
        },
        onNavigationBarButtonTap(e) {
            console.log('333', e)
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

                            _this.shop_info = res.data.data

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
            toFn() {
                uni.navigateTo({
                    url: './shop_info_edit'
                });
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
                                let fileName = _this.uploaddata.dir + String(files[i].lastModified) +
                                    '_' + _this.randomString(6);
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
            formSubmit: function(e) {

                uni.navigateTo({
                    url: './shop_add2'
                });
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

    .uni-list-cell {
        padding: 24upx 36upx;
    }

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

    .uni-btn-v {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 92%;
        background-color: #fff;
    }
</style>
