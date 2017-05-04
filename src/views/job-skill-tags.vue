<template>
<div class="job-skill-tags groundGray">
  <div class="item clearbox">
    <mt-button size="small" type="danger" class="fl-right" @click="createTag">添加</mt-button>
    <div class="search-box"><input type="text" v-model="newTag"></div>
  </div>
  <div v-for="tag in tags">
    <div class="mt10">
      <div class="item clearbox ">
        <mt-button size="small" type="primary" class="fl-right" @click="deleteTag($index)">删除</mt-button>
        <div class="tags-box"><span>{{tag}}</span></div>
      </div>
    </div>
  </div>
  
   
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/job-skill-tags.scss';
// import * as types from '../vuex/mutation-types';

export default {
  name: '',
  data() {
    return {
      newTag :'',
      tags:[]
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {
   createTag(){
    if(!this.newTag){
      return false;
    }
    this.tags.push(this.newTag);
    this.newTag = '';
   },
   deleteTag(index){
     this.tags.splice(index,1);
   }
   
  }
};
</script>
