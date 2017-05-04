<template>
<div class="job-become-headhunters">
    <div class="become_headhunters">
      <img src="../images/becomeheadhunters.png">
      <div class="immediately_become_headhunters">
        <button @Click="becomeheadhunters()">工作意向</button>
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
    return {
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {
    becomeheadhunters() {

    }
  }
};
</script>
