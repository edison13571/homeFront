<template>
  <div class="habits-add">
    <div class="habits-add-wrap">
      <div class="habits-add-title">{{title}}/{{period==="day"?"每天":"每周"}}/{{target}}{{unit}}/{{theme}}</div>
<div class="chart-area">
  <!--<div>-->
    <div id="main" style="width: 400px;height:300px;"></div>
  <!--</div>-->

</div>

      <div >
        本周：<span class="data-main">{{thisWeek}}</span>/上周：<span class="data-area">{{lastWeek}}</span><span class="span"></span >本月：<span class="data-main">{{thisMonth}}</span>/上月：<span class="data-area">{{lastMonth}}</span>
      </div>

      <div class="habits-add-button">
        <div class="habits-add-button-unit" @click="cancel">关闭</div>
      </div>
    </div>


  </div>
</template>

<script>
import {habitsQueryRecord} from "../../../api";
import {createTimeSeries,dateList} from "../../../utils/timeSeries"
export default {
    name: 'habitsEdit',
    data() {
      return {
        id:"",
        title:"",
        type:"normal",
        state:2,
        period:"day",
        theme:"",
        target:"",
        unit:"",
        thisWeek:0,
        lastWeek:0,
        thisMonth:0,
        lastMonth:0,
        dayForThisWeek:[],
        dayForLastWeek:[]
      }
    },
    props:{
      info:{
        type:Object,
        default:function () {
          return{}
        }
      }
    },

    beforeMount() {
      let info=this.$props.info;
      this.unit=info.unit;
      this.state=info.state;
      this.period=info.period;
      this.type=info.type;
      this.target=info.target;
      this.title=info.title;
      this.theme=info.theme;
      this.id=info._id;
    },
  mounted(){
      this.getRecord()
  },
  methods:{
    cancel(){
      this.$emit('close')
    },
    getRecord(){
      habitsQueryRecord({id:this.id}).then(res=>{
        this.dataStats(res.data)
      })
    },
    dataStats(list){
      let timeObj=createTimeSeries(list,"finishDate");
      let dateData=timeObj.groupByDate();
      let weekData=timeObj.groupByWeek();
      let monthData=timeObj.groupByMonth();
      let dateStr=dateList();
      let today=this.$moment().format("YYYY-MM-DD");
      let todayIndex=dateStr.thisWeekDate.indexOf(today);
      let thisWeekDate=dateStr.thisWeekDate.slice(0,todayIndex+1);
      this.dayForThisWeek=thisWeekDate.map(item=>{
        return {time:item,number:dateData.sum(item,"finish")}
      });
      this.dayForLastWeek=dateStr.lastWeekDate.map(item=>{
        return {time:item,number:dateData.sum(item,"finish")}
      });
      this.thisWeek=weekData.sum(dateStr.thisWeek,"finish");
      this.lastWeek=weekData.sum(dateStr.lastWeek,"finish");
      this.thisMonth=monthData.sum(dateStr.thisMonth,"finish");
      this.lastMonth=monthData.sum(dateStr.lastMonth,"finish");
      this.showChart()
    },
    showChart(){
      let myChart = echarts.init(document.getElementById('main'));
      let thisWeek=this.dayForThisWeek.map(item=>item.number)
      let lastWeek=this.dayForLastWeek.map(item=>item.number)
      // 指定图表的配置项和数据
      let option = {
        tooltip: {},
        legend: {
          data:['本周','上周']
        },
        xAxis: {
          data: ["周一","周二","周三","周四","周五","周六","周日"]
        },
        yAxis: {},
        series: [{
          name: '上周',
          type: 'line',
          data: lastWeek
        },{
          name: '本周',
          type: 'line',
          data: thisWeek
        }],
        color: ['#B2DFEE','#F4A460']
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }


  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.habits-add{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:rgba(0,0,0,0.5);
  text-align: center;
}
  .habits-add-wrap{
    background: #e8ecf1;
    width: 600px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 20px;
  }
  .habits-add-title{
    margin-bottom: 20px;
  }
  .chart-area{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .data-main{
    color: #F4A460;
  }
  .data-area{
    color: #B2DFEE;
  }
  .span{
    margin-right: 20px;
  }
  .habits-add-unit{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .habits-add-unit-label{
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  .habits-add-unit-input{
    border: 0;
    outline: none;
    background: transparent;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
    width: 300px;
  }
  .habits-add-unit-button-wrap{
    display: flex;
  }
  .habits-add-unit-button{
    border-radius: 5px;
    border: 2px solid #ffffff;
    background: transparent;
    color: white;
    margin-right: 15px;
    font-size: 15px;
    padding: 2px 5px;
    cursor: pointer;
  }
  .button-active{
    border: 2px solid transparent;
    background: #7393a7;

    /*color: white;*/
  }
  .habits-add-button{
    margin: 0 auto;
    width:300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.habits-add-button-unit{
  cursor: pointer;
  margin: 20px 40px;
  background: #7393a7;
  color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>
