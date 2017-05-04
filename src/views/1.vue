<div class="item" v-for="orderItem in orderList" key="orderItem">
  <mt-cell class="bottom-border" :title="'订单编号:'+orderItem.head_order_id" :value="orderItem.create_time">
  </mt-cell>
  <div class="item-con">
    <div class="item-pic">
      <img :src="orderItem.image_url" alt="">
    </div>
    <div class="item-description">
      <div class="item-description-title">
        <span class="ico-part" v-if="(orderItem.task_type =='0')">兼职</span>
        <span class="ico-full" v-if="(orderItem.task_type =='1')">全职</span>
        <span class="ico-fieldwork" v-if="(orderItem.task_type =='2')">实习</span> {{orderItem.name}}
      </div>
      <div class="item-description-intro">
        <div class="item-description-intro-text introduce">
          {{orderItem.job_description}}
        </div>
        <span class="area">地区：{{orderItem.county_name}}</span>
        <span class="need">需求：{{orderItem.person_demand}}人</span>
      </div>
    </div>
    <div class="item-price">{{orderItem.commission}}元</div>
  </div>
  <div class="clearbox"></div>
  <div v-if="(orderItem.is_off_shelved == '1')">
    <div class="btn-group">
      <div class="btn-group-inner">
        <mt-button size="small" plain>已下架</mt-button>
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="(orderItem.is_cancled=='0')">
      <div class="btn-group">
        <div class="btn-group-inner">
          <mt-button size="small" plain @click="cancelTask(orderItem.task_id,orderItem.head_order_id)">取消任务</mt-button>
          <mt-button size="small" plain style="margin-left:10px;" @click="startHire(orderItem.head_order_id)">查看二维码</mt-button>
        </div>
      </div>
    </div>
  </div>
  <div class="clearbox"></div>
  <div class="user-list" v-for="talentItem in orderItem.talent" key="talentItem">
    <mt-cell :title="talentItem.nickname" class="bottom-border" :value="talentItem.current_status">
      <img slot="icon" :src="talentItem.avatar_url" width="35" height="35">
    </mt-cell>
    <!-- <mt-cell title="标题文字">
        <span>icon 是图片</span>
        <img slot="icon" src="../assets/100x100.png" width="24" height="24">
      </mt-cell> -->
  </div>
  <!-- <div class="user-list" ref="lis">
      <mt-cell :title="item.talent.nickname" v-for="(list, key) in item.talent" :key="list.id" class="bottom-border" :value="current_status">
        <img slot="icon" :src="item.talent.avatar_url" width="35" height="35">
      </mt-cell>
    </div>
    <div class="btn-collapse" @click="collapse">
      <span v-text="txt">展开</span>
      <i v-bind:class="['icon-arrow',isDown ? 'down' : 'up']"></i>
    </div> -->
</div>
<div style="height:100px;"></div>
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
// .my-order-list-nav {
//     position: relative;
// }
// .scoll-layer {
//     position: absolute;
//     bottom: 0;
//     width: 100%;
//     left: 0;
//     top: 47px;
//     overflow: hidden;
// }
</style>
<p v-for = "n in 100" >{{n}}</p>
