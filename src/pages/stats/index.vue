<template>
  <div class="main">
    <div class="links-wrap" v-loading="loading">
      <div>记忆 总数：{{RecallDate}} 日均：{{dayAvg(RecallDate)}}</div>
      <div id="mainRecallDate" style="width: 800px;height:300px;"></div>
    </div>
    <div class="links-wrap" v-loading="loading">
      <div>练习 总数：{{IssueDate}} 日均：{{dayAvg(IssueDate)}}</div>
      <div id="mainIssueDate" style="width: 800px;height:300px;"></div>
    </div>
    <div class="links-wrap" v-loading="loading">
      <div>创建 总数：{{CreateNumber}} 日均：{{dayAvg(CreateNumber)}}</div>
      <div id="mainCreateNumber" style="width: 800px;height:300px;"></div>
    </div>
    <div class="links-wrap">
      <div>阅读 总数：{{Books}} 月均：{{monthAvg(Books)}}</div>
      <div id="mainBooks" style="width: 800px;height:300px;"></div>
    </div>
    <div class="links-wrap">
      <div>观影 总数：{{Movie}} 月均：{{monthAvg(Movie)}}</div>
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
            Movie:0,
            IssueDate:0,
            RecallDate:0,
            CreateNumber:0,
            loading:true
          }
      },
      mounted(){

          this.getBooks();
          this.getMovie();
          this.getIssues();
      },
      methods:{
          dayAvg(total){
            let endDate=this.$moment().endOf('month').get('date');
            return total>0?Math.floor(total/endDate):0
          },
        monthAvg(total){
          let endDate=this.$moment().get('month');
          return total>0?Math.round(total/endDate):0
        },
          getIssues(){
            issuesStats({type:"recall"}).then(res=>{
              let arr=res.data.list;
              this.showChartDate(arr,"IssueDate","reciteRecords")
              this.showChartDate(arr,"RecallDate","recallRecords")
              let objData=this.dateCal(arr)
              this.showChartDate(arr,"CreateNumber","CreateNumber",objData)
              // let data=this.issueCal(arr);
              // console.log(data)
            })
          },
          getBooks(){
            booksStats({type:"看过"}).then(res=>{
              let arr=res.data.list;
              this.showChart(arr,"Books")
            })
          },
        getMovie(){
          ticketsStats({type:"电影"}).then(res=>{
            let arr=res.data.list;
            this.showChart(arr,"Movie")
          })
        },
        issueCal(arr,name){
          let now=this.$moment();
          let start=now.startOf('month').valueOf();
          let end=now.endOf('month').valueOf();
          let finArr=[];
          arr.map(item=>{
            if(item[name]&&item[name].length>0){
              item[name].map(unit=>{
                let timestamp=parseInt(unit);
                if(timestamp>=start&&timestamp<=end){
                  finArr.push({timestamp:timestamp,name:item.reciteType})
                }

              })
            }

          });
          let obj=createTimeSeries(finArr,"timestamp");
          let day=obj.groupByDate();
          return day.map
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
        dateCal(arr){
          let now=this.$moment();
          let start=now.startOf('month').valueOf();
          let end=now.endOf('month').valueOf();
          let finArr=[];
          arr.map(item=>{
            let timestamp=item.createdDate
            if(timestamp>=start&&timestamp<=end){
              finArr.push({timestamp:timestamp,name:item.title})
            }
          })
          let obj=createTimeSeries(finArr,"timestamp");
          let day=obj.groupByDate();
          console.log(finArr)
          return day.map
        },
        showChartDate(arr,name,key,objData){
          let myChart = echarts.init(document.getElementById('main'+name));
          let obj=objData?objData:this.issueCal(arr,key);
          let now=this.$moment().format("YYYY-MM");
          let fin=[];
          let xData=[];
          let avg=[];
          let total=0;
          let end=this.$moment().endOf('month').get('date');
          for(let i=1;i<=end;i++){
            xData.push(i)
            let number=i<10?"0"+i:""+i;
            let key=now+"-"+number;
            let num=obj[key]?obj[key].length:0
            if(obj[key]){
              total+=obj[key].length
            }
            fin.push(num);
            avg.push((total/i).toFixed(2))
          }
          this[name]=total;

          // 指定图表的配置项和数据
          let option = {
            tooltip: {},
            legend: {
              data:['本月','均线']
            },
            xAxis: {
              data: xData
            },
            yAxis: {},
            series: [
              {
              name: '本月',
              type: 'bar',
              data: fin,
                // markLine : {
                //   symbol : 'none',
                //   itemStyle : {
                //     normal : {
                //       color:'#1e90ff',
                //       label : {
                //         show:true
                //       }
                //     }
                //   },
                //   data : [{type : 'average', name: '均值'}]
                // }
            },
              {
                name:'均线',
                type:'line',
                data:avg
              }
            ],
            color: ['#B2DFEE','#F4A460']
          };

          // 使用刚指定的配置项和数据显示图表。
          this.loading=false
          myChart.setOption(option);
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
