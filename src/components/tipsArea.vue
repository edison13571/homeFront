<template>
  <div class="tips-wrap">
    <div class="tips-unit">
      <div class="tips-title">今天</div>
      <div>{{today}}</div>
    </div>
    <!--<div class="tips-unit">-->
      <!--<div class="tips-hr"></div>-->
    <!--</div>-->
    <div class="tips-unit">
      <div class="tips-title">最近</div>
      <div>{{week}}</div>
    </div>
  </div>
</template>

<script>
  // let moment=require('moment')
  export default {
    name: 'TipsArea',
    data() {
      return {
          today:"",
          week:""
      }
    },
    created() {
      this.getNow()
    },
    methods:{
      getNow:function () {
        let moment=this.$moment();
        this.today=moment.format("YYYY-MM-DD")+moment.format("dddd");
        this.week="第"+moment.format("ww")+"周"
      }
    }
  }
</script>

<style scoped>
  .tips-wrap{
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: center;
    align-items: start;
    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
    color: #b5cfd8;
  }
  .tips-unit{
    flex: 1;
  }
</style>
