<template>
  <div class="main">

    <div class="links-wrap">
      <div>阅读 总数：{{Books}}</div>
      <div id="mainBooks" style="width: 800px;height:300px;"></div>
    </div>
    <div class="links-wrap">
      <div>观影 总数：{{Movie}}</div>
      <div id="mainMovie" style="width: 800px;height:300px;"></div>
    </div>
    <NavBottom/>
  </div>
</template>

<script>
  import {booksStats,ticketsStats,issuesStats} from "../../api"
  import {createTimeSeries,dateList} from "../../utils/timeSeries"
  import NavBottom from "../../components/navBottom"
    export default {
        name: "stats-index",
      components: {NavBottom},
      data(){
          return{
            Books:0,
            Movie:0
          }
      },
      mounted(){
          this.getBooks();
          this.getMovie();
          // this.getIssues();
      },
      methods:{
          getIssues(){
            issuesStats({}).then(res=>{
              console.log(res)
            })
          },
          getBooks(){
            booksStats({type:"看过"}).then(res=>{
              let arr=res.data.list;
              this.showChart(arr,"Books")
            })
          },
        getMovie(){
          ticketsStats({}).then(res=>{
            let arr=res.data.list;
            this.showChart(arr,"Movie")
          })
        },
        monthCal(arr){
            let now=this.$moment();
            let start=now.startOf('year').valueOf();
            let end=now.endOf('year').valueOf();
          let finArr=[];
          arr.map(item=>{
            item.useDate.map(unit=>{
              let timestamp=parseInt(unit);
              if(timestamp>=start&&timestamp<=end){
                finArr.push({timestamp:timestamp,name:item.name})
              }

            })
          })
          let obj=createTimeSeries(finArr,"timestamp");
          let month=obj.groupByMonth();
          return month.map
        },
        showChart(arr,name){
          let myChart = echarts.init(document.getElementById('main'+name));
          let obj=this.monthCal(arr);
          let now=this.$moment().format("YYYY");
          let fin=[];
          let total=0;
          for(let i=1;i<=12;i++){
            let number=i<10?"0"+i:""+i;
            let key=now+"-"+number;
            if(obj[key]){
              total+=obj[key].length
            }
            fin.push(obj[key]?obj[key].length:0)
          }
          this[name]=total

          // let lastWeek=this.dayForLastWeek.map(item=>item.number)
          // 指定图表的配置项和数据
          let option = {
            tooltip: {},
            legend: {
              data:['今年']
            },
            xAxis: {
              data: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
            },
            yAxis: {},
            series: [{
              name: '今年',
              type: 'bar',
              data: fin
            }],
            color: ['#B2DFEE','#F4A460']
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      }
    }
</script>

<style scoped>
  .main {
    text-align: center;
    padding-top: 80px;
  }


  .links-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }
</style>
