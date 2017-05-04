<template>
<div ref="tabs" class="tabs-customize" @touchmove="touchMove">
  <mt-tabbar v-model="selected" :class="[notShowTab ? 'not-show-tab' : '']" fixed>
    <mt-tab-item id="首页">
      <div class="mint-tab-item-icon"><i class="iconfont icon-shouyeshouye myicon" style="font-size:32px;"></i></div>
      <div>首页</div>
    </mt-tab-item>
    <mt-tab-item id="任务">
      <div class="mint-tab-item-icon"><i class="iconfont icon-renwu myicon" style="font-size:30px;"></i></div>
      <div>工作</div>
    </mt-tab-item>
    <mt-tab-item id="我的">
      <div class="mint-tab-item-icon"><i class="iconfont icon-wode myicon" style="font-size:28px;"></i></div>
      <div>我的</div>
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>
<style>
  .myIcon {
    font-size: 26px !important;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  .child-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
  .not-show-tab {
    display: none !important;
  }
  .tab-icon {
    font-size: 24px;
    display: block;
    padding-bottom: 6px;
    padding-top: 6px;
  }
  .tabs {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
  }
  .mint-tab-item-icon{
    width:32px !important;
  }
</style>
<script>
export default {
  data() {
    return {
      selected: '首页'
    };
  },
  computed: {
    notShowTab() {
      return this.$store.state.tabAndHeader.notShowTab;
    }
  },
  methods: {
    touchMove: function(evt) {
      evt.preventDefault();
    }
  },
  created() {
    if (this.$store.state.route.path === '/') {
      this.selected = '首页';
    } else if (this.$store.state.route.path === '/task-list') {
      this.selected = '任务';
    } else if (this.$store.state.route.path === '/my-center') {
      this.selected = '我的';
    }
    this.$store.dispatch('tabSwitcher', this.$store.state.tabAndHeader.notShowTab);
  },
  beforeUpdate() {
    // console.info(this.$store.state.route.path);
    if (this.$store.state.route.path === '/') {
      this.selected = '首页';
    } else if (this.$store.state.route.path === '/task-list') {
      this.selected = '任务';
    } else if (this.$store.state.route.path === '/my-center') {
      this.selected = '我的';
    }
  },
  watch: {
    selected: function(val) {
      if (val === '首页') {
        this.$router.push({
          path: '/'
        });
      } else if (val === '任务') {
        this.$router.push({
          path: '/task-list'
        });
      } else if (val === '我的') {
        this.$router.push({
          path: '/my-center'
        });
      }
    }
  }
};
</script>
