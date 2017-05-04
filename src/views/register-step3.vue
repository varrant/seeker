<template>
<div>
  <mt-field ref="nick" label="昵称" v-model="nickname" placeholder="请输入昵称"></mt-field>
  <!-- <mt-field readonly v-model="sex" readonly label="性别">
  </mt-field> -->
  <!-- <mt-radio class="sex-radio" title="性别" v-model="sex" :options="['男', '女']">
  </mt-radio> -->
  <mt-field label="生日" v-model="birthday" placeholder="请输入生日" type="date"></mt-field>
  <mt-field label="入学年份" v-model="startYear" placeholder="入学年份" type="date"></mt-field>
  <mt-field readonly label="性别" v-model="sex" placeholder="请输入性别" @click.native="chooseGender()">
  </mt-field>
  <mt-popup v-model="genderPopup" position="bottom" class="mint-popup-4">
    <mt-picker :slots="sexSlot" @change="onGenderChange"></mt-picker>
  </mt-popup>
  <mt-field label="职业" v-model="Career" placeholder="请输入职业"></mt-field>
  <mt-field label="学校" v-model="school" placeholder="请输入学校"></mt-field>
  <mt-field label="专业" v-model="profession" placeholder="请输入专业"></mt-field>

  <!-- <mt-datetime-picker ref="pickerAll" v-model="pickerBirthday" @confirm="pickerBirthdayConfirm" type="date" :start-date="cpStartDate" :end-date="cpEndDate" year-format=" {value} 年 " month-format="{value} 月 " date-format="{value} 日 ">
  </mt-datetime-picker>
  <mt-popup v-model="yearPopup" position="bottom" class="mint-popup-4">
    <mt-picker :slots="yearSlot" @change="onYearChange" :visible-item-count="5"></mt-picker>
  </mt-popup> -->
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/register.scss';
import moment from 'moment';
import {
  Toast
} from 'mint-ui';
export default {
  name: 'register3',
  data() {
    return {
      nickname: '',
      sex: '',
      birthday: '1998-09-01',
      pickerBirthday: null,
      Career: '',
      school: '',
      profession: '',
      startYear: '1998-09-01',
      pickerYear: null,
      genderPopup: false,
      yearPopup: false,
      sexSlot: [{
        flex: 1,
        values: ['男', '女'],
        className: 'slot1'
      }],
      yearSlot: [{
        flex: 1,
        defaultIndex: 6,
        values: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        className: 'slot1'
      }]
    };
  },
  mounted() {
  },
  computed: {
    cpStartDate() {
      let thisDate = new Date();
      let startYear = parseInt(thisDate.getFullYear(), 10) - 40;
      let tempStartDate = new Date();
      tempStartDate.setFullYear(startYear);
      return tempStartDate;
    },
    cpEndDate() {
      return new Date();
    }
  },
  methods: {
    chooseYear() {
      // this.$refs.pickerYear.open();
      this.yearPopup = true;
    },
    onYearChange(picker, values) {
      this.startYear = values[0];
    },
    chooseGender() {
      this.$refs.nick.$el.onfocus = false;
      this.genderPopup = true;
      console.info(this.$refs.nick);
    },
    onGenderChange(picker, values) {
      this.sex = values[0];
    },
    chooseBirth() {
      this.$refs.pickerAll.open();
    },
    pickerBirthdayConfirm() {
      // 引用momont时间转换
      let birthTime = moment(this.pickerBirthday).format().substr(0, 10);
      this.birthday = birthTime;
    },
    pickerYearConfirm() {
      this.startYear = this.pickerYear;
    },
    register3() {
      // var vm = this;
      let he_carid = this.registerModel.he_carid;
      let he_name = this.registerModel.he_name;
      if (he_carid === '' || he_carid === null) {
        Toast({
          message: '身份证不能为空！',
          position: 'bottom',
          duration: 5000
        });
        return;
      } else if (he_name === '' || he_name === null) {
        Toast({
          message: '姓名不能为空！',
          position: 'bottom',
          duration: 5000
        });
        return;
      }
      this.registerAjax();
    },
    registerAjax() {

    },
    getMsgAjax() {
    },
    sendSms() {
      // var vm = this;
      let phone = this.loginModel.phone;
      if (phone === '' || phone === null) {
        // showRemindbox("手机号不能为空！");
        Toast({
          message: '手机号不能为空！',
          position: 'bottom',
          duration: 5000
        });
        return;
      } else {
        this.getMsgAjax();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
.mint-popup-4 {
    width: 100%;
    .picker-item,
    .picker-slot-wrapper {
        backface-visibility: hidden;
    }
}
</style>
