<template>
  <div class="tips-wrap">
    <div class="tips-unit">
      <div class="tips-title">今天</div>
      <div>{{today}}</div>
      <div v-for="(item,index) in todayList" :key="index">
        <div v-if="item.unitType==='habits'&&item.schedule<item.target">{{item.title}}/{{item.target}}{{item.unit}}/已完成:{{item.schedule}}</div>
        <div v-if="item.unitType==='note'">{{item.name}}/{{item.leftTime}}</div>
        <div v-if="item.unitType==='memoryDate'">{{item.name}}{{item.recallMonth}}/{{item.recallDate}}</div>

      </div>
    </div>
    <!--<div class="tips-unit">-->
      <!--<div class="tips-hr"></div>-->
    <!--</div>-->
    <div class="tips-unit">
      <div class="tips-title">最近</div>
      <div>{{week}}</div>
      <div v-for="(item,index) in recentList" :key="index">
        <div v-if="item.unitType==='habits'&&item.schedule<item.target">{{item.title}}/{{item.target}}{{item.unit}}/已完成:{{item.schedule}}</div>
        <div v-if="item.unitType==='note'">{{item.name}}/{{item.leftTime}}</div>
        <div v-if="item.unitType==='memoryDate'">{{item.name}}{{item.recallMonth}}/{{item.recallDate}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {memoryDateRecent,noteList,habitsList} from '../api'
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
        this.today=moment.format("YYYY-MM-DD")+moment.format("dddd")+moment.format("a h:mm");
        let nextMoment=this.$moment().add(1,'w');
        this.week="第"+moment.format("ww")+"~"+nextMoment.format("ww")+"周";
      },
      getHabits(){
        let moment=this.$moment();
        let data={};
        data.state=2;
        if(inWorkTime(moment)){
          data.type="normal"
        }
        habitsList(data).then(res=>{
          let recent=[],today=[];
          let arr=res.data.list;
          for(let i=0;i<arr.length;i++){
            let temp=arr[i];
            temp.unitType="habits";
            if(temp.period==="day"){
              today.push(temp)
            }else if(temp.period==="week"){
              recent.push(temp)
            }
          }
          this.joinList(today,recent)
        });
        function inWorkTime(moment) {
          let day=moment.day();
          let hour=moment.hour();
          return (day<6&&day>0)&&(hour<=17&&hour>=10)
        }
      },
      getRecent:function () {
        this.getHabits();


        noteList({state:"todo"}).then(res=>{
          let recent=[],today=[];
          let arr=res.data.list;
          let todayLine=this.$moment().endOf("day").valueOf();
          let weeklyLine=this.$moment().add(1,'w').endOf('week').valueOf();
          for(let i=0;i<arr.length;i++){
            let temp=arr[i];
            temp.unitType="note";
            temp.leftTime=this.$moment(temp.deadline).fromNow(true);
            if(temp.deadline<=todayLine){
              today.push(temp)
            }else if(temp.deadline<=weeklyLine){
              recent.push(temp)
            }
          }
          this.joinList(today,recent)
        });

        memoryDateRecent({end:14}).then(res=>{
          let recent=[],today=[];
          let arr=res.data.list;
          let time=this.$moment();
          let day=time.date();
          let month=time.month()+1;
          for(let i=0;i<arr.length;i++){
            let temp=arr[i];
            temp.unitType="memoryDate";
            if(temp.recallDate===day&&temp.recallMonth===month){
              today.push(temp)
            }else {
              recent.push(temp)
            }
          }
          this.joinList(today,recent)
        })
      },
      joinList(today,recent){
        this.todayList=this.todayList.concat(today);
        this.recentList=this.recentList.concat(recent);
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
