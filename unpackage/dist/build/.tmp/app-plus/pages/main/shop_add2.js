(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/shop_add2"],{"0b77":function(t,e,i){"use strict";i.r(e);var o=i("1a61"),n=i("b269");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("bb87");var a=i("2877"),r=Object(a["a"])(n["default"],o["a"],o["b"],!1,null,"174f25ad",null);e["default"]=r.exports},"0b89":function(t,e,i){"use strict";i("7297");var o=s(i("b0ce")),n=s(i("0b77"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,o.default)(n.default))},"1a61":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"content"},[i("form",{attrs:{eventid:"7179e039-5"},on:{submit:t.formSubmit,reset:t.formReset}},[i("view",{staticClass:"uni-list"},[i("view",{staticClass:"mapWrap"},[i("view",{staticClass:"iconWrap",attrs:{eventid:"7179e039-0"},on:{tap:t.choseLocation}},[i("uni-icon",{attrs:{type:"search",size:"30",mpcomid:"7179e039-0"}}),i("input",{staticClass:"uni-input",staticStyle:{"text-align":"left"},attrs:{disabled:"",placeholder:"搜索"}})],1),i("map",{staticStyle:{"z-index":"800"},attrs:{id:"myMap",hidden:!t.show_flag,latitude:t.shop_info.latitude,longitude:t.shop_info.longitude,markers:t.covers_markers,scale:"14","show-location":""}}),i("view",{staticStyle:{height:"600rpx",width:"100%","background-color":"#FFFFFF"},attrs:{hidden:t.show_flag}})],1),i("view",{staticClass:"uni-list-cell",staticStyle:{"text-align":"center"}},[t._v("(默认当前地址为店铺地址)")]),i("view",{staticClass:"uni-list-cell"},[t._v("省/市/区"),i("view",{attrs:{eventid:"7179e039-1"},on:{click:t.selectcity}},[""==t.shop_info.province?i("view",[t._v("请选择")]):t._e(),i("view",[t._v(t._s(t.shop_info.province)+" "+t._s(t.shop_info.city)+" "+t._s(t.shop_info.district))])])]),i("view",{staticClass:"infoWarp"},[t._v("详细地址"),i("view",{},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.shop_info.address,expression:"shop_info.address"}],staticStyle:{height:"120rpx"},attrs:{name:"address",placeholder:"请输入",eventid:"7179e039-2"},domProps:{value:t.shop_info.address},on:{input:function(e){e.target.composing||(t.shop_info.address=e.target.value)}}})])]),i("view",{staticClass:"infoWarp"},[t._v("店铺简介"),i("view",{},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.shop_info.info,expression:"shop_info.info"}],attrs:{name:"info",placeholder:"请输入",eventid:"7179e039-3"},domProps:{value:t.shop_info.info},on:{input:function(e){e.target.composing||(t.shop_info.info=e.target.value)}}})])])]),i("mpvue-city-picker",{ref:"mpvueCityPicker",attrs:{themeColor:"#007AFF",eventid:"7179e039-4",mpcomid:"7179e039-1"},on:{onCancel:t.onCancel,onConfirm:t.onConfirm}}),i("view",{staticClass:"uni-btn-v"},[i("button",{staticClass:"btn-submit",attrs:{formType:"submit",type:"primary"}},[t._v("下一步")])],1)],1)],1)},n=[];i.d(e,"a",function(){return o}),i.d(e,"b",function(){return n})},2750:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=s(i("a34a")),n=s(i("f493"));function s(t){return t&&t.__esModule?t:{default:t}}function a(t,e,i,o,n,s,a){try{var r=t[s](a),c=r.value}catch(l){return void i(l)}r.done?e(c):Promise.resolve(c).then(o,n)}function r(t){return function(){var e=this,i=arguments;return new Promise(function(o,n){var s=t.apply(e,i);function r(t){a(s,o,n,r,c,"next",t)}function c(t){a(s,o,n,r,c,"throw",t)}r(void 0)})}}var c=i("7389"),l={components:{mpvueCityPicker:n.default},data:function(){return{show_flag:!0,shop_info:{province:"",city:"",district:"",province_id:"",city_id:"",district_id:"",latitude:null,longitude:null,info:"",address:""},store_info:"",store_status_arr:["休息中","正常营业","已关店"],index1:2,index3:2,time:"12:01",array:["中国","美国","巴西","日本"],array1:["星期一","星期二","星期三","星期四"],covers_markers:[],mapCtx:null}},onLoad:function(t){console.log("chancan ee===",t),this.imageList=[],this.getLocation(),this.$store.state.form_data2.province_id&&(this.shop_info=this.$store.state.form_data2)},methods:{selectcity:function(){this.show_flag=!1,this.$refs.mpvueCityPicker.show()},onConfirm:function(t){this.show_flag=!0,console.log(JSON.stringify(t));var e=t.label.split("-");this.shop_info.province=e[0],this.shop_info.city=e[1],this.shop_info.district=e[2],this.shop_info.province_id=t.provinceCode,this.shop_info.city_id=t.cityCode,this.shop_info.district_id=t.districtCode},onCancel:function(t){console.log(t)},choseLocation:function(){var e=this;console.log("位置名称：--------"),t.chooseLocation({success:function(t){console.log("位置名称："+t.name),console.log("详细地址："+t.address),console.log("纬度："+t.latitude),console.log("经度："+t.longitude),e.shop_info.longitude=t.longitude,e.shop_info.latitude=t.latitude,e.shop_info.address=t.address,e.covers_markers.pop(),e.covers_markers.push({latitude:t.latitude,longitude:t.longitude,label:{content:t.name}})}})},getLocation:function(){var e=this;t.getLocation({type:"gcj02",success:function(t){console.log("当前位置的经度："+t.longitude,JSON.stringify(t)),console.log("当前位置的纬度："+t.latitude),e.shop_info.longitude=t.longitude,e.shop_info.latitude=t.latitude,e.covers_markers.push({latitude:t.latitude,longitude:t.longitude})},fail:function(t){console.log("res-fail",t)}})},bindTimeChange:function(t){this.time=t.target.value},formReset:function(t){console.log("清空数据"),this.chosen=""},chooseImage1:function(){var e=r(o.default.mark(function e(){var i=this;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t.chooseImage({count:1,success:function(t){console.log("res----",t),i.image1=t.tempFilePaths[0]}});case 1:case"end":return e.stop()}},e,this)}));function i(){return e.apply(this,arguments)}return i}(),countChange:function(t){this.countIndex=t.target.value},chooseImage:function(){var e=r(o.default.mark(function e(){var i,n=this;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(9!==this.imageList.length){e.next=7;break}return e.next=3,this.isFullImg();case 3:if(i=e.sent,console.log("是否继续?",i),i){e.next=7;break}return e.abrupt("return");case 7:t.chooseImage({count:9-this.imageList.length,success:function(t){n.imageList=n.imageList.concat(t.tempFilePaths)}});case 8:case"end":return e.stop()}},e,this)}));function i(){return e.apply(this,arguments)}return i}(),isFullImg:function(){var e=this;return new Promise(function(i){t.showModal({content:"已经有9张图片了,是否清空现有图片？",success:function(t){t.confirm?(e.imageList=[],i(!0)):i(!1)},fail:function(){i(!1)}})})},previewImage:function(e,i){console.log("ee",e,i),t.navigateTo({url:"./img_detail?data="+e+"&&inx="+i})},formSubmit:function(e){var i=[{name:"info",checkType:"notnull",checkRule:"",errorMsg:"店铺简介不能空"},{name:"address",checkType:"notnull",checkRule:"",errorMsg:"详细地址不能空"}],o=e.detail.value,n=c.check(o,i);if(n){if(""==this.shop_info.district_id)return t.showToast({title:"请选择省市区!",icon:"none"}),!1;this.$store.commit("changeFormData2",this.shop_info),console.log("kankanjinqumei",this.$store.state),t.navigateTo({url:"./shop_add3"})}else t.showToast({title:c.error,icon:"none"})}}};e.default=l}).call(this,i("649d")["default"])},"82d3":function(t,e,i){},b269:function(t,e,i){"use strict";i.r(e);var o=i("2750"),n=i.n(o);for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);e["default"]=n.a},bb87:function(t,e,i){"use strict";var o=i("82d3"),n=i.n(o);n.a}},[["0b89","common/runtime","common/vendor"]]]);