<template>
<div class="page-loadmore ">
  <div class="scoll-layer">
    <h1 class="page-title">Pull up</h1>
    <p class="page-loadmore-desc">在列表底部, 按住 - 上拉 - 释放可以获取更多数据</p>
    <p class="page-loadmore-desc">此例请使用手机查看</p>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="page-loadmore-list">
          <li v-for="item in list" class="page-loadmore-listitem" @click="toTaskDetail(item)">{{ item }}</li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">上拉加载</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
        <div :class="noMoreDate ? '':'bottom-arrow-hide'" style="text-align:center;margin-bottom:20px;font-size:16px;color:#9b9b9b">没有更多了!</div>
      </mt-loadmore>
    </div>
  </div>
</div>
</template>

<style lang='scss' rel="stylesheet/scss" type="text/css">
.page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px;
    &:last-of-type {
        border-bottom: solid 1px #eee;
    }
}

.page-loadmore-listitem {
    display: block;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
    text-align: center;
    &:first-child {
        border-top: solid 1px #eee;
    }
}

.page-loadmore-wrapper {
    z-index: 10;
    overflow: scroll;
}

.mint-loadmore-bottom {
    span {
        display: inline-block;
        transition: 0.2s linear;
        vertical-align: middle;
        .is-rotate {
            transform: rotate(180deg);
        }
    }
}
.bottom-arrow-hide {
    display: none;
}
</style>

<script type="text/babel">
export default {
  data() {
    return {
      iscrollConf: {
        mouseWheel: true,
        vScrollbar: true,
        click: false,
        preventDefault: true,
        tap: true,
        bounce: true,
        disableTouch: false,
        noMoreDate: false
      },
      list: [],
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0
    };
  },
  methods: {
    toTaskDetail(item) {
      this.$router.push({
        path: '/task-detail/' + item.id
      });
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      setTimeout(() => {
        let lastValue = this.list[this.list.length - 1];
        if (lastValue < 40) {
          for (let i = 1; i <= 10; i++) {
            this.list.push(lastValue + i);
          }
        } else {
          this.allLoaded = true;
          this.noMoreDate = true;
        }
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    }
  },
  created() {
    for (let i = 1; i <= 20; i++) {
      this.list.push(i);
    }
  },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>
