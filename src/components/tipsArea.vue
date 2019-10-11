<template>
  <div class="tips-wrap">
    <div class="tips-unit">
      <div class="tips-title">今天</div>
      <div>{{today}}</div>
      <div v-for="(item,index) in todayList" :key="index">{{item.name}}{{item.recallMonth}}/{{item.recallDate}}</div>
    </div>
    <!--<div class="tips-unit">-->
      <!--<div class="tips-hr"></div>-->
    <!--</div>-->
    <div class="tips-unit">
      <div class="tips-title">最近</div>
      <div>{{week}}</div>
      <div v-for="(item,index) in recentList" :key="index">{{item.name}}{{item.recallMonth}}/{{item.recallDate}}</div>
    </div>
  </div>
</template>

<script>
  import {memoryDateRecent} from '../api'
  export default {
    name: 'TipsArea',
    data() {
      return {
          today:"",
          week:"",
        recentList:[],
        todayList:[]
      }
    },
    created() {
      this.getNow();
      this.getRecent();
    },
    methods:{
      getNow:function () {
        let moment=this.$moment();
        this.today=moment.format("YYYY-MM-DD")+moment.format("dddd");
        let nextMoment=this.$moment().add(1,'w');
        this.week="第"+moment.format("ww")+"~"+nextMoment.format("ww")+"周";
      },
      getRecent:function () {
        memoryDateRecent({end:14}).then(res=>{
          let recent=[],today=[];
          let arr=res.data.list;
          let time=this.$moment();
          let day=time.date();
          let month=time.month()+1;
          for(let i=0;i<arr.length;i++){
            let temp=arr[i];
            if(temp.recallDate===day&&temp.recallMonth===month){
              today.push(temp)
            }else {
              recent.push(temp)
            }
          }
          this.todayList=today;
          this.recentList=recent;
        })
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
