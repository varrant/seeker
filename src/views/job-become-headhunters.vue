<template>
<div class="job-become-headhunters">
  <div class="become_headhunters">
    <img src="../images/becomeheadhunters.png">
    <div class="immediately_become_headhunters">
      <button @click="becomeheadhunters()">立即成为猎头</button>
    </div>
  </div>
</div>

</template>

<script type="application/ecmascript">
import '../styles/sass/job-become-headhunters.scss';
import {
  Toast,
  Indicator
} from 'mint-ui';
export default {
  name: 'job-become-headhunters',
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {
    becomeheadhunters() {
      // console.info(window);
      window.location.href = 'http://hunter.91suzhi.com/#/register1';
    }
  }
};
</script>
