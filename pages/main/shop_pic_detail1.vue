<template>
	<view class="index">
		<swiper @change="swpierChange" :style="{height:screenHeight + 'px'}">
			<swiper-item v-for="(value,index) in data" :key="index" @click="preImg(index)">
				<image :src="value" mode="widthFix"></image>
			</swiper-item>
		</swiper>

		<view class="detail-btn-view">
			<view class="uni_icon" @click="download">
				<uni-icon type="download" size="25"></uni-icon>
			</view>


			<!-- <view v-if="showBtn" class="setting" @click="setting">设为壁纸</view> -->

			<view  class="uni_icon" @click="collect">
				<uni-icon type="trash" size="25"></uni-icon>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgShow: false,
				index: 0,
				showBtn: false,
				screenHeight: 0,
				imgLength: 0,
				providerList: [],
				data: [],
				detailDec: ""
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			if (plus.os.name === 'Android') {
				this.showBtn = true;
			}
			// #endif

			console.log('e===', JSON.stringify(e))
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			this.detailDec = e.data;
			let data = JSON.parse(decodeURIComponent(e.data));
			this.imgLength = data.img_num;
			this.data.push(data.img_src);
			// this.getData(data.id);
			var newA = [
				"https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu01.jpg",
				"https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu02-l.jpg",
				"https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu03.jpg",
				"https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu04.jpg",
				"https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu05.jpg",
				"https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu01-l.jpg",
				"https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu07.jpg",
				"https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu03-l.jpg",
				"https:\/\/img-cdn-qiniu.dcloud.net.cn\/tuku\/img\/jianzhu09.jpg"
			]
			this.data = newA
			// this.data.concat(newA)

			console.log('---this.data--', this.data)

			uni.setNavigationBarTitle({
				title: "1/" + this.imgLength
			});
			// 获取分享通道
			uni.getProvider({
				service: "share",
				success: (e) => {
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
				}
			});
		},
		onShareAppMessage() {
			return {
				title: "欢迎使用uni-app看图模板",
				path: '/pages/main/shop_pic_detail?data=' + this.detailDec,
				imageUrl: this.data[this.index]
			}
		},
		onNavigationBarButtonTap(e) {
			console.log('333', e)
			uni.navigateTo({url: './shop_pic_detail_add'});
			
			return
			if (e.index === 1) {
				this.collect();
				return;
			}
			if (this.providerList.length === 0) {
				uni.showModal({
					title: "当前环境无分享渠道!",
					showCancel: false
				})
				return;
			}
			let itemList = this.providerList.map(function(value) {
				return value.name
			})
			uni.showActionSheet({
				itemList: itemList,
				success: (res) => {
					uni.share({
						provider: this.providerList[res.tapIndex].id,
						scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
							'WXSenceTimeline' : "WXSceneSession",
						type: 0,
						title: "uni-app模版",
						summary: "欢迎使用uni-app模版",
						imageUrl: this.data[this.index],
						href: "https://uniapp.dcloud.io",
						success: (res) => {
							console.log("success:" + JSON.stringify(res));
						},
						fail: (e) => {
							uni.showModal({
								content: e.errMsg,
								showCancel: false
							})
						}
					});
				}
			})
		},
		methods: {
			download() {
				uni.downloadFile({
					url: this.data[this.index],
					success: (e) => {
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
			collect() {
				uni.showToast({
					icon: "none",
					title: "点击删除"
				})
			},
			//#ifdef APP-PLUS
			setting() {
				uni.showToast({
					icon: "none",
					title: "正在设为壁纸"
				})
				setTimeout(() => {
					var WallpaperManager = plus.android.importClass("android.app.WallpaperManager");
					var Main = plus.android.runtimeMainActivity();
					var wallpaperManager = WallpaperManager.getInstance(Main);
					plus.android.importClass(wallpaperManager);
					var BitmapFactory = plus.android.importClass("android.graphics.BitmapFactory");
					uni.downloadFile({
						url: this.data[this.index],
						success: (e) => {
							var filePath = e.tempFilePath.replace("file://", "");
							var bitmap = BitmapFactory.decodeFile(filePath);
							try {
								wallpaperManager.setBitmap(bitmap);
								uni.showToast({
									icon: "none",
									title: "壁纸设置成功"
								})
							} catch (e) {
								uni.showToast({
									icon: "none",
									title: "壁纸设置失败"
								})
							}
						},
						fail: () => {
							uni.showToast({
								icon: "none",
								title: "壁纸设置失败"
							})
						}
					})
				}, 100)
			},
			//#endif
			swpierChange(e) {
				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + "/" + this.imgLength
				})
			},
			preImg(index) {
				if (this.imgShow) { //防止点击过快导致重复调用 
					return;
				}
				this.imgShow = true;
				setTimeout(() => {
					this.imgShow = false;
				}, 1000)
				setTimeout(() => {
					uni.previewImage({
						current: this.data[index],
						urls: this.data
					})
				}, 150)
			},
			getData(e) {
				uni.request({
					url: this.$serverUrl + "/api/picture/detail.php?id=" + e,
					success: (res) => {
						if (res.data.code !== 0) {
							uni.showModal({
								content: "请求失败，失败原因：" + res.data.msg,
								showCancel: false
							})
							return;
						}

						this.data = this.data.concat(res.data.data);
					},
					fail: () => {
						uni.showModal({
							content: "请求失败，请重试!",
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	page {
		background-color: #000;
	}

	swiper {
		flex: 1;
		width: 750upx;
		background-color: #000;
		display: flex;
		flex-direction: column;
	}

	swiper-item {
		display: flex;
		align-items: center;
	}

	image {
		width: 750upx;
		height: 1125upx;
	}

	/* 详情页面 */

	.detail-btn-view {
		width: 750upx;
		position: fixed;
		bottom: 75upx;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
	}


	.detail-btn-view view text {
		margin-left: 10upx;
	}

	.detail-btn-view .download:before {
		content: '\e617';
	}

	.detail-btn-view .collect:before {
		content: '\e68d';
	}

	.detail-btn-view .setting {
		flex: 1;
	}

	.detail-btn-view .download {
		background: #ff0000;
	}

	.detail-btn-view .uni_icon {
		display: flex;
		opacity: 0.75;
		height: 80upx;
		border-radius: 80upx;
		width: 80upx;
		justify-content: center;
		align-items: center;
		line-height: 80upx;
		margin: 0 30upx;
		font-family: texticons;
		background: #eee;
		color: #555;
	}
</style>
