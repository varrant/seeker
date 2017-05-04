<template>
<div class="index paid-plans groundGray">
  <div class="scoll-layer">
    <div class="list_li paid-plans-li">
      <ul>
        <li>
          <label for="invitationCode">
            <div class="list_word">
              <div class="list_img page-checklist">
                <input type="radio" id="invitationCode" value="0" name="person" v-model="picked"><i></i>
              </div>
              <div><h3>邀请码</h3></div>
              <span class="price"></span>
              <div class="list_num">
                <!-- <div class="paid-plans-post">兼职/实习</div> -->
                <div class="list_view">
                  <a>&nbsp;</a>
                </div>
              </div>
            </div>
          </label>
        </li>
        <li>
          <label for="junior">
            <div class="list_word">
              <div class="list_img page-checklist">
                <input type="radio" id="junior" value="1" name="person" v-model="picked"><i></i>
              </div>
              <h3>初级猎头<span class="price">免费</span></h3>
              <!-- <div><h3>初级猎头</h3></div>
              <span class="price">免费</span> -->
              <div class="list_num">
                <!-- <div class="paid-plans-post">兼职/实习</div> -->
                <div class="list_view">
                  <a>了解更多</a>
                </div>
              </div>
            </div>
          </label>
        </li>
        <li>
          <label for="intermediate">
            <div class="list_word">
              <div class="list_img page-checklist">
                <input type="radio" id="intermediate" value="2" name="person" v-model="picked"><i></i>
              </div>
              <h3>中级猎头<span class="price">99元</span></h3>
              <div class="list_num">
                <!-- <div class="paid-plans-post">兼职/实习</div> -->
                <div class="list_view">
                  <a>了解更多</a>
                </div>
              </div>
            </div>
          </label>
        </li>
        <li>
          <label for="advanced">
            <div class="list_word">
              <div class="list_img page-checklist">
                <input type="radio" id="advanced" value="3" name="person" v-model="picked"><i></i>
              </div>
              <h3>高级猎头<span class="price">500元</span></h3>
              <div class="list_num">
                <!-- <div class="paid-plans-post">兼职/实习</div> -->
                <div class="list_view">
                  <a href="javascript:void(0);">了解更多</a>
                </div>
              </div>
            </div>
          </label>
        </li>
      </ul>
    </div>
    <div class="btn_fix_bottom">
      <mt-button type="danger" size="large" @click.native="pay">确认支付{{picked}}</mt-button>
    </div>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/paid-plans.scss';
import wx from 'weixin-js-sdk';
import {
  Toast,
  MessageBox
} from 'mint-ui';
export default {
  name: 'page-checklist',
  data() {
    return {
      picked: '',
      urlType: '',
      id: {

      }
    };
  },
  created() {},
  methods: {
    //调用微信JS api 支付
    callpay(data) {
      const jsApiList = [
        'chooseWXPay'
      ];
      let mydata = JSON.parse(data);
      wx.config({
        // debug: true,
        appId: mydata.appId,
        // 必填，公众号的唯一标识
        timestamp: mydata.timeStamp,
        // 必填，生成签名的时间戳
        nonceStr: mydata.nonceStr,
        // 必填，生成签名的随机串
        signature: mydata.paySign,
        // 必填，签名，见附录1
        jsApiList: jsApiList
      });
      wx.chooseWXPay({
        appId: mydata.appId,
        timestamp: mydata.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: mydata.nonceStr, // 支付签名随机串，不长于 32 位
        package: mydata.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: mydata.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: mydata.paySign, // 支付签名
        success: function(res) {
          // 支付成功后的回调函数
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            MessageBox.alert('添加成功!').then(action => {
              this.$router.push({
                path: '/'
              });
            });
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            // message: "已取消微信支付!"
            MessageBox.alert('已取消支付!').then(action => {});
          } else {
            MessageBox.alert('未知状态!').then(action => {});
          }
        }
      });
    },
    pay() {
      // 如果是邀请码
      if (this.picked === '0') {
        this.$router.push({
          path: '/coupon'
        });
      }
      let params;
      // 非邀请码
      if (this.picked === '1') {
        this.urlType = this.$store.state.api.free_pay;
        params = {
          token: this.$store.state.auth.token,
          type: this.picked
        };
      } else {
        this.urlType = this.$store.state.api.wxpay;
        params = {
          token: this.$store.state.auth.token,
          type: this.picked,
          pay_type: 1
        };
      }
      this.axios.post(this.urlType, params)
        .then(response => {
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            if (this.picked === '1') {
              this.$router.push({
                path: '/'
              });
            } else {
              // 微信支付接口回调函数
              let data = response.data.data;
              console.info(data);
              this.callpay(data);
            }
          }
        }).catch(function(error) {
          console.log(error);
          Toast({
            message: '连接失败！',
            position: 'bottom',
            duration: 5000
          });
        });
    }
  }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
.list_word h3 {
    display: block;
    font-size: 20px;
    color: #333;
    height: 23px;
    line-height: 55px;
    overflow: visible;
}
</style>
