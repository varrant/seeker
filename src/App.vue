<!-- <template>
<div id="view">
  <transition :name="transitionName" mode="out-in">
    <router-view class="child-view"></router-view>
  </transition>
</div>
</template>

<script type="text/babel">
import './styles/sass/App.scss';
export default {
  data() {
    return {
      transitionName: 'slide-right'
    };
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right';
    }
  }
};
</script>
 -->
 <template>
<div id="app">
  <div class="views">
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
    <tab></tab>
  </div>
</div>
</template>

<script>
import * as types from './vuex/mutation-types';
import {
  mapState
} from 'vuex';
import Tab from './components/tabs.vue';
export default {
  name: 'app',
  components: {
    Tab
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  computed: mapState({}),
  methods: {
    logout() {
      this.$store.commit(types.LOGOUT);
      this.$router.push({
        path: '/'
      });
    }
  }
};
</script>

<style lang="scss">@import "assets/css.css";
@import "assets/icon.css";

#app {
    // font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-family: "Segoe UI","Lucida Grande",Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.views{
  width: 100%;
  height: 100%;
      -webkit-transition: all .2s ease;
    transition: all .2s ease;
    position: absolute;
    top: 0;
    left: 0;
}

.container {
    width: 1000px;
    margin: 0 auto;
}
.left {
    float: left;
    text-align: left;
}
.right {
    float: right;
}

.md-toolbar .title {
    vertical-align: text-top;
    margin-left: 5px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    // margin: 0 10px;
}

</style>
