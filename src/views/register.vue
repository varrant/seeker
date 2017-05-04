<template>
<div id="register">
  <mt-field class="input" ref="nick" label="昵称" v-model="nickname" placeholder="请输入昵称"></mt-field>
  <mt-field label="生日" v-model="birthday" placeholder="请输入生日" type="date"></mt-field>
  <mt-field readonly ref="sexRef" label="性别"
   v-model="sex" placeholder="请输入性别"  @click.native="chooseGender()">
  </mt-field>
  性别：<select data-name="应聘职位">
    <option value="研发工程师JAVA">研发工程师JAVA</option>
    <option value="数据研发工程师">数据研发工程师</option>
    <option value="前端开发工程师">前端开发工程师</option>
    <option value="测试开发工程师">测试开发工程师</option>
    <option value="算法工程师">算法工程师</option>
    <option value="算法工程师机器学习">算法工程师机器学习</option>
    <option value="算法工程师自然语言处理">算法工程师自然语言处理</option>
    <option value="客户端开发工程师">客户端开发工程师</option>
    <option value="交互设计师">交互设计师</option>
    <option value="视觉设计师">视觉设计师</option>
  </select>
  <div>
    <ul>
      <li style="width:32%;border-right:1px solid #000">
        <select>
          <option value="研发工程师JAVA">研发工程师JAVA</option>
          <option value="数据研发工程师">数据研发工程师</option>
          <option value="前端开发工程师">前端开发工程师</option>
        </select>
      </li>
      <li style="width:32%">
        <select>
          <option value="研发工程师JAVA">研发工程师JAVA</option>
          <option value="数据研发工程师">数据研发工程师</option>
          <option value="前端开发工程师">前端开发工程师</option>
        </select>
      </li>
      <li style="width:32%">
        <select>
          <option value="研发工程师JAVA">研发工程师JAVA</option>
          <option value="数据研发工程师">数据研发工程师</option>
          <option value="前端开发工程师">前端开发工程师</option>
        </select>
      </li>
    </ul>

  </div>
  <!-- <input type="button" value="222" ref="sexRef" @click="chooseGender()"/> -->
  <mt-popup v-model="genderPopup" position="bottom" pop-transition="popup-fade" class="mint-popup-4">
    <mt-picker :slots="sexSlot" @change="onGenderChange"></mt-picker>
  </mt-popup>
</div>
</template>

<script type="application/ecmascript">
export default {
  name: 'register',
  data() {
    return {
      nickname: '',
      sex: '',
      birthday: '1998-01-01',
      genderPopup: false,
      sexSlot: [{
        flex: 1,
        values: ['男', '女'],
        className: 'slot1'
      }]
    };
  },
  // beforeCreate() {
  //   document.querySelector('body').addEventListener('touchend', function(e) {
  //     // console.info(e);
  //     document.querySelector('.mint-field-core').blur();
  //     if (e.target.className === 'mint-field-core') {
  //       document.querySelector('.mint-field-core').blur();
  //     }
  //   });
  // },
  methods: {
    test() {},
    chooseGender() {
      // this.$refs.nick.blur();
      console.info(this.$refs.nick.$refs.input);
      console.info(this.$refs.sexRef);
      // this.$refs.nick.$refs.input.blur();
      this.$refs.sexRef.$refs.input.focus();
      // this.$refs.sexRef.focus();
      this.genderPopup = true;
    },
    onGenderChange(picker, values) {
      this.sex = values[0];
    }
  }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
.mint-popup-4 {
    width: 100%;
    .picker-item,
    .picker-slot-wrapper {
        backface-visibility: hidden;
    }
}
select {
    /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
    border: none;
    /*很关键：将默认的select选择框样式清除*/
    appearance: none;
    /*在选择框的最右侧中间显示小箭头图片*/
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 14px;
}
</style>
